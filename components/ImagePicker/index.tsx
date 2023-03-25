import { ReactNode, useRef } from 'react';

import { BoxProps } from '../core/Box';
import { Stack } from '../core/Stack';
import { Position } from '../core/Stack/position';

interface ImagePickerProps extends BoxProps {
  onSelect: (files: File[]) => void;
  accept?: string[];
  multiple?: boolean;
  children: ReactNode;
}

const kAcceptImageTypes = ['png', 'jpg', 'jpeg'];

export const loadImageFromFiles = async (
  files: File[],
  props?: {
    timeout?: number;
  },
): Promise<string | undefined> => {
  const { timeout = 1000 } = props ?? {};

  return new Promise((resolve) => {
    const file = files[0];
    if (!file) {
      resolve(undefined);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const imageDataUrl = reader.result;
      resolve(imageDataUrl as any);
    };
    setTimeout(() => {
      resolve(undefined);
    }, timeout);
  });
};

export const ImagePicker = (props: ImagePickerProps) => {
  const { accept, multiple = false, onSelect, children, ...boxProps } = props;

  const inputRef = useRef<HTMLInputElement>();

  const accepts = (accept ?? kAcceptImageTypes)
    .map((e) => 'image/' + e)
    .join(', ');

  return (
    <Stack {...boxProps}>
      {children}
      <Position size="100%">
        <input
          ref={inputRef as any}
          style={{
            opacity: '0',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
          type={'file'}
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            onSelect(files);
          }}
          multiple={multiple}
          accept={accepts}
        />
      </Position>
    </Stack>
  );
};
