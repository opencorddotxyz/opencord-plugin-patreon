import 'react-contexify/ReactContexify.css';

import { ReactNode } from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';

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

const Demo = () => {
  return (
    <Box padding="100px">
      <MenuButton menuId="MENU_ID1">1</MenuButton>
      <Box height={'100px'} />

      <MenuButton menuId="MENU_ID2">2</MenuButton>
      <Box height={'100px'} />
      <MenuButton menuId="MENU_ID3">3</MenuButton>

      <Menu id={'MENU_ID1'}>
        <Item id="copy">Copy</Item>
        <Item id="cut">Cut</Item>
      </Menu>

      <Menu id={'MENU_ID2'}>
        <Item id="copy">Copy</Item>
        <Item id="cut">Cut</Item>
      </Menu>

      <Menu id={'MENU_ID3'}>
        <Item id="copy">Copy</Item>
        <Item id="cut">Cut</Item>
      </Menu>
    </Box>
  );
};

export default Demo;

export const MenuButton = (props: { children: ReactNode; menuId: string }) => {
  const { show } = useContextMenu({
    id: props.menuId,
  });

  return (
    <Box
      onClick={(e) => {
        const { x, y, height } = e.currentTarget.getBoundingClientRect();

        show({
          event: e,
          props: {
            key: 'value',
          },
          position: {
            y: y + height + 5,
            x,
          },
        });
      }}
    >
      {props.children}
    </Box>
  );
};
