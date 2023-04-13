import '@szhsin/react-menu/dist/index.css';

import { ControlledMenu, MenuItem, useClick } from '@szhsin/react-menu';
import { ReactNode, useRef, useState } from 'react';

import { Box, BoxProps, getBoxProps } from '@/components/core/Box';
import { useBreakpoint } from '@/hooks/core/useBreakpoint';

import { openButtonSheet } from '../Dialogs/BottomSheet';

interface MenuButtonProps extends BoxProps {
  id: string;
  menu?: ReactNode;
  menuItems?: any[];
  menuItemBuilder?: (data: any, idx: number) => ReactNode;
  disable?: boolean;
  menuWidth?: number;
  menuHeight?: number;
  onShow?: () => void;
}

export const MenuButton = (props: MenuButtonProps) => {
  const {
    id,
    menu,
    menuItems,
    menuItemBuilder,
    menuWidth = 220,
    menuHeight = 175,
    children,
    disable,
    onShow,
    ...basicProps
  } = props;
  const { isMobile } = useBreakpoint();

  const boxProps = getBoxProps({ ...basicProps, userSelect: 'none' });

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const anchorProps = useClick(isOpen, async (isOpen, e) => {
    if (disable) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    try {
      const shouldShow = await onShow?.();
      if (!shouldShow) {
        return;
      }
      if (isMobile) {
        return openButtonSheet(menu);
      }
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Box {...boxProps} ref={ref} {...anchorProps}>
        {children}
      </Box>
      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onClose={() => {
          setOpen(false);
        }}
        offsetX={-140}
      >
        <Box
          width={menuWidth}
          maxHeight={menuHeight}
          overflowY="scroll"
          className="hide-scrollbar"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {menu ??
            menuItems?.map((data, idx) => {
              return (
                <MenuItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={id + idx}
                >
                  {menuItemBuilder?.(data, idx)}
                </MenuItem>
              );
            })}
        </Box>
      </ControlledMenu>
    </>
  );
};
