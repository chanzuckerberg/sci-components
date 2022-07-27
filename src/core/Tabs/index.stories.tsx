import { Args, Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import Tabs, { Tab, TabsProps } from "./index";

export default {
  argTypes: {
    sdsSize: {
      control: { type: "select" },
      options: ["large", "small"],
    },
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
  parameters: {
    // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    // https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
    chromatic: { delay: 10000 },
  },
  title: "Tabs",
} as Meta;

interface TabsArgs extends TabsProps {
  tabOneLabel: string;
  tabTwoLabel: string;
  tabOneCount?: number;
  tabTwoCount?: number;
}

const Template: Story<TabsArgs> = (props: TabsArgs) => {
  const { tabOneLabel, tabTwoLabel, tabOneCount, tabTwoCount, ...args } = props;

  const [value, setValue] = useState(0);

  const handleTabsChange = (_: React.SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };

  return (
    <Tabs {...args} value={value} onChange={handleTabsChange}>
      <Tab label={tabOneLabel} count={tabOneCount} />
      <Tab label={tabTwoLabel} count={tabTwoCount} />
    </Tabs>
  );
};

// Default
export const Default = Template.bind({});

Default.args = {
  sdsSize: "large",
  tabOneLabel: "Upload from Your Computer",
  tabTwoLabel: "Upload from Basespace",
  underlined: true,
};

Default.parameters = {
  // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
  // delay allows for font to load and prevents chromatic from constantly creating new baselines
  // https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
  chromatic: { delay: 5000 },
  snapshot: {
    skip: true,
  },
};

// LivePreview
const livePreviewWrapperStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "40px",
  width: "100%",
};

function LivePreviewDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    style: { width: "250px" },
  };

  return (
    <div style={livePreviewWrapperStyle}>
      <div>
        <Template
          onChange={noop}
          sdsSize="large"
          tabOneLabel="Label"
          tabTwoLabel="Label"
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Template
          onChange={noop}
          sdsSize="large"
          tabOneLabel="Label"
          tabTwoLabel="Label"
          tabOneCount={0}
          tabTwoCount={0}
          underlined
          {...finalProps}
        />
      </div>
      <div />
      <div>
        <Template
          onChange={noop}
          sdsSize="small"
          tabOneLabel="Label"
          tabTwoLabel="Label"
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Template
          onChange={noop}
          sdsSize="small"
          tabOneLabel="Label"
          tabTwoLabel="Label"
          tabOneCount={0}
          tabTwoCount={0}
          underlined
          {...finalProps}
        />
      </div>
    </div>
  );
}

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {};

LivePreview.parameters = {
  chromatic: { delay: 5000 },
  snapshot: {
    skip: true,
  },
};

// Test
function TestDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    "data-testid": "tabs",
    style: { width: "400px" },
  };

  return (
    <div style={livePreviewWrapperStyle}>
      <div>
        <h4>Default</h4>
        <Template
          tabOneLabel="Tab One"
          tabTwoLabel="Tab Two"
          tabOneCount={123}
          onChange={noop}
          {...finalProps}
        />
      </div>
      <div>
        <h4>Small</h4>
        <Template
          tabOneLabel="Tab One"
          tabTwoLabel="Tab Two"
          tabOneCount={123}
          onChange={noop}
          sdsSize="small"
          {...finalProps}
        />
      </div>
      <div>
        <h4>Underlined</h4>
        <Template
          onChange={noop}
          tabOneLabel="Tab One"
          tabTwoLabel="Tab Two"
          tabOneCount={123}
          underlined
          {...finalProps}
        />
      </div>
    </div>
  );
}

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  chromatic: { delay: 5000 },
};
