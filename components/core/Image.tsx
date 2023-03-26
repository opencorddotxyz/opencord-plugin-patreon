/* eslint-disable @next/next/no-img-element */
import NextImage from 'next/image';
import { forwardRef, ReactNode, useState } from 'react';

import { placeholders } from '@/utils/assets';
import { isEmpty } from '@/utils/core/is';
import { md5 } from '@/utils/md5';

import { BoxProps, getBoxProps } from './Box';
import { Center } from './Flex';

export interface ImageProps extends BoxProps {
  src?: string;
  alt?: string;
  onLoad?: ReactNode;
  onError?: ReactNode;
}

const imgLoader = (p: { src: string }) => p.src;

export const Image = forwardRef((props: ImageProps, ref: any) => {
  const [_isLoaded, setIsLoaded] = useState(false);
  const [_isError, setIsError] = useState(false);

  const isError = isLocalImage(props.src) ? false : _isError;
  const isLoaded = isLocalImage(props.src) ? true : _isLoaded;
  const src = isOSSImage(props.src) ? OSSDomain + props.src : props.src;

  const boxProps = getBoxProps({
    ...props,
    extStyle: {
      ...props.extStyle,
      display:
        isLoaded && !isError
          ? props.display ??
            props.style?.display ??
            props.extStyle?.display ??
            'block'
          : 'none',
      objectFit: 'cover',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  });

  const {
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
      <img
        style={{
          ...boxProps.style,
          display: 'block',
        }}
        src={placeholders('avatar.svg')}
      />
    ),
  } = props;

  return isEmpty(src) ? (
    (onError as any)
  ) : (
    <>
      <NextImage
        ref={ref}
        {...boxProps}
        src={src!}
        alt={alt}
        width={0}
        height={0}
        unoptimized
        loading="eager"
        loader={imgLoader}
        onLoad={() => {
          setIsLoaded(true);
          setIsError(false);
        }}
        onError={() => {
          setIsLoaded(true);
          setIsError(true);
        }}
      />
      {!isLoaded ? onLoad : undefined}
      {isError ? onError : undefined}
    </>
  );
});

const OSSDomain = process.env.NEXT_PUBLIC_APP_ASSETS;

export const isAssetImage = (src?: string) => {
  return src?.startsWith('/assets');
};
export const isOSSImage = (src?: string) => {
  return src?.startsWith('/') && !isAssetImage(src);
};

export const isLocalImage = (url?: string) => {
  return url?.startsWith('data:');
};

export const loadLocalImage = async (
  file: File,
  props?: {
    timeout?: number;
  },
): Promise<string | undefined> => {
  const { timeout = 1000 } = props ?? {};

  return new Promise((resolve) => {
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

type Hash = string;
const localImageCaches: Record<Hash, File> = {};

export const getLocalImageFromHash = (hash: string) => {
  return localImageCaches[hash];
};

export const setLocalImageCaches = (hash: string, file: File) => {
  localImageCaches[hash] = file;
};

export const loadLocalImageWithHash = async (
  file: File,
  props?: {
    timeout?: number;
  },
) => {
  const url = await loadLocalImage(file, props);
  if (url) {
    const hash = md5(url);
    setLocalImageCaches(hash, file);

    return { url, hash };
  }
};
