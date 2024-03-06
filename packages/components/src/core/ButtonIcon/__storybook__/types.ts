import {
  ButtonIconExtraProps,
  ButtonIconSizeToTypes,
} from "src/core/ButtonIcon/style";

export type SDSTypes = NonNullable<
  | ButtonIconExtraProps<"small">["sdsType"]
  | ButtonIconExtraProps<"medium">["sdsType"]
  | ButtonIconExtraProps<"large">["sdsType"]
>[];

export type SDSSizes = (keyof ButtonIconSizeToTypes)[];
