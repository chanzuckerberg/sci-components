import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Notification from "./index";

storiesOf("Notification", module).add("basic", () => (
  <>
    <Notification>
      This is a non-dismissable Notification with no extra content!
    </Notification>

    <Notification onClose={() => {}}>
      This is a dismissable Notification!
    </Notification>

    <Notification title="This is a Notification with extra content">
      <div>
        <p>extra content</p>
        <Button>Click me!</Button>
      </div>
    </Notification>

    <Notification
      onClose={() => {}}
      title="This is a Notification with extra content that's dismissable"
    >
      <div>
        <p>extra content</p>
        <Button>Click me!</Button>
      </div>
    </Notification>
  </>
));

storiesOf("Notification", module).add("intent", () => (
  <div>
    <Notification severity="success">
      This is a success Notification!
    </Notification>
    <Notification severity="warning">
      This is a warning Notification!
    </Notification>
    <Notification severity="error">This is an error Notification!</Notification>
    <Notification severity="info">This is an info Notification!</Notification>
  </div>
));
