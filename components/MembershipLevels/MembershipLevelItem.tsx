import { Item, Menu } from 'react-contexify';

import { Box } from '@/components/core/Box';
import { Center, Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { MembershipLevel } from '@/net/http/patreonComponents';
import { CssOpacity, GlobalBgColor, TextDP } from '@/styles/constant';
import { icons } from '@/utils/assets';
import { hexWithOpacity } from '@/utils/core/format';

import { MenuButton } from '../menu/menu-button';
import styles from './style.module.css';

export const MembershipLevelItem = (props: MembershipLevel) => {
  const { id, image, name, intro = '-', roles = [] } = props;
  const role = roles[0];
  const { name: roleName, color: roleColor = 'transparent' } = role ?? {};
  return (
    <>
      <Row
        width="100%"
        padding={'10px 30px 10px 0'}
        wordBreak="break-all"
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
            {name}
          </Text>
        </Expand>
        <Expand flex={2}>
          <Text width="100%" maxLines={2} marginRight="20px">
            {intro}
          </Text>
        </Expand>
        <Expand
          justifyContent="end"
          alignItems="center"
          lineHeight="18px"
          fontWeight={'600'}
        >
          <Menu id={id} theme="dark">
            {roles.map((val) => {
              return (
                <Item
                  key={val.id}
                  id={val.id}
                  onClick={(e) => {
                    console.log('!!!', e);
                    //
                  }}
                >
                  {val.name}
                </Item>
              );
            })}
          </Menu>

          {roles.length > 0 ? (
            <MenuButton menuId={id}>
              123
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
            </MenuButton>
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
  onLinkRole?: () => void;
  onEditLevel?: () => void;
  level: MembershipLevel;
}) => {
  const {
    level,
    isDelete = false,
    onDeleteLevel,
    onLinkRole,
    onEditLevel,
  } = props;
  const { image, name, intro = '-', roles = [], id } = level;
  const role = roles[0];
  const { name: roleName, color: roleColor = 'transparent' } = role ?? {};
  return (
    <Row
      width="100%"
      padding={'10px 30px 10px 0'}
      borderBottom="1px solid #373737"
      wordBreak="break-all"
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
          {name}
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
          {intro}
        </Text>
      </Expand>
      <Expand
        justifyContent="end"
        alignItems="center"
        color={isDelete ? 'rgba(255,255,255,0.5)' : 'rgba(255, 255, 255, 1)'}
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'600'}
      >
        {role ? (
          <MenuButton menuId={id}>
            <Menu id={id} theme="oc-menu">
              {roles.map((val) => {
                return (
                  <Item
                    key={val.id}
                    id={val.id}
                    onClick={(e) => {
                      console.log('!!!', e);
                      //
                    }}
                  >
                    {val.name}
                  </Item>
                );
              })}
            </Menu>
            <Row>
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
          </MenuButton>
        ) : (
          <Text
            userSelect="none"
            textDecorationLine="underline"
            onClick={() => {
              onLinkRole?.();
            }}
          >
            Add Role
          </Text>
        )}
      </Expand>
    </Row>
  );
};
