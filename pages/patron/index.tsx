import { useState } from 'react';

import { Center, Column } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { showToast } from '@/components/Dialogs/Toast';
import { MembershipLevelItem } from '@/components/MembershipLevels/MembershipLevelItem';
import { MembershipLevelsHeader } from '@/components/MembershipLevels/MembershipLevelsHeader';
import { CurrentRoles } from '@/components/pages/patron/home/CurrentRoles';
import { MintSuccess } from '@/components/pages/patron/home/MintSuccess';
import { NeedMint } from '@/components/pages/patron/home/NeedMint';
import { NotConnected } from '@/components/pages/patron/home/NotConnected';
import { NotEligible } from '@/components/pages/patron/home/NotEligible';
import { useHomeStates } from '@/hooks/useAPP';
import { mintNFT } from '@/net/http/patreon';
import { MembershipLevel } from '@/net/http/patreonComponents';
import { is2XX } from '@/net/http/utils';
import { withDefault } from '@/utils/core/base';

const PatronHomePage = () => {
  const [mintSuccess, setMintSuccess] = useState(false);
  const [minting, setMinting] = useState(false);
  const onMint = async () => {
    if (minting) {
      return;
    }
    setMinting(true);
    const result = await mintNFT().catch(() => undefined);
    setMinting(false);
    if (!is2XX(result)) {
      // mint failed
      showToast(
        result?.message ?? 'Something went wrong, please try again later.',
      );
    }
    setMintSuccess(true);
  };

  const { homeStates } = useHomeStates();
  const { connected, eligible, minted } = homeStates ?? {};

  const needMint = connected && eligible && !minted;

  const name = withDefault(homeStates?.spaceProfile?.name, '-');
  const avatar = homeStates?.spaceProfile?.avatar ?? '';
  const levels = homeStates?.membershipLevels ?? ([] as MembershipLevel[]);

  const roles = homeStates?.corrMembershipLevel?.roles ?? [];
  const link = homeStates?.spaceProfile?.patreonURL ?? 'https://patreon.com';
  const nft = { image: homeStates?.corrMembershipLevel?.image ?? '' };

  const _body = !connected ? (
    <NotConnected />
  ) : !eligible ? (
    <NotEligible name={name} link={link} />
  ) : needMint ? (
    mintSuccess ? (
      <MintSuccess roles={roles} nft={nft} creator={name} />
    ) : (
      <NeedMint
        roles={roles}
        nft={nft}
        creator={name}
        minting={minting}
        onMint={onMint}
      />
    )
  ) : (
    <CurrentRoles roles={roles} nft={nft} />
  );

  const _header = (
    <>
      <Image src={avatar} size="72px" borderRadius="50%" />
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

  return !homeStates ? (
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

export default PatronHomePage;
