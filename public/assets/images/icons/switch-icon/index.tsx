import { icons } from '@/utils/assets';

function addPrefix(prefix: string) {
  return function (sourceName: string) {
    return `${prefix}${sourceName}`;
  };
}
const switchIconPrefix = addPrefix('/switch-icon/');

export const useSwitchIcon = () => {
  return {
    checkboxOnSvg: icons(switchIconPrefix('checkboxOn.svg')),
    checkboxOffSvg: icons(switchIconPrefix('radioOff.svg')),
    radioOffSvg: icons(switchIconPrefix('radioOff.svg')),
    radioOnSvg: icons(switchIconPrefix('radioOn.svg')),
  };
};
