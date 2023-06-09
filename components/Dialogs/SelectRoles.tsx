import { MenuItem } from '@szhsin/react-menu';

import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { getAvailableRolesForMembershipLevel } from '@/net/http/patreon';
import { MembershipLevel, Role } from '@/net/http/patreonComponents';
import { is2XX } from '@/net/http/utils';
import { store, useConsumer, useStore } from '@/utils/store/useStore';

import { Radio } from '../core/Checks';
import { Expand, Row } from '../core/Flex';
import { Text } from '../core/Text';
import { dismissBottomSheet } from './BottomSheet';

export type SaveLevelRolesCallback = (
  level: MembershipLevel,
  roles: Role[],
) => void;

let saveLevelRolesCallback: SaveLevelRolesCallback;
export const showSelectRolesMenu = async (
  level: MembershipLevel,
  selectedRoles: Role[],
  saveLevelRoles: SaveLevelRolesCallback,
) => {
  if (!getSelectedLevelRoles(level)) {
    // fetch current level roles
    const result = await getAvailableRolesForMembershipLevel({
      levelId: level.id,
    }).catch(() => undefined);
    if (!is2XX(result)) {
      return false;
    }

    setSelectedLevelRoles(level, result?.data?.roles ?? []);
  }

  setSelectedRoles(selectedRoles);

  saveLevelRolesCallback = saveLevelRoles;

  return true;
};

const kSelectedRolesKey = 'kSelectedRolesKey';
const noRoles: Role = { name: 'None', id: 'none' } as any;
export const setSelectedRoles = (roles: Role[]) => {
  const _roles = roles.length < 1 ? [noRoles] : roles;
  store.set(kSelectedRolesKey, _roles);
};

export const onSelectRoles = (level: MembershipLevel, roles: Role[]) => {
  dismissBottomSheet();
  saveLevelRolesCallback?.(level, roles);
};

export const SelectRolesItem = (props: {
  level: MembershipLevel;
  role: Role;
}) => {
  const { isMobile } = useBreakpoint();
  const { role, level } = props;

  const selectedRole = useStore<Role[]>(kSelectedRolesKey)[0]?.[0];

  return (
    <Row
      width="100%"
      padding={isMobile ? '7px 15px' : '10px 20px'}
      onClick={() => {
        if (role.id === noRoles.id) {
          // unselect role
          onSelectRoles(level, []);
        } else if (role.id !== selectedRole?.id) {
          // onSelect role
          onSelectRoles(level, [role]);
        }
      }}
    >
      {isMobile ? (
        <Expand
          background="rgb(62,62,62)"
          alignItems="center"
          height="48px"
          padding="15px"
          borderRadius="10px"
        >
          <Text
            maxLines={1}
            textAlign="center"
            fontSize="13px"
            fontWeight="500"
          >
            {role.id === noRoles.id ? '' : '@'}
            {role.name}
          </Text>
        </Expand>
      ) : (
        <Expand marginRight="10px" width="200px">
          <Text maxLines={1}>
            {role.id === noRoles.id ? '' : '@'}
            {role.name}
          </Text>
        </Expand>
      )}

      {!isMobile && <Radio isChecked={role.id === selectedRole?.id} />}
    </Row>
  );
};

const kSelectedLevelRolesKey = 'kSelectedLevelRolesKey';
const useSelectedLevelRoles = (level: MembershipLevel) => {
  return (
    useConsumer<Role[]>(kSelectedLevelRolesKey, (states) => {
      return states?.[level.id];
    })[0]?.[level.id] ?? [noRoles]
  );
};

const getSelectedLevelRoles = (level: MembershipLevel) => {
  const current = store.get(kSelectedLevelRolesKey) ?? {};

  return current[level.id];
};

const setSelectedLevelRoles = (level: MembershipLevel, roles: Role[]) => {
  const current = store.get(kSelectedLevelRolesKey) ?? {};
  store.set(kSelectedLevelRolesKey, {
    ...current,
    [level.id]: [noRoles, ...roles],
  });
};

interface SelectRolesMenuProps {
  id: string;
  level: MembershipLevel;
}

export const SelectRolesMenu = (props: SelectRolesMenuProps) => {
  const { id, level } = props;

  const roles = useSelectedLevelRoles(level);

  return (
    <>
      {roles?.map((role, idx) => {
        return (
          <MenuItem
            // eslint-disable-next-line react/no-array-index-key
            key={id + idx}
          >
            <SelectRolesItem role={role} level={level} />
          </MenuItem>
        );
      })}
    </>
  );
};
export const MobileSelectRolesMenu = (props: SelectRolesMenuProps) => {
  const { id, level } = props;

  const roles = useSelectedLevelRoles(level);

  return (
    <>
      <Text fontSize="23px" fontWeight="700" margin={'10px 0 0 20px'}>
        Add Role
      </Text>
      {roles?.map((role, idx) => {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={id + idx}
          >
            <SelectRolesItem role={role} level={level} />
          </div>
        );
      })}
    </>
  );
};
