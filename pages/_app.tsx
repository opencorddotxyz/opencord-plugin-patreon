import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';
import 'react-contexify/ReactContexify.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { memo, useEffect } from 'react';

import { Toast } from '@/components/Dialogs/Toast';

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
  }, []);

  return (
    <>
      <Header />
      <Toast />
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
        content="Automatically assign roles and reward your Patrons with a Membership NFT Pass based on their tier."
      />
    </Head>
  );
};

const Header = memo(_Header);
