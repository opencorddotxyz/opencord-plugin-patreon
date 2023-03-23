import { Center, Column } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { images } from '@/utils/assets';

const NotSetupPage = () => {
  return (
    <Center width="100%" height="100vh">
      <Column>
        <Image src={images('not-setup.svg')} width="260px" height="160px" />
        <Text
          fontSize={'32px'}
          lineHeight="40px"
          fontWeight={'700'}
          textAlign="center"
          margin={'30px 0 10px 0'}
        >
          Channel Setup In Progress
        </Text>
        <Text
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'400'}
          textAlign="center"
          color={'rgba(255, 255, 255, 0.4)'}
        >
          Once the setup is complete, you will be able to claim your Membership
          NFT Pass here.
        </Text>
      </Column>
    </Center>
  );
};

export default NotSetupPage;
