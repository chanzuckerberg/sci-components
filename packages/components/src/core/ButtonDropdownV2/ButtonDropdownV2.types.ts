import { ButtonV2Props } from "src/core/ButtonV2";

export interface ButtonDropdownV2Props extends Omit<ButtonV2Props, "sdsType"> {
  sdsType?: "primary" | "secondary";
}
