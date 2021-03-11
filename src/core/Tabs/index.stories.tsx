import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Tab, Tabs, TabsProps } from "./index";

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
    console.log("hello");
    console.log({ tabsValue });
    setValue(tabsValue as number);
  };
  return (
    // @ts-ignore -- mui-org/material-ui/issues/17454 will be fixed in 5.x
    <Tabs value={value} onChange={handleTabsChange} {...args}>
      <Tab label={tabOneLabel} />
      <Tab label={tabTwoLabel} />
    </Tabs>
  );
};
export const Default = Template.bind({});
Default.args = {
  tabOneLabel: "Upload from Your Computer",
  tabTwoLabel: "Upload from Basespace",
  underlined: true,
};
