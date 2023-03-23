import { Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { TextColor, TextDP } from '@/styles/constant';
import { icons } from '@/utils/assets';
import { hexWithOpacity } from '@/utils/core/format';

import { Box } from '../core/Box';

export const MembershipLevelsHeader = () => {
  return (
    <>
      <Text
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

export const MembershipLevelsHeaderEditable = (props: {
  refresh: () => void;
  refreshing: boolean;
}) => {
  const { refresh, refreshing } = props;
  return (
    <>
      <Row width="100%" padding={'0 30px 20px 30px'} onClick={refresh}>
        <Text
          fontSize={'16px'}
          lineHeight="20px"
          fontWeight={'700'}
          textAlign="center"
        >
          Membership Levels
        </Text>
        <Expand />
        <Row
          fontSize={'14px'}
          lineHeight="18px"
          fontWeight={'500'}
          userSelect="none"
          textDecorationLine="underline"
          cursor="pointer"
        >
          <Image
            src={icons('refresh.svg')}
            size="18px"
            animation={refreshing ? 'spin 1s linear infinite' : 'none'}
          />
          <Box width="6px" />
          Update
        </Row>
      </Row>
      <Row
        width="100%"
        color="rgba(255, 255, 255, 0.6)"
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
            <Text>Assgined Role</Text>
          </Row>
        </Expand>
      </Row>
    </>
  );
};

export const MembershipLevelsOutdatedHeader = () => {
  return (
    <>
      <Text
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'400'}
        textAlign="center"
        padding={'0 30px 10px 30px'}
      >
        Remove outdated level-role connections
      </Text>
      <Text
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'400'}
        padding={'0 30px 10px 30px'}
        color="rgba(255, 255, 255, 0.6)"
      >
        None of the roles match your existing Patreon subscription levels. We
        suggest removing these outdated role-level connections as soon as
        possible.
      </Text>
    </>
  );
};
