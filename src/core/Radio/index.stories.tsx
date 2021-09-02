import { FormControlLabel } from "@material-ui/core";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import RadioButton from "./index";

const actions = {
  onChange: action("onChange"),
};

const storyColumn = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
};

storiesOf("Radio Button", module).add("unchecked", () => (
  <div style={storyColumn as React.CSSProperties}>
    <p>
      <strong>Accessibility</strong>: All radio buttons should have a label.
      This can be done with a visible form label or with the aria-label
      attribute. Note aria labels should be meaningful based on your content.{" "}
      <br /> Good: &ldquo;XYZ Gene&ldquo;
      <br /> Bad: &ldquo;Unchecked&ldquo; <br />{" "}
      https://material-ui.com/components/radio-buttons/#accessibility
    </p>
    <FormControlLabel
      control={<RadioButton onChange={actions.onChange} stage="unchecked" />}
      label="Unchecked"
    />
    <FormControlLabel
      control={
        <RadioButton disabled onChange={actions.onChange} stage="unchecked" />
      }
      label="Unchecked & disabled"
    />
    With aria labels:
    <RadioButton
      inputProps={{ "aria-label": "checkbox unchecked" }}
      onChange={actions.onChange}
      stage="unchecked"
    />
    <RadioButton
      disabled
      inputProps={{ "aria-label": "checkbox unchecked and disabled" }}
      onChange={actions.onChange}
      stage="unchecked"
    />
  </div>
));

storiesOf("Radio Button", module).add("checked", () => (
  <div style={storyColumn as React.CSSProperties}>
    <FormControlLabel
      control={<RadioButton onChange={actions.onChange} stage="checked" />}
      label="Checked"
    />
    <FormControlLabel
      control={
        <RadioButton disabled onChange={actions.onChange} stage="checked" />
      }
      label="Checked & disabled"
    />
    With aria labels:
    <RadioButton
      inputProps={{ "aria-label": "checked" }}
      onChange={actions.onChange}
      stage="checked"
    />
    <RadioButton
      disabled
      inputProps={{ "aria-label": "checked and disabled" }}
      onChange={actions.onChange}
      stage="checked"
    />
  </div>
));

// storiesOf("Checkbox", module).add("indeterminate", () => (
//   <div style={storyColumn as React.CSSProperties}>
//     <FormControlLabel
//       control={<Checkbox onChange={actions.onChange} stage="indeterminate" />}
//       label="Checked"
//     />
//     <FormControlLabel
//       control={
//         <Checkbox disabled onChange={actions.onChange} stage="indeterminate" />
//       }
//       label="Checked & disabled"
//     />
//     With aria labels:
//     <Checkbox
//       inputProps={{ "aria-label": "indeterminate" }}
//       onChange={actions.onChange}
//       stage="indeterminate"
//     />
//     <Checkbox
//       disabled
//       inputProps={{ "aria-label": "indeterminate and disabled" }}
//       onChange={actions.onChange}
//       stage="indeterminate"
//     />
//   </div>
// ));
