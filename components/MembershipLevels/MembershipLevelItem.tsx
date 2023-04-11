import { Box } from '@/components/core/Box';
import { Center, Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';
import { MembershipLevel } from '@/net/http/patreonComponents';
import { CssOpacity, GlobalBgColor } from '@/styles/constant';
import { icons } from '@/utils/assets';
import { withDefault } from '@/utils/core/base';

import {
  MobileSelectRolesMenu,
  SaveLevelRolesCallback,
  SelectRolesMenu,
  showSelectRolesMenu,
} from '../Dialogs/SelectRoles';
import { MenuButton } from '../MenuButton';
import styles from './style.module.css';

export const MembershipLevelItem = (props: MembershipLevel) => {
  const { isMobile } = useBreakpoint();
  const { image, name, intro, roles = [] } = props;
  const role = roles[0];
  const { name: roleName, color: roleColor } = role ?? {};

  return (
    <>
      <Row
        width="100%"
        padding={isMobile ? '10px 0' : '10px 30px 10px 0'}
        fontWeight="400"
        fontSize="14px"
        lineHeight="17px"
      >
        <Row width={isMobile ? 40 + 9 : 72 + 40 + 30}>
          {!isMobile && (
            <Center size="30px" cursor="pointer">
              <Image
                className={styles['hover-to-show']}
                src={icons('delete.svg')}
                size="16px"
              />
            </Center>
          )}
          <Image
            src={image}
            size={isMobile ? '40px' : '72px'}
            borderRadius="8px"
          />
        </Row>
        {/*  name */}
        {!isMobile && (
          <Expand>
            <Text width="100%" fontWeight="600" maxLines={1} marginRight="20px">
              {withDefault(name, '-')}
            </Text>
          </Expand>
        )}
        {/*  intro */}
        <Expand
          flex={isMobile ? 3 : 2}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          {isMobile && (
            <Text
              width="100%"
              maxLines={1}
              fontSize="14px"
              lineHeight="18px"
              fontWeight="600"
            >
              {withDefault(name, '-')}
            </Text>
          )}
          <Text
            width="100%"
            maxLines={isMobile ? 3 : 2}
            marginRight="20px"
            color="rgba(255,255,255,0.6)"
          >
            {withDefault(intro, '-')}
          </Text>
        </Expand>
        <Expand
          flex={isMobile ? 2 : 1}
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
                background={withDefault(`#${roleColor}`, '#666')}
                marginRight="4px"
              />
              <Text color={'#fff'} maxLines={1} textAlign="end">
                @{roleName}
              </Text>
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
  saveLevelRoles: SaveLevelRolesCallback;
}) => {
  const { isMobile } = useBreakpoint();
  const {
    level,
    isDelete = false,
    onDeleteLevel,
    onEditLevel,
    saveLevelRoles,
  } = props;

  const { image, name, intro, roles = [], id } = level;
  const selectedRole = roles.find((e) => e);
  const { name: roleName, color: roleColor } = selectedRole ?? {};

  return (
    <Row
      width="100%"
      padding={isMobile ? '10px 0' : '10px 30px 10px 0'}
      borderBottom="1px solid #373737"
      className={styles['hover-to-highlight']}
      cursor={!isDelete ? 'pointer' : 'auto'}
      onClick={() => {
        if (!isDelete) {
          onEditLevel?.();
        }
      }}
    >
      <Row width={isMobile ? 40 + 9 : 72 + 40 + 30}>
        {!isMobile && (
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
        )}
        <Image
          src={image}
          size={isMobile ? '40px' : '72px'}
          borderRadius="8px"
        />
      </Row>
      {/*  name */}
      {!isMobile && (
        <Expand>
          <Text
            width="100%"
            color={
              isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'
            }
            fontSize="14px"
            lineHeight="18px"
            fontWeight="600"
            maxLines={1}
            marginRight="20px"
          >
            {withDefault(name, '-')}
          </Text>
        </Expand>
      )}
      {/*  intro */}
      <Expand
        flex={isMobile ? 3 : 2}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        {isMobile && (
          <Text
            width="100%"
            color={
              isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'
            }
            fontSize="14px"
            lineHeight="18px"
            fontWeight="600"
            maxLines={1}
          >
            {withDefault(name, '-')}
          </Text>
        )}
        <Text
          width="100%"
          color={
            isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 0.6)'
          }
          fontSize="14px"
          lineHeight="18px"
          fontWeight="400"
          maxLines={isMobile ? 3 : 2}
          marginRight="20px"
        >
          {withDefault(intro, '-')}
        </Text>
      </Expand>

      {/*  role manage */}
      <Expand
        flex={isMobile ? 2 : 1}
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
          disable={isMobile || isDelete}
          height="100%"
          justifyContent="end"
          alignItems="center"
          display="flex"
          menuWidth={240}
          menu={
            isMobile ? (
              <MobileSelectRolesMenu id={id} level={level} />
            ) : (
              <SelectRolesMenu id={id} level={level} />
            )
          }
          onShow={async () => {
            return await showSelectRolesMenu(
              level,
              selectedRole ? [selectedRole] : [],
              saveLevelRoles,
            );
          }}
        >
          <Row height="100%">
            {selectedRole && (
              <Box
                size="12px"
                minWidth="12px"
                borderRadius="50%"
                background={withDefault(`#${roleColor}`, '#666')}
                marginRight="4px"
              />
            )}

            {selectedRole ? (
              <Text
                maxLines={1}
                textAlign="end"
                color={
                  isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'
                }
              >
                @{roleName}
              </Text>
            ) : (
              <Text userSelect="none" textDecorationLine="underline">
                Add Role
              </Text>
            )}
            <Image
              src={icons('right-arrow.svg')}
              size="18px"
              marginLeft="10px"
              opacity={CssOpacity.Icon}
            />
          </Row>
        </MenuButton>
      </Expand>
    </Row>
  );
};
