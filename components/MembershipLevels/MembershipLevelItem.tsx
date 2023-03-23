import { Box } from '@/components/core/Box';
import { Expand, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { MembershipLevel } from '@/net/http/patreonComponents';
import { CssOpacity, GlobalBgColor, TextDP } from '@/styles/constant';
import { icons } from '@/utils/assets';
import { hexWithOpacity } from '@/utils/core/format';

export const MembershipLevelItem = (props: MembershipLevel) => {
  const { image, name, intro = '-', roles } = props;
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
          <Image
            src={icons('warning.svg') ?? image}
            size="72px"
            borderRadius="8px"
          />
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
          {roles ? (
            <>
              <Box
                size="12px"
                minWidth="12px"
                borderRadius="50%"
                background={roles[0].color ?? 'transparent'}
                marginRight="4px"
              />
              <Text
                textDecorationLine="underline"
                color={hexWithOpacity('#ffffff', TextDP.DP3)}
                maxLines={1}
                textAlign="end"
              >
                @{roles[0].name}
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
