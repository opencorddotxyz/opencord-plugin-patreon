import { Expand, Row } from '@/components/core/Flex';
import { Text } from '@/components/core/Text';
import { TextColor, TextDP } from '@/styles/constant';
import { hexWithOpacity } from '@/utils/core/format';

export const MembershipLevelsHeader = () => {
  return (
    <>
      <Text
        color="#ffffff"
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'700'}
        textAlign="center"
        padding={'0 30px 20px 30px'}
      >
        Membership Levels
      </Text>
      <Row
        width="100%"
        color={hexWithOpacity(TextColor.Dark, TextDP.DP2)}
        fontSize={'12px'}
        lineHeight="15px"
        fontWeight={'500'}
        textAlign="center"
        padding={'10px 30px'}
      >
        <Row width={72 + 40}>
          <Text>NFT Image</Text>
        </Row>
        <Expand>
          <Text>Level Name</Text>
        </Expand>
        <Expand flex={2}>
          <Text>Introduction</Text>
        </Expand>
        <Expand>
          <Row width="100%" justifyContent="end">
            <Text>Assigned Role</Text>
          </Row>
        </Expand>
      </Row>
    </>
  );
};
