# Google OAuth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "Continue with Google" OAuth to the existing custom JWT auth system, with auto-linking when an email already has a password account.

**Architecture:** Two new Next.js route handlers implement the OAuth 2.0 authorization code flow. `/api/auth/google` generates a CSRF state token and redirects to Google. `/api/auth/google/callback` verifies state, exchanges the code for tokens, fetches Google user info, upserts the user in MongoDB, and calls the existing `createSession()`. Both signin and signup pages get a Google button above the email/password form.

**Tech Stack:** Next.js 16 App Router route handlers · MongoDB/Mongoose · `jose` (existing) · Node.js `crypto` (built-in) · Google OAuth 2.0

## Global Constraints

- Next.js 16: route handlers export named async functions (`GET`, `POST`, etc.) from `app/api/**/route.ts`
- `cookies()` from `next/headers` is async — always `await cookies()`
- No new npm packages — use Node.js built-in `crypto` for state generation and `fetch` for Google API calls
- Google OAuth credentials stored in env vars only — never hardcoded in source
- `proxy.ts` at project root (not `middleware.ts`) handles route protection
- Deployed production URL: `https://village-flax.vercel.app`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `.env.local` | Modify | Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI |
| `lib/models/User.ts` | Modify | Make `passwordHash` optional, add sparse-indexed `googleId` |
| `app/api/auth/google/route.ts` | Create | Generate state cookie, redirect to Google consent screen |
| `app/api/auth/google/callback/route.ts` | Create | Verify state, exchange code, upsert user, create session |
| `app/(auth)/signin/page.tsx` | Modify | Add Google button + divider + OAuth error display |
| `app/(auth)/signup/page.tsx` | Modify | Add Google button + divider |

---

### Task 1: Environment Variables

**Files:**
- Modify: `.env.local`
- Vercel dashboard (manual step)

**Interfaces:**
- Produces: `process.env.GOOGLE_CLIENT_ID`, `process.env.GOOGLE_CLIENT_SECRET`, `process.env.GOOGLE_REDIRECT_URI`

- [ ] **Step 1: Add env vars to .env.local**

Open `.env.local` and append:

```
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

- [ ] **Step 2: Add Authorized Redirect URIs in Google Cloud Console**

Go to [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → your OAuth 2.0 Client ID → Edit.

Under **Authorized redirect URIs**, add both:
- `http://localhost:3000/api/auth/google/callback`
- `https://village-flax.vercel.app/api/auth/google/callback`

Save.

- [ ] **Step 3: Add production env vars to Vercel**

```bash
vercel env add GOOGLE_CLIENT_ID production --value "<your-client-id>" --yes
vercel env add GOOGLE_CLIENT_SECRET production --value "<your-client-secret>" --yes
vercel env add GOOGLE_REDIRECT_URI production --value "https://village-flax.vercel.app/api/auth/google/callback" --yes
```

- [ ] **Step 4: Verify env vars listed**

```bash
vercel env ls
```

Expected output includes `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` under Production.

---

### Task 2: User Model Update

**Files:**
- Modify: `lib/models/User.ts`

**Interfaces:**
- Produces:
  - `IUser.passwordHash?: string` (optional)
  - `IUser.googleId?: string` (optional, sparse-indexed)

- [ ] **Step 1: Rewrite lib/models/User.ts**

```typescript
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash?: string
  googleId?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: false },
    googleId: { type: String, index: { sparse: true }, required: false },
  },
  { timestamps: true }
)

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema)

export default User
```

- [ ] **Step 2: Verify TypeScript passes**

```bash
npx tsc --noEmit
```

Expected: no errors from `lib/models/User.ts` or `app/actions/auth.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/models/User.ts
git commit -m "feat: make passwordHash optional, add googleId to User model"
```

---

### Task 3: OAuth Initiation Route

**Files:**
- Create: `app/api/auth/google/route.ts`

**Interfaces:**
- Consumes: `process.env.GOOGLE_CLIENT_ID`, `process.env.GOOGLE_REDIRECT_URI`
- Produces: `GET /api/auth/google` → 302 redirect to Google with `oauth_state` cookie set

- [ ] **Step 1: Create app/api/auth/google/route.ts**

```typescript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  if (!clientId || !redirectUri) {
    throw new Error('Google OAuth env vars are not configured')
  }

  const state = crypto.randomBytes(16).toString('base64url')

  const cookieStore = await cookies()
  cookieStore.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10,
    path: '/',
  })

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
  })

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  )
}
```

- [ ] **Step 2: Manual test — verify redirect**

Start dev server: `npm run dev`

Visit `http://localhost:3000/api/auth/google` in browser.

Expected: browser redirects to Google's OAuth consent screen (`accounts.google.com`). If Google says "redirect_uri_mismatch", the redirect URI in Google Cloud Console is not yet saved — go back to Task 1 Step 2.

- [ ] **Step 3: Commit**

```bash
git add app/api/auth/google/route.ts
git commit -m "feat: add GET /api/auth/google — initiate OAuth flow"
```

---

### Task 4: OAuth Callback Route

**Files:**
- Create: `app/api/auth/google/callback/route.ts`

**Interfaces:**
- Consumes:
  - `process.env.GOOGLE_CLIENT_ID`, `process.env.GOOGLE_CLIENT_SECRET`, `process.env.GOOGLE_REDIRECT_URI`
  - `connectDB()` from `@/lib/mongodb`
  - `User` (default export) from `@/lib/models/User`
  - `createSession(userId: string): Promise<void>` from `@/lib/session`
  - `IUser` from `@/lib/models/User`
