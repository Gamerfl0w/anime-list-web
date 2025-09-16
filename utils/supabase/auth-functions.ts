import { createClient } from '@/utils/supabase/component'
import type { User, Session } from '@supabase/supabase-js'

const supabase = createClient()

export interface AuthResponse {
  user: User | null
  session: Session | null
}

export async function logIn(params: { email: string; password: string }): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword(params)
  if (error) throw error
  return data
}

export async function signUp(params: { email: string; password: string }): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp(params)
  if (error) throw error
  return data
}
