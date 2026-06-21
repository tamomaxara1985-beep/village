# Google OAuth Design

**Goal:** Add "Continue with Google" sign-in/sign-up to the existing custom JWT auth system, with auto-linking when an email already has a password account.

**Approach:** Custom OAuth 2.0 flow using Next.js route handlers. No new auth libraries. Reuses existing `createSession()`, MongoDB connection, and User model.

---

## Architecture

Two new route handlers handle the entire OAuth flow:

### `GET /api/auth/google`
1. Generate a random `state` string (16 bytes, base64url-encoded)
2. Store `state` in an HTTP-only cookie (`oauth_state`, 10-minute expiry)
3. Redirect browser to Google OAuth consent URL:
   ```
   https://accounts.google.com/o/oauth2/v2/auth
     ?client_id=GOOGLE_CLIENT_ID
     &redirect_uri=GOOGLE_REDIRECT_URI
     &response_type=code
     &scope=openid email profile
     &state=<state>
   ```

### `GET /api/auth/google/callback`
1. Read `state` from query params + `oauth_state` cookie — if mismatch, return 400 (CSRF protection)
2. Delete `oauth_state` cookie
3. Exchange `code` for tokens via POST to `https://oauth2.googleapis.com/token`
4. Fetch user info via GET `https://www.googleapis.com/oauth2/v3/userinfo` (using access token)
5. Upsert user in MongoDB (see Account Resolution below)
6. Call `createSession(user._id.toString())`
7. Redirect to `/dashboard`
8. On any error: redirect to `/signin?error=oauth_failed`

## Account Resolution

Priority order on each Google sign-in:

1. **Find by `googleId`** → user exists with this Google account → log in
2. **Find by `email`, no `googleId`** → existing password account → attach `googleId` to it → log in (auto-link)
3. **No match** → create new user (`name` + `email` from Google, `passwordHash` undefined) → log in

## Data Model Changes

`lib/models/User.ts`:

```typescript
interface IUser {
  name: string
  email: string
  passwordHash?: string   // undefined for Google-only accounts
  googleId?: string       // Google "sub" field — indexed for fast lookup
  createdAt: Date
  updatedAt: Date
}
```

Index on `googleId` (sparse, since most existing users won't have it initially).

## UI Changes

Both `/signin` and `/signup` pages get a "Continue with Google" button above the email/password form, separated by an "or" divider:

```
┌─────────────────────────────────┐
│  [G]  Continue with Google      │  ← <a href="/api/auth/google">
├──────────────── or ─────────────┤
│  Email                          │
│  Password                       │
│  [Sign in / Create account]     │
└─────────────────────────────────┘
```

Button is a plain anchor tag (`<a href="/api/auth/google">`). Styled with Google brand colors (white background, blue border, Google icon).

## Environment Variables

Add to `.env.local` and Vercel production:

```
GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REDIRECT_URI=https://village-flax.vercel.app/api/auth/google/callback
```

For local dev, `GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback` (requires adding this URI in Google Cloud Console).

## Files

| File | Action | Purpose |
|------|--------|---------|
| `lib/models/User.ts` | Modify | Make `passwordHash` optional, add `googleId` |
| `app/api/auth/google/route.ts` | Create | Initiate OAuth — generate state, redirect to Google |
| `app/api/auth/google/callback/route.ts` | Create | Handle callback — exchange code, upsert user, create session |
| `app/(auth)/signin/page.tsx` | Modify | Add Google button + divider |
| `app/(auth)/signup/page.tsx` | Modify | Add Google button + divider |
| `.env.local` | Modify | Add Google credentials |

## Error Handling

| Error | Behavior |
|-------|----------|
| State mismatch (CSRF) | Return 400 Bad Request |
| Google token exchange fails | Redirect to `/signin?error=oauth_failed` |
| Google user info fetch fails | Redirect to `/signin?error=oauth_failed` |
| MongoDB error | Redirect to `/signin?error=oauth_failed` |
| Missing env vars | Throw at request time (same pattern as SESSION_SECRET) |

## Error Display on Signin Page

`/signin` page reads `?error` query param and shows a message:
- `?error=oauth_failed` → "Google sign-in failed. Please try again."

Implemented as a client-side read of `useSearchParams()` in the signin page component.

## Google Cloud Console Setup

In Google Cloud Console → APIs & Services → Credentials:
- Add `http://localhost:3000/api/auth/google/callback` to Authorized Redirect URIs (local dev)
- Add `https://village-flax.vercel.app/api/auth/google/callback` to Authorized Redirect URIs (production)
