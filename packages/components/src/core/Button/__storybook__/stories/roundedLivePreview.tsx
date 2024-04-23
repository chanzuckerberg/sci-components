import { Args } from "@storybook/react";
import RawButton from "src/core/Button";
import { BUTTON_TEXT, DEFAULT_PLACEMENT_STYLES } from "../constants";
import Icon from "src/core/Icon";

// Rounded Live Preview Demo

export const RoundedLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={DEFAULT_PLACEMENT_STYLES}>
      <div>
        <RawButton {...props} sdsStyle="rounded" sdsType="primary">
          {BUTTON_TEXT}
        </RawButton>
      </div>
      <div>
        <RawButton
          {...props}
          startIcon={<Icon sdsIcon="Download" sdsSize="xl" sdsType="button" />}
          sdsStyle="rounded"
          sdsType="primary"
        >
          {BUTTON_TEXT}
        </RawButton>
      </div>
      <div>
        <RawButton {...props} sdsStyle="rounded" sdsType="secondary">
          {BUTTON_TEXT}
        </RawButton>
      </div>
      <div>
        <RawButton
          {...props}
          startIcon={<Icon sdsIcon="Download" sdsSize="s" sdsType="button" />}
          sdsStyle="rounded"
          sdsType="secondary"
        >
          {BUTTON_TEXT}
        </RawButton>
      </div>
    </div>
  );
};
