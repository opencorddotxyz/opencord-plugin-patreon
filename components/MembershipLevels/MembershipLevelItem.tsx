import { Box } from '@/components/core/Box';
import { Center, Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { icons } from '@/utils/assets';
import { PatreonLevel } from '@/utils/mock';

import styles from './style.module.css';

export const MembershipLevelItem = (props: { level: PatreonLevel }) => {
  const { level } = props;
  const { image, name, description = '-', roles = [] } = level;
  const role = roles[0];
  const { name: roleName, color: roleColor = 'transparent' } = role ?? {};
  return (
    <Row
      width="100%"
      padding={'10px 30px 10px 0'}
      borderBottom="1px solid #373737"
      wordBreak="break-all"
    >
      <Row width={72 + 40 + 30}>
        <Box width="30px" />
        <Image src={image} size="72px" borderRadius="8px" />
      </Row>
      <Expand>
        <Text
          width="100%"
          color="rgba(255, 255, 255, 1)"
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
          color="rgba(255, 255, 255, 0.6)"
          fontSize="14px"
          lineHeight="18px"
          fontWeight="400"
          maxLines={2}
          marginRight="20px"
        >
          {description}
        </Text>
      </Expand>
      <Expand
        justifyContent="end"
        alignItems="center"
        color="rgba(255, 255, 255, 1)"
        fontSize={'14px'}
        lineHeight="18px"
        fontWeight={'600'}
      >
        {role ? (
          <>
            <Box
              size="12px"
              minWidth="12px"
              borderRadius="50%"
              background={roleColor}
              marginRight="4px"
            />
            <Text maxLines={1} textAlign="end">
              @{roleName}
            </Text>
          </>
        ) : (
          <Text>-</Text>
        )}
      </Expand>
    </Row>
  );
};

export const MembershipLevelItemEditable = (props: {
  isDelete?: boolean;
  onDeleteLevel?: () => void;
  onLinkRole?: () => void;
  onEditLevel?: () => void;
  level: PatreonLevel;
}) => {
  const {
    level,
    isDelete = false,
    onDeleteLevel,
    onLinkRole,
    onEditLevel,
  } = props;
  const { image, name, description = '-', roles = [] } = level;
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
          {description}
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
          <>
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
          </>
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
