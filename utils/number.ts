import { isStringNumber } from './is';

export function toInt(str: string): number | undefined {
  if (!isStringNumber(str)) {
    return undefined;
  }

  return parseInt(str, 10);
}
