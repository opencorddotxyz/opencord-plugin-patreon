import { useState } from 'react';

import { Center, Column } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { MembershipLevelItem } from '@/components/MembershipLevels/MembershipLevelItem';
import { MembershipLevelsHeader } from '@/components/MembershipLevels/MembershipLevelsHeader';
import { CurrentRoles } from '@/components/pages/patron/home/CurrentRoles';
import { MintSuccess } from '@/components/pages/patron/home/MintSuccess';
import { NeedMint } from '@/components/pages/patron/home/NeedMint';
import { NotConnected } from '@/components/pages/patron/home/NotConnected';
import { NotEligible } from '@/components/pages/patron/home/NotEligible';
import { useAsync } from '@/hooks/core/useAsync';
import { usePatreonInfo } from '@/hooks/usePatreonInfo';
import { MembershipLevel } from '@/net/http/patreonComponents';

const useCurrentStep = () => {
  const [connected, _setConnected] = useState(false);
  const [eligible, _setEligible] = useState(false);
  const [needMint, _setNeedMint] = useState(false);
  const [mintSuccess, _setMintSuccess] = useState(false);

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
    connected,
    eligible,
    needMint,
    mintSuccess,
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

const PatronNotConnectPage = () => {
  const { data: patreonInfo, loading } = usePatreonInfo();
  const name = patreonInfo?.creator?.name ?? 'Unknown';
  const levels = patreonInfo?.levels ?? ([] as MembershipLevel[]);

  const {
    connected,
    eligible,
    needMint,
    mintSuccess,
    userInfo: { roles, nft, link },
  } = useCurrentStep();

  const _body = !connected ? (
    <NotConnected />
  ) : !eligible ? (
    <NotEligible name={name} link={link} />
  ) : needMint ? (
    mintSuccess ? (
      <MintSuccess roles={roles} nft={nft} creator={name} />
    ) : (
      <NeedMint roles={roles} nft={nft} creator={name} />
    )
  ) : (
    <CurrentRoles roles={roles} nft={nft} />
  );

  const _header = (
    <>
      <Image src={patreonInfo?.creator.avatar} size="72px" />
      <Text
        fontSize={'24px'}
        lineHeight="30px"
        fontWeight={'700'}
        textAlign="center"
        margin={'20px 0'}
      >
        {name}
      </Text>
      {!connected || !eligible ? (
        <Text
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'400'}
          textAlign="center"
          color={'rgba(255, 255, 255, 0.8)'}
          marginBottom="20px"
          maxWidth="600px"
        >
          As a {name} patron, you can connect your Patreon account to
          automatically receive roles based on your membership level and claim
          your Membership NFT Pass.
        </Text>
      ) : (
        <Text
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'400'}
          textAlign="center"
          color={'rgba(255, 255, 255, 0.8)'}
          marginBottom="20px"
          maxWidth="600px"
        >
          ✅ Welcome back, {name} patron!
        </Text>
      )}
    </>
  );

  const _membershipLevels = (
    <Column width="100%" maxWidth="840px" alignItems="start">
      <MembershipLevelsHeader />
      {levels.length < 1 ? (
        <Center
          width="100%"
          color="rgba(255, 255, 255, 0.6)"
          fontSize={'12px'}
          lineHeight="15px"
          fontWeight={'500'}
          textAlign="center"
          padding={'20px 30px'}
        >
          <Text>There are no membership levels assigned to roles.</Text>
        </Center>
      ) : (
        levels.map((val) => {
          return <MembershipLevelItem key={val.id} {...val} />;
        })
      )}
    </Column>
  );

  return loading ? (
    <Center width="100%" height="100vh">
      <Spinner theme="dark" />
    </Center>
  ) : (
    <Column width="100%" padding="30px">
      {_header}
      {_body}
      {_membershipLevels}
    </Column>
  );
};

export default PatronNotConnectPage;
