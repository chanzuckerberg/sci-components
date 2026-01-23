import { ButtonV2Props } from "../ButtonV2";
import { IconNameToSizes } from "../Icon";

export interface ButtonToggleV2Props extends ButtonV2Props {
  startIcon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsStage?: "on" | "off";
}
