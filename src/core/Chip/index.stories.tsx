import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Chip from "./index";

const Demo = (props: Args): JSX.Element => {
  const { dismissable } = props;
  const [visible, setVisible] = React.useState(false);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  if (dismissable) {
    return (
      <>
        <Button variant="contained" onClick={handleShowChip}>
          Click me!
        </Button>
        {visible && <Chip onDelete={handleDismissChip} {...props} />}
      </>
    );
  } else {
    return <Chip {...props} />;
  }
};

export default {
  component: Demo,
  title: "Chip",
};

const Template: Story = (args) => <Demo {...args} />;

export const LargeSquareChip = Template.bind({});

LargeSquareChip.args = {
  dismissable: true,
  label: "Chip",
  size: "large",
  variant: "square",
};

export const Success = Template.bind({});

Success.args = {
  label: "success",
  size: "small",
  status: "success",
  variant: "rounded",
};

export const Error = Template.bind({});

Error.args = {
  label: "error",
  size: "small",
  status: "error",
  variant: "rounded",
};

export const Warning = Template.bind({});

Warning.args = {
  label: "warning",
  size: "small",
  status: "warning",
  variant: "rounded",
};

export const Info = Template.bind({});

Info.args = {
  label: "info",
  size: "small",
  status: "info",
  variant: "rounded",
};

export const Pending = Template.bind({});

Pending.args = {
  label: "pending",
  size: "small",
  status: "pending",
  variant: "rounded",
};

export const Beta = Template.bind({});

Beta.args = {
  label: "beta",
  size: "small",
  status: "beta",
  variant: "rounded",
};
