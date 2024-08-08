"use client";

export const noop = (): void => {};

export const toKebabCase = (str: string) =>
  str.replace(/[\s_]+/g, "-").toLowerCase();

export const EMPTY_OBJECT = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { [key: string]: any };

export function filterProps<T extends Props, K extends keyof T>(
  props: T,
  excludeProps: K[]
): Partial<T> {
  const result: Partial<T> = {};

  for (const key of Object.keys(props) as (keyof T)[]) {
    if (!excludeProps.includes(key as K)) {
      result[key] = props[key];
    }
  }

  return result;
}