- Produces: `GET /api/auth/google/callback?code=...&state=...` → session cookie + redirect to `/dashboard` (or `/signin?error=oauth_failed` on error)

- [ ] **Step 1: Create app/api/auth/google/callback/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'
import { createSession } from '@/lib/session'

interface GoogleTokenResponse {
  access_token: string
  error?: string
}

interface GoogleUserInfo {
  sub: string
  name: string
  email: string
  email_verified: boolean
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const cookieStore = await cookies()
  const storedState = cookieStore.get('oauth_state')?.value
  cookieStore.delete('oauth_state')

  if (!state || !storedState || state !== storedState) {
    return new NextResponse('Invalid state parameter', { status: 400 })
  }

  if (!code) {
    return NextResponse.redirect(new URL('/signin?error=oauth_failed', request.nextUrl))
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth env vars are not configured')
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData: GoogleTokenResponse = await tokenRes.json()

    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.redirect(new URL('/signin?error=oauth_failed', request.nextUrl))
    }

    // Fetch Google user info
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    if (!userInfoRes.ok) {
      return NextResponse.redirect(new URL('/signin?error=oauth_failed', request.nextUrl))
    }

    const googleUser: GoogleUserInfo = await userInfoRes.json()

    if (!googleUser.email_verified) {
      return NextResponse.redirect(new URL('/signin?error=oauth_failed', request.nextUrl))
    }

    await connectDB()

    // Account resolution: find by googleId → find by email → create
    let user = await User.findOne({ googleId: googleUser.sub })

    if (!user) {
      user = await User.findOne({ email: googleUser.email.toLowerCase() })
      if (user) {
        // Auto-link: attach googleId to existing password account
        user.googleId = googleUser.sub
        await user.save()
      }
    }

    if (!user) {
      // New Google-only user
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email.toLowerCase(),
        googleId: googleUser.sub,
      })
    }

    await createSession(user._id.toString())

    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  } catch {
    return NextResponse.redirect(new URL('/signin?error=oauth_failed', request.nextUrl))
  }
}
```

- [ ] **Step 2: Verify TypeScript passes**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 3: Manual test — full OAuth flow**

With dev server running (`npm run dev`):

1. Visit `http://localhost:3000/api/auth/google`
2. Select a Google account on the consent screen
3. Expected: redirected to `http://localhost:3000/dashboard` and logged in
4. Visit `http://localhost:3000/dashboard` — should show your Google account name
5. Sign out, then visit `/signin` and try again — should log in without creating a duplicate account (same `googleId`)

- [ ] **Step 4: Test auto-link**

1. Sign up with email/password using the same Gmail address
2. Sign out
3. Sign in with Google using that same Gmail
4. Expected: same account, dashboard shows same user — no duplicate created

- [ ] **Step 5: Commit**

```bash
git add app/api/auth/google/callback/route.ts
git commit -m "feat: add GET /api/auth/google/callback — exchange code, upsert user, create session"
```

---

### Task 5: UI — Google Button on Signin + Signup Pages

**Files:**
- Modify: `app/(auth)/signin/page.tsx`
- Modify: `app/(auth)/signup/page.tsx`

**Interfaces:**
- Consumes: nothing new — button is a plain `<a href="/api/auth/google">`
- Produces: visible "Continue with Google" button above the form on both pages; signin page shows error message when `?error=oauth_failed` is in URL

- [ ] **Step 1: Rewrite app/(auth)/signin/page.tsx**

```typescript
'use client'
import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SigninPage() {
  const [state, action, pending] = useActionState(login, undefined)
  const searchParams = useSearchParams()
  const oauthError = searchParams.get('error') === 'oauth_failed'

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
            Create one
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {oauthError && (
          <p className="text-sm text-destructive text-center">Google sign-in failed. Please try again.</p>
        )}

        <a
          href="/api/auth/google"
          className="flex items-center justify-center gap-3 w-full border border-input rounded-md px-4 py-2 text-sm font-medium bg-white hover:bg-stone-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-input" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            {state?.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
            {state?.errors?.password && (
              <p className="text-sm text-destructive">{state.errors.password[0]}</p>
            )}
          </div>

          {state?.message && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Rewrite app/(auth)/signup/page.tsx**

```typescript
'use client'
import { useActionState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Already have an account?{' '}
          <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <a
          href="/api/auth/google"
          className="flex items-center justify-center gap-3 w-full border border-input rounded-md px-4 py-2 text-sm font-medium bg-white hover:bg-stone-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-input" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
            {state?.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            {state?.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
            {state?.errors?.password && (
              <p className="text-sm text-destructive">{state.errors.password[0]}</p>
            )}
          </div>

          {state?.message && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating account…' : 'Create account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Verify TypeScript passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Visual check in browser**

Start dev server: `npm run dev`

Visit `http://localhost:3000/signin` — should show Google button above the divider and email/password form.
Visit `http://localhost:3000/signup` — same layout.
Visit `http://localhost:3000/signin?error=oauth_failed` — should show "Google sign-in failed. Please try again." at the top.

- [ ] **Step 5: Commit**

```bash
git add "app/(auth)/signin/page.tsx" "app/(auth)/signup/page.tsx"
git commit -m "feat: add Continue with Google button to signin and signup pages"
```

---

### Task 6: Deploy to Production

**Files:**
- No code changes

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Deploy to Vercel production**

```bash
vercel --prod
```

Expected output ends with `▲ Aliased https://village-flax.vercel.app` and status `READY`.

- [ ] **Step 3: Smoke test production**

Visit `https://village-flax.vercel.app/signin` — Google button visible.
Click "Continue with Google" — Google consent screen appears.
Complete sign-in — redirected to `/dashboard` with your name shown.
