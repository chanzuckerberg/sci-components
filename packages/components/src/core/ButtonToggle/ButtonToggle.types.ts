import { ButtonProps } from "../Button";

export interface ButtonToggleProps extends ButtonProps {
  /**
   * Required. The icon displayed within the component, usually a Phosphor or
   * `@czi-sds/icons` icon, for example `<MagnifyingGlassIcon weight="bold" />`.
   */
  startIcon: React.ReactElement;
  sdsStage?: "on" | "off";
}
