import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Chip from "./index";

const Demo = (props: Args): JSX.Element => {
  const { size, isRounded } = props;
  const [visible, setVisible] = React.useState(false);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  if (size === "medium" && !isRounded) {
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

export const MediumSquareChip = Template.bind({});

MediumSquareChip.args = {
  label: "Chip",
  size: "medium",
  isRounded: false,
};

export const Success = Template.bind({});

Success.args = {
  label: "success",
  size: "small",
  status: "success",
  isRounded: true,
};

export const Error = Template.bind({});

Error.args = {
  label: "error",
  size: "small",
  status: "error",
  isRounded: true,
};

export const Warning = Template.bind({});

Warning.args = {
  label: "warning",
  size: "small",
  status: "warning",
  isRounded: true,
};

export const Info = Template.bind({});

Info.args = {
  label: "info",
  size: "small",
  status: "info",
  isRounded: true,
};

export const Pending = Template.bind({});

Pending.args = {
  label: "pending",
  size: "small",
  status: "pending",
  isRounded: true,
};

export const Beta = Template.bind({});

Beta.args = {
  label: "beta",
  size: "small",
  status: "beta",
  isRounded: true,
};
