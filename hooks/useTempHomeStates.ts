import { useState } from 'react';

import { showToast } from '@/components/Dialogs/Toast';
import {
  GetHomepageResponse,
  MembershipLevel,
  Role,
} from '@/net/http/patreonComponents';
import { isNotEqual } from '@/utils/core/diff';
import { isEmpty } from '@/utils/core/is';
// import { ImageType, uploadImage } from '@/utils/files';
import { store, useInit, useStore } from '@/utils/store/useStore';

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

export const useTempHomeStates = (
  refreshHomeStates: () => void,
  currentHomeStates?: GetHomepageResponse,
) => {
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
    if (!tempHomeStates?.spaceProfile) return;
    if (saving) return;
    tempHomeStates.spaceProfile.name = tempHomeStates.spaceProfile.name.trim();
    tempHomeStates.spaceProfile.intro =
      tempHomeStates.spaceProfile.intro.trim();
    if (isEmpty(tempHomeStates.spaceProfile.name)) {
      showToast('Name cannot be empty.');

      return;
    }
    setSaving(true);
    // todo saveCreatorInfo
    if (!tempHomeStates.spaceProfile.avatar.startsWith('http')) {
      try {
        //   const result = await uploadImage(, {
        //     type: ImageType.AVATAR,
        //   });
        //   if (!isEmpty(result)) {
        //     const imagetempHomeStates = result?.[0];
        //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //     const { localPath = '', uploadedUrl = '' } =
        //       imagetempHomeStates ?? {};
        //     const updateUserResult: {
        //       code: number;
        //       message: string;
        //     } = (await saveCreatorInfo()) as any;
        //     if (updateUserResult.code) {
        //       if (updateUserResult.code === 2000) {
        //         showToast(updateUserResult.message);
        //       }
        //       return;
        //     }
        //   }
      } catch (_) {
        //
      }
    }
    setSaving(false);
    refreshHomeStates();

    return true;
  };

  const setLevelInfo = (level: MembershipLevel) => {
    setTempHomeStates((current) => {
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
    // todo save level info

    const success = true;
    if (success) {
      setLevelInfo(level);
    }

    refreshHomeStates();

    return success;
  };

  const setLevelRoles = (level: MembershipLevel, roles: Role[]) => {
    setTempHomeStates((current) => {
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

  const saveLevelRoles = (level: MembershipLevel, roles: Role[]) => {
    // todo save level roles

    const success = true;
    if (success) {
      setLevelRoles(level, roles);
    }
    refreshHomeStates();

    return success;
  };

  const setDeletedOutdatedLevel = (level: MembershipLevel) => {
    setTempHomeStates((current) => {
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
    // todo delete outdated level
    const success = true;
    if (success) {
      setDeletedOutdatedLevel(level);
    }
    refreshHomeStates();

    return success;
  };

  return {
    saveLevelInfo,
    saveLevelRoles,
    deleteOutdatedLevel,
    saving,
    saveCreatorInfo,
    homeStates: tempHomeStates,
    avatar: tempHomeStates?.spaceProfile?.avatar,
    setAvatar: (props: { file: File; url: string }) => {
      // todo save temp file to upload
      const { file: _, url } = props;
      // hash to query
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
