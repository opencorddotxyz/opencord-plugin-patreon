import { NextPage } from 'next';
import { ReactNode } from 'react';

import { Center, Column, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { images } from '@/utils/assets';

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

export const ErrorPageFrame = (props: {
  title: string;
  loading?: boolean;
  children: ReactNode;
}) => {
  const { title, loading = false } = props;

  return (
    <Center
      width="100%"
      height="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="625px 528px"
    >
      <Column borderRadius="12px" padding="30px 40px 60px 40px">
        {loading ? (
          <Center width="260px" height="160px">
            <Spinner size="60px" thickness="6px" />
          </Center>
        ) : (
          <Image
            src={images('not-setup.svg')}
            width="260px"
            height="160px"
            marginBottom="10px"
          />
        )}
        <Text
          fontSize={'32px'}
          lineHeight="40px"
          fontWeight={'700'}
          margin={'10px'}
        >
          {title}
        </Text>
        <Row>{props.children}</Row>
      </Column>
    </Center>
  );
};
