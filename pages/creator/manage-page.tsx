import { Fragment } from 'react';

import { Box } from '@/components/core/Box';
import { Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import {
  CssOpacity,
  GlobalBgColor,
  TextColor,
  TextDP,
} from '@/styles/constant';
import { icons } from '@/utils/assets';
import { hexWithOpacity } from '@/utils/core/format';

export default function ManagePage() {
  return (
    <Box width="100%" padding="30px">
      <Title />
      <ProfileManager />
      <MembershipLevel />
      <OutdateManager />
    </Box>
  );
}

const Title = () => {
  return (
    <Text
      display="inline-block"
      fontSize="24px"
      lineHeight="30px"
      fontWeight="700"
      margin="30px"
      marginTop="0px"
    >
      Patreon Membership NFT Pass
    </Text>
  );
};

const ProfileManager = () => {
  return (
    <Box paddingInline="30px" marginBottom="25px">
      <Text
        display="inline-block"
        fontSize="16px"
        lineHeight="20px"
        fontWeight="700"
        marginBottom="10px"
      >
        Profile
      </Text>
      <Box
        borderRadius="4px"
        padding="20px"
        border={`1px solid ${GlobalBgColor.darkColorBgDP2}`}
      >
        <Box marginBottom="10px">
          <Box
            fontSize="14px"
            lineHeight="18px"
            fontWeight="400"
            marginBottom="10px"
          >
            Avatar
          </Box>
          <Box height="64px" width="64px" border="1px solid">
            <input type="file" />
          </Box>
        </Box>
        <Box marginBottom="10px">
          <Box
            fontSize="14px"
            lineHeight="18px"
            fontWeight="400"
            marginBottom="10px"
          >
            Name
          </Box>
          <input type="text" />
        </Box>
        <Box marginBottom="20px">
          <Box
            fontSize="14px"
            lineHeight="18px"
            fontWeight="400"
            marginBottom="10px"
          >
            Introduction
          </Box>
          <input type="text" />
        </Box>
        <Box>
          <button>save</button>
        </Box>
      </Box>
    </Box>
  );
};

interface RowType {
  NFTImage: string;
  tierName: string;
  introduction: string;
  assignedRoles: string;
}

const MembershipLevel = () => {
  return (
    <Box>
      <Row paddingInline="30px" marginBottom="15px">
        <Text
          display="inline-block"
          alignItems="center"
          fontSize="16px"
          lineHeight="20px"
          fontWeight="700"
        >
          Membership Levels
        </Text>
        <Expand />
        <Row
          fontSize="14px"
          lineHeight="18px"
          fontWeight="500"
          cursor="pointer"
          onClick={() => {
            alert('refresh');
          }}
        >
          <Image src={icons('refresh.svg')} size="18px" marginRight="6px" />
          update
        </Row>
      </Row>

      <Box marginBottom="30px">
        <Row
          paddingInline="30px"
          marginBottom="20px"
          fontSize="12px"
          lineHeight="15px"
          fontWeight="500"
          color={hexWithOpacity(TextColor.Dark, TextDP.DP2)}
        >
          <Box flex="1">NFT Image</Box>
          <Box flex="1">Tier Name</Box>
          <Box flex="3">Introduction</Box>
          <Box flex="1" display="contents" alignContent="end">
            Assigned Roles
          </Box>
        </Row>
        <Box className={'content'}>
          {[
            {
              NFTImage: "zowie's NFTImage",
              tierName: "zowie's tierName",
              introduction: "zowie's introduction",
              assignedRoles: "zowie's assignedRoles",
            } as RowType,
            {
              NFTImage: "zowie's NFTImage1",
              tierName: "zowie's tierName1",
              introduction: "zowie's introduction1",
              assignedRoles: "zowie's assignedRoles1",
            } as RowType,
          ].map((val) => {
            return (
              <Fragment key={val.NFTImage}>
                <Row
                  paddingInline="30px"
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="17px"
                >
                  <Box flex="1">
                    <Image src={icons('bin.svg')} size="72px" />
                  </Box>
                  <Box flex="1" fontWeight="600">
                    {val.tierName}
                  </Box>
                  <Box flex="3">{val.introduction}</Box>
                  <Box flex="1" display="contents" alignContent="end">
                    <Text
                      textDecorationLine="underline"
                      color={hexWithOpacity('#ffffff', TextDP.DP3)}
                    >
                      {val.assignedRoles}
                    </Text>
                    <Image
                      opacity={CssOpacity.Icon}
                      src={icons('rightArrow.svg')}
                      size="18px"
                      marginLeft="10px"
                    />
                  </Box>
                </Row>
                <Box
                  marginTop="10px"
                  height="1px"
                  background={GlobalBgColor.darkColorBgDP2}
                />
              </Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const OutdateManager = () => {
  return (
    <Box>
      <Box paddingInline="30px">
        <Text>Remove outdated level-role connections</Text>
      </Box>
      <Box paddingInline="30px">
        <Text>
          None of the roles match your existing Patreon subscription levels. We
          suggest removing these outdated role-level connections as soon as
          possible.
        </Text>
      </Box>
      <Box className={'content'}>
        {[
          {
            NFTImage: "zowie's NFTImage",
            tierName: "zowie's tierName",
            introduction: "zowie's introduction",
            assignedRoles: "zowie's assignedRoles",
          } as RowType,
          {
            NFTImage: "zowie's NFTImage",
            tierName: "zowie's tierName",
            introduction: "zowie's introduction",
            assignedRoles: "zowie's assignedRoles",
          } as RowType,
        ].map((val) => {
          return (
            <Fragment key={val.NFTImage}>
              <Row>
                <Image src={icons('bin.svg')} size="16px" />
                <Box>{val.NFTImage}</Box>
                <Box>{val.tierName}</Box>
                <Box>{val.introduction}</Box>
                <Box>{val.assignedRoles}</Box>
              </Row>
              <Box
                marginTop="10px"
                height="1px"
                background={GlobalBgColor.darkColorBgDP2}
              />
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
