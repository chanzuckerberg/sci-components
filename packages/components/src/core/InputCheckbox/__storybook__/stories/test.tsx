import { Args } from "@storybook/react-webpack5";
import { INPUT_CHECKBOX_TEST_STYLES } from "../constants";
import { InputCheckbox } from "./default";
import RawInputCheckbox from "src/core/InputCheckbox";

const CheckboxLabelDemo = (props: Args): JSX.Element => {
  const { caption, label, disabled } = props;
  return (
    <div>
      <RawInputCheckbox
        caption={caption}
        label={label}
        disabled={disabled}
        value="Demo"
        {...props}
      />
    </div>
  );
};

export const TestDemo = (): JSX.Element => {
  return (
    <div style={INPUT_CHECKBOX_TEST_STYLES as React.CSSProperties}>
      <div>
        <CheckboxLabelDemo
          caption="Caption"
          label="Label A"
          disabled={false}
          data-testid="labelCheckbox"
        />
      </div>
      <div>
        <InputCheckbox data-testid="checkbox" label="Label" />
      </div>
    </div>
  );
};
