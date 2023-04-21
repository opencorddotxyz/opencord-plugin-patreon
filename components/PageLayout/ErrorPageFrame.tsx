import { ReactNode } from 'react';

import { Center, Column, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { images } from '@/utils/assets';

export const ErrorPageFrame = (props: {
  title: string;
  loading?: boolean;
  bannerImg?: string;
  children: ReactNode;
}) => {
  const { isMobile } = useBreakpoint();
  const { title, loading = false, bannerImg = 'not-setup.svg' } = props;

  return (
    <Center
      width="100%"
      height="100vh"
      marginTop={isMobile ? '-30%' : ''}
      backgroundSize="625px 528px"
      backgroundRepeat="no-repeat"
    >
      <Column
        borderRadius="12px"
        padding={isMobile ? '0 15px' : '30px 40px 60px 40px'}
      >
        {loading ? (
          <Center width="260px" height="160px">
            <Spinner size="60px" thickness="6px" />
          </Center>
        ) : (
          <Image
            src={images(bannerImg)}
            width="260px"
            height="160px"
            marginBottom="10px"
          />
        )}
        <Text
          fontSize={isMobile ? '18px' : '32px'}
          lineHeight={isMobile ? '22px' : '40px'}
          fontWeight={isMobile ? '600' : '700'}
          color={isMobile ? '#999999' : '#ffffff'}
          margin={'10px'}
        >
          {title}
        </Text>
        <Row
          fontSize={isMobile ? '13px' : '14px'}
          lineHeight={isMobile ? '16px' : '18px'}
          fontWeight={'400'}
          color={isMobile ? '#777777' : 'rgba(255, 255, 255, 0.4)'}
        >
          {props.children}
        </Row>
      </Column>
    </Center>
  );
};
