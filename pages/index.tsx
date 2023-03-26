import { NextPage } from 'next';

import { Center } from '@/components/core/Flex';
import { Spinner } from '@/components/core/Spinner';

const IndexPage: NextPage = () => {
  return (
    <Center width="100%" height="100vh">
      <Spinner theme="dark" />
    </Center>
  );
};

export default IndexPage;
