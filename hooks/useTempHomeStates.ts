import { useState } from 'react';

import { getLocalImageFromHash, isLocalImage } from '@/components/core/Image';
import { showToast } from '@/components/Dialogs/Toast';
import {
  assignedRolesForMembershipLevel,
  modifyMembershipLevel,
  modifySpaceProfile,
  refreshMembershipLevels,
  removeOutdatedMembershipLevels,
} from '@/net/http/patreon';
import {
  GetHomepageResponse,
  MembershipLevel,
  Role,
} from '@/net/http/patreonComponents';
import { is2XX } from '@/net/http/utils';
import { isEqual, isNotEqual } from '@/utils/core/diff';
import { isEmpty } from '@/utils/core/is';
import { md5 } from '@/utils/md5';
import { store, useInit, useStore } from '@/utils/store/useStore';
import { ImageType, uploadImage } from '@/utils/upload';

import { setHomeStates } from './useAPP';

const kTempHomeStates = 'kTempHomeStates';

const getTempHomeStates = () => store.get<GetHomepageResponse>(kTempHomeStates);

const setTempHomeStates = (
  callback: (current?: GetHomepageResponse) => Partial<GetHomepageResponse>,
) => {
  const current = getTempHomeStates();
  store.set(kTempHomeStates, {
    ...current,
    ...callback(current),
  });
};

