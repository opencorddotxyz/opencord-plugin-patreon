import { Box } from '@/components/core/Box';
import { Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';

export const MembershipLevelItem = (props: {
  level: {
    image: string;
    name: string;
    description?: string;
    role?: string;
    color?: string;
  };
}) => {
  const { level } = props;
  const { image, name, description = '-', role, color = 'transparent' } = level;
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
              background={color}
              marginRight="4px"
            />
            <Text maxLines={1} textAlign="end">
              @{role}
            </Text>
          </>
        ) : (
          <Text>-</Text>
        )}
      </Expand>
    </Row>
  );
};
