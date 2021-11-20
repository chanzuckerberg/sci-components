import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "./index";
import { iconMap } from "./map";

const Demo = (props: Args): JSX.Element => {
  const { sdsIcon, sdsSize } = props;

  return <Icon sdsIcon={sdsIcon} sdsSize={sdsSize} />;
};

export default {
  component: Demo,
  title: "Icon",
};

const Template: Story = (args) => <Demo {...args} />;

export const IconXS = Template.bind({});

IconXS.args = {
  sdsIcon: "checkCircle",
  sdsSize: "xs",
};

export const IconS = Template.bind({});

IconS.args = {
  sdsIcon: "checkCircle",
  sdsSize: "s",
};

export const IconL = Template.bind({});

IconL.args = {
  sdsIcon: "checkCircle",
  sdsSize: "l",
};

export const IconXL = Template.bind({});

IconXL.args = {
  sdsIcon: "checkCircle",
  sdsSize: "xl",
};

export const IconSizes = () => {
  return (
    <div>
      <div>
        <span>Size: xs (10px)</span>
        <Icon sdsIcon="exclamationMarkCircle" sdsSize="xs" />
      </div>
      <div>
        <span>Size: s (14px)</span>
        <Icon sdsIcon="exclamationMarkCircle" sdsSize="s" />
      </div>
      <div>
        <span>Size: l (22px)</span>
        <Icon sdsIcon="exclamationMarkCircle" sdsSize="l" />
      </div>
      <div>
        <span>Size: xl (32px)</span>
        <Icon sdsIcon="exclamationMarkCircle" sdsSize="xl" />
      </div>
    </div>
  );
};

export const IconBank = () => {
  const icons = Object.entries(iconMap);
  return (
    <div style={gridStyles}>
      {icons.map(([sdsIcon, icon]) => {
        const { availableSizes } = icon;
        const sdsSize = availableSizes[availableSizes.length - 1];

        return (
          <div style={cellStyles}>
            <Icon sdsSize={sdsSize} sdsIcon={sdsIcon} />
            <span>{sdsIcon}</span>
            <span>(size {sdsSize})</span>
          </div>
        );
      })}
    </div>
  );
};

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const cellStyles = {
  alignItems: "center",
  border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "5px",
};
