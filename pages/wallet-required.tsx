import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { ErrorPageFrame } from '@/components/PageLayout/ErrorPageFrame';

const WalletRequired: NextPage = () => {
  return (
    <ErrorPageFrame title={'Wallet Required'} bannerImg="wallet-required.svg">
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize="16px"
        fontWeight="400"
        lineHeight="20px"
        textAlign="center"
      >
        Please setup your wallet address before using the plugin.{' '}
        <a
          style={{ textDecoration: 'none' }}
          href="https://help.opencord.xyz/account/setup-wallet"
          target="_blank"
        >
          Learn more
        </a>
      </Text>
    </ErrorPageFrame>
  );
};

export default WalletRequired;
