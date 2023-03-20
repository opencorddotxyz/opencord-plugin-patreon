import { isIntString, isString } from './is';
import { toInt } from './number';

export type TDate = number | string | Date;

/**
 * @param date 1650815117544
 * @param fmt yyyy-MM-dd hh:mm:ss
 * @returns 2022-04-24 23:45:17
 */
export function toDate(time: TDate): Date {
  if (isString(time) && isIntString(time as string)) {
    const timestamp = toInt(time as string) as number;

    return new Date(timestamp);
  }

  return new Date(time);
}

export const formatDate = (
  date: TDate = new Date(),
  fmt = 'yyyy-MM-dd hh:mm:ss',
): string => {
  let resFmt = fmt;
  const newDate = toDate(date);

  const o: any = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    S: newDate.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    const a = (/(y+)/.exec(fmt) || [])[1] || '';
    resFmt = fmt.replace(a, String(newDate.getFullYear()).slice(4 - a.length));
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const a = (new RegExp(`(${k})`).exec(fmt) || [])[1] || '';
      resFmt = resFmt.replace(
        a,
        a.length === 1 ? o[k] : `00${o[k]}`.slice(String(o[k]).length),
      );
    }
  }

  return resFmt;
};
