import { Args } from "@storybook/react-vite";
import IntentMessage from "@components/src/core/IntentMessage";
import InputText from "@components/src/core/InputText";

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
