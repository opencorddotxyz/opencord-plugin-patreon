import Compressor from 'compressorjs';

import { createObjectUploads } from '@/net/http/_mock';
import {
  UploadPayloadRequest,
  UploadPresignedObject,
} from '@/net/http/patreonComponents';

import { isEmpty, isNotEmpty } from './core/is';

const cachedUploadedImages = new Map<string, string>();

export enum ImageType {
  'AVATAR' = 1,
  'NFT' = 2,
}
export enum OwnerType {
  USER = 1,
  SERVER = 2,
}

export enum UploadStatus {
  start = 1,
  uploadSuccess = 2,
  uploadFail = 3,
}

export const getLocalFilePath = (file: File) => {
  const _URL = window.URL || window.webkitURL;
  const localPath = _URL.createObjectURL(file);
  // ? when to revoke
  // _URL.revokeObjectURL(localPath);

  return localPath;
};

interface UploadFileOptions {
  type: ImageType;
  statusCallback?: (index: number, status: UploadStatus) => void;
  indexOffset?: number;
}

export async function uploadImage(
  file: File,
  options: UploadFileOptions,
  compress = true,
) {
  let processedFile = file;
  if (compress) {
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
  }

  const currentFilePath = getLocalFilePath(processedFile);
  const cachedFileUrl = cachedUploadedImages.get(currentFilePath);
  const cached = isNotEmpty(cachedFileUrl);
  if (cached) {
    return cachedFileUrl;
  }
  const result = await createObjectUploads({
    payloads: [
      {
        index: 0,
        type: options.type,
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
    // cache uploaded file url
    cachedUploadedImages.set(currentFilePath, url);

    return url;
  }
}

export async function uploadFile(
  files: FileList | File[],
  type: ImageType,
  statusCallback?: (index: number, status: number) => void,
  indexOffset = 0,
) {
  const results = await uploadFiles(files, {
    type,
    statusCallback,
    indexOffset,
  });

  return results
    ?.map((val) => {
      return val?.uploadedUrl;
    })
    .filter((e) => {
      // filter not null file url
      return !e;
    });
}

type uploadFileRequestType = {
  file?: File;
  cached?: boolean;
  localPath?: string;
  uploadedUrl?: string;
};

/**
 * Batch upload files.
 *
 * If one file upload failed, its url will be undefined
 */
export async function uploadFiles(
  files: FileList | File[],
  options: UploadFileOptions,
): Promise<uploadFileRequestType[] | undefined> {
  const _indexOffset = options.indexOffset ?? 0;
  const _statusCallback = (index: number, status: UploadStatus) => {
    options.statusCallback?.(index + _indexOffset, status);
  };

  const cFileArray = Array.from(files).map((val) => {
    if (val.type.toLocaleLowerCase() === 'gif') {
      return Promise.resolve(val);
    } else {
      const comImage = new Promise((resolve) => {
        new Compressor(val, {
          quality: 0.6,
          maxWidth: Infinity,
          maxHeight: Infinity,
          success: (result: File) => {
            resolve(result);
          },
          error: () => {
            resolve(val);
          },
        });
      }) as Promise<File>;

      return comImage;
    }
  });

  const filesArray: File[] = await Promise.all(cFileArray);
  const needUploadedFilesIndexes: number[] = [];
  const needUploadedFilesRequestPayloads: UploadPayloadRequest[] = [];
  const tempFiles = filesArray.map((file, index) => {
    const currentFilePath = getLocalFilePath(file);
    const cachedFileUrl = cachedUploadedImages.get(currentFilePath);
    const cached = isNotEmpty(cachedFileUrl);
    if (cached) {
      // callback upload successes
      _statusCallback(index, UploadStatus.uploadSuccess);
    } else {
      // need to upload
      needUploadedFilesIndexes.push(index);
      needUploadedFilesRequestPayloads.push({
        index: needUploadedFilesRequestPayloads.length,
        type: options.type,
        contentType: file.type,
        contentLength: file.size,
      });
      // callback start upload

      _statusCallback(index, UploadStatus.start);
    }

    return {
      file,
      cached,
      localPath: currentFilePath,
      uploadedUrl: cachedFileUrl,
    };
  });

  if (isEmpty(needUploadedFilesRequestPayloads)) {
    // all files cached
    return tempFiles.map((e) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { uploadedUrl: e.uploadedUrl! };
    });
  }
  // !http get upload url
  const result = await createObjectUploads({
    payloads: needUploadedFilesRequestPayloads,
  });

  const fileUploadUrls: UploadPresignedObject[] | undefined =
    result?.data?.objects;

  if (result.code || !fileUploadUrls) {
    // all need upload files upload failed
    return undefined;
  }

  const uploadTasks = fileUploadUrls.map((uploadUrl, index) => {
    const reqHeader = {};
    uploadUrl.headers.forEach((header) => {
      reqHeader[header.key] = header.value;
    });

    return fetch(uploadUrl.urls, {
      method: 'PUT',
      headers: reqHeader,
      body: tempFiles[needUploadedFilesIndexes[index]].file,
    }).catch(() => {
      return undefined;
    });
  });

  const results = await Promise.all(uploadTasks);

  results.forEach((response, index) => {
    const fileIdx = needUploadedFilesIndexes[index];
    if (response?.status !== 200) {
      // callback file upload failed
      _statusCallback(fileIdx, UploadStatus.uploadFail);
    } else {
      const url = new URL(response.url).pathname;
      tempFiles[fileIdx].uploadedUrl = url;
      // callback file upload successed
      _statusCallback(index, UploadStatus.uploadSuccess);
      // cache uploaded file url
      cachedUploadedImages.set(tempFiles[fileIdx].localPath, url);
    }
  });

  return tempFiles;
}
