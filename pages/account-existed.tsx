import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/PageLayout/InfoFrame';
import { placeholders } from '@/utils/assets';

const NotInOCPage: NextPage = () => {
  return (
    <InfoFrame title={'Connect Failed'} bannerImg={placeholders('error.svg')}>
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
        textAlign="center"
      >
        This Patreon account has already been linked to another Opencord
        account.
        <Text />
      </Text>
    </InfoFrame>
  );
};

export default NotInOCPage;
