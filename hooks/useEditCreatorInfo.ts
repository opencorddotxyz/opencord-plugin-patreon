import { useState } from 'react';

import { PatreonInfo } from '@/net/http/mock';
import { store, useInit, useStore } from '@/utils/store/useStore';

export const useEditCreatorInfo = (dataSets?: PatreonInfo) => {
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
    if (dataSets && !getCreatorInfo()) {
      setCreatorInfo(() => dataSets);
    }
  }, [dataSets]);

  // listen to dataSets changes
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
    dataSets: info,
    avatar: info?.creator?.image,
    setAvatar: (avatar: string) => {
      setCreatorInfo((dataSets) => {
        if (!dataSets) return {};
        return {
          creator: {
            ...dataSets.creator,
            image: avatar,
          },
        };
      });
    },
    name: info?.creator?.name,
    setName: (text: string) => {
      setCreatorInfo((dataSets) => {
        if (!dataSets) return {};
        return {
          creator: {
            ...dataSets.creator,
            name: text,
          },
        };
      });
    },
    description: info?.creator?.description,
    setDescription: (text: string) => {
      setCreatorInfo((dataSets) => {
        if (!dataSets) return {};
        return {
          creator: {
            ...dataSets.creator,
            description: text,
          },
        };
      });
    },
  };
};
