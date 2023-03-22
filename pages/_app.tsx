import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';

import ocClient from 'libs/opencord-client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { memo, useEffect } from 'react';

import { StateType } from '@/constants/store';
import useAsyncEffect from '@/hooks/core/useAsyncEffect';
import { registerStaleCallback } from '@/utils/checkLocal';
import { store, useProvider } from '@/utils/store/useStore';

registerStaleCallback(() => {
  store.set('loggedIn', false);
  store.set('code', undefined);
});

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
  }, []);

  useProvider('loggedIn', false);
  useProvider(StateType.IN_OPENCORD, true);

  useAsyncEffect(async () => {
    const response = await ocClient.getCode();
    console.info('=> plugin debug: get code response = ', response);

    if (response.data?.code) {
      console.info('=> in opencord and got code', response);
      // todo oc auth
    } else {
      store.set(StateType.IN_OPENCORD, false);
    }
  }, []);

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
