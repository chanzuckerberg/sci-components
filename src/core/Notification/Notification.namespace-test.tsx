import { Notification, NotificationProps } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const NotificationNameSpaceTest = (props: NotificationProps) => {
  return (
    <Notification
      autoDismiss
      dismissed={false}
      dismissDirection="left"
      intent="info"
      onClose={noop}
      buttonOnClick={noop}
      buttonText="Text"
    >
      This is a notification!
    </Notification>
  );
};
