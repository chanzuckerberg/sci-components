import { noop } from "src/common/utils";
import { StyledInputDropdown } from "../style";
import { INPUT_CHECKBOX_LIVE_PREVIEW_STYLES } from "src/core/InputCheckbox/__storybook__/constants";

export const MinimalLivePreviewDemo = (): JSX.Element => {
  return (
    <div style={INPUT_CHECKBOX_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle="minimal"
        sdsType="label"
        multiple={false}
        data-testid="InputDropdown"
      />

      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle="minimal"
        sdsType="value"
        value="Value"
        multiple={false}
        data-testid="InputDropdown"
        style={{ marginLeft: 80, marginRight: 16 }}
      />
    </div>
  );
};
