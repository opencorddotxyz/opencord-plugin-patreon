import { Box } from '@/components/core/Box';
import { Center, Column } from '@/components/core/Flex';
import { Image, loadLocalImageWithHash } from '@/components/core/Image';
import { TextInput } from '@/components/core/Input/TextInput';
import { Spinner } from '@/components/core/Spinner';
import { Text } from '@/components/core/Text';
import {
  EditLevelDialog,
  openEditLevelDialog,
} from '@/components/Dialogs/EditLevelDialog';
import { ImagePicker } from '@/components/ImagePicker';
import { MembershipLevelItemEditable } from '@/components/MembershipLevels/MembershipLevelItem';
import {
  MembershipLevelsHeaderEditable,
  MembershipLevelsOutdatedHeader,
} from '@/components/MembershipLevels/MembershipLevelsHeader';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { useHomeStates } from '@/hooks/useAPP';
import { useTempHomeStates } from '@/hooks/useTempHomeStates';
import { icons } from '@/utils/assets';
import { isNotEqual } from '@/utils/core/diff';

const CreatorManagerPage = () => {
  const { isMobile } = useBreakpoint();
  const { homeStates: currentHomeStates } = useHomeStates();

  const {
    saving,
    saveCreatorInfo,
    syncing,
    syncPatreonLevels,
    saveLevelInfo,
    saveLevelRoles,
    deleteOutdatedLevel,
    homeStates,
    avatar,
    setAvatar,
    name,
    setName,
    description,
    setDescription,
  } = useTempHomeStates(currentHomeStates);

  const levels = homeStates?.membershipLevels ?? [];
  const levelsOutdated = homeStates?.outdatedMembershipLevels ?? [];

  const _body = (
    <>
      <Column
        width="100%"
        maxWidth="840px"
        alignItems="start"
        padding={isMobile ? '0 0 15px 0' : '0 30px 30px 30px'}
      >
        {!isMobile && (
          <Text
            fontSize={'24px'}
            lineHeight="30px"
            fontWeight={'700'}
            textAlign="center"
            marginBottom="30px"
          >
            Patreon Membership NFT Pass
          </Text>
        )}
        <Text
          fontSize={'16px'}
          lineHeight="20px"
          fontWeight={'700'}
          textAlign="center"
          marginBottom="10px"
        >
          Profile
        </Text>
        <Column
          alignItems="start"
          width="100%"
          padding="20px"
          borderRadius="4px"
          border="1px solid #373737"
        >
          {!isMobile && (
            <Text
              color="rgba(255, 255, 255,1)"
              fontSize={'14px'}
              lineHeight="18px"
              fontWeight={'400'}
              marginBottom="10px"
            >
              Avatar
            </Text>
          )}
          <Center width={isMobile ? '100%' : ''}>
            <ImagePicker
              onSelect={async (files) => {
                const file = files[0];
                if (file) {
                  const result = await loadLocalImageWithHash(file);
                  if (result) {
                    setAvatar(result.url);
                  }
                }
              }}
            >
              <Box position="relative">
                <Image
                  src={avatar}
                  size={isMobile ? '80px' : '64px'}
                  borderRadius={'50%'}
                  marginBottom="10px"
                />
                {isMobile && (
                  <Image
                    src={icons('edit-mobile.svg')}
                    size="18px"
                    position="absolute"
                    right="0"
                    bottom="0"
                  />
                )}
              </Box>
            </ImagePicker>
          </Center>
          <Text
            color={
              isMobile ? 'rgba(255, 255, 255,0.3)' : 'rgba(255, 255, 255,1)'
            }
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            Name
          </Text>
          <TextInput
            value={name}
            onChange={(s) => {
              setName(s);
            }}
            hint="Please enter..."
            marginBottom="10px"
          />
          <Text
            color={
              isMobile ? 'rgba(255, 255, 255,0.3)' : 'rgba(255, 255, 255,1)'
            }
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            Introduction
          </Text>
          <TextInput
            value={description}
            onChange={(s) => {
              setDescription(s);
            }}
            hint="Please enter..."
            marginBottom="20px"
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
            onClick={saveCreatorInfo}
          >
            {saving ? (
              <Spinner size="16px" thickness="2px" theme="light" />
            ) : (
              'Save'
            )}
          </Center>
        </Column>
      </Column>
    </>
  );

  const _membershipLevels = (
    <Column
      width="100%"
      maxWidth="840px"
      alignItems="start"
      marginBottom="30px"
    >
      <MembershipLevelsHeaderEditable
        refresh={syncPatreonLevels}
        refreshing={syncing}
      />
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
        levels.map((level) => {
          return (
            <MembershipLevelItemEditable
              key={level.id}
              level={level}
              saveLevelRoles={saveLevelRoles}
              onEditLevel={() => {
                openEditLevelDialog({
                  level: level,
                  onSave: async (newLevel) => {
                    if (isNotEqual(level, newLevel)) {
                      return await saveLevelInfo(newLevel);
                    }

                    return true;
                  },
                });
              }}
            />
          );
        })
      )}
    </Column>
  );

  const _membershipLevelsOutdated =
    levelsOutdated.length < 1 ? (
      <Box />
    ) : (
      <Column
        width="100%"
        maxWidth="840px"
        alignItems="start"
        marginBottom="30px"
      >
        <MembershipLevelsOutdatedHeader />
        {levelsOutdated.map((level) => {
          return (
            <MembershipLevelItemEditable
              isDelete
              key={level.id}
              level={level}
              saveLevelRoles={saveLevelRoles}
              onDeleteLevel={() => {
                deleteOutdatedLevel(level);
              }}
            />
          );
        })}
      </Column>
    );

  return !homeStates ? (
    <Center width="100%" height="100vh">
      <Spinner theme="dark" />
    </Center>
  ) : (
    <Column width="100%" padding={isMobile ? '15px' : '30px'}>
      <EditLevelDialog />
      {_body}
      {_membershipLevels}
      {_membershipLevelsOutdated}
    </Column>
  );
};

export default CreatorManagerPage;
