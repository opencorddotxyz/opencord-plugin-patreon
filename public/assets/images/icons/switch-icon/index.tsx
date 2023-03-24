import { useColor } from '@/hooks';

import checkboxOn from './checkboxOn.svg';
import checkboxOnLight from './checkboxOnLight.svg';
import radioOff from './radioOff.svg';
import radioOffLight from './radioOffLight.svg';
import radioOn from './radioOn.svg';
import radioOnLight from './radioOnLight.svg';

export const useSwitchIcon = () => {
  const {isLight} = useColor();

  return {
    checkboxOnSvg: isLight ? checkboxOn : checkboxOnLight,
    checkboxOffSvg:isLight ? radioOff : radioOffLight,
    radioOffSvg: isLight ? radioOff : radioOffLight,
    radioOnSvg: isLight ? radioOn : radioOnLight,
  };
}; 