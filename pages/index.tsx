import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Center } from '@/components/core/Flex';
import { Spinner } from '@/components/core/Spinner';
import { useAPP } from '@/hooks/useAPP';

const IndexPage: NextPage = () => {
  const router = useRouter();

  const { homeStates, isInOpencord, isInitFailed, isInited } = useAPP();
  const { setup, manageable, connected, eligible, minted } = homeStates ?? {};

  useEffect(() => {
    if (isInited && !isInOpencord) {
      router.replace('/not-in-oc');
      return;
    }

    if (isInitFailed) {
      // todo init failed
      router.replace('/not-in-oc');
      return;
    }

    if (!homeStates) {
      // not inited yet
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
      if (!connected) {
        router.replace('/patron/not-connect');
        return;
      }
      router.replace('/patron');
      return;
    }
  }, [
    isInited,
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
    <Center width="100%" height="100vh">
      <Spinner theme="dark" />
    </Center>
  );
};

export default IndexPage;
