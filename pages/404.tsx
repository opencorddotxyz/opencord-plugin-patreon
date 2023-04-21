import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/PageLayout/InfoFrame';
import { placeholders } from '@/utils/assets';

const ErrorPage: NextPage = () => {
  return (
    <InfoFrame title={'Error'} bannerImg={placeholders('error.svg')}>
      <Text
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
        color={'rgba(255, 255, 255, 0.6)'}
      >
        Something went wrong, please try again later.
      </Text>
    </InfoFrame>
  );
};

export default ErrorPage;
