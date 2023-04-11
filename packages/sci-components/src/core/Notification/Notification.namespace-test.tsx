import { Notification, NotificationProps } from "@czifui/sci-components";
import React from "react";
import { noop } from "src/common/utils";

const NotificationNameSpaceTest = (props: NotificationProps) => {
  return (
    <Notification
      autoDismiss
      dismissed={false}
      slideDirection="left"
      intent="info"
      onClose={noop}
      buttonOnClick={noop}
      buttonText="Text"
    >
      This is a notification!
    </Notification>
  );
};
