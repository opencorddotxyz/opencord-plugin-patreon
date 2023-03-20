export function isNaN(e: any): boolean {
  return Number.isNaN(e);
}

export function isNullish(e: any): boolean {
  return e === undefined || e === null;
}

export function isNotNullish(e: any): boolean {
  return !isNullish(e);
}

export function isEmptyArray(e: any): boolean {
  return isArray(e) && e.length < 1;
}

export function isEmptyStringOrWhitespace(e: any): boolean {
  return isString(e) && (e.length < 1 || !/\S/.test(e));
}

export function isEmptyObject(e: any): boolean {
  return isObject(e) && Object.keys(e).length < 1;
}

export function isEmptyMapOrSet(e: any): boolean {
  return isNotNullish(e?.size) && e?.size < 1;
}

export function isEmpty(e: any): boolean {
  return (
    isNullish(e) ||
    isEmptyArray(e) ||
    isEmptyStringOrWhitespace(e) ||
    isNaN(e) ||
    isEmptyObject(e) ||
    isEmptyMapOrSet(e)
  );
}

export function isNotEmpty(e: any): boolean {
  return !isEmpty(e);
}

export function isNumber(e: any): boolean {
  return typeof e === 'number';
}

export function isString(e: any): e is string {
  return typeof e === 'string';
}

export function isStringNumber(e: any): boolean {
  if (!isString(e)) {
    return false;
  }

  const number = Number(e);

  return !isNaN(number);
}

export function isIntString(e: any): boolean {
  if (!isString(e)) {
    return false;
  }

  const number = Number(e);

  return !isNaN(number) && Number.isInteger(number);
}

export function isArray(e: any): e is any[] {
  return Array.isArray(e);
}

export function isObject(e: any): e is object {
  return typeof e === 'object' && !isNullish(e) && !isArray(e);
}

export function isDate(e: any): boolean {
  return e instanceof Date;
}
