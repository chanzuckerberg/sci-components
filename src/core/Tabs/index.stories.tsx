import { Args, Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import Tabs, { Tab, TabsProps } from "./index";

export default {
  argTypes: {
    tabOneLabel: {
      control: {
        type: "text",
      },
    },
    tabTwoLabel: {
      control: {
        type: "text",
      },
    },
    underlined: {
      control: {
        type: "boolean",
      },
    },
  },
  component: Tabs,
  title: "Tabs",
} as Meta;

interface TabsArgs extends TabsProps {
  tabOneLabel: string;
  tabTwoLabel: string;
}

const Template: Story<TabsArgs> = (props: TabsArgs) => {
  const { tabOneLabel, tabTwoLabel, ...args } = props;

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

// Default
export const Default = Template.bind({});

Default.args = {
  tabOneLabel: "Upload from Your Computer",
  tabTwoLabel: "Upload from Basespace",
  underlined: true,
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

// LivePreview
const livePreviewWrapperStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
};

function LivePreviewDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    style: { width: "400px" },
  };

  return (
    <div style={livePreviewWrapperStyle}>
      <Template
        tabOneLabel="Tab One"
        tabTwoLabel="Tab Two"
        onChange={noop}
        {...finalProps}
      />
      <Template
        {...finalProps}
        onChange={noop}
        tabOneLabel="Tab One"
        tabTwoLabel="Tab Two"
        underlined
      />
    </div>
  );
}

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  tabOneLabel: "Upload from Your Computer",
  tabTwoLabel: "Upload from Basespace",
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

// Test
function TestDemo(props: Args): JSX.Element {
  return (
    <Template
      {...props}
      onChange={noop}
      tabOneLabel="Tab One"
      tabTwoLabel="Tab Two"
      data-testid="tabs"
      underlined
    />
  );
}

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
