import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Checkbox from "./index";

const actions = {
  onClick: action("onClick"),
};

storiesOf("Checkbox", module).add("default", () => (
  <>
    <p>
      Accessibility: All checkboxes should have a label. This can be done with a
      visible form label or with the aria-label attribute.
      https://material-ui.com/components/checkboxes/#accessibility
    </p>
    <Checkbox
      color="default"
      defaultChecked
      inputProps={{ "aria-label": "checkbox-default-checked" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="default"
      inputProps={{ "aria-label": "checkbox" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="default"
      disabled
      inputProps={{ "aria-label": "checkbox-disabled" }}
      onClick={actions.onClick}
    />
  </>
));

storiesOf("Checkbox", module).add("primary", () => (
  <>
    <Checkbox
      color="primary"
      defaultChecked
      inputProps={{ "aria-label": "primary-checkbox-default-checked" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="primary"
      inputProps={{ "aria-label": "primary-checkbox" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="primary"
      disabled
      inputProps={{ "aria-label": "primary-checkbox-disabled" }}
      onClick={actions.onClick}
    />
  </>
));

storiesOf("Checkbox", module).add("secondary", () => (
  <>
    <Checkbox
      color="secondary"
      defaultChecked
      inputProps={{ "aria-label": "secondary-checkbox-default-checked" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="secondary"
      inputProps={{ "aria-label": "secondary-checkbox" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="secondary"
      disabled
      inputProps={{ "aria-label": "secondary-checkbox-disabled" }}
      onClick={actions.onClick}
    />
  </>
));

storiesOf("Checkbox", module).add("indeterminate", () => (
  <>
    <Checkbox
      color="primary"
      defaultChecked
      indeterminate
      inputProps={{ "aria-label": "primary-checkbox-indeterminate" }}
      onClick={actions.onClick}
    />
    <Checkbox
      color="secondary"
      defaultChecked
      indeterminate
      inputProps={{ "aria-label": "secondary-checkbox-indeterminate" }}
      onClick={actions.onClick}
    />
  </>
));
