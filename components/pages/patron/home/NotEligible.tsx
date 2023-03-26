import { Column, Row } from '@/components/core/Flex';
import { Image } from '@/components/core/Image';
import { Text } from '@/components/core/Text';
import { icons, images } from '@/utils/assets';
import { openNewTab } from '@/utils/location';

export const NotEligible = (props: { name: string; link: string }) => {
  const { name, link } = props;

  return (
    <>
      <Column
        width="100%"
        maxWidth="840px"
        alignItems="start"
        padding="0 30px 30px 30px"
      >
        <Row marginBottom="10px">
          <Image
            size="20px"
            src={images('not-eligible.svg')}
            marginRight="4px"
          />
          <Text
            fontSize={'16px'}
            lineHeight="20px"
            fontWeight={'700'}
            textAlign="center"
          >
            You’re not eligible
          </Text>
        </Row>
        <Text
          alignItems="start"
          width="100%"
          padding="12px 16px"
          borderRadius="4px"
          border="1px solid #373737"
        >
          <Image
            size="12px"
            src={icons('warning.svg')}
            display="inline"
            marginRight="4px"
          />
          <Text
            display="inline"
            color="rgba(255, 255, 255, 1)"
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            We&apos;re sorry, but this perk is only available to {name} patrons.
            If you would like to become a patron and gain acce-ss to this perk,
            please visit the home page of
          </Text>
          <Text
            display="inline"
            color={'#16B8F3'}
            onClick={() => {
              openNewTab(link);
            }}
            cursor="pointer"
          >
            &nbsp;{name}
          </Text>
          <Text
            display="inline"
            color="rgba(255, 255, 255, 1)"
            fontSize={'14px'}
            lineHeight="18px"
            fontWeight={'400'}
            marginBottom="10px"
          >
            .
          </Text>
        </Text>
      </Column>
    </>
  );
};
