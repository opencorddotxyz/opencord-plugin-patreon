import { Center, Column, Expand } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { useConnectPatreon } from '@/hooks/useConnectPatreon';
import { icons } from '@/utils/assets';

const CreatorNotConnectPage = () => {
  const { connecting, connectPatreon } = useConnectPatreon();
  const { isMobile } = useBreakpoint();

  return (
    <Center width="100%" height="100vh">
      <Column height="100%" paddingTop={isMobile ? '30%' : ''}>
        {!isMobile && <Expand />}
        <Image src={icons('patreon.svg')} size={isMobile ? '80px' : '64px'} />
        <Text
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
        <Center
          width={isMobile ? '94%' : '140px'}
          height="30px"
          borderRadius="4px"
          background="#fff"
          color="#282828"
          fontWeight={500}
          cursor={'pointer'}
          userSelect="none"
          onClick={connectPatreon}
          marginBottom="10px"
        >
          {connecting ? (
            <Spinner size="16px" thickness="2px" theme="light" />
          ) : (
            'Connect Patreon'
          )}
        </Center>
        <Expand />
        <Text
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'400'}
          textAlign="center"
          color={'rgba(255, 255, 255, 0.4)'}
          marginBottom="30px"
        >
          <Text display="inline">
            Note: If you have already connected your Patreon account, please
          </Text>
          <Text
            display="inline"
            color={'#16B8F3'}
            textDecorationLine="underline"
            onClick={connectPatreon}
            cursor="pointer"
          >
            &nbsp;refresh&nbsp;
          </Text>
          <Text display="inline">to proceed to the next step.</Text>
        </Text>
      </Column>
    </Center>
  );
};

export default CreatorNotConnectPage;
