import { storiesOf } from "@storybook/react";
import React from "react";
import Callout from "./index";

storiesOf("Callout", module).add("basic dismissable", () => (
  <Callout onClose={() => {}}>This is a callout!</Callout>
));

storiesOf("Callout", module).add("intent", () => (
  <div>
    <Callout severity="success">This is a success callout!</Callout>
    <Callout severity="warning">This is a warning callout!</Callout>
    <Callout severity="error">This is an error callout!</Callout>
    <Callout severity="info">This is an info callout!</Callout>
  </div>
));
