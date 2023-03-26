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
