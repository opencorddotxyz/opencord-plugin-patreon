export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copy: any[] = [];
    obj.forEach((item, index) => {
      copy[index] = deepClone(item);
    });

    return copy as unknown as T;
  }

  const copy = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      (copy as any)[key] = deepClone((obj as any)[key]);
    }
  }

  return copy;
};
