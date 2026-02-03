import { ButtonGroupProps as RawButtonGroupProps } from "@mui/material";

export interface ButtonGroupProps extends Omit<
  RawButtonGroupProps,
  "variant" | "size"
> {
  /**
   * The background appearance of the button group.
   * @default "matchBackground"
   */
  backgroundAppearance?: "dark" | "matchBackground";
  /**
   * The style of the button group.
   * @default "outline"
   */
  sdsStyle?: "outline";
  /**
   * The type of the button group that determines the color scheme.
   * @default "primary"
   */
  sdsType?: "primary" | "secondary";
  /**
   * The size of the button group.
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
}
