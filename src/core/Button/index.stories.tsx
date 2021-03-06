import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Button", module).add("default", () => (
  <Button text={text} {...actions} />
));
