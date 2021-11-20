import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
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

export const LargePrimaryIconButton = Template.bind({});

LargePrimaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="infoSpeechBubble" sdsSize="xl" />,
  sdsSize: "large",
  sdsType: "primary",
};

export const LargeSecondaryIconButton = Template.bind({});

LargeSecondaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="slidersHorizontal" sdsSize="xl" />,
  sdsSize: "large",
  sdsType: "secondary",
};

export const LargeTertiaryIconButton = Template.bind({});

LargeTertiaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="xMark" sdsSize="l" />,
  sdsSize: "large",
  sdsType: "tertiary",
};

export const MediumTertiaryIconButton = Template.bind({});

MediumTertiaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="xMark" sdsSize="l" />,
  sdsSize: "medium",
  sdsType: "tertiary",
};

export const SmallPrimaryIconButton = Template.bind({});

SmallPrimaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="infoSpeechBubble" sdsSize="xl" />,
  sdsSize: "small",
  sdsType: "primary",
};

export const SmallSecondaryIconButton = Template.bind({});

SmallSecondaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="slidersHorizontal" sdsSize="xl" />,
  sdsSize: "small",
  sdsType: "secondary",
};

export const SmallTertiaryIconButton = Template.bind({});

SmallTertiaryIconButton.args = {
  disabled: false,
  icon: <Icon sdsIcon="xMark" sdsSize="l" />,
  sdsSize: "small",
  sdsType: "tertiary",
};
