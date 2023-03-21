/* eslint-disable @next/next/no-img-element */
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

const imgLoader = (p: { src: string }) => p.src;

export const Image = forwardRef((props: ImageProps, ref: any) => {
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
        }}
      />
    ),
  } = props;

  return isEmpty(src) ? (
    (onError as any)
  ) : (
    <>
      <NextImage
        ref={ref}
        alt={alt}
        width={0}
        height={0}
        {...boxProps}
        src={src!}
        loading="eager"
        loader={imgLoader}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
      {!isLoaded && !isError ? onLoad : undefined}
      {isError ? onError : undefined}
    </>
  );
});
