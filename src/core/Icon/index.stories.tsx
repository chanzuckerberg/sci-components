import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "./index";
import { iconMap, IconNameToSizes } from "./map";

const Demo = (props: Args): JSX.Element => {
  const { px, sdsIcon, sdsSize, sdsType } = props;

  return (
    <div style={{ alignItems: "center", display: "flex" }}>
      <Icon sdsIcon={sdsIcon} sdsSize={sdsSize} sdsType={sdsType} />
      <span style={{ marginLeft: "8px" }}>{px}px</span>
    </div>
  );
};

export default {
  component: Demo,
  title: "Icon",
};

const Template: Story = (args) => <Demo {...args} />;

export const IconXS = Template.bind({});

IconXS.args = {
  px: 10,
  sdsIcon: "checkCircle",
  sdsSize: "xs",
  sdsType: "static",
};

export const IconS = Template.bind({});

IconS.args = {
  px: 14,
  sdsIcon: "checkCircle",
  sdsSize: "s",
  sdsType: "static",
};

export const IconL = Template.bind({});

IconL.args = {
  px: 22,
  sdsIcon: "checkCircle",
  sdsSize: "l",
  sdsType: "static",
};

export const IconXL = Template.bind({});

IconXL.args = {
  px: 32,
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "static",
};

export const IconInteractive = Template.bind({});

IconInteractive.args = {
  px: 32,
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "interactive",
};

export const IconBank = () => {
  const icons = Object.entries(iconMap);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {icons.map(([sdsIcon, icon]) => {
        const { largeIcon } = icon;
        const sdsSize = largeIcon ? "l" : "s";

        return (
          <div
            key={sdsIcon}
            style={{
              alignItems: "center",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <Icon
              sdsSize={sdsSize}
              sdsIcon={sdsIcon as keyof IconNameToSizes}
              sdsType="static"
            />
            <span>{sdsIcon}</span>
            <span>(size {sdsSize})</span>
          </div>
        );
      })}
    </div>
  );
};
