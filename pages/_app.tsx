import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';
import 'react-contexify/ReactContexify.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import { Toast } from '@/components/Dialogs/Toast';
import { StateType } from '@/constants/store';
import useAsyncEffect from '@/hooks/core/useAsyncEffect';
import { setAuthTokens } from '@/net/http/interceptors/token';
import { login } from '@/net/http/patreon';
import ocClient from '@/utils/opencord-client';
import { store, useProvider, useStore } from '@/utils/store/useStore';

import NotInOCPage from '../components/not-in-oc';

export default function App({ Component, pageProps, router }: AppProps) {
  useProvider(StateType.IN_OPENCORD, true);
  const [inOC] = useStore(StateType.IN_OPENCORD);
  const currentPath = useRouter().asPath;

  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
  }, []);

  useAsyncEffect(async () => {
    const response = await ocClient.getCode();

    console.info('!!! plugin debug: ocClient response = ', response);

    if (response.code === -32002) {
      return store.set(StateType.IN_OPENCORD, false);
    } else {
      store.set(StateType.IN_OPENCORD, true);
    }

    if (response.data?.code) {
      try {
        const loginResponse = await login({ code: response.data.code });
        console.info('!!! plugin debug: login response = ', loginResponse);
        const { data } = loginResponse;
        const {
          token,
          manageable,
          setup,
          connected,
          // eligible,
          // minted,
          // spaceProfile,
          // membershipLevels,
          // corrMembershipLevel,
          // outdatedMembershipLevels,
        } = data;
        console.log('!!! login get', token, manageable, setup, connected);

        store.set(StateType.MANAGEABLE, manageable);
        store.set(StateType.BEEN_SET, setup);
        store.set(StateType.PATREON_CONNECTED, connected);

        // set token step by state change
        setAuthTokens({ accessToken: token });
      } catch (error) {
        //
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Toast />
      {!inOC && currentPath !== '/oauth' ? (
        <NotInOCPage />
      ) : (
        <Component {...pageProps} key={router.route} />
      )}
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
