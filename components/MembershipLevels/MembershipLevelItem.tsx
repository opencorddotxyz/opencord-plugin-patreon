import { Box } from '@/components/core/Box';
import { Center, Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { MembershipLevel, Role } from '@/net/http/patreonComponents';
import { CssOpacity, GlobalBgColor, TextDP } from '@/styles/constant';
import { icons } from '@/utils/assets';
import { withDefault } from '@/utils/core/base';
import { hexWithOpacity } from '@/utils/core/format';

import {
  noRoles,
  SelectRolesItem,
  setSeletedRole,
} from '../Dialogs/SelectRoles';
import { MenuButton } from '../MenuButton';
import styles from './style.module.css';

export const MembershipLevelItem = (props: MembershipLevel) => {
  const { image, name, intro, roles = [] } = props;
  const role = roles[0];
  const { name: roleName, color: roleColor = 'transparent' } = role ?? {};

  return (
    <>
      <Row
        width="100%"
        padding={'10px 30px 10px 0'}
        fontWeight="400"
        fontSize="14px"
        lineHeight="17px"
      >
        <Row width={72 + 40 + 30}>
          <Box width="30px" />
          <Image src={image} size="72px" borderRadius="8px" />
        </Row>
        <Expand>
          <Text width="100%" fontWeight="600" maxLines={1} marginRight="20px">
            {withDefault(name, '-')}
          </Text>
        </Expand>
        <Expand flex={2}>
          <Text
            width="100%"
            maxLines={2}
            marginRight="20px"
            color="rgba(255, 255, 255, 0.6)"
          >
            {withDefault(intro, '-')}
          </Text>
        </Expand>
        <Expand
          justifyContent="end"
          alignItems="center"
          lineHeight="18px"
          fontWeight={'600'}
        >
          {roles.length > 0 ? (
            <>
              <Box
                size="12px"
                minWidth="12px"
                borderRadius="50%"
                background={roleColor}
                marginRight="4px"
              />
              <Text
                textDecorationLine="underline"
                color={hexWithOpacity('#ffffff', TextDP.DP3)}
                maxLines={1}
                textAlign="end"
              >
                @{roleName}
              </Text>
              <Image
                opacity={CssOpacity.Icon}
                src={icons('rightArrow.svg')}
                size="18px"
                marginLeft="10px"
              />
            </>
          ) : (
            <Text>-</Text>
          )}
        </Expand>
      </Row>
      <Box
        width="100%"
        marginTop="10px"
        height="1px"
        background={GlobalBgColor.darkColorBgDP2}
      />
    </>
  );
};

export const MembershipLevelItemEditable = (props: {
  isDelete?: boolean;
  onDeleteLevel?: () => void;
  onEditLevel?: () => void;
  level: MembershipLevel;
}) => {
  const { level, isDelete = false, onDeleteLevel, onEditLevel } = props;

  const { image, name, intro, roles = [], id } = level;
  const selectedRole = roles.find((e) => e.selected);
  const { name: roleName, color: roleColor = 'transparent' } =
    selectedRole ?? {};

  return (
    <Row
      width="100%"
      padding={'10px 30px 10px 0'}
      borderBottom="1px solid #373737"
      className={styles['hover-to-highlight']}
      cursor={!isDelete ? 'pointer' : 'auto'}
      onClick={() => {
        if (!isDelete) {
          onEditLevel?.();
        }
      }}
    >
      <Row width={72 + 40 + 30}>
        <Center
          size="30px"
          cursor="pointer"
          onClick={() => {
            if (isDelete) {
              onDeleteLevel?.();
            } else {
              onEditLevel?.();
            }
          }}
        >
          <Image
            className={styles['hover-to-show']}
            src={icons(isDelete ? 'delete.svg' : 'edit.svg')}
            size="16px"
          />
        </Center>
        <Image src={image} size="72px" borderRadius="8px" />
      </Row>
      <Expand>
        <Text
          width="100%"
          color={isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'}
          fontSize="14px"
          lineHeight="18px"
          fontWeight="600"
          maxLines={1}
          marginRight="20px"
        >
          {withDefault(name, '-')}
        </Text>
      </Expand>
      <Expand flex={2}>
        <Text
          width="100%"
          color={
            isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 0.6)'
          }
          fontSize="14px"
          lineHeight="18px"
          fontWeight="400"
          maxLines={2}
          marginRight="20px"
        >
          {withDefault(intro, '-')}
        </Text>
      </Expand>
      <Expand
        justifyContent="end"
        alignItems="center"
        color={isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'}
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'600'}
        height="72px"
      >
        <MenuButton
          id={id}
          disable={isDelete}
          height="100%"
          justifyContent="end"
          alignItems="center"
          display="flex"
          menuWidth={240}
          menuItems={[noRoles, ...roles]}
          menuItemBuilder={(role: Role) => {
            return <SelectRolesItem role={role} level={level} />;
          }}
          onShow={() => {
            setSeletedRole(selectedRole);
          }}
        >
          {selectedRole ? (
            <Row height="100%">
              <Box
                size="12px"
                minWidth="12px"
                borderRadius="50%"
                background={roleColor}
                marginRight="4px"
              />
              <Text
                maxLines={1}
                textAlign="end"
                color={
                  isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'
                }
              >
                @{roleName}
              </Text>
              <Image
                src={icons('right-arrow.svg')}
                size="18px"
                marginLeft="10px"
                opacity={CssOpacity.Icon}
              />
            </Row>
          ) : (
            <Text userSelect="none" textDecorationLine="underline">
              Add Role
            </Text>
          )}
        </MenuButton>
      </Expand>
    </Row>
  );
};
