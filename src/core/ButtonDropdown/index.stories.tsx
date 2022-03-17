import { action } from "@storybook/addon-actions";
import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import ButtonDropdown from "./index";

const text = "Label";

const actions = {
  onClick: action("onClick"),
};

const Demo = (props: Args): JSX.Element => {
  const { icon, sdsTypes, ...rest } = props;

  return (
    <>
      <span style={{ marginRight: "10px" }}>
        <ButtonDropdown icon={icon} sdsType={sdsTypes[0]} {...rest}>
          {text}
        </ButtonDropdown>
      </span>
      <ButtonDropdown icon={icon} sdsType={sdsTypes[1]} {...rest}>
        {text}
      </ButtonDropdown>
    </>
  );
};

export default {
  comonent: Demo,
  title: "ButtonDropdown",
};

const Template: Story = (args) => <Demo {...args} />;

export const RoundedButtonDropdown = Template.bind({});

RoundedButtonDropdown.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "rounded",
  sdsTypes: ["primary", "secondary"],
};

export const SquareButtonDropdown = Template.bind({});

SquareButtonDropdown.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "square",
  sdsTypes: ["primary", "secondary"],
};
