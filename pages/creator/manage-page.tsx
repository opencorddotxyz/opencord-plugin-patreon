/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@/components/core/Box';
import { Center, Column, Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { TextInput } from '@/components/core/Input/TextInput';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import { MembershipLevelItem } from '@/components/MembershipLevels/MembershipLevelItem';
import { MembershipLevelsHeader } from '@/components/MembershipLevels/MembershipLevelsHeader';
import { useEditCreatorInfo } from '@/hooks/useEditCreatorInfo';
import { usePatreonInfo } from '@/hooks/usePatreonInfo';
import { mockPatreonDataSets } from '@/net/http/mock';
import { GlobalBgColor, TextColor, TextDP } from '@/styles/constant';
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
  const { data: dataSets, loading } = usePatreonInfo();

  const {
    saving,
    saveCreatorInfo,
    dataSets: patreonInfo,
    avatar,
    setAvatar,
    name,
    setName,
    description,
    setDescription,
  } = useEditCreatorInfo(dataSets);

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
          <TextInput
            value={name}
            onChange={(s) => {
              setName(s);
            }}
            marginBottom="10px"
          />
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
          <TextInput
            value={description}
            onChange={(s) => {
              setDescription(s);
            }}
            marginBottom="10px"
          />
        </Box>
        <Center
          width="100px"
          height="30px"
          borderRadius="4px"
          background="#fff"
          color="#282828"
          fontWeight={500}
          cursor={'pointer'}
          userSelect="none"
          onClick={saveCreatorInfo}
        >
          {saving ? (
            <Spinner size="16px" thickness="2px" theme="light" />
          ) : (
            'Save'
          )}
        </Center>
      </Box>
    </Box>
  );
};

const MembershipLevel = () => {
  const levels = mockPatreonDataSets.levels;

  return (
    <Box marginBottom="30px">
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

      <Column width="100%" alignItems="start">
        <MembershipLevelsHeader />
        {levels.length < 1 ? (
          <Center
            width="100%"
            color="rgba(255, 255, 255, 0.6)"
            fontSize={'12px'}
            lineHeight="15px"
            fontWeight={'500'}
            textAlign="center"
            padding={'20px 30px'}
          >
            <Text>There are no membership levels assigned to roles.</Text>
          </Center>
        ) : (
          levels.map((val) => {
            return <MembershipLevelItem key={val.id} {...val} />;
          })
        )}
      </Column>
    </Box>
  );
};

const OutdateManager = () => {
  const levels = mockPatreonDataSets.outdatedLevels;

  return (
    <Box fontSize="14px" lineHeight="17px" fontWeight="400">
      <Box paddingInline="30px" marginBottom="10px">
        <Text>Remove outdated level-role connections</Text>
      </Box>
      <Box
        paddingInline="30px"
        marginBottom="20px"
        color={hexWithOpacity(TextColor.Dark, TextDP.DP2)}
      >
        <Text>
          None of the roles match your existing Patreon subscription levels. We
          suggest removing these outdated role-level connections as soon as
          possible.
        </Text>
      </Box>
      <Column width="100%" alignItems="start">
        {levels.length < 1 ? (
          <Center
            width="100%"
            color="rgba(255, 255, 255, 0.6)"
            fontSize={'12px'}
            lineHeight="15px"
            fontWeight={'500'}
            textAlign="center"
            padding={'20px 30px'}
          >
            <Text>There are no membership levels assigned to roles.</Text>
          </Center>
        ) : (
          levels.map((val) => {
            return <MembershipLevelItem key={val.id} {...val} />;
          })
        )}
      </Column>
    </Box>
  );
};
