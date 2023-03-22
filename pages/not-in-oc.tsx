import { NextPage } from 'next';

import { Center, Column } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { images, placeholders } from '@/utils/assets';

const NotInOCPage: NextPage = () => {
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
          maxWidth="550px"
          borderRadius="12px"
          background="#333333"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.15)"
          padding="30px 40px 60px 40px"
        >
          <Image
            src={placeholders('error.svg')}
            width="260px"
            height="160px"
            marginBottom="10px"
          />
          <Text
            fontSize={'32px'}
            lineHeight="40px"
            fontWeight={'700'}
            margin={'10px'}
          >
            Runtime Error
          </Text>
          <Text
            color="rgba(255, 255, 255, 0.6)"
            fontSize={'16px'}
            lineHeight="20px"
            fontWeight={'400'}
          >
            <Text display="inline">
              In order to ensure the best performance and experience, please use
              this plugin within{' '}
            </Text>
            <Text
              display="inline"
              color={'#16B8F3'}
              textDecorationLine="underline"
              onClick={() => {
                window.open('https://www.opencord.xyz', '_blank');
              }}
              cursor="pointer"
            >
              Opencord
            </Text>
            <Text>.</Text>
          </Text>
        </Column>
      </Center>
    </Center>
  );
};

export default NotInOCPage;
