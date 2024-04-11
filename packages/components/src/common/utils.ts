export const noop = (): void => {};

export const toKebabCase = (str: string) =>
  str.replace(/[\s_]+/g, "-").toLowerCase();

export const EMPTY_OBJECT = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsObject = Record<string, any>;

export const filterProps = <T extends PropsObject>(
  obj: T,
  excludedProps: string[]
): T => {
  const filteredEntries = Object.entries(obj).filter(
    ([key]) => !excludedProps.includes(key)
  );
  return Object.fromEntries(filteredEntries) as T;
};