export const useTempHomeStates = (currentHomeStates?: GetHomepageResponse) => {
  // listen to data sets changes
  const [tempHomeStates] = useStore<GetHomepageResponse>(kTempHomeStates);

  // copy home states
  useInit(() => {
    if (currentHomeStates && isNotEqual(currentHomeStates, tempHomeStates)) {
      setTempHomeStates(() => currentHomeStates);
    }
  }, [currentHomeStates]);

  const [saving, setSaving] = useState(false);
  const saveCreatorInfo = async () => {
    if (
      saving ||
      !tempHomeStates?.spaceProfile ||
      isEqual(tempHomeStates?.spaceProfile, currentHomeStates?.spaceProfile)
    ) {
      // newtest
      return;
    }
    tempHomeStates.spaceProfile.name = tempHomeStates.spaceProfile.name.trim();
    tempHomeStates.spaceProfile.intro =
      tempHomeStates.spaceProfile.intro.trim();
    if (isEmpty(tempHomeStates.spaceProfile.name)) {
      showToast('Name cannot be empty.');

      return;
    }
    const avatar = tempHomeStates.spaceProfile.avatar;
    setSaving(true);
    let imagePath = isLocalImage(avatar) ? undefined : avatar;
    if (isLocalImage(avatar)) {
      const file = getLocalImageFromHash(md5(avatar));
      if (file) {
        try {
          imagePath = await uploadImage(file, {
            type: ImageType.AVATAR,
          });
        } catch (_) {
          // upload image failed
        }
      }
    }
    if (!imagePath) {
      // upload image failed
      showToast('Upload image failed, please try again later.');
      setSaving(false);

      return false;
    }

    tempHomeStates.spaceProfile.avatar = imagePath;
    const result = await modifySpaceProfile(tempHomeStates.spaceProfile).catch(
      () => undefined,
    );
    setSaving(false);
    if (!is2XX(result)) {
      // update failed
      showToast(
        result?.message ?? 'Something went wrong, please try again later.',
      );

      return false;
    }
    setHomeStates(() => {
      return {
        spaceProfile: tempHomeStates.spaceProfile,
      };
    });

    return true;
  };

  const [syncing, setSyncing] = useState(false);
  const syncPatreonLevels = async () => {
    if (syncing) {
      return;
    }
    setSyncing(true);
    const result = await refreshMembershipLevels().catch(() => undefined);
    setSyncing(false);
    if (!is2XX(result)) {
      // update failed
      showToast(
        result?.message ?? 'Something went wrong, please try again later.',
      );

      return false;
    }
    setHomeStates(() => {
      return {
        ...result?.data,
      };
    });

    return true;
  };

  const setLevelInfo = (level: MembershipLevel) => {
    setHomeStates((current) => {
      const currentLevels = current?.membershipLevels ?? [];
      const currentLevel = currentLevels.find((e) => e.id === level.id);
      if (!currentLevel) {
        return {};
      }

      for (const [key, value] of Object.entries(level)) {
        currentLevel[key] = value;
      }

      return {
        membershipLevels: currentLevels,
      };
    });
  };

  const saveLevelInfo = async (level: MembershipLevel): Promise<boolean> => {
    const avatar = level.image;
    let imagePath = isLocalImage(avatar) ? undefined : avatar;
    if (isLocalImage(avatar)) {
      const file = getLocalImageFromHash(md5(avatar));
      if (file) {
        try {
          imagePath = await uploadImage(file, {
            type: ImageType.AVATAR,
          });
        } catch (_) {
          // upload image failed
        }
      }
    }
    if (!imagePath) {
      // upload image failed
      showToast('Upload image failed, please try again later.');

      return false;
    }

    const result = await modifyMembershipLevel(
      { levelId: level.id },
      {
        name: level.name,
        intro: level.intro,
        avatar: imagePath,
      },
    ).catch(() => undefined);
    if (!is2XX(result)) {
      showToast(
        result?.message ?? 'Something went wrong, please try again later.',
      );

      return false;
    }
    setLevelInfo(level);

    return true;
  };

  const setLevelRoles = (level: MembershipLevel, roles: Role[]) => {
    setHomeStates((current) => {
      const currentLevels = current?.membershipLevels ?? [];
      const currentLevel = currentLevels.find((e) => e.id === level.id);
      if (!currentLevel) {
        return {};
      }
      currentLevel.roles = roles;

      return {
        membershipLevels: currentLevels,
      };
    });
  };

  const saveLevelRoles = async (level: MembershipLevel, roles: Role[]) => {
    const result = await assignedRolesForMembershipLevel(
      { levelId: level.id },
      {
        roleIds: roles.map((e) => e.id),
      },
    ).catch(() => undefined);
    if (!is2XX(result)) {
      showToast(
        result?.message ?? 'Something went wrong, please try again later.',
      );

      return false;
    }

    setLevelRoles(level, roles);

    return true;
  };

  const setDeletedOutdatedLevel = (level: MembershipLevel) => {
    setHomeStates((current) => {
      const currentLevels = current?.outdatedMembershipLevels ?? [];
      if (currentLevels.length < 1) {
        return {};
      }

      return {
        outdatedMembershipLevels: currentLevels.filter(
          (e) => e.id !== level.id,
        ),
      };
    });
  };

  const deleteOutdatedLevel = async (
    level: MembershipLevel,
  ): Promise<boolean> => {
    const result = await removeOutdatedMembershipLevels({
      levelId: level.id,
    }).catch(() => undefined);
    if (!is2XX(result)) {
      showToast(
        result?.message ?? 'Something went wrong, please try again later.',
      );

      return false;
    }
    setDeletedOutdatedLevel(level);

    return true;
  };

  return {
    saving,
    saveCreatorInfo,
    syncing,
    syncPatreonLevels,
    saveLevelInfo,
    saveLevelRoles,
    deleteOutdatedLevel,
    homeStates: tempHomeStates,
    avatar: tempHomeStates?.spaceProfile?.avatar,
    setAvatar: (url: string) => {
      setTempHomeStates((current) => {
        if (!current?.spaceProfile) return {};

        return {
          spaceProfile: {
            ...current.spaceProfile,
            avatar: url,
          },
        };
      });
    },
    name: tempHomeStates?.spaceProfile?.name,
    setName: (text: string) => {
      setTempHomeStates((current) => {
        if (!current?.spaceProfile) return {};

        return {
          spaceProfile: {
            ...current.spaceProfile,
            name: text,
          },
        };
      });
    },
    description: tempHomeStates?.spaceProfile?.intro,
    setDescription: (text: string) => {
      setTempHomeStates((current) => {
        if (!current?.spaceProfile) return {};

        return {
          spaceProfile: {
            ...current.spaceProfile,
            intro: text,
          },
        };
      });
    },
  };
};
