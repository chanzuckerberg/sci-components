import { Box, FormControlLabel } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawInputCheckbox from "./index";

const testId = "test-story";

const InputCheckbox = (props: Args): JSX.Element => {
  const { disabled } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <div>
      <FormControlLabel
        control={
          <RawInputCheckbox
            disabled={disabled}
            onChange={handleChange}
            stage={checked ? "unchecked" : "checked"}
            {...props}
          />
        }
        label="Label"
        value="Demo"
      />
    </div>
  );
};

export default {
  argTypes: {
    Caption: {
      control: { type: "string" },
    },
    Label: {
      control: { type: "string" },
    },
  },
  component: InputCheckbox,
  title: "Inputs/InputCheckbox",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    id: testId,
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
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <RawInputCheckbox
        label="Child 1"
        checkboxProps={{
          checked: checked[0],
          onChange: handleChange2,
        }}
      />
      <RawInputCheckbox
        label="Child 2"
        checkboxProps={{
          checked: checked[1],
          onChange: handleChange3,
        }}
      />
    </Box>
  );

  return (
    <div>
      <RawInputCheckbox
        label="Parent"
        checkboxProps={{
          checked: checked[0] && checked[1],
          indeterminate: checked[0] !== checked[1],
          onChange: handleChange1,
        }}
      />
      {children}
    </div>
  );
};

// Live Preview

const LivePreviewDemo = (): JSX.Element => {
  const livePreviewStyles = {
    display: "grid",
    gridColumnGap: "24px",
    gridRowGap: "0px",
    gridTemplateColumns: "repeat(3, 70px)",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div style={{ gridArea: "1 / 1 / 1 / 2" }}>
        <CheckboxLabelDemo label="Label" disabled={false} />
      </div>
      <div style={{ gridArea: "1 / 2 / 1 / 2" }}>
        <InputCheckbox disabled />
      </div>
      <div style={{ gridArea: "1 / 3 / 1 / 3" }}>
        <IndeterminateDemo />
      </div>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    controls: { exclude: ["caption", "label"] },
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
          label="Lable A"
          disabled={false}
          data-testid="labelCheckbox"
        />
      </div>
      <div style={{ gridArea: "1 / 2 / 1 / 2" }}>
        <InputCheckbox data-testid="checkbox" />
      </div>
    </div>
  );
};

export const Test = {
  args: {
    id: testId,
  },
  parameters: {
    controls: { exclude: ["caption", "label", "id"] },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-checkbox" />,
};
