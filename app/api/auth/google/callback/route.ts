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

    let user = await User.findOne({ googleId: googleUser.sub })

    if (!user) {
      user = await User.findOne({ email: googleUser.email.toLowerCase() })
      if (user) {
        user.googleId = googleUser.sub
        await user.save()
      }
    }

    if (!user) {
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
