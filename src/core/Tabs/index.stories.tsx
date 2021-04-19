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
    _: React.ChangeEvent<Record<string, unknown>>,
    tabsValue: never
  ) => {
    setValue(tabsValue as number);
  };

  return (
    <Tabs {...args} value={value} onChange={handleTabsChange}>
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
