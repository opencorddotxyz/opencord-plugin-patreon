import { isNotEmpty } from '@/utils/core/is';
import { store, useStore } from '@/utils/store/useStore';

import { Box } from '../core/Box';
import { Center } from '../core/Flex';

const kShowToast = 'kShowToast';
let preTimer: any = undefined;

export const showToast = (text: string, props?: { duration: number }) => {
  const { duration = 2000 } = props ?? {};
  clearTimeout(preTimer);
  store.set(kShowToast, text.trim());
  preTimer = setTimeout(() => {
    hideToast();
  }, duration);
};

export const hideToast = () => {
  store.set(kShowToast, undefined);
};

export const Toast = () => {
  const [text] = useStore(kShowToast);
  const show = isNotEmpty(text);

  return show ? (
    <Center
      width="100vw"
      top="30px"
      left="0"
      position="fixed"
      zIndex={10}
      pointerEvents="none"
    >
      <Center
        maxWidth="500px"
        padding="6px 20px"
        borderRadius="16px"
        background="#3B3B3B"
        boxShadow="0px 4px 6px rgba(40, 40, 40, 0.25)"
      >
        {text}
      </Center>
    </Center>
  ) : (
    <Box />
  );
};
