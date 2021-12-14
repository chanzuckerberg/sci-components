import { SvgIcon } from "@material-ui/core";
import { Args, Story } from "@storybook/react";
import React from "react";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconFilters } from "../../common/svgs/IconFilters.svg";
import { ReactComponent as IconInfoPanel } from "../../common/svgs/IconInfoPanel.svg";
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
  icon: (
    <SvgIcon
      fillcontrast="white"
      viewBox="0 0 32 32"
      component={IconInfoPanel}
    />
  ),
  sdsSize: "large",
  sdsType: "primary",
};

export const LargeSecondaryIconButton = Template.bind({});

LargeSecondaryIconButton.args = {
  disabled: false,
  icon: (
    <SvgIcon fillcontrast="white" viewBox="0 0 32 32" component={IconFilters} />
  ),
  sdsSize: "large",
  sdsType: "secondary",
};

export const LargeTertiaryIconButton = Template.bind({});

LargeTertiaryIconButton.args = {
  disabled: false,
  icon: (
    <SvgIcon fillcontrast="white" viewBox="0 0 14 14" component={IconClose} />
  ),
  sdsSize: "large",
  sdsType: "tertiary",
};

export const MediumTertiaryIconButton = Template.bind({});

MediumTertiaryIconButton.args = {
  disabled: false,
  icon: (
    <SvgIcon fillcontrast="white" viewBox="0 0 14 14" component={IconClose} />
  ),
  sdsSize: "medium",
  sdsType: "tertiary",
};

export const SmallPrimaryIconButton = Template.bind({});

SmallPrimaryIconButton.args = {
  disabled: false,
  icon: (
    <SvgIcon
      fillcontrast="white"
      viewBox="0 0 32 32"
      component={IconInfoPanel}
    />
  ),
  sdsSize: "small",
  sdsType: "primary",
};

export const SmallSecondaryIconButton = Template.bind({});

SmallSecondaryIconButton.args = {
  disabled: false,
  icon: (
    <SvgIcon fillcontrast="white" viewBox="0 0 32 32" component={IconFilters} />
  ),
  sdsSize: "small",
  sdsType: "secondary",
};

export const SmallTertiaryIconButton = Template.bind({});

SmallTertiaryIconButton.args = {
  disabled: false,
  icon: (
    <SvgIcon fillcontrast="white" viewBox="0 0 14 14" component={IconClose} />
  ),
  sdsSize: "small",
  sdsType: "tertiary",
};
