import { ReactNode } from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';

import { Box, BoxProps, getBoxProps } from '@/components/core/Box';

interface MenuButtonProps extends BoxProps {
  id: string;
  menuItems: any[];
  menuItemBuilder: (data: any, idx: number) => ReactNode;
  disable?: boolean;
  menuWidth?: number;
  onShow?: () => void;
}

export const MenuButton = (props: MenuButtonProps) => {
  const {
    id,
    menuItems,
    menuItemBuilder,
    menuWidth = 220,
    children,
    disable,
    onShow,
    ...basicProps
  } = props;

  const boxProps = getBoxProps({ ...basicProps, userSelect: 'none' });

  const { show } = useContextMenu({
    id,
  });

  return (
    <Box
      {...boxProps}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (disable) {
          return;
        }
        onShow?.();
        const { x, y, height, width } = e.currentTarget.getBoundingClientRect();
        show({
          event: e,
          props: {
            key: 'value',
          },
          position: {
            y: y + height + 5,
            x: x - menuWidth + width,
          },
        });
      }}
    >
      <Menu id={id} theme="oc-menu">
        {menuItems.map((data, idx) => {
          return (
            <Item
              // eslint-disable-next-line react/no-array-index-key
              key={id + idx}
              id={id + idx}
              data={undefined}
            >
              {menuItemBuilder(data, idx)}
            </Item>
          );
        })}
      </Menu>
      {children}
    </Box>
  );
};
