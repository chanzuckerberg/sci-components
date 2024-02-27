import { FormControl, FormGroup, FormLabel } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawInputCheckbox from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const testId = "test-story";

const InputCheckbox = (props: Args): JSX.Element => {
  const { disabled } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <RawInputCheckbox
      disabled={disabled}
      onChange={handleChange}
      stage={checked ? "unchecked" : "checked"}
      {...props}
    />
  );
};

export default {
  argTypes: {
    caption: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    label: {
      control: { type: "text" },
    },
    stage: {
      control: {
        type: "radio",
      },
      options: ["checked", "unchecked", "indeterminate"],
    },
  },
  component: InputCheckbox,
  parameters: {
    badges: [BADGE.BETA],
  },
  title: "Components/Inputs/InputCheckbox [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    intent: "default",
    label: "Label",
  },
};

const CheckboxLabelDemo = (props: Args): JSX.Element => {
  const { caption, label, disabled } = props;
  return (
    <div>
      <RawInputCheckbox
        caption={caption}
        label={label}
        disabled={disabled}
        value="Demo"
        {...props}
      />
    </div>
  );
};

const IndeterminateDemo = (): JSX.Element => {
  const [checked, setChecked] = React.useState([true, false]);

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

// Live Preview

const CustomFormLabel = (props: Args): JSX.Element => {
  const { children } = props;

  return <FormLabel sx={{ mb: "12px" }}>{children}</FormLabel>;
};

const LivePreviewDemo = (): JSX.Element => {
  const livePreviewStyles = {
    display: "grid",
    gridColumnGap: "24px",
    gridRowGap: "50px",
    gridTemplateColumns: "repeat(4, 180px)",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
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
            caption="Caption II"
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

export const LivePreview = {
  parameters: {
    axe: {
      disabledRules: ["label"],
    },
    controls: { exclude: ["caption", "label", "stage", "disabled", "intent"] },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

const TestDemo = (): JSX.Element => {
  const testStyles = {
    display: "grid",
    gridColumnGap: "10px",
    gridRowGap: "0px",
    gridTemplateColumns: "repeat(2, 100px)",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={testStyles as React.CSSProperties}>
      <div style={{ gridArea: "1 / 1 / 1 / 2" }}>
        <CheckboxLabelDemo
          caption="Caption"
          label="Label A"
          disabled={false}
          data-testid="labelCheckbox"
        />
      </div>
      <div style={{ gridArea: "1 / 2 / 1 / 2" }}>
        <InputCheckbox data-testid="checkbox" label="Label" />
      </div>
    </div>
  );
};

export const Test = {
  args: {
    id: testId,
  },
  parameters: {
    controls: {
      exclude: ["caption", "label", "stage", "disabled", "intent", "id"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-checkbox" />,
};
