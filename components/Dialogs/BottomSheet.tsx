import { memo, ReactNode, useMemo } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { isNotEmpty } from '@/utils/core/is';
import { store, useStore } from '@/utils/store/useStore';

const kShowButtonSheet = 'kShowButtonSheet';

export const openButtonSheet = (content: ReactNode) => {
  store.set(kShowButtonSheet, content);
};

export const dismissButtonSheet = () => {
  store.set(kShowButtonSheet, undefined);
};

const _BottomSheet = () => {
  const [sheetContent] = useStore(kShowButtonSheet);

  const isOpen = useMemo(() => {
    return isNotEmpty(sheetContent);
  }, [sheetContent]);

  return (
    <BottomSheet open={isOpen} onDismiss={dismissButtonSheet}>
      {sheetContent}
    </BottomSheet>
  );
};

export const ButtonSheet = memo(_BottomSheet);
