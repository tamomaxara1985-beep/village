import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/session'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'

export const verifySession = cache(async (): Promise<{ isAuth: true; userId: string }> => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/signin')
  }

  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async (): Promise<{ id: string; name: string; email: string } | null> => {
  const session = await verifySession()

  try {
    await connectDB()
    const user = await User.findById(session.userId).select('name email').lean()
    if (!user) return null
    return {
      id: (user._id as { toString(): string }).toString(),
      name: user.name,
      email: user.email,
    }
  } catch {
    return null
  }
})

export const getOptionalUser = cache(async (): Promise<{ id: string; name: string; email: string } | null> => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)
  if (!session?.userId) return null

  try {
    await connectDB()
    const user = await User.findById(session.userId).select('name email').lean()
    if (!user) return null
    return {
      id: (user._id as { toString(): string }).toString(),
      name: user.name,
      email: user.email,
    }
  } catch {
    return null
  }
})
