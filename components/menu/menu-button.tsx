import { ReactNode } from 'react';
import { useContextMenu } from 'react-contexify';

import { Box } from '@/components/core/Box';

export declare type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
export declare const bottom: 'bottom';
export declare const right: 'right';
export declare const left: 'left';
export declare const auto: 'auto';
export declare type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';
export declare type Placement =
  | AutoPlacement
  | BasePlacement
  | VariationPlacement;

type Logical =
  | 'start-start'
  | 'start-end'
  | 'end-start'
  | 'end-end'
  | 'start'
  | 'end';

export type PlacementWithLogical = Placement | Logical;

export declare type BasePlacement =
  | typeof top
  | typeof bottom
  | typeof right
  | typeof left;

export const MenuButton = (props: { children: ReactNode; menuId: string }) => {
  const { show } = useContextMenu({
    id: props.menuId,
  });
  const menuDefaultWidth = 220;

  return (
    <Box
      onClick={(e) => {
        const { x, y, height, width } = e.currentTarget.getBoundingClientRect();

        show({
          event: e,
          props: {
            key: 'value',
          },
          position: {
            y: y + height + 5,
            x: x - menuDefaultWidth + width,
          },
        });
      }}
    >
      {props.children}
    </Box>
  );
};
