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
      The text button is not yet implemented in the sds, so the button has the
      correct styles but does not use the sdsProps to set the style. This will
      be patched once the button styles are updated.
    </p>
    <Notification>
      This is a non-dismissable Notification with no extra content!
    </Notification>

    <Notification onClose={() => {}}>
      This is a dismissable Notification!
    </Notification>

    <Notification sdsAction={actions.onClick} sdsActionText="Click Me!">
      This is a Notification with extra content
      <div>extra content</div>
    </Notification>

    <Notification
      onClose={() => {}}
      sdsAction={actions.onClick}
      sdsActionText="Click Me!"
    >
      This is a Notification with extra content that is dismissable
      <div>extra content</div>
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
