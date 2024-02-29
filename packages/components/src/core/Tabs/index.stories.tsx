import styled from "@emotion/styled";
import { Args, Meta } from "@storybook/react";
import React, { ReactNode, useState } from "react";
import { noop } from "src/common/utils";
import Tag from "../Tag";
import RawTabs, { Tab, TabsProps } from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

interface TabsArgs extends TabsProps {
  tabOneLabel: string;
  tabTwoLabel: string;
  tabOneCount?: ReactNode;
  tabTwoCount?: ReactNode;
}

const Tabs = (props: TabsArgs): JSX.Element => {
  const { tabOneLabel, tabTwoLabel, tabOneCount, tabTwoCount, ...args } = props;

  const [value, setValue] = useState(0);

  const handleTabsChange = (_: React.SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };

  return (
    <RawTabs {...args} value={value} onChange={handleTabsChange}>
      <Tab label={tabOneLabel} count={tabOneCount} />
      <Tab label={tabTwoLabel} count={tabTwoCount} />
    </RawTabs>
  );
};

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
    badges: [BADGE.STABLE],
    // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    // https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
    chromatic: { delay: 10000 },
  },
  title: "Components/Tabs",
} as Meta;

const ExcludedControls = [
  "sdsSize",
  "tabOneLabel",
  "tabTwoLabel",
  "underlined",
];

// Default

export const Default = {
  args: {
    sdsSize: "large",
    tabOneLabel: "Upload from Your Computer",
    tabTwoLabel: "Upload from Base Space",
    underlined: true,
  },
  parameters: {
    // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    // https://github.cwom/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
    chromatic: { delay: 5000 },
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
    style: { width: "150px" },
  };

  return (
    <div style={livePreviewWrapperStyle}>
      <div>
        <Tabs
          onChange={noop}
          sdsSize="large"
          tabOneLabel="Label"
          tabTwoLabel="Label"
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Tabs
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
      <div>
        <Tabs
          sdsSize="small"
          onChange={noop}
          tabOneLabel="Label"
          tabTwoLabel="Label"
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Tabs
          sdsSize="small"
          onChange={noop}
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

export const LivePreview = {
  parameters: {
    chromatic: { delay: 5000 },
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

function TestDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    "data-testid": "tabs",
    style: { width: "400px" },
  };

  return (
    <div>
      <div style={livePreviewWrapperStyle}>
        <div>
          <h4>Default</h4>
          <Tabs
            tabOneLabel="Tab One"
            tabTwoLabel="Tab Two"
            tabOneCount={123}
            onChange={noop}
            {...finalProps}
          />
        </div>
        <div>
          <h4>Small</h4>
          <Tabs
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
          <Tabs
            onChange={noop}
            tabOneLabel="Tab One"
            tabTwoLabel="Tab Two"
            tabOneCount={123}
            underlined
            {...finalProps}
          />
        </div>
      </div>
      <div style={livePreviewWrapperStyle}>
        <div>
          <h4>Label with count</h4>
          <div>
            <Tabs
              onChange={noop}
              sdsSize="large"
              tabOneLabel="Label"
              tabTwoLabel="Label"
              underlined
              tabOneCount={<BetaTagWithCount />}
              {...finalProps}
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Test = {
  parameters: {
    chromatic: { delay: 5000 },
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

const CountWrapper = styled("span")`
  margin-right: 5px;
`;

function BetaTagWithCount() {
  return (
    <>
      <CountWrapper>123</CountWrapper>
      <Tag label="BETA" color="beta" sdsStyle="rounded" sdsType="secondary" />
    </>
  );
}
