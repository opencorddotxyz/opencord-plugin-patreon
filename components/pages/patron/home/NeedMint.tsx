/* eslint-disable react/no-array-index-key */
import { Box } from '@/components/core/Box';
import { Center, Column, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { images } from '@/utils/assets';
import { withDefault } from '@/utils/core/base';

export const NeedMint = (props: {
  roles: { name: string; color: string }[];
  nft: { image: string };
  creator: string;
  minting: boolean;
  onMint: () => void;
}) => {
  const { roles, nft, creator, minting, onMint } = props;
  const { isMobile } = useBreakpoint();

  return (
    <>
      <Column
        width="100%"
        maxWidth="840px"
        alignItems="start"
        padding={isMobile ? '0 0 15px 0' : '0 30px 30px 30px'}
      >
        <Row marginBottom="10px">
          <Image size="20px" src={images('need-mint.svg')} marginRight="4px" />
          <Text fontSize={'16px'} lineHeight="20px" fontWeight={'700'}>
            Please mint your {creator} Membership NFT Pass first.
          </Text>
        </Row>
        <Column
          alignItems="start"
          width="100%"
          padding="16px"
          borderRadius="4px"
          border="1px solid #373737"
        >
          <Text
            color="rgba(255, 255, 255, 0.3)"
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            To receive your roles as
          </Text>
          <Row
            flexWrap="wrap"
            gap="10px"
            width="100%"
            justifyContent="start"
            marginBottom="20px"
          >
            {roles.length < 1 ? (
              <Text fontSize="14px" lineHeight="18px" fontWeight="600">
                -
              </Text>
            ) : (
              roles.map((e, idx) => {
                return (
                  <Row
                    key={e.name + idx}
                    padding="6px 10px"
                    background="#373737"
                    borderRadius="4px"
                  >
                    <Box
                      size="12px"
                      borderRadius="50%"
                      background={withDefault(e.color, '#666')}
                      marginRight="6px"
                    />
                    <Text
                      fontSize="14px"
                      lineHeight="18px"
                      fontWeight="600"
                      maxWidth="100px"
                      maxLines={1}
                    >
                      {e.name}
                    </Text>
                  </Row>
                );
              })
            )}
          </Row>
          <Text
            color="rgba(255, 255, 255, 0.3)"
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            Your Membership NFT Pass (preview)
          </Text>
          <Image
            src={nft.image}
            size="120px"
            borderRadius="8px"
            marginBottom="10px"
          />
          <Center
            color="#000"
            width={isMobile ? '100%' : '100px'}
            height="30px"
            borderRadius="4px"
            background="#fff"
            fontWeight={600}
            cursor={'pointer'}
            userSelect="none"
            onClick={onMint}
          >
            {minting ? (
              <Spinner size="16px" thickness="2px" theme="light" />
            ) : (
              'Mint'
            )}
          </Center>
        </Column>
      </Column>
    </>
  );
};
