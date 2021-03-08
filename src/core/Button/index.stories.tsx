import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "./";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Button", module).add("default", () => (
  <Button {...actions}>{text}</Button>
));
