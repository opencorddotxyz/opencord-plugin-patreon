import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { memo } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} key={router.route} />
    </>
  );
}

const _Header = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      />
      <link rel="icon" href="/favicon.ico" />
      <title>Patreon Membership NFT Pass</title>
      <meta
        name="description"
        content="Welcome your Patrons to Opencord. Automatically assign roles and reward them with a Membership NFT Pass based on their tier."
      />
    </Head>
  );
};

const Header = memo(_Header);
