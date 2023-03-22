import { NextPage } from 'next';

import { StateType } from '@/constants/store';
import { useAsync } from '@/hooks/core/useAsync';
import { useStore } from '@/utils/store/useStore';

import ManagePage from './manage-page';
import CreatorNotConnectPage from './not-connect-page';

const useCreatorPage = () => {
  const [beenSet] = useStore(StateType.BEEN_SET);

  // page info
  const {
    loading,
    data: _userInfo,
    run: fetchUserInfo,
  } = useAsync<{
    roles: { name: string; color: string }[];
    nft: { image: string };
  }>(
    async () => {
      // todo fetch user's current NFT and roles
      return undefined;
    },
    { immediately: false },
  );

  return {
    beenSet,
    fetchUserInfo,
    userInfo: {
      link: 'https://patreon.com',
      nft: {
        image:
          'https://c10.patreonusercontent.com/4/patreon-media/p/reward/5971375/e896ec5e508746e4962cbc4afbed93f8/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=3jWLUC5cNN1a8TuUSlKSGdZGzLAAE6fUCnwfKOBM2vk%3D',
      },
      roles: [
        {
          name: 'adminwedewdededededewd',
          color: '#ff0000',
        },
        {
          name: 'cordewddededewdewwedewdewdewdewdewdewdewdewe',
          color: '#0000ff',
        },
      ],
    },
    loading,
  };
};

const CreatorPage: NextPage = () => {
  const { beenSet } = useCreatorPage();

  return beenSet ? <ManagePage /> : <CreatorNotConnectPage />;
};

export default CreatorPage;
