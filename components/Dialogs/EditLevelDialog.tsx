import { useState } from 'react';

import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { MembershipLevel, Role } from '@/net/http/patreonComponents';
import { CssOpacity } from '@/styles/constant';
import { icons } from '@/utils/assets';
import { withDefault } from '@/utils/core/base';
import { hexWithOpacity } from '@/utils/core/format';
import { isEmpty, isNotEmpty } from '@/utils/core/is';
import { store, useStore } from '@/utils/store/useStore';

import { Box } from '../core/Box';
import { Center, Column, Expand, Row } from '../core/Flex';
import { Image, loadLocalImageWithHash } from '../core/Image';
import { TextArea } from '../core/Input/TextArea';
import { TextInput } from '../core/Input/TextInput';
import { Spinner } from '../core/Spinner';
import { Stack } from '../core/Stack';
import { Position } from '../core/Stack/position';
import { Text } from '../core/Text';
import { ImagePicker } from '../ImagePicker';
import { MenuButton } from '../MenuButton';
import {
  MobileSelectRolesMenu,
  SaveLevelRolesCallback,
  showSelectRolesMenu,
} from './SelectRoles';
import { showToast } from './Toast';

const kEditLevelDialogKey = 'kEditLevelDialogKey';
interface EditLevelDialogStates {
  saveLevelRoles?: SaveLevelRolesCallback;
  level?: MembershipLevel;
  onSave?: (level: MembershipLevel) => Promise<boolean>;
}

export const openEditLevelDialog = (props: EditLevelDialogStates) => {
  store.set(kEditLevelDialogKey, props);
};

export const EditLevelDialog = () => {
  const { isMobile } = useBreakpoint();
  const [dataSets, setDataSets] =
    useStore<EditLevelDialogStates>(kEditLevelDialogKey);

  const { level, onSave } = dataSets ?? {};
  const { image, name, intro, roles = [], id = '' } = level ?? {};
  const selectedRole = roles.find((e) => e);
  const { name: roleName, color: roleColor } = selectedRole ?? {};
  const isShow = isNotEmpty(level);

  const close = () => {
    store.set(kEditLevelDialogKey, undefined);
  };

  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (saving || !level) return;
    level.name = level.name.trim();
    level.intro = level.intro.trim();
    if (isEmpty(level.name)) {
      showToast('Name cannot be empty.');

      return;
    }
    setSaving(true);
    const success = await onSave?.(level);
    setSaving(false);
    if (success) {
      showToast('Save Successful');
      close();
    }
  };

  const subTitle = (text: string) => (
    <Text
      fontSize={'14px'}
      lineHeight="18px"
      fontWeight={'400'}
      opacity="0.5"
      marginBottom="10px"
    >
      {text}
    </Text>
  );

  return isShow ? (
    <Center
      position="fixed"
      top="0"
      left="0"
      zIndex="2"
      width="100%"
      height="100%"
      background="rgba(0, 0, 0, 0.7)"
    >
      <Column
        alignItems="start"
        width={isMobile ? '100vw' : '400px'}
        height={isMobile ? '100vh' : ''}
        borderRadius="4px"
        background="#282828"
      >
        <Row
          width="100%"
          padding={isMobile ? '15px' : '20px'}
          borderBlock={
            isMobile
              ? `1px solid ${hexWithOpacity('#ffffff', CssOpacity.IconBlur)}`
              : ''
          }
        >
          {isMobile && (
            <Image
              src={icons('left-arrow.svg')}
              opacity={CssOpacity.Icon}
              height="18px"
              width="30px"
              paddingRight="12px"
              onClick={close}
              cursor="pointer"
            />
          )}
          <Text
            fontSize={'20px'}
            lineHeight="25px"
            fontWeight={'700'}
            onClick={() => {
              isMobile && close();
            }}
          >
            Tier Info
          </Text>
          <Expand />
          {!isMobile && (
            <Image
              src={icons('close.svg')}
              size="12px"
              onClick={close}
              cursor="pointer"
            />
          )}
        </Row>
        <Column alignItems="start" width={'100%'} padding="20px">
          {!isMobile && subTitle('NFT Image')}
          <Center width={isMobile ? '100%' : ''}>
            <ImagePicker
              onSelect={async (files) => {
                const file = files[0];
                if (file) {
                  const result = await loadLocalImageWithHash(file);
                  if (result) {
                    setDataSets({
                      ...dataSets,
                      level: {
                        ...dataSets!.level!,
                        image: result.url,
                      },
                    });
                  }
                }
              }}
            >
              <Stack marginBottom="20px" cursor="pointer">
                <Image src={image} size="80px" borderRadius="4px" />
                <Position align="bottomRight" pointerEvents="none">
                  <Image
                    src={icons(isMobile ? 'edit-mobile.svg' : 'add-image.svg')}
                    size={isMobile ? '18px' : '16px'}
                    margin={isMobile ? '' : '4px'}
                  />
                </Position>
              </Stack>
            </ImagePicker>
          </Center>
          {subTitle(isMobile ? 'Tier Name' : 'Name')}
          <TextInput
            value={name}
            onChange={(s) => {
              setDataSets({
                ...dataSets,
                level: {
                  ...dataSets!.level!,
                  name: s,
                },
              });
            }}
            marginBottom="20px"
            background="#333"
            border="none"
          />
          {subTitle(' Introduction')}
          <TextArea
            value={intro}
            onChange={(s) => {
              setDataSets({
                ...dataSets,
                level: {
                  ...dataSets!.level!,
                  intro: s,
                },
              });
            }}
            marginBottom="20px"
            background="#333"
            height="120px"
          />

          {isMobile && level && (
            <>
              {subTitle(' Assigned Role')}
              <MenuButton
                height="45px"
                width="100%"
                id={id}
                alignItems="center"
                display="flex"
                menuWidth={240}
                menu={<MobileSelectRolesMenu id={id} level={level} />}
                onShow={async () => {
                  return await showSelectRolesMenu(
                    level,
                    selectedRole ? [selectedRole] : [],
                    (level: MembershipLevel, roles: Role[]) => {
                      // todo: single select currently, perhaps change to multiple step further
                      dataSets?.saveLevelRoles &&
                        dataSets?.saveLevelRoles(level, roles);

                      return setDataSets({
                        ...dataSets,
                        level: { ...level, roles },
                      });
                    },
                  );
                }}
              >
                {selectedRole && (
                  <Box
                    size="12px"
                    minWidth="12px"
                    borderRadius="50%"
                    background={withDefault(`#${roleColor}`, '#666')}
                    marginRight="4px"
                  />
                )}

                {selectedRole ? (
                  <Text
                    maxLines={1}
                    textAlign="end"
                    color={'rgba(255, 255, 255, 1)'}
                  >
                    @{roleName}
                  </Text>
                ) : (
                  <Text userSelect="none">None</Text>
                )}

                <Expand />

                <Image
                  src={icons('right-arrow.svg')}
                  size="18px"
                  marginLeft="10px"
                  opacity={CssOpacity.Icon}
                />
              </MenuButton>
            </>
          )}
          <Center
            color="#000"
            width="100%"
            marginTop={'18px'}
            height="30px"
            borderRadius="4px"
            background="#fff"
            fontWeight={600}
            cursor={'pointer'}
            userSelect="none"
            onClick={save}
          >
            {saving ? (
              <Spinner size="16px" thickness="2px" theme="light" />
            ) : (
              'Save'
            )}
          </Center>
        </Column>
      </Column>
    </Center>
  ) : (
    <Box />
  );
};
