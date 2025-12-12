import { Args } from "@storybook/react-webpack5";
import IntentMessage from "src/core/IntentMessage";
import InputText from "src/core/InputText";

export const PasswordDemo = (props: Args): JSX.Element => {
  return (
    <div style={{ width: 400 }}>
      <IntentMessage {...props}>
        <InputText
          label="Enter a Password"
          id="password-input"
          placeholder="Password"
          type="password"
          intent="negative"
        />
      </IntentMessage>
    </div>
  );
};
