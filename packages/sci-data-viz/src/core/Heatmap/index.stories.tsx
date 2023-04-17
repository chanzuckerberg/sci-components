import { Args, Meta } from "@storybook/react";
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

export const Default = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

export const Test = {
  args: {},
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => (
    <HeatmapRaw data-testid="Heatmap">
      <p>heatmap test!</p>
    </HeatmapRaw>
  ),
};
