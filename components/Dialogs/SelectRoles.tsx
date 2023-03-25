import { MembershipLevel, Role } from '@/net/http/patreonComponents';
import { store, useStore } from '@/utils/store/useStore';

import { Radio } from '../core/Checks';
import { Expand, Row } from '../core/Flex';
import { Text } from '../core/Text';

const kSelectedRoleKey = 'kSelectedRoleKey';

export const noRoles = { name: 'None', id: 'none' } as any;

export const setSeletedRole = (role?: Role) => {
  store.set(kSelectedRoleKey, role ?? noRoles);
};

export const onSelectRole = (level: MembershipLevel, role?: Role) => {
  if (!role) {
    // todo remove role
  }
  // todo update network and local states
  setSeletedRole(role);
};

export const SelectRolesItem = (props: {
  level: MembershipLevel;
  role: Role;
}) => {
  const { role, level } = props;

  const [selectedRole] = useStore<Role>(kSelectedRoleKey);

  return (
    <Row
      width="240px"
      padding="4px 8px"
      onClick={() => {
        if ([selectedRole?.id, noRoles.id].includes(role.id)) {
          // unselect role
          onSelectRole(level, undefined);
        } else {
          // onSelect role
          onSelectRole(level, role);
        }
      }}
    >
      <Expand marginRight="10px" width="200px">
        <Text maxLines={1}>@{role.name}</Text>
      </Expand>
      <Radio isChecked={role.id === selectedRole?.id} />
    </Row>
  );
};
