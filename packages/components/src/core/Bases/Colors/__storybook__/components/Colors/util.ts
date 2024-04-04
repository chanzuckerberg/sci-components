export type NestedObject = {
  [key: string]: NestedObject | string;
};

export function flattenObj(
  obj: NestedObject,
  parent: string | null = null,
  res: { [key: string]: string } = {}
) {
  for (const key in obj) {
    const propName = parent ? `${parent}-${key}` : key;
    if (typeof obj[key] === "object") {
      flattenObj(obj[key] as NestedObject, propName, res);
    } else {
      res[obj[key] as string] = propName;
    }
  }
  return res;
}
