import 'server-only'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'

export interface SessionPayload extends JWTPayload {
  userId: string
}

function getEncodedKey(): Uint8Array {
  const secretKey = process.env.SESSION_SECRET
  if (!secretKey) throw new Error('SESSION_SECRET environment variable is not defined')
  return new TextEncoder().encode(secretKey)
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getEncodedKey())
}

export async function decrypt(session: string | undefined): Promise<SessionPayload | undefined> {
  if (!session) return undefined
  try {
    const { payload } = await jwtVerify(session, getEncodedKey(), { algorithms: ['HS256'] })
    return payload as SessionPayload
  } catch {
    return undefined
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const token = await encrypt({ userId, expiresAt: expiresAt.toISOString() })
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
