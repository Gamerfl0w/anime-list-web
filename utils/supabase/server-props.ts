// utils/supabase/server-props.ts
import { type GetServerSidePropsContext } from 'next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient, serializeCookieHeader } from '@supabase/ssr'

type ReqRes = { req: NextApiRequest; res: NextApiResponse }

export function createClient(ctx: GetServerSidePropsContext | ReqRes) {
  const { req, res } = ctx

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: (req.cookies as any)[name] || '',
          }))
        },
        setAll(cookiesToSet) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          )
        },
      },
    }
  )

  return supabase
}
