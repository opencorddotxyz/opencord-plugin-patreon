import { toInt } from './base';
import { isIntString, isString } from './is';

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

export const hexWithOpacity = (hexValue: string, opacity = 1) => {
  const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = hexValue.replace(rgx, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!rgb) {
    return hexValue;
  }
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
