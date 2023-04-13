import { ReactNode } from 'react';
import { BottomSheet as ReactSpringBottomSheet } from 'react-spring-bottom-sheet';

import { isNotEmpty } from '@/utils/core/is';
import { store, useStore } from '@/utils/store/useStore';

const kShowButtonSheet = 'kShowButtonSheet';

export const openButtonSheet = (content: ReactNode) => {
  store.set(kShowButtonSheet, content);
};

export const dismissButtonSheet = () => {
  store.set(kShowButtonSheet, undefined);
};

export const BottomSheet = () => {
  const [sheetContent] = useStore(kShowButtonSheet);

  const isOpen = isNotEmpty(sheetContent);

  return (
    <ReactSpringBottomSheet open={isOpen} onDismiss={dismissButtonSheet}>
      {sheetContent}
    </ReactSpringBottomSheet>
  );
};
