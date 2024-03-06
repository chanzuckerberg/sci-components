import { Args } from "@storybook/react";
import RawInputText from "src/core/InputText";
import { INPUT_TEXT_LIVE_PREVIEW_ROW_STYLES } from "../constants";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={INPUT_TEXT_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <RawInputText
        id="textFieldPreview"
        label="Label"
        {...props}
        sdsType="textField"
        hideLabel
        placeholder="Value"
        style={{ width: "200px" }}
      />
      <RawInputText
        id="textAreaPreview"
        label="Label"
        {...props}
        sdsType="textArea"
        hideLabel
        placeholder="Value"
        style={{ minWidth: "200px" }}
        inputProps={{ style: { minWidth: "200px" } }}
      />
    </div>
  );
};
