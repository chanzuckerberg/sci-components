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
  status: "success",
  size: "small",
  variant: "rounded",
};

export const Error = Template.bind({});

Error.args = {
  label: "error",
  status: "error",
  size: "small",
  variant: "rounded",
};

export const Warning = Template.bind({});

Warning.args = {
  label: "warning",
  status: "warning",
  size: "small",
  variant: "rounded",
};

export const Info = Template.bind({});

Info.args = {
  label: "info",
  status: "info",
  size: "small",
  variant: "rounded",
};

export const Pending = Template.bind({});

Pending.args = {
  label: "pending",
  status: "pending",
  size: "small",
  variant: "rounded",
};

export const Beta = Template.bind({});

Beta.args = {
  label: "beta",
  status: "beta",
  size: "small",
  variant: "rounded",
};
