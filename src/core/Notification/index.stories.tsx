import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Notification from "./index";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Notification", module).add("basic", () => (
  <>
    <p>
      The text button is not yet implemented in the sds, so the button does not
      have the correct styles
    </p>
    <Notification>
      This is a non-dismissable Notification with no extra content!
    </Notification>

    <Notification onClose={() => {}}>
      This is a dismissable Notification!
    </Notification>

    <Notification
      title="This is a Notification with extra content"
      sdsAction={actions.onClick}
      sdsActionText="Click Me!"
    >
      <div>
        <p>extra content</p>
      </div>
    </Notification>

    <Notification
      onClose={() => {}}
      title="This is a Notification with extra content that's dismissable"
      sdsAction={actions.onClick}
      sdsActionText="Click Me!"
    >
      <div>
        <p>extra content</p>
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
