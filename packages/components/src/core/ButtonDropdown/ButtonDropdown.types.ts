import { ButtonProps } from "@components/src/core/Button";

export interface ButtonDropdownProps extends Omit<ButtonProps, "sdsType"> {
  sdsType?: "primary" | "secondary";
}
