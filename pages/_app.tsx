import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';

import ocClient from 'libs/opencord-client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import { Text } from '@/components/core/Text';
import { StateType } from '@/constants/store';
import useAsyncEffect from '@/hooks/core/useAsyncEffect';
import { login } from '@/net/http/patreon';
import { store, useProvider, useStore } from '@/utils/store/useStore';

import { InfoPageFrame } from './oauth';

export default function App({ Component, pageProps, router }: AppProps) {
  useProvider(StateType.IN_OPENCORD, true);
  useProvider(StateType.MANAGEABLE, false);
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
    }

    if (response.data?.code) {
      try {
        const loginResponse = await login({ code: response.data.code });
        console.info('!!! plugin debug: login response = ', loginResponse);
        const { data } = loginResponse;
        const { setup, manageable } = data;

        store.set(StateType.MANAGEABLE, manageable);
        store.set(StateType.BEEN_SET, setup);

        // if (errorCode === 5002) {
        //   setMessage(message);

        //   return;
        // }
      } catch (error) {
        //
      }
    }
  }, []);

  return (
    <>
      <Header />
      {!inOC && currentPath !== '/oauth' ? (
        <NotInOC />
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

const NotInOC = () => {
  return (
    <InfoPageFrame type={'Runtime Error'}>
      <Text
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
        color={'rgba(255, 255, 255, 0.6)'}
        paddingInline="20px"
        textAlign="center"
      >
        In order to ensure the best performance and experience, please use this
        plugin within <a href={process.env.NEXT_PUBLIC_OC_APP_SITE}>Opencord</a>
        .
      </Text>
    </InfoPageFrame>
  );
};

const Header = memo(_Header);
