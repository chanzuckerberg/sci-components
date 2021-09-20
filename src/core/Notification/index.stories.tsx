import { storiesOf } from "@storybook/react";
import React from "react";
import Notification from "./index";

storiesOf("Notification", module).add("basic", () => (
  <>
    <Notification onClose={() => {}}>
      This is a dismissable Notification!
    </Notification>
    <Notification title="This is a Notification">
      <div>hold for content</div>
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
