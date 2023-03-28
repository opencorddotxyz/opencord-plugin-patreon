import { useSwitchIcon } from '@/components/Icons';
import { CssOpacity } from '@/styles/constant';

import { Image, ImageProps } from './Image';

interface RadioProps extends ImageProps {
  isChecked: boolean;
}

export const Radio = (props: RadioProps) => {
  const { isChecked } = props;
  const { radioOnSvg, radioOffSvg } = useSwitchIcon();

  return (
    <Image
      className="icon"
      transition="0.3s"
      height="16px"
      width="16px"
      opacity={isChecked ? CssOpacity.Opaque : CssOpacity.Icon}
      src={isChecked ? radioOnSvg : radioOffSvg}
      {...props}
    />
  );
};

export const CheckBox = (props: RadioProps) => {
  const { isChecked = false } = props;
  const { checkboxOnSvg, checkboxOffSvg } = useSwitchIcon();

  return (
    <Image
      className="icon"
      height="16px"
      width="16px"
      opacity={isChecked ? CssOpacity.Opaque : CssOpacity.Icon}
      src={isChecked ? checkboxOnSvg : checkboxOffSvg}
      {...props}
    />
  );
};
