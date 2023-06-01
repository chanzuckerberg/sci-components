import { Args, Meta } from "@storybook/react";
import RawHeatmap from "./index";

const Heatmap = (props: Args): JSX.Element => {
  return (
    <RawHeatmap {...props}>
      <p>This is a heatmap!</p>
    </RawHeatmap>
  );
};

export default {
  component: Heatmap,
  title: "Data Viz/Heatmap",
} as Meta;

// Default

export const Default = {
  args: {},
  parameters: {},
};

// Test

export const Test = {
  args: {},
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args): JSX.Element => (
    <Heatmap {...args} data-testid="Heatmap" />
  ),
};
