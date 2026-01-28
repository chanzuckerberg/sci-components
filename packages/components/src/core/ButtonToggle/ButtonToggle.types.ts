import { ButtonProps } from "../Button";
import { IconNameToSizes } from "../Icon";

export interface ButtonToggleProps extends ButtonProps {
  startIcon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsStage?: "on" | "off";
}
