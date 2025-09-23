import { Html, Head, Main, NextScript } from 'next/document'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';


export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </Head>
      <body className="bg-[#222831]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}