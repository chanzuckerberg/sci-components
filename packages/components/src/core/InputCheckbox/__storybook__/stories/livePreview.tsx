import { Args } from "@storybook/react";
import { INPUT_CHECKBOX_LIVE_PREVIEW_STYLES } from "../constants";
import { FormControl, FormGroup, FormLabel } from "@mui/material";
import RawInputCheckbox from "src/core/InputCheckbox";
import { useState } from "react";

const CustomFormLabel = (props: Args): JSX.Element => {
  const { children } = props;

  return <FormLabel sx={{ mb: "12px" }}>{children}</FormLabel>;
};

const IndeterminateDemo = (): JSX.Element => {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <FormControl sx={{ ml: 5 }}>
      <FormGroup aria-labelledby="indeterminate-checkboxes-children">
        <RawInputCheckbox
          label="Child 1"
          checkboxProps={{
            checked: checked[0],
            onChange: handleChange2,
          }}
        />
        <RawInputCheckbox
          label="Child 2"
          caption="Caption"
          checkboxProps={{
            checked: checked[1],
            onChange: handleChange3,
          }}
        />
      </FormGroup>
    </FormControl>
  );

  return (
    <FormControl>
      <CustomFormLabel>Indeterminate Checkboxes</CustomFormLabel>
      <FormGroup aria-labelledby="indeterminate-checkboxes">
        <RawInputCheckbox
          label="Parent"
          checkboxProps={{
            checked: checked[0] && checked[1],
            indeterminate: checked[0] !== checked[1],
            onChange: handleChange1,
          }}
        />
        {children}
      </FormGroup>
    </FormControl>
  );
};

export const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={INPUT_CHECKBOX_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <FormControl>
        <CustomFormLabel>No Labels or Captions</CustomFormLabel>
        <FormGroup>
          <RawInputCheckbox value="1" />
          <RawInputCheckbox value="2" intent="warning" />
          <RawInputCheckbox value="3" intent="error" />
          <RawInputCheckbox value="4" disabled />
        </FormGroup>
      </FormControl>

      <FormControl>
        <CustomFormLabel>With Labels</CustomFormLabel>
        <FormGroup aria-labelledby="checkbox-group-with-labels">
          <RawInputCheckbox label="Default" value="1" />
          <RawInputCheckbox label="Warning" value="2" intent="warning" />
          <RawInputCheckbox label="Error" value="3" intent="error" />
          <RawInputCheckbox label="Disabled" value="4" disabled />
        </FormGroup>
      </FormControl>

      <FormControl>
        <CustomFormLabel>With Labels and Captions</CustomFormLabel>
        <FormGroup aria-labelledby="checkbox-group-with-labels-and-captions">
          <RawInputCheckbox label="Default" caption="Caption I" value="1" />
          <RawInputCheckbox
            label="Warning"
            caption="Caption II"
            value="2"
            intent="warning"
          />
          <RawInputCheckbox
            label="Error"
            caption="Caption III"
            value="3"
            intent="error"
          />
          <RawInputCheckbox
            disabled
            label="Disabled"
            caption="Caption IV"
            value="4"
          />
        </FormGroup>
      </FormControl>

      <div>
        <IndeterminateDemo />
      </div>
    </div>
  );
};
