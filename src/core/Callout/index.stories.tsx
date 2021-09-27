import { storiesOf } from "@storybook/react";
import React from "react";
import CalloutTitle from "./components/CalloutTitle";
import Callout from "./index";

storiesOf("Callout", module).add("basic", () => (
  <>
    <Callout>
      <CalloutTitle>This is a basic callout!</CalloutTitle>
    </Callout>
    <Callout>
      <CalloutTitle>This is a callout with alert text!</CalloutTitle>
      <div>
        Alert text - Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Aliquid, nulla.
      </div>
    </Callout>
    <Callout onClose={() => {}}>This is a dismissable callout!</Callout>
    <Callout onClose={() => {}}>
      <CalloutTitle>
        This is a dismissable callout with alert text!
      </CalloutTitle>
      <div>
        Alert text - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Reprehenderit, nisi.
      </div>
    </Callout>
  </>
));

storiesOf("Callout", module).add("intent", () => (
  <div>
    <Callout severity="success">
      <CalloutTitle>This is a success callout!</CalloutTitle>
    </Callout>
    <Callout severity="warning">
      <CalloutTitle>This is a warning callout!</CalloutTitle>
    </Callout>
    <Callout severity="error">
      <CalloutTitle>This is an error callout!</CalloutTitle>
    </Callout>
    <Callout severity="info">
      <CalloutTitle>This is an info callout!</CalloutTitle>
    </Callout>
  </div>
));
