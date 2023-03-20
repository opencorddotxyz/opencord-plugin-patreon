import '/style/reset.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { memo } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Header />
      <div style={{ width: '100%', overflowY: 'hidden' }}>
        <Component {...pageProps} key={router.route} />
      </div>
    </>
  );
}

const _Header = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <title>Opencord Patreon</title>
      <meta name="description" content="" />
      <meta name="keywords" content="opencord" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

const Header = memo(_Header);
