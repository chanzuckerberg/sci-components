import { Box, FormControlLabel } from "@mui/material";
import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import InputCheckbox from "./index";

const testId = "test-story";

const CheckboxDemo = (props: Args): JSX.Element => {
  const { disabled } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <div>
      <FormControlLabel
        control={
          <InputCheckbox
            data-testid="checkbox"
            disabled={disabled}
            onChange={handleChange}
            stage={checked ? "unchecked" : "checked"}
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
  component: CheckboxDemo,
  title: "Inputs/InputCheckbox",
} as Meta;

const Template: Story = (args) => <CheckboxLabelDemo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  caption: "Caption",
  id: { testId },
  label: "Label",
};

const CheckboxLabelDemo = (props: Args): JSX.Element => {
  const { caption, label, disabled } = props;
  return (
    <div>
      <InputCheckbox
        caption={caption}
        data-testid="labelCheckbox"
        label={label}
        disabled={disabled}
        value="Demo"
      />
    </div>
  );
};

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
        <CheckboxLabelDemo caption="Caption" label="Lable A" disabled={false} />
      </div>
      <div style={{ gridArea: "1 / 2 / 1 / 2" }}>
        <CheckboxDemo />
      </div>
    </div>
  );
};
const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  id: { testId },
};

Test.parameters = {
  controls: { exclude: ["caption", "label", "id"] },
};

/*
 * Live Preview
 */

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
      <InputCheckbox
        label="Child 1"
        checkboxProps={{
          checked: checked[0],
          onChange: handleChange2,
        }}
      />
      <InputCheckbox
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
      <InputCheckbox
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
        <CheckboxDemo disabled />
      </div>
      <div style={{ gridArea: "1 / 3 / 1 / 3" }}>
        <IndeterminateDemo />
      </div>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  controls: { exclude: ["caption", "label"] },
  snapshot: {
    skip: true,
  },
};
