import { Args } from "@storybook/types";
import RawButtonDropdown from "src/core/ButtonDropdown";
import { BUTTON_DROPDOWN_TEXT } from "../constants";
import {
  InvalidIconButtonPropsError,
  InvalidSdsTypeDestructiveError,
  InvalidSdsTypeTertiaryError,
} from "src/core/Button/__storybook__/stories/default";

export const ButtonDropdown = (props: Args): JSX.Element => {
  const { sdsStyle, icon, sdsType, ...rest } = props;

  if (sdsStyle === "icon" && icon === undefined) {
    return InvalidIconButtonPropsError;
  }

  if (sdsStyle !== "icon" && sdsType === "tertiary") {
    return InvalidSdsTypeTertiaryError;
  }

  if (sdsStyle === "icon" && sdsType === "destructive") {
    return InvalidSdsTypeDestructiveError;
  }

  return (
    <RawButtonDropdown
      sdsStyle={sdsStyle}
      icon={icon}
      sdsType={sdsType}
      {...rest}
    >
      {BUTTON_DROPDOWN_TEXT}
    </RawButtonDropdown>
  );
};
