import debounce from 'lodash/debounce';
import { InputHTMLAttributes, useRef } from 'react';

import { Box, BoxProps } from '../core/Box';

interface ISelectFile extends Pick<BoxProps, 'children'> {
  fileProps?: Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'accept' | 'multiple'
  >;
  selectChange: (files: FileList | null) => void;
  boxProps?: Omit<BoxProps, 'children'>;
}

export const BASIC_ACCEPT_IMAGE = ['png', 'jpg', 'jpeg'];

export const SelectImage = (props: ISelectFile) => {
  const { selectChange, fileProps } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSelectFileRef = useRef<boolean>(false);
  const debounceClick = debounce(() => {
    isSelectFileRef.current = false;
  }, 500);

  return (
    <Box position="relative" overflow="auto">
      <input
        className="custom-file-input"
        style={{
          opacity: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
        type={'file'}
        ref={inputRef}
        onClick={(event) => {
          if (isSelectFileRef.current) {
            event.preventDefault();

            return;
          }
          isSelectFileRef.current = true;
          debounceClick();
        }}
        onChange={(event) => {
          selectChange(event.target.files);
          if (inputRef.current !== null) {
            inputRef.current.value = '';
          }
        }}
        {...fileProps}
        accept={`image/${BASIC_ACCEPT_IMAGE.join(', image/')}`}
      />
      <Box>{props.children}</Box>
    </Box>
  );
};
