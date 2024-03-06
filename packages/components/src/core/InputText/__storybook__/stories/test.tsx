import { FormControl } from "@mui/material";
import { Args } from "@storybook/react";
import RawInputText from "src/core/InputText";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <FormControl>
      <RawInputText
        {...props}
        id="test-textField"
        sdsType="textField"
        label="Label"
        hideLabel={false}
        placeholder="Value"
        data-testid="inputTextBase"
      />

      {/* @ts-expect-error testing fail state */}
      <RawInputText
        sdsType="textField"
        hideLabel={false}
        data-testid="inputTextFail"
      />

      <RawInputText
        id="test-hide-label"
        sdsType="textField"
        label="Hidden Label"
        hideLabel
        data-testid="inputTextHideLabel"
      />

      <RawInputText
        id="test-textArea"
        sdsType="textArea"
        label="Label"
        hideLabel={false}
        placeholder="Value"
        data-testid="inputTextArea"
      />
    </FormControl>
  );
};
