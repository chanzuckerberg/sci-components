import { ButtonGroupProps as RawButtonGroupProps } from "@mui/material";

export interface ButtonGroupProps extends Omit<
  RawButtonGroupProps,
  "variant" | "size"
> {
  /**
   * Tells the group which surface it sits on so it can pick colors with enough
   * contrast.
   * @default "matchBackground"
   */
  backgroundAppearance?: "dark" | "matchBackground";
  /**
   * Style of the button group. Outline is the only value.
   * @default "outline"
   */
  sdsStyle?: "outline";
  /**
   * Color scheme applied to every button in the group.
   * @default "primary"
   */
  sdsType?: "primary" | "secondary";
  /**
   * Size of the group. It is injected into each Button and ButtonToggle child,
   * so setting size on an individual button has no effect.
   * @default "large"
   */
  size?: "small" | "medium" | "large";
}
