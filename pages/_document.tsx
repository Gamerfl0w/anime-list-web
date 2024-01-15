import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from './layouts/navbar'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Anime List</title>
        <meta name="description"
          content="Keep track of your favorite anime"
        />
      </Head>
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}