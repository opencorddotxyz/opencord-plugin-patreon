import NextImage from 'next/image';
import { forwardRef, ReactNode, useState } from 'react';

import { isEmpty } from '@/utils/core/is';

import { BoxProps, getBoxProps } from './Box';
import { Center } from './Flex';

interface ImageProps extends BoxProps {
  src?: string;
  alt?: string;
  onLoad?: ReactNode;
  onError?: ReactNode;
}

export const Imagex = forwardRef((props: ImageProps, ref: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const boxProps = getBoxProps({
    ...props,
    extStyle: {
      ...props.extStyle,
      display: isLoaded && !isError ? 'block' : 'none',
      objectFit: 'cover',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  });

  const {
    src,
    alt = '',
    onLoad = (
      <Center
        {...boxProps}
        extStyle={{
          display: 'block',
        }}
      />
    ),
    onError = (
      <Center
        {...boxProps}
        extStyle={{
          display: 'block',
          color: '#666',
          textAlign: 'center',
          overflow: 'hidden',
          background: props.background ?? '#fff',
        }}
      >
        None
      </Center>
    ),
  } = props;

  return isEmpty(src) ? (
    (onError as any)
  ) : (
    <>
      <NextImage
        alt={alt}
        ref={ref}
        src={src!}
        {...boxProps}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
      {!isLoaded && !isError ? onLoad : undefined}
      {isError ? onError : undefined}
    </>
  );
});
