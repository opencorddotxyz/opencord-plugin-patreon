import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/InfoFrame';
import { placeholders } from '@/utils/assets';

const NotInOCPage: NextPage = () => {
  return (
    <InfoFrame title={'Runtime Error'} bannerImg={placeholders('error.svg')}>
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
      >
        <Text textAlign="center">
          In order to ensure the best performance and experience, please use
          this plugin within{' '}
          <a href="https://www.opencord.xyz" target="_blank">
            Opencord
          </a>
          .
        </Text>

        <Text />
      </Text>
    </InfoFrame>
  );
};

export default NotInOCPage;
