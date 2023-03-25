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
import { useHomeStates } from '@/hooks/useAPP';
import { useTempHomeStates } from '@/hooks/useTempHomeStates';
import { isNotEqual } from '@/utils/core/diff';

const CreatorManagerPage = () => {
  const { homeStates: currentHomeStates, refreshHomeStates } = useHomeStates();

  const {
    saving,
    saveCreatorInfo,
    syncing,
    syncPatreonLevels,
    saveLevelInfo,
    deleteOutdatedLevel,
    homeStates,
    avatar,
    setAvatar,
    name,
    setName,
    description,
    setDescription,
  } = useTempHomeStates(refreshHomeStates, currentHomeStates);

  const levels = homeStates?.membershipLevels ?? [];
  const levelsOutdated = homeStates?.outdatedMembershipLevels ?? [];

  const _body = (
    <>
      <Column
        width="100%"
        maxWidth="840px"
        alignItems="start"
        padding="0 30px 30px 30px"
      >
        <Text
          fontSize={'24px'}
          lineHeight="30px"
          fontWeight={'700'}
          textAlign="center"
          marginBottom="30px"
        >
          Patreon Membership NFT Pass
        </Text>
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
          <Text
            color="rgba(255, 255, 255,1)"
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            Avatar
          </Text>
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
            <Image
              src={avatar}
              size="64px"
              borderRadius={'50%'}
              marginBottom="10px"
            />
          </ImagePicker>
          <Text
            color="rgba(255, 255, 255,1)"
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
            color="rgba(255, 255, 255,1)"
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
            width="100px"
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
    <Column width="100%" padding="30px">
      <EditLevelDialog />
      {_body}
      {_membershipLevels}
      {_membershipLevelsOutdated}
    </Column>
  );
};

export default CreatorManagerPage;
