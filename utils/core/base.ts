import { isEmpty } from './is';

export const timestamp = () => new Date().getTime();

export const delay = async (time: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, time));

export const printf = (...v: any[]) => console.log(...v);

export const printJson = (obj: any) =>
  console.log(JSON.stringify(obj, undefined, 4));

export const firstOf = <T = any>(dataSets?: T[]) =>
  dataSets ? (dataSets.length < 1 ? undefined : dataSets[0]) : undefined;

export const lastOf = <T = any>(dataSets?: T[]) =>
  dataSets
    ? dataSets.length < 1
      ? undefined
      : dataSets[dataSets.length - 1]
    : undefined;

export const randomInt = (min: number, max?: number) => {
  if (!max) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const pickOne = <T = any>(dataSets: T[]) =>
  dataSets.length < 1 ? undefined : dataSets[randomInt(dataSets.length - 1)];

export const range = (start: number, end?: number) => {
  if (!end) {
    end = start;
    start = 0;
  }

  return Array.from({ length: end - start }, (_, index) => start + index);
};

export function clamp(num: number, min: number, max: number): number {
  return num < max ? (num > min ? num : min) : max;
}

export function toInt(str: string) {
  return parseInt(str, 10);
}

export function toDouble(str: string) {
  return parseFloat(str);
}

export const toFixed = (n: number, fractionDigits = 2) => {
  let s = n.toFixed(fractionDigits);
  while (s[s.length - 1] === '0') {
    s = s.substring(0, s.length - 1);
  }
  if (s[s.length - 1] === '.') {
    s = s.substring(0, s.length - 1);
  }

  return s;
};

export const toSet = <T = any>(dataSets: T[], byKey?: (e: T) => any) => {
  if (byKey) {
    const keys = {};
    const newDataSets: T[] = [];
    dataSets.forEach((e) => {
      const key = jsonEncode({ key: byKey(e) }) as any;
      if (!keys[key]) {
        newDataSets.push(e);
        keys[key] = true;
      }
    });

    return newDataSets;
  }

  return Array.from(new Set(dataSets));
};

export function jsonEncode(obj: any, prettier = false) {
  try {
    return prettier ? JSON.stringify(obj, undefined, 4) : JSON.stringify(obj);
  } catch (error) {
    return undefined;
  }
}

export function jsonDecode(json: string | undefined) {
  if (json == undefined) return undefined;
  try {
    return JSON.parse(json!);
  } catch (error) {
    return undefined;
  }
}

export function withDefault<T = any>(e: any, defaultValue: T): T {
  return isEmpty(e) ? defaultValue : e;
}
