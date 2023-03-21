import { NextPage } from 'next';

import { Center } from '@/components/Flex';
import { getPatreonAuthUrl } from '@/utils/patreon';
import { clearAllLocal } from '@/utils/store';
import { useStore } from '@/utils/store/useStore';

const IndexPage: NextPage = () => {
  const [loggedIn] = useStore<boolean>('loggedIn');

  return (
    <Center width="100%" height="100vh">
      {loggedIn ? (
        <>
          <button
            onClick={() => {
              clearAllLocal();
            }}
          >
            log out
          </button>
        </>
      ) : (
        <div>
          <button
            onClick={() => {
              window.open(getPatreonAuthUrl());
            }}
          >
            Login with Patreon
          </button>
        </div>
      )}
    </Center>
  );
};

export default IndexPage;
