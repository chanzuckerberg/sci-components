import DehazeIcon from "@material-ui/icons/Dehaze";
import { Args, Story } from "@storybook/react";
import React from "react";
import IconButton from "./index";

const Demo = (props: Args): JSX.Element => {
  const { icon, ...rest } = props;

  const [active, setActive] = React.useState(false);
  const handleButtonClick = () => setActive(!active);

  return (
    <IconButton onClick={handleButtonClick} active={active} {...rest}>
      {icon}
    </IconButton>
  );
};

export default {
  component: Demo,
  title: "IconButton",
};

const Template: Story = (args) => <Demo {...args} />;

export const MediumPrimaryIconButton = Template.bind({});

MediumPrimaryIconButton.args = {
  color: "primary",
  disabled: false,
  icon: <DehazeIcon />,
  size: "medium",
};

export const MediumSecondaryIconButton = Template.bind({});

MediumSecondaryIconButton.args = {
  color: "secondary",
  disabled: false,
  icon: <DehazeIcon />,
  size: "medium",
};

export const SmallPrimaryIconButton = Template.bind({});

SmallPrimaryIconButton.args = {
  color: "primary",
  disabled: false,
  icon: <DehazeIcon />,
  size: "small",
};

export const SmallSecondaryIconButton = Template.bind({});

SmallSecondaryIconButton.args = {
  color: "secondary",
  disabled: false,
  icon: <DehazeIcon />,
  size: "small",
};
