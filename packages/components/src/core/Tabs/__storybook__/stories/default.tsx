import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import RawTabs, { Tab } from "src/core/Tabs";

export const Tabs = (props: Args): JSX.Element => {
  const { items, ...args } = props;

  const [value, setValue] = useState(0);

  const handleTabsChange = (_: React.SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };

  return (
    <RawTabs {...args} value={value} onChange={handleTabsChange}>
      {items.map(({ count, label }: { count?: number; label: string }) => (
        <Tab label={label} count={count} key={label} />
      ))}
    </RawTabs>
  );
};
