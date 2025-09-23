import type { AppProps } from 'next/app'
import '../app/globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import Navbar from './layouts/navbar'
import Head from 'next/head'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals'

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  colors: {
    brand: [
      "#e0f7f8", "#b3eced", "#80dee1", "#4dd0d6", "#26c6cd",
      "#00ADB5", "#009ca3", "#008a90", "#00797e", "#005e61"
    ],
    darkBg: ["#f2f2f2", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999",
      "#808080", "#666666", "#4d4d4d", "#333333", "#222831"],
    lightText: ["#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd",
      "#9e9e9e", "#757575", "#616161", "#424242", "#212121"]
  },
  primaryColor: "brand",
  components: {
    Modal: {
      defaultProps: {
        centered: true,
        radius: "lg",
        overlayProps: { blur: 1, opacity: 0.80 },
      },
      styles: {
        content: {
          backgroundColor: "var(--mantine-color-darkBg-9)",
          color: "var(--mantine-color-lightText-2)",
        },
        header: {
          backgroundColor: "var(--mantine-color-brand-5)",
          color: "black",
        },
      },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, user, ...pageProps },
}: AppProps & { pageProps: { user?: any } }) {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <SessionProvider session={session}>
          <Head>
            <title>Anime List</title>
          </Head>
          <Navbar user={user} />
          <Component className={inter.className} {...pageProps} user={user}/>
        </SessionProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}
