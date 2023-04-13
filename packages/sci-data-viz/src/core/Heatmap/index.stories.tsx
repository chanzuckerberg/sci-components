/* eslint-disable no-use-before-define */
import { Args, Meta, Story } from "@storybook/react";
import * as React from "react";
import HeatmapRaw from "./index";

const Heatmap = (props: Args): JSX.Element => {
  return (
    <HeatmapRaw {...props}>
      <p>This is a heatmap!</p>
    </HeatmapRaw>
  );
};

export default {
  component: Heatmap,
  title: "Data Viz/Heatmap",
} as Meta;

const Template: Story = (args) => <Heatmap {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <HeatmapRaw data-testid="Heatmap">
    <p>heatmap test!</p>
  </HeatmapRaw>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
