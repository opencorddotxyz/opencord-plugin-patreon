import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';
import 'react-contexify/ReactContexify.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import { Toast } from '@/components/Dialogs/Toast';
import { useOpencord } from '@/hooks/useOpencord';

export default function App({ Component, pageProps, router }: AppProps) {
  const _router = useRouter();
  const { isInOpencord, isInited } = useOpencord();

  useEffect(() => {
    if (
      isInited &&
      !isInOpencord &&
      !['/oauth', '/not-in-oc'].includes(_router.pathname)
    ) {
      _router.replace('/not-in-oc');

      return;
    }
  }, [isInOpencord, isInited, _router]);

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
