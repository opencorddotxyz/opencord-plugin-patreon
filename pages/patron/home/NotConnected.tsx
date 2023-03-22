import { Row } from '@/components/core/Flex';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { useConnectPatreon } from '@/hooks/useConnectPatreon';

export const NotConnected = () => {
  const { connecting, connectPatreon } = useConnectPatreon();
  return (
    <>
      <Row
        padding="6px 48px"
        borderRadius="4px"
        background="#fff"
        fontWeight={500}
        cursor={connecting ? 'progress' : 'pointer'}
        userSelect="none"
        onClick={connectPatreon}
        marginBottom="10px"
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
      <Text
        fontSize={'12px'}
        lineHeight="15px"
        fontWeight={'400'}
        textAlign="center"
        color={'rgba(255, 255, 255, 0.3)'}
        marginBottom="30px"
        maxWidth="600px"
      >
        <Text>
          Note: If you have already connected your Patreon account, please
        </Text>
        <Text
          color={'#16B8F3'}
          textDecorationLine="underline"
          onClick={connectPatreon}
          cursor="pointer"
        >
          &nbsp;refresh&nbsp;
        </Text>
        <Text>to proceed to the next step.</Text>
      </Text>
    </>
  );
};
