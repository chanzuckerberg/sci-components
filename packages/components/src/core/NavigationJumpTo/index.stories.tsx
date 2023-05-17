/* eslint-disable no-use-before-define */
import { TabPanelProps } from "@mui/base";
import { Box } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import RawNavigationJumpTo from ".";

interface TabPanelPropsExtra extends TabPanelProps {
  index: number;
}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelPropsExtra>(
  (props, ref) => {
    const { children, index, ...other } = props;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`jump-to-panel-${index}`}
        style={{
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          color: "black",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: "42px",
          fontWeight: 100,
          justifyContent: "center",
          marginBottom: 16,
          marginRight: 16,
          minHeight: "120vh",
        }}
        {...other}
      >
        <Box sx={{ p: 3 }}>{children}</Box>
      </div>
    );
  }
);

const NavigationJumpTo = (props: Args): JSX.Element => {
  const sectionRef0 = React.useRef(null);
  const sectionRef1 = React.useRef(null);
  const sectionRef2 = React.useRef(null);
  const sectionRef3 = React.useRef(null);
  const sectionRef4 = React.useRef(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        width: "100%",
      }}
    >
      <Box sx={{ width: 150 }}>
        <RawNavigationJumpTo
          {...props}
          items={[
            { elementRef: sectionRef0, title: "Section 1" },
            { elementRef: sectionRef1, title: "Section 2" },
            { elementRef: sectionRef2, title: "Section 3" },
            { elementRef: sectionRef3, title: "Section 4" },
            { elementRef: sectionRef4, title: "Section 5" },
          ]}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <TabPanel index={0} ref={sectionRef0}>
          Section #1
        </TabPanel>
        <TabPanel index={1} ref={sectionRef1}>
          Section #2
        </TabPanel>
        <TabPanel index={2} ref={sectionRef2}>
          Section #3
        </TabPanel>
        <TabPanel index={3} ref={sectionRef3}>
          Section #4
        </TabPanel>
        <TabPanel index={4} ref={sectionRef4}>
          Section #5
        </TabPanel>
      </Box>
    </Box>
  );
};

const availableColorOptions = [
  "beta",
  "error",
  "gray",
  "info",
  "primary",
  "success",
  "warning",
];

export default {
  argTypes: {
    indicatorColor: {
      control: {
        labels: [
          "beta",
          "error",
          "gray",
          "info",
          "primary",
          "success",
          "warning",
        ],
        type: "select",
      },
      mapping: availableColorOptions,
      options: Object.keys(availableColorOptions),
    },
    items: {
      control: { type: "object" },
    },
  },
  component: NavigationJumpTo,
  title: "NavigationJumpTo",
} as Meta;

// Default

export const Default = {
  args: {
    indicatorColor: "primary",
    items: [],
  },
};

// Test

const TestDemo = (): JSX.Element => {
  const sectionRef0 = React.useRef(null);
  const sectionRef1 = React.useRef(null);
  const sectionRef2 = React.useRef(null);
  const sectionRef3 = React.useRef(null);
  const sectionRef4 = React.useRef(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        width: "100%",
      }}
    >
      <Box sx={{ width: 150 }}>
        <RawNavigationJumpTo
          data-testid="navigation-jump-to"
          items={[
            { elementRef: sectionRef0, title: "Section 1" },
            { elementRef: sectionRef1, title: "Section 2" },
            { elementRef: sectionRef2, title: "Section 3" },
            { elementRef: sectionRef3, title: "Section 4" },
            { elementRef: sectionRef4, title: "Section 5" },
          ]}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <TabPanel index={0} ref={sectionRef0}>
          Section #1
        </TabPanel>
        <TabPanel index={1} ref={sectionRef1}>
          Section #2
        </TabPanel>
        <TabPanel index={2} ref={sectionRef2}>
          Section #3
        </TabPanel>
        <TabPanel index={3} ref={sectionRef3}>
          Section #4
        </TabPanel>
        <TabPanel index={4} ref={sectionRef4}>
          Section #5
        </TabPanel>
      </Box>
    </Box>
  );
};

export const Test = {
  parameters: {
    controls: {
      exclude: ["indicatorColor", "items"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
