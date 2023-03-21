import { Center, Column, Expand, Row } from '@/components/Flex';
import { Image } from '@/components/Image';
import { Spinner } from '@/components/Spinner';
import { Text } from '@/components/Text';
import { icons } from '@/utils/assets';

import { useConnectPatreon } from '../hooks/useConnectPatreon';

const CreatorNotConnectPage = () => {
  const { connecting, connectPatreon } = useConnectPatreon();

  return (
    <Center width="100%" height="100vh">
      <Column height="100%">
        <Expand />
        <Image src={icons('patreon.svg')} size="64px" />
        <Text
          color="#fff"
          fontSize={'32px'}
          lineHeight="40px"
          fontWeight={'700'}
          textAlign="center"
          margin={'20px 0 10px 0'}
        >
          Welcome your Patrons to Opencord
        </Text>
        <Text
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'400'}
          textAlign="center"
          color={'rgba(255, 255, 255, 0.4)'}
          marginBottom="20px"
        >
          Automatically assign roles and reward them with a Membership NFT Pass
          based on their tier.
        </Text>
        <Row
          padding="6px 48px"
          borderRadius="4px"
          background="#fff"
          fontWeight={500}
          cursor={connecting ? 'progress' : 'pointer'}
          userSelect="none"
          onClick={connectPatreon}
        >
          {connecting && (
            <Spinner
              size="16px"
              thickness="2px"
              marginRight="8px"
              theme="light"
            />
          )}
          Connect Patreon
        </Row>
        <Expand />
        <Text
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'400'}
          textAlign="center"
          color={'rgba(255, 255, 255, 0.4)'}
          marginBottom="30px"
        >
          <Text>
            Note: If you have already connected your Patreon account, please
          </Text>
          <Text
            color={'#16B8F3'}
            textDecorationLine="underline"
            onClick={connectPatreon}
          >
            &nbsp;refresh&nbsp;
          </Text>
          <Text>to proceed to the next step.</Text>
        </Text>
      </Column>
    </Center>
  );
};

export default CreatorNotConnectPage;
