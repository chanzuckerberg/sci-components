import { Args } from "@storybook/react-vite";
import IntentMessage from "@components/src/core/IntentMessage";
import InputCheckbox from "@components/src/core/InputCheckbox";

export const CheckboxDemo = (props: Args): JSX.Element => {
  const { messages } = props;

  return (
    <div style={{ width: 400 }}>
      <IntentMessage {...props}>
        <InputCheckbox
          id="checkbox-demo"
          label="Input Element Group Label"
          caption="Caption"
          intent={messages[0]?.intent}
        />
      </IntentMessage>
    </div>
  );
};
