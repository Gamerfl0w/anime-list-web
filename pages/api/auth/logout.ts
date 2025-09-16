import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server-props'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient({ req, res })
  const { error } = await supabase.auth.signOut()

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ success: true })
}