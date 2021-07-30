import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Tag from "./index";

const Demo = (props: Args): JSX.Element => {
  const [visible, setVisible] = React.useState(false);

  const handleShowTag = () => setVisible(true);
  const handleDismissTag = () => setVisible(false);

  return (
    <>
      <Button variant="contained" onClick={handleShowTag}>
        Click me!
      </Button>
      {visible && <Tag onDelete={handleDismissTag} {...props} />}
    </>
  );
};

export default {
  component: Demo,
  title: "Tag",
};

const Template: Story = (args) => <Demo {...args} />;

export const LargeSquareTag = Template.bind({});

LargeSquareTag.args = {
  dismissable: true,
  label: "Tag",
  size: "large",
  variant: "square",
};
