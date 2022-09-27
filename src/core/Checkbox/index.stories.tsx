import { Box, FormControlLabel } from "@mui/material";
import { Args, Story } from "@storybook/react";
import React from "react";
import Checkbox from "./index";

const testId = "test-story";

const CheckboxDemo = (props: Args): JSX.Element => {
  const { disabled } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            data-testid="checkbox"
            disabled={disabled}
            onChange={handleChange}
            stage={checked ? "unchecked" : "checked"}
          />
        }
        label="Label"
      />
    </div>
  );
};

export default {
  component: CheckboxDemo,
  title: "Checkbox",
};

const Template: Story = (args) => <CheckboxDemo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  id: { testId },
};

const CheckboxLabelDemo = (props: Args): JSX.Element => {
  const { label, disabled } = props;
  return (
    <div>
      <Checkbox data-testid="labelCheckbox" label={label} disabled={disabled} />
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
        <CheckboxLabelDemo label="Lable A" disabled={false} />
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
      <FormControlLabel
        label="Child 1"
        control={
          <Checkbox
            onChange={handleChange2}
            stage={checked[0] ? "checked" : "unchecked"}
          />
        }
      />
      <FormControlLabel
        label="Child 2"
        control={
          <Checkbox
            onChange={handleChange3}
            stage={checked[1] ? "checked" : "unchecked"}
          />
        }
      />
    </Box>
  );

  function getParentStage() {
    if (checked[0] && checked[1]) {
      return "checked";
    }
    if (checked[0] !== checked[1]) {
      return "indeterminate";
    }
    return "unchecked";
  }
  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            stage={getParentStage()}
            onChange={handleChange1}
          />
        }
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
  snapshot: {
    skip: true,
  },
};
