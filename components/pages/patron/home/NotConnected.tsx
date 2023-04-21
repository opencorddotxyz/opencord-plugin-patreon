import { Center } from '@/components/core/Flex';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { useConnectPatreon } from '@/hooks/useConnectPatreon';

export const NotConnected = () => {
  const { connecting, connectPatreon } = useConnectPatreon();
  const { isMobile } = useBreakpoint();

  return (
    <>
      <Center
        color="#000"
        width={isMobile ? '100%' : '140px'}
        height="30px"
        borderRadius="4px"
        background="#fff"
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
      <Text
        fontSize={'12px'}
        lineHeight="15px"
        fontWeight={'400'}
        textAlign="center"
        color={'rgba(255, 255, 255, 0.3)'}
        marginBottom="30px"
        maxWidth="600px"
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
    </>
  );
};
