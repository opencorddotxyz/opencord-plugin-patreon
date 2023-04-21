import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { ErrorPageFrame } from '@/components/PageLayout/ErrorPageFrame';

const StarkRequired: NextPage = () => {
  return (
    <ErrorPageFrame
      title={'Stark Key Required'}
      bannerImg="wallet-required.svg"
    >
      <Text textAlign="center">
        Please setup your Stark Key before using the plugin.{' '}
        <a
          style={{ textDecoration: 'none' }}
          href="https://help.opencord.xyz/account/setup-stark-key"
          target="_blank"
        >
          Learn more
        </a>
      </Text>
    </ErrorPageFrame>
  );
};

export default StarkRequired;
