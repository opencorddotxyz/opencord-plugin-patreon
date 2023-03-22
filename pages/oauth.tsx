import { NextPage } from 'next';
import { useEffect } from 'react';

import { Center, Column } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { useRouterQuery } from '@/hooks/core/useRouterQuery';
import { icons, images } from '@/utils/assets';
import { setLocal } from '@/utils/store';

const OAuthPage: NextPage = () => {
  const { code, state } = useRouterQuery(['code', 'state']);
  useEffect(() => {
    if (code) {
      setLocal('code', code);
    }
  }, [code, state]);

  return (
    <Center
      width="100%"
      height="100vh"
      transform="rotate(180deg)"
      backgroundRepeat="no-repeat"
      backgroundImage={`url("${images('bg-logo.svg')}")`}
      backgroundPosition="100% 100%"
      backgroundSize="625px 528px"
    >
      <Center
        width="100%"
        height="100vh"
        transform="rotate(180deg)"
        backgroundRepeat="no-repeat"
        backgroundImage={`url("${images('bg-logo.svg')}")`}
        backgroundPosition="100% 100%"
        backgroundSize="625px 528px"
      >
        <Column
          width="551px"
          height="272px"
          borderRadius="12px"
          background="#333333"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.15)"
          paddingTop="60px"
        >
          <Image src={icons('ok.svg')} size="72px" />
          <Text
            color="#fff"
            fontSize={'32px'}
            lineHeight="40px"
            fontWeight={'700'}
            margin={'10px'}
          >
            Connected
          </Text>
          <Text
            fontSize={'16px'}
            lineHeight="20px"
            fontWeight={'400'}
            color={'rgba(255, 255, 255, 0.6)'}
          >
            You can now close this window and return to Opencord to continue.
          </Text>
        </Column>
      </Center>
    </Center>
  );
};

export default OAuthPage;
