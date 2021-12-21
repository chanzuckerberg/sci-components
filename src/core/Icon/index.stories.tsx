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
    <table>
      <tr>
        <td>
          <span>Size: xs (10px)</span>
        </td>
        <td>
          <Icon sdsIcon="exclamationMarkCircle" sdsSize="xs" />
        </td>
      </tr>
      <tr>
        <td>
          <span>Size: s (14px)</span>
        </td>
        <td>
          <Icon sdsIcon="exclamationMarkCircle" sdsSize="s" />
        </td>
      </tr>
      <tr>
        <td>
          <span>Size: l (22px)</span>
        </td>
        <td>
          <Icon sdsIcon="exclamationMarkCircle" sdsSize="l" />
        </td>
      </tr>
      <tr>
        <td>
          <span>Size: xl (32px)</span>
        </td>
        <td>
          <Icon sdsIcon="exclamationMarkCircle" sdsSize="xl" />
        </td>
      </tr>
    </table>
  );
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
        const { availableSizes } = icon;
        const sdsSize = availableSizes[availableSizes.length - 1];

        return (
          <div
            style={{
              alignItems: "center",
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <Icon sdsSize={sdsSize} sdsIcon={sdsIcon} sdsType="static" />
            <span>{sdsIcon}</span>
            <span>(size {sdsSize})</span>
          </div>
        );
      })}
    </div>
  );
};
