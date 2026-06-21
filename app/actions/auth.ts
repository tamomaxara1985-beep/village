'use server'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'
import { createSession, deleteSession } from '@/lib/session'
import { SignupFormSchema, SigninFormSchema, FormState } from '@/lib/definitions'

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  const validated = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { name, email, password } = validated.data

  await connectDB()

  const existing = await User.findOne({ email })
  if (existing) {
    return { errors: { email: ['An account with this email already exists.'] } }
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await User.create({ name, email, passwordHash })

  await createSession(user._id.toString())
  redirect('/dashboard')
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validated = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { email, password } = validated.data

  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    return { message: 'Invalid email or password.' }
  }

  if (!user.passwordHash) {
    return { message: 'Invalid email or password.' }
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatch) {
    return { message: 'Invalid email or password.' }
  }

  await createSession(user._id.toString())
  redirect('/dashboard')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/signin')
}
