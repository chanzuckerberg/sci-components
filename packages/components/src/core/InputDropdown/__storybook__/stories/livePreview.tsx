import { noop } from "src/common/utils";
import { StyledInputDropdown } from "../style";
import { Args } from "@storybook/react";
import { INPUT_DROPDOWN_LIVE_PREVIEW_ROW_STYLES } from "../constants";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const { sdsStyle } = props;

  return (
    <div style={INPUT_DROPDOWN_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle={sdsStyle}
        sdsType="label"
        multiple={false}
        data-testid="InputDropdown"
      />

      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle={sdsStyle}
        sdsType="value"
        value="Value"
        multiple={false}
        data-testid="InputDropdown"
        style={{ marginLeft: 80, marginRight: 16 }}
      />

      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle={sdsStyle}
        sdsType="value"
        value="Value"
        details="Details"
        shouldPutAColonAfterLabel={false}
        multiple={false}
        data-testid="InputDropdown"
      />
    </div>
  );
};
