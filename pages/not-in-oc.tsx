import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/InfoFrame';
import { placeholders } from '@/utils/assets';
import { openNewTab } from '@/utils/location';

const NotInOCPage = () => {
  return (
    <InfoFrame title={'Runtime Error'} bannerImg={placeholders('error.svg')}>
      <Text
        color="rgba(255, 255, 255, 0.6)"
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
      >
        <Text display="inline" alignContent="center">
          In order to ensure the best performance and experience, please use
          this plugin within{' '}
        </Text>
        <Text
          display="inline"
          color={'#16B8F3'}
          textDecorationLine="underline"
          onClick={() => {
            openNewTab('https://www.opencord.xyz');
          }}
          cursor="pointer"
        >
          Opencord
        </Text>
        <Text>.</Text>
      </Text>
    </InfoFrame>
  );
};

export default NotInOCPage;
