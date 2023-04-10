import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { ErrorPageFrame } from '@/components/ErrorPageFrame';

const WalletRequired: NextPage = () => {
  return (
    <ErrorPageFrame title={'Channel Setup In Progress'}>
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize="16px"
        fontWeight="400"
        lineHeight="20px"
      >
        Once the setup is complete, you will be able to claim your Membership
        NFT Pass here.
      </Text>
    </ErrorPageFrame>
  );
};

export default WalletRequired;
