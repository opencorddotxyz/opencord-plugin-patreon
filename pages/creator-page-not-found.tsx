import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/PageLayout/InfoFrame';
import { placeholders } from '@/utils/assets';

const NotInOCPage: NextPage = () => {
  return (
    <InfoFrame
      title={'Creator Page Not Found'}
      bannerImg={placeholders('error.svg')}
    >
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
        textAlign="center"
      >
        The connected Patreon account does not have a public creator page.
        Please create one and attempt again later.
        <Text />
      </Text>
    </InfoFrame>
  );
};

export default NotInOCPage;
