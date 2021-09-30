import DeleteIcon from "@material-ui/icons/Delete";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "./index";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Button", module).add("Rounded Primary", () => (
  <Button onClick={actions.onClick} sdsStyle="rounded" sdsType="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("Rounded Primary Disabled", () => (
  <Button
    disabled
    onClick={actions.onClick}
    sdsStyle="rounded"
    sdsType="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Rounded Secondary", () => (
  <Button onClick={actions.onClick} sdsStyle="rounded" sdsType="secondary">
    {text}
  </Button>
));

storiesOf("Button", module).add("Rounded Secondary Disabled", () => (
  <Button
    disabled
    onClick={actions.onClick}
    sdsStyle="rounded"
    sdsType="secondary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Square Primary", () => (
  <Button onClick={actions.onClick} sdsStyle="square" sdsType="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("Square Primary Disabled", () => (
  <Button
    disabled
    onClick={actions.onClick}
    sdsStyle="square"
    sdsType="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Square Secondary", () => (
  <Button onClick={actions.onClick} sdsStyle="square" sdsType="secondary">
    {text}
  </Button>
));

storiesOf("Button", module).add("Square Secondary Disabled", () => (
  <Button
    disabled
    onClick={actions.onClick}
    sdsStyle="square"
    sdsType="secondary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Minimal Primary", () => (
  <Button onClick={actions.onClick} sdsStyle="minimal" sdsType="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("Minimal Primary Disabled", () => (
  <Button
    disabled
    onClick={actions.onClick}
    sdsStyle="minimal"
    sdsType="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Minimal Secondary", () => (
  <Button onClick={actions.onClick} sdsStyle="minimal" sdsType="secondary">
    {text}
  </Button>
));

storiesOf("Button", module).add("Minimal Secondary Disabled", () => (
  <Button
    disabled
    onClick={actions.onClick}
    sdsStyle="minimal"
    sdsType="secondary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Minimal No Caps - use sparingly", () => (
  <Button
    isAllCaps={false}
    onClick={actions.onClick}
    sdsStyle="minimal"
    sdsType="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("With Icon", () => (
  <Button
    startIcon={<DeleteIcon />}
    onClick={actions.onClick}
    sdsStyle="rounded"
    sdsType="primary"
  >
    {text}
  </Button>
));

storiesOf("Button", module).add("Minimal With Icon", () => (
  <Button
    startIcon={<DeleteIcon />}
    onClick={actions.onClick}
    sdsStyle="minimal"
    sdsType="primary"
  >
    {text}
  </Button>
));
