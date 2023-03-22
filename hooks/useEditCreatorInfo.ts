import { useState } from 'react';

import { PatreonInfo } from '@/utils/mock';
import { store, useInit, useStore } from '@/utils/store/useStore';

export const useEditCreatorInfo = (datas?: PatreonInfo) => {
  const kCreatorInfoKey = 'kCreatorInfoKey';
  const getCreatorInfo = () => store.get<PatreonInfo>(kCreatorInfoKey);
  const setCreatorInfo = (
    callback: (current?: PatreonInfo) => Partial<PatreonInfo>,
  ) => {
    const current = getCreatorInfo();
    store.set(kCreatorInfoKey, {
      ...current,
      ...callback(current),
    });
  };

  // init creator states
  useInit(() => {
    if (datas && !getCreatorInfo()) {
      setCreatorInfo(() => datas);
    }
  }, [datas]);

  // listen to datas changes
  const [info] = useStore(kCreatorInfoKey);

  const [saving, setSaving] = useState(false);
  const saveCreatorInfo = async () => {
    if (saving) return;
    setSaving(true);
    // todo saveCreatorInfo
    setSaving(false);
  };

  return {
    saving,
    saveCreatorInfo,
    datas: info,
    avatar: info?.creator?.image,
    setAvatar: (avatar: string) => {
      setCreatorInfo((datas) => {
        if (!datas) return {};
        return {
          creator: {
            ...datas.creator,
            image: avatar,
          },
        };
      });
    },
    name: info?.creator?.name,
    setName: (text: string) => {
      setCreatorInfo((datas) => {
        if (!datas) return {};
        return {
          creator: {
            ...datas.creator,
            name: text,
          },
        };
      });
    },
    description: info?.creator?.description,
    setDescription: (text: string) => {
      setCreatorInfo((datas) => {
        if (!datas) return {};
        return {
          creator: {
            ...datas.creator,
            description: text,
          },
        };
      });
    },
  };
};
