import { Args } from "@storybook/react";
import RawButton from "src/core/Button";
import { BUTTON_TEXT, MINIMAL_PLACEMENT_STYLES } from "../constants";
import Icon from "src/core/Icon";

// Minimal Live Preview Demo

export const MinimalLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={MINIMAL_PLACEMENT_STYLES}>
      <div>
        <RawButton {...props} sdsStyle="minimal" sdsType="primary">
          {BUTTON_TEXT}
        </RawButton>
      </div>

      <div>
        <RawButton
          {...props}
          startIcon={<Icon sdsIcon="Download" sdsSize="s" sdsType="button" />}
          sdsStyle="minimal"
          sdsType="primary"
        >
          {BUTTON_TEXT}
        </RawButton>
      </div>

      <div>
        <RawButton {...props} sdsStyle="minimal" sdsType="secondary">
          {BUTTON_TEXT}
        </RawButton>
      </div>
    </div>
  );
};
