import { useState } from 'react';

import { showToast } from '@/components/Dialogs/Toast';
import { isEmpty } from '@/utils/core/is';
import { PatreonInfo, PatreonLevel, Role } from '@/utils/mock';
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
  const [info] = useStore<PatreonInfo>(kCreatorInfoKey);

  const [saving, setSaving] = useState(false);
  const saveCreatorInfo = async () => {
    if (saving) return;
    info.creator.name = info.creator.name.trim();
    info.creator.description = info.creator.description.trim();
    if (isEmpty(info.creator.name)) {
      showToast('Name cannot be empty.');
      return;
    }
    setSaving(true);
    // todo saveCreatorInfo
    setSaving(false);
  };

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    // todo refresh Patreon info
    setRefreshing(false);
  };

  const setLevelInfo = (level: PatreonLevel) => {
    setCreatorInfo((datas) => {
      if (!datas) return {};
      const currentLevel = datas.levels.find((e) => e.id === level.id);
      if (!currentLevel) {
        return {};
      }
      for (const [key, value] of Object.entries(level)) {
        currentLevel[key] = value;
      }
      return {
        levels: [...datas.levels],
      };
    });
  };

  const saveLevelInfo = async (level: PatreonLevel): Promise<boolean> => {
    // todo update level info
    const success = true;
    if (success) {
      setLevelInfo(level);
    }
    return success;
  };

  const setLevelRoles = (level: PatreonLevel, roles: Role[]) => {
    setCreatorInfo((datas) => {
      if (!datas) return {};
      const currentLevel = datas.levels.find((e) => e.id === level.id);
      if (!currentLevel) {
        return {};
      }
      currentLevel.roles = roles;
      return {
        levels: [...datas.levels],
      };
    });
  };

  const linkRoles = async (
    level: PatreonLevel,
    roles: Role[],
  ): Promise<boolean> => {
    // todo link Roles
    const success = true;
    if (success) {
      setLevelRoles(level, roles);
    }
    return success;
  };

  const setDeletedOutdatedLevel = (level: PatreonLevel) => {
    setCreatorInfo((datas) => {
      if (!datas) return {};
      return {
        outdatedLevels: datas.outdatedLevels.filter((e) => e.id !== level.id),
      };
    });
  };

  const deleteOutdatedLevel = async (level: PatreonLevel): Promise<boolean> => {
    // todo delete outdated level
    const success = true;
    if (success) {
      setDeletedOutdatedLevel(level);
    }
    return success;
  };

  return {
    saveLevelInfo,
    linkRoles,
    deleteOutdatedLevel,
    refresh,
    refreshing,
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
