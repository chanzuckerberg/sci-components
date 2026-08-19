import { ButtonProps } from "../Button";
import { IconNameToSizes } from "../Icon";

export interface ButtonToggleProps extends ButtonProps {
  /**
   * Required. The icon displayed within the component. Pass the SDS Icon
   * component, for example `<Icon sdsIcon="Search" sdsSize="s" />`.
   */
  startIcon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsStage?: "on" | "off";
}
