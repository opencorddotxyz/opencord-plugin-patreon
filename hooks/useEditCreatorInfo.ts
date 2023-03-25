import { useState } from 'react';

import { showToast } from '@/components/Dialogs/Toast';
import { PatreonInfo } from '@/net/http/mock';
import { MembershipLevel, Role } from '@/net/http/patreonComponents';
import { isEmpty } from '@/utils/core/is';
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

  // listen to data sets changes
  const [info] = useStore<PatreonInfo>(kCreatorInfoKey);

  const [saving, setSaving] = useState(false);
  const saveCreatorInfo = async () => {
    if (!info) return;
    if (saving) return;
    info.creator.name = info.creator.name.trim();
    info.creator.intro = info.creator.intro.trim();
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

  const setLevelInfo = (level: MembershipLevel) => {
    setCreatorInfo((dataSets) => {
      if (!dataSets) return {};
      const currentLevel = dataSets.levels.find((e) => e.id === level.id);
      if (!currentLevel) {
        return {};
      }

      for (const [key, value] of Object.entries(level)) {
        currentLevel[key] = value;
      }

      return {
        levels: [...dataSets.levels],
      };
    });
  };

  const saveLevelInfo = async (level: MembershipLevel): Promise<boolean> => {
    // todo update level info
    const success = true;
    if (success) {
      setLevelInfo(level);
    }

    return success;
  };

  const setLevelRoles = (level: MembershipLevel, roles: Role[]) => {
    setCreatorInfo((dataSets) => {
      if (!dataSets) return {};
      const currentLevel = dataSets.levels.find((e) => e.id === level.id);
      if (!currentLevel) {
        return {};
      }
      currentLevel.roles = roles;

      return {
        levels: [...dataSets.levels],
      };
    });
  };

  const linkRoles = async (
    level: MembershipLevel,
    roles: Role[],
  ): Promise<boolean> => {
    // todo link Roles
    const success = true;
    if (success) {
      setLevelRoles(level, roles);
    }

    return success;
  };

  const setDeletedOutdatedLevel = (level: MembershipLevel) => {
    setCreatorInfo((dataSets) => {
      if (!dataSets) return {};

      return {
        outdatedLevels: dataSets.outdatedLevels.filter(
          (e) => e.id !== level.id,
        ),
      };
    });
  };

  const deleteOutdatedLevel = async (
    level: MembershipLevel,
  ): Promise<boolean> => {
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
    homeStates: info,
    avatar: info?.creator?.avatar,
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
    description: info?.creator?.intro,
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
