import { Center, Column, Row } from '@/components/Flex';
import { Image } from '@/components/Image';
import { Spinner } from '@/components/Spinner';
import { Text } from '@/components/Text';

import { useConnectPatreon } from './hooks/useConnectPatreon';
import { usePatreonInfo } from './hooks/usePatreonInfo';

const PatronNotConnectPage = () => {
  const { datas: patreonInfo, loading } = usePatreonInfo();
  const { connecting, connectPatreon } = useConnectPatreon();

  const name = patreonInfo?.creator?.name ?? 'Unknown';

  const _header = (
    <>
      <Image src={patreonInfo?.creator.image} size="72px" />
      <Text
        color="#fff"
        fontSize={'24px'}
        lineHeight="30px"
        fontWeight={'700'}
        textAlign="center"
        margin={'20px 0'}
      >
        {name}
      </Text>
      <Text
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'400'}
        textAlign="center"
        color={'rgba(255, 255, 255, 0.8)'}
        marginBottom="20px"
      >
        As a {name} patron, you can connect your Patreon account to
        automatically receive roles based on your membership level and claim
        your Membership NFT Pass.
      </Text>
    </>
  );

  const _connectPatreon = (
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
    </>
  );

  return loading ? (
    <Center width="100%" height="100vh">
      <Spinner theme="dark" />
    </Center>
  ) : (
    <Column width="100%" padding="30px">
      {_header}
      {_connectPatreon}
    </Column>
  );
};

export default PatronNotConnectPage;
