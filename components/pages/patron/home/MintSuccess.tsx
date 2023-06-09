/* eslint-disable react/no-array-index-key */
import { Box } from '@/components/core/Box';
import { Center, Column, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { images } from '@/utils/assets';
import { withDefault } from '@/utils/core/base';

export const MintSuccess = (props: {
  roles: { name: string; color: string }[];
  nft: { image: string };
  creator: string;
}) => {
  const { roles, nft, creator } = props;
  const { isMobile } = useBreakpoint();

  const mintSuccessTitle = (
    <Row marginBottom="10px">
      <Image size="20px" src={images('mint-success.svg')} marginRight="4px" />
      <Text
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'700'}
        textAlign="center"
      >
        Mint Successfully
      </Text>
    </Row>
  );

  const info = (
    <>
      <Text
        color="rgba(255, 255, 255, 0.3)"
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'400'}
        marginBottom="10px"
      >
        Your membership roles in this server
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
                  background={withDefault(`#${e.color}`, '#666')}
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
        Your Membership NFT Pass
      </Text>
      <Image
        src={nft.image}
        size={isMobile ? '60px' : '120px'}
        borderRadius="8px"
      />
    </>
  );

  return (
    <>
      <Column
        width="100%"
        maxWidth="840px"
        alignItems="start"
        padding={isMobile ? '0 0 15px 0' : '0 30px 30px 30px'}
      >
        {!isMobile && mintSuccessTitle}
        <Column
          alignItems="start"
          width="100%"
          padding="16px"
          borderRadius="4px"
          border="1px solid #373737"
        >
          <Center width="100%">{isMobile && mintSuccessTitle}</Center>

          <Text
            color={
              isMobile ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 1)'
            }
            textAlign={isMobile ? 'center' : 'start'}
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            {isMobile
              ? `Congratulations, your ${creator} Membership NFT Pass has been successfully minted!`
              : `Congratulations! Your ${creator} Membership NFT Pass has been
            successfully minted, and you have been granted the following roles:`}
          </Text>
          {!isMobile && info}
        </Column>
        {isMobile && info}
      </Column>
    </>
  );
};
