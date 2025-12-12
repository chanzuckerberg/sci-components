import { Args } from "@storybook/react-webpack5";
import IntentMessage from "src/core/IntentMessage";
import InputText from "src/core/InputText";

export const IntentMessageDemo = (props: Args): JSX.Element => {
  return (
    <div style={{ width: 400 }}>
      <IntentMessage {...props}>
        <InputText
          label="Input Label"
          hideLabel
          id="input-example"
          placeholder="Input placeholder"
        />
      </IntentMessage>
    </div>
  );
};
