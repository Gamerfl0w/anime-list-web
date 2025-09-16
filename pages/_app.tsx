import type { AppProps } from 'next/app'
import '../app/globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import Navbar from './layouts/navbar'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] });

export default function App({
  Component, 
  pageProps: { session, user, ...pageProps }, 
}: AppProps & { pageProps: { user?: any } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Anime List</title>
      </Head>
      <Navbar user={user} />
      <Component className={inter.className} {...pageProps} />
    </SessionProvider>
  )
}
