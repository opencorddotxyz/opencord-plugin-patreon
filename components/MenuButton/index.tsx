import { ReactNode } from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';

import { Box, BoxProps, getBoxProps } from '@/components/core/Box';

interface MenuButtonProps extends BoxProps {
  id: string;
  menu?: ReactNode;
  menuItems?: any[];
  menuItemBuilder?: (data: any, idx: number) => ReactNode;
  disable?: boolean;
  menuWidth?: number;
  onShow?: () => void;
}

export const MenuButton = (props: MenuButtonProps) => {
  const {
    id,
    menu,
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

  const _menu = menu ?? (
    <Menu id={id} theme="oc-menu">
      {menuItems?.map((data, idx) => {
        return (
          <Item
            // eslint-disable-next-line react/no-array-index-key
            key={id + idx}
            id={id + idx}
            data={undefined}
          >
            {menuItemBuilder?.(data, idx)}
          </Item>
        );
      })}
    </Menu>
  );

  return (
    <Box
      {...boxProps}
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (disable) {
          return;
        }
        const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
        const shouldShow = await onShow?.();
        if (!shouldShow) {
          return;
        }

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
      {_menu}
      {children}
    </Box>
  );
};
