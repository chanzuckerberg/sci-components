export const noop = (): void => {};

export const toKebabCase = (str: string) =>
  str.replace(/[\s_]+/g, "-").toLowerCase();

export const EMPTY_OBJECT = {};
