import Compressor from 'compressorjs';

import { createObjectUploads } from '@/net/http/patreon';
import { UploadPresignedObject } from '@/net/http/patreonComponents';

export enum ImageType {
  'AVATAR' = 1,
  'NFT' = 2,
}

/**
 * Only return relative path
 */
export async function uploadImage(
  file: File,
  props: {
    type: ImageType;
    compress?: boolean;
  },
) {
  let processedFile = file;
  const { type, compress = true } = props;
  if (compress) {
    try {
      processedFile = await new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          maxWidth: Infinity,
          maxHeight: Infinity,
          success: (result: File) => {
            resolve(result);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
    } catch (error) {
      console.error(error);
      throw new Error('compress image fail');
    }
  }

  const result = await createObjectUploads({
    payloads: [
      {
        type,
        index: 0,
        contentType: processedFile.type,
        contentLength: processedFile.size,
      },
    ],
  });

  const uploadUrl: UploadPresignedObject | undefined =
    result?.data?.objects?.[0];

  if (result.code || !uploadUrl) {
    return undefined;
  }

  const reqHeader = {};
  uploadUrl.headers.forEach((header) => {
    reqHeader[header.key] = header.value;
  });

  const response = await fetch(uploadUrl.urls, {
    method: 'PUT',
    headers: reqHeader,
    body: processedFile,
  }).catch(() => {
    return undefined;
  });

  if (response?.status !== 200) {
    return undefined;
  } else {
    const url = new URL(response.url).pathname;

    return url;
  }
}
