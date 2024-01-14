import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './layouts/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anime List',
  description: 'Keep track of your favorite anime',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">    
      <body>
        <Navbar />
        <main className={inter.className}>{children}</main>
      </body>
    </html>
  )
}
