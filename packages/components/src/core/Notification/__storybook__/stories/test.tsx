import { Args } from "@storybook/types";
import RawNotification from "src/core/Notification";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawNotification
      slideDirection="left"
      intent="info"
      {...props}
      data-testid="notification"
    >
      this is a notification
    </RawNotification>
  );
};
