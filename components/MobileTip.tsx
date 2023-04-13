import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { images } from '@/utils/assets';

import { Center, Column } from './core/Flex';

export default function MobileVisitTip() {
  return (
    <Center width="100%" height="100vh">
      <Column>
        <Image
          src={images('open-on-pc.svg')}
          width="260px"
          height="160px"
          marginBottom="10px"
        />
      </Column>
      <Column>
        <Text
          color="rgba(255, 255, 255, 0.6)"
          fontSize={'16px'}
          lineHeight="20px"
          fontWeight={'400'}
          textAlign="center"
        >
          Please visit this channel on your desktop
        </Text>
      </Column>
    </Center>
  );
}
