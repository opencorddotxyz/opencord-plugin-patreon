export enum TextDP {
  DP0 = 1,
  DP1 = 0.8,
  DP2 = 0.6,
  DP3 = 0.4,
  DP4 = 0.3,
  DP5 = 0.2,
  DP6 = 0.1,
}

export enum CssOpacity {
  Icon = 0.5,
  Opaque = 1,
  Shadow = 0.2,
  IconBlur = 0.1,
}

export enum BoxShadowOpacity {
  light = 0.15,
  dark = 0.3,
}

export const CloseIconCss = {
  boxSize: '12px',
  transition: '0.3s',
  opacity: CssOpacity.Icon,
  _hover: { opacity: CssOpacity.Opaque },
};
export enum TextColor {
  Light = '#282828',
  Dark = '#ffffff',
}

export enum GlobalBgColor {
  darkColorBgDP0 = '#282828',
  darkColorBgDP1 = '#333333',
  darkColorBgDP2 = '#373737',
  darkColorBgDP3 = '#3B3B3B',
  darkColorBgDP4 = '#444444',
  darkColorBgDP5 = '#4D4D4D',
  darkColorBgDP6 = '#555555',

  lightColorBgDP0 = '#FFFFFF',
  lightColorBgDP1 = '#F4F4F4',
  lightColorBgDP2 = '#F0F0F0',
  lightColorBgDP3 = '#ECECEC',
  lightColorBgDP4 = '#E3E3E3',
  lightColorBgDP5 = '#DADADA',
  lightColorBgDP6 = '#D2D2D2',
}
