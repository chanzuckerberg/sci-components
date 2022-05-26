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
        <Button variant="contained" onClick={handleShowChip} sdsStyle="square">
          Click me!
        </Button>
        {visible && <Chip onDelete={handleDismissChip} {...props} />}
      </>
    );
  }
  return <Chip {...props} />;
};

export default {
  component: Demo,
  title: "Chip - To Be Depreciated",
};

const Template: Story = (args) => <Demo {...args} />;

export const MediumSquareChip = Template.bind({});

MediumSquareChip.args = {
  isRounded: false,
  label: "Chip",
  size: "medium",
};

export const Success = Template.bind({});

Success.args = {
  isRounded: true,
  label: "success",
  size: "small",
  status: "success",
};

export const Error = Template.bind({});

Error.args = {
  isRounded: true,
  label: "error",
  size: "small",
  status: "error",
};

export const Warning = Template.bind({});

Warning.args = {
  isRounded: true,
  label: "warning",
  size: "small",
  status: "warning",
};

export const Info = Template.bind({});

Info.args = {
  isRounded: true,
  label: "info",
  size: "small",
  status: "info",
};

export const Pending = Template.bind({});

Pending.args = {
  isRounded: true,
  label: "pending",
  size: "small",
  status: "pending",
};

export const Beta = Template.bind({});

Beta.args = {
  isRounded: true,
  label: "beta",
  size: "small",
  status: "beta",
};
