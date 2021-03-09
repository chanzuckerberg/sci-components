import DeleteIcon from "@material-ui/icons/Delete";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "./index";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Button", module).add("default", () => (
  <Button onClick={actions.onClick}>{text}</Button>
));

storiesOf("Button", module).add("primary", () => (
  <Button onClick={actions.onClick} color="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("secondary", () => (
  <Button variant="outlined" disableElevation {...actions} color="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("disabled", () => (
  <Button variant="contained" disabled {...actions} color="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("startIcon", () => (
  <Button
    variant="contained"
    disableElevation
    startIcon={<DeleteIcon />}
    {...actions}
    color="primary"
  >
    {text}
  </Button>
));
