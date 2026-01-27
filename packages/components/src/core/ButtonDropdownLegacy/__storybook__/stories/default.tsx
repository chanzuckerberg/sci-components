import { Args } from "@storybook/react-webpack5";
import RawButtonDropdownLegacy from "src/core/ButtonDropdownLegacy";
import { BUTTON_DROPDOWN_TEXT } from "../constants";
import {
  InvalidIconButtonPropsError,
  InvalidSdsTypeDestructiveError,
  InvalidSdsTypeTertiaryError,
} from "src/core/ButtonLegacy/__storybook__/stories/default";
import Icon from "src/core/Icon";
import Callout from "src/core/Callout";

export const ButtonDropdownLegacy = (props: Args): JSX.Element => {
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
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>ButtonDropdownLegacy</strong> component is deprecated!
            <br />
            Please use <strong>ButtonDropdown</strong> component instead.
          </>
        }
      />
      <RawButtonDropdownLegacy
        sdsStyle={sdsStyle}
        icon={icon}
        sdsType={sdsType}
        {...rest}
      >
        {BUTTON_DROPDOWN_TEXT}
      </RawButtonDropdownLegacy>
    </>
  );
};
