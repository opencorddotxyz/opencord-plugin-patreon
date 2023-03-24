import { ReactNode } from 'react';
import { useContextMenu } from 'react-contexify';

import { Box } from '@/components/core/Box';

export const MenuButton = (props: { children: ReactNode; menuId: string }) => {
  const { show } = useContextMenu({
    id: props.menuId,
  });
  const menuDefaultWidth = 220;

  return (
    <Box
      style={{
        userSelect: 'none',
      }}
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
