import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import Tabs, { Tab, TabsProps } from "./index";

export default {
  component: Tabs,
  title: "Tabs",
} as Meta;

interface TabsArgs extends TabsProps {
  tabOneLabel: string;
  tabTwoLabel: string;
}

const Template: Story<TabsArgs> = ({
  tabOneLabel,
  tabTwoLabel,
  ...args
}: TabsArgs) => {
  const [value, setValue] = useState(0);
  const handleTabsChange = (
    event: React.SyntheticEvent,
    tabsValue: unknown
  ) => {
    setValue(tabsValue as number);
  };
  return (
    /* eslint-disable react/jsx-props-no-spreading,  @typescript-eslint/ban-ts-comment -- Need to spread and disable ts-ignore */
    // @ts-ignore -- mui-org/material-ui/issues/17454 will be fixed in 5.x
    <Tabs value={value} onChange={handleTabsChange} {...args}>
      <Tab label={tabOneLabel} />
      <Tab label={tabTwoLabel} />
    </Tabs>
    /* eslint-disable react/jsx-props-no-spreading,  @typescript-eslint/ban-ts-comment -- Need to spread and disable ts-ignore */
  );
};
export const Default = Template.bind({});
Default.args = {
  tabOneLabel: "Upload from Your Computer",
  tabTwoLabel: "Upload from Basespace",
  underlined: true,
};
