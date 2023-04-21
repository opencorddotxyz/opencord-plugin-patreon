import { Text } from '@/components/core/Text';
import { ErrorPageFrame } from '@/components/PageLayout/ErrorPageFrame';

const NotSetupPage = () => {
  return (
    <ErrorPageFrame title={'Channel Setup In Progress'}>
      <Text textAlign="center">
        Once the setup is complete, you will be able to claim your Membership
        NFT Pass here.
      </Text>
    </ErrorPageFrame>
  );
};

export default NotSetupPage;
