import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/global.css';
import 'react-spring-bottom-sheet/dist/style.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { memo, useEffect } from 'react';

import { ButtonSheet } from '@/components/Dialogs/BottomSheet';
import { Toast } from '@/components/Dialogs/Toast';
import MobileVisitTip from '@/components/MobileTip';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { useAPP } from '@/hooks/useAPP';
import { useRouterSafe } from '@/hooks/useRouterSafe';

export default function App({
  Component,
  pageProps,
  router: _router,
}: AppProps) {
  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
  }, []);

  const router = useRouterSafe();
  const { isMobile } = useBreakpoint();
  const { homeStates, isInOpencord, isInitFailed, isInitialized } = useAPP();
  const { setup, manageable, connected, eligible, minted } = homeStates ?? {};

  useEffect(() => {
    if (
      isInitialized &&
      !isInOpencord &&
      !['/oauth', '/404', '/wallet-required', '/stark-required'].includes(
        router.originRouter.pathname,
      )
    ) {
      router.replace('/not-in-oc');

      return;
    }

    if (isInOpencord && isInitFailed) {
      // init failed
      router.replace('/404');

      return;
    }

    if (!homeStates) {
      // not initialized yet
      return;
    }

    if (manageable) {
      if (!connected) {
        router.replace('/creator/not-connect');

        return;
      }
      router.replace('/creator');

      return;
    } else {
      if (!setup) {
        router.replace('/patron/not-setup');

        return;
      }
      router.replace('/patron');

      return;
    }
  }, [
    isInitialized,
    isInOpencord,
    isInitFailed,
    homeStates,
    setup,
    manageable,
    connected,
    eligible,
    minted,
    router,
  ]);

  return (
    <>
      <Header />
      <Toast />
      <ButtonSheet />
      {isMobile ? (
        <MobileVisitTip />
      ) : (
        <Component {...pageProps} key={_router.route} />
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
        content="Automatically assign roles and reward your Patrons with a Membership NFT Pass based on their tier."
      />
    </Head>
  );
};

const Header = memo(_Header);
