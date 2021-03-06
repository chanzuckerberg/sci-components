import DeleteIcon from "@material-ui/icons/Delete";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Tooltip from "../Tooltip";
import Button from "./index";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Button", module).add("default", () => (
  <Button variant="contained" onClick={actions.onClick}>
    {text}
  </Button>
));

storiesOf("Button", module).add("primary", () => (
  <Button variant="contained" onClick={actions.onClick} color="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("primaryRounded", () => (
  <Button
    variant="contained"
    onClick={actions.onClick}
    color="primary"
    isRounded
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("secondary", () => (
  <Button variant="outlined" onClick={actions.onClick} color="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("disabled", () => (
  <Button
    variant="contained"
    disabled
    onClick={actions.onClick}
    color="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("startIcon", () => (
  <Button
    variant="contained"
    startIcon={<DeleteIcon />}
    onClick={actions.onClick}
    color="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("with Tooltip", () => (
  <Tooltip title="tooltip here">
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={actions.onClick}
      color="primary"
    >
      With Tooltip!
    </Button>
  </Tooltip>
));
