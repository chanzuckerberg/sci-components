import { FormControlLabel } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Checkbox from "./index";

const actions = {
  onChange: action("onChange"),
};

export default {
  component: Checkbox,
  title: "Checkbox",
};

const Template: Story = (props: Args) => {
  const { stage } = props;
  return (
    <FormControlLabel
      control={<Checkbox onChange={actions.onChange} stage={stage} />}
      label="Label"
    />
  );
};

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  id: "test-story",
  stage: "checked",
};

export const Test = Template.bind({});

Test.args = {
  id: "test-story",
  togglePosition: "right",
};

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "1fr",
};

// LivePreview
function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <Template id="checkbox-1" stage="unchecked" {...props} />
      <Template id="checkbox-2" stage="unchecked" {...props} />
    </div>
  );
}

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};
