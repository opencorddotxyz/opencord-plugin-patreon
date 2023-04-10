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
  children: ReactNode;
}) => {
  const { isMobile } = useBreakpoint();
  const { title, loading = false } = props;

  return (
    <Center
      width="100%"
      height="100vh"
      marginTop={isMobile ? '-30%' : ''}
      backgroundSize="625px 528px"
      backgroundRepeat="no-repeat"
    >
      <Column borderRadius="12px" padding="30px 40px 60px 40px">
        {loading ? (
          <Center width="260px" height="160px">
            <Spinner size="60px" thickness="6px" />
          </Center>
        ) : (
          <Image
            src={images('not-setup.svg')}
            width="260px"
            height="160px"
            marginBottom="10px"
          />
        )}
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
  );
};
