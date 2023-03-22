import { useState } from 'react';

import { icons } from '@/utils/assets';
import { isEmpty, isNotEmpty } from '@/utils/core/is';
import { PatreonLevel } from '@/utils/mock';
import { store, useStore } from '@/utils/store/useStore';

import { Box } from '../core/Box';
import { Center, Column, Expand, Row } from '../core/Flex';
import { Image } from '../core/Image';
import { TextArea } from '../core/Input/TextArea';
import { TextInput } from '../core/Input/TextInput';
import { Spinner } from '../core/Spinner';
import { Stack } from '../core/Stack';
import { Position } from '../core/Stack/position';
import { Text } from '../core/Text';
import { showToast } from './Toast';

const kEditLevelDialogKey = 'kEditLevelDialogKey';
interface EditLevelDialogStates {
  level?: PatreonLevel;
  onSave?: (level: PatreonLevel) => Promise<boolean>;
}

export const openEditLevelDialog = (props: EditLevelDialogStates) => {
  store.set(kEditLevelDialogKey, props);
};

export const EditLevelDialog = () => {
  const [datas, setDatas] =
    useStore<EditLevelDialogStates>(kEditLevelDialogKey);

  const { level, onSave } = datas ?? {};
  const { image = '', name = '', description = '' } = level ?? {};
  const isShow = isNotEmpty(level);

  const close = () => {
    store.set(kEditLevelDialogKey, undefined);
  };

  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (saving || !level) return;
    level.name = level.name.trim();
    level.description = level.description.trim();
    if (isEmpty(level.name)) {
      showToast('Name cannot be empty.');
      return;
    }
    setSaving(true);
    // todo save level info
    const success = await onSave?.(level);
    setSaving(false);
    if (success) {
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
      width="100%"
      height="100%"
      background="rgba(0, 0, 0, 0.7)"
      onClick={close}
    >
      <Column
        alignItems="start"
        width="400px"
        borderRadius="4px"
        background="#282828"
        padding="20px"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Row width="100%" marginBottom="20px">
          <Text fontSize={'20px'} lineHeight="25px" fontWeight={'700'}>
            Tier Info
          </Text>
          <Expand />
          <Image
            src={icons('close.svg')}
            size="12px"
            onClick={close}
            cursor="pointer"
          />
        </Row>
        {subTitle('NFT Image')}
        <Stack marginBottom="20px" cursor="pointer">
          <Image src={image} size="80px" borderRadius="4px" />
          <Position align="bottomRight">
            <Image src={icons('add-image.svg')} size="16px" margin="4px" />
          </Position>
        </Stack>
        {subTitle('Name')}
        <TextInput
          value={name}
          onChange={(s) => {
            setDatas({
              ...datas,
              level: {
                ...datas.level!,
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
          value={description}
          onChange={(s) => {
            setDatas({
              ...datas,
              level: {
                ...datas.level!,
                description: s,
              },
            });
          }}
          marginBottom="20px"
          background="#333"
          height="120px"
        />
        <Center
          color="#000"
          width="100%"
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
    </Center>
  ) : (
    <Box />
  );
};
