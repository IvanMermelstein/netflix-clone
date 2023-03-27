import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({
  Component, pageProps
}: AppProps) {
  return <>
    <Head>
      <title>Netflix Clone</title>
      <link rel="shortcut icon" href="/favicon.ico"></link>
    </Head>
    <Component {...pageProps} />
  </>;
}
