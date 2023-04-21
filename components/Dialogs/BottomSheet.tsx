import { ReactNode } from 'react';
import { BottomSheet as ReactSpringBottomSheet } from 'react-spring-bottom-sheet';

import { isNotEmpty } from '@/utils/core/is';
import { store, useStore } from '@/utils/store/useStore';

const kShowBottomSheet = 'kShowBottomSheet';

export const openBottomSheet = (content: ReactNode) => {
  store.set(kShowBottomSheet, content);
};

export const dismissBottomSheet = () => {
  store.set(kShowBottomSheet, undefined);
};

export const BottomSheet = () => {
  const [sheetContent] = useStore(kShowBottomSheet);

  const isOpen = isNotEmpty(sheetContent);

  return (
    <ReactSpringBottomSheet open={isOpen} onDismiss={dismissBottomSheet}>
      {sheetContent}
    </ReactSpringBottomSheet>
  );
};
