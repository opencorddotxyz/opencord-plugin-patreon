import { CSSProperties, forwardRef, MouseEventHandler, ReactNode } from 'react';

import { isArray } from '@/utils/core/is';

export interface BaseStyles {
  size?: string | number;
}

export interface BaseProps extends BaseStyles {
  id?: string;
  src?: string;
  style?: CSSProperties;
  extStyle?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  onClick?: MouseEventHandler | undefined;
}

export type BoxProps = CSSProperties & BaseProps;

export const getBoxProps = (props: BoxProps) => {
  const {
    id,
    src,
    className: _class,
    onClick,
    style,
    extStyle = {},
    size,
    ...styles
  } = props ?? {};
  if (size) {
    extStyle.width = size;
    extStyle.height = size;
  }
  const className = isArray(_class) ? (_class as any)!.join(' ') : _class;
  return {
    id,
    onClick,
    className,
    src,
    style: {
      ...style,
      ...styles,
      ...extStyle,
    },
  };
};

export const Box = forwardRef((props: BoxProps, ref: any) => {
  const { children } = props;
  const boxProps = getBoxProps(props);
  return (
    <div ref={ref} {...boxProps}>
      {children}
    </div>
  );
});
