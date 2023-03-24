import { ReactNode } from 'react';

import { Center, Column, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { images } from '@/utils/assets';

export const InfoFrame = (props: {
  title: string;
  bannerImg: string;
  children: ReactNode;
}) => {
  const { title, bannerImg } = props;

  return (
    <Center
      width="100%"
      height="100vh"
      transform="rotate(180deg)"
      backgroundRepeat="no-repeat"
      backgroundImage={`url("${images('bg-logo.svg')}")`}
      backgroundPosition="100% 100%"
      backgroundSize="625px 528px"
    >
      <Center
        width="100%"
        height="100vh"
        transform="rotate(180deg)"
        backgroundRepeat="no-repeat"
        backgroundImage={`url("${images('bg-logo.svg')}")`}
        backgroundPosition="100% 100%"
        backgroundSize="625px 528px"
      >
        <Column
          maxWidth="550px"
          borderRadius="12px"
          background="#333333"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.15)"
          padding="30px 40px 60px 40px"
        >
          <Image
            src={bannerImg}
            width="260px"
            height="160px"
            marginBottom="10px"
          />
          <Text
            fontSize={'32px'}
            lineHeight="40px"
            fontWeight={'700'}
            margin={'10px'}
          >
            {title}
          </Text>
          <Row>{props.children}</Row>
        </Column>
      </Center>
    </Center>
  );
};
