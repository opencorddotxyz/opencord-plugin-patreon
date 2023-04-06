import { NextPage } from 'next';

import { Text } from '@/components/core/Text';
import { ErrorPageFrame } from '@/components/errorPageFrame';

const StarkRequired: NextPage = () => {
  return (
    <ErrorPageFrame title={'Stark Key Required'}>
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize="16px"
        fontWeight="400"
        lineHeight="20px"
      >
        Please setup your Stark Key before using the plugin.{' '}
        <a style={{ textDecoration: 'none' }} href="" target="_blank">
          Learn more
        </a>
      </Text>
    </ErrorPageFrame>
  );
};

export default StarkRequired;
