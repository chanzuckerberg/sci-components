import { Args, Meta } from "@storybook/react";
import RawHeatmapChart from "./index";
import { COLORS } from "./storyUtils";

const NUMBERS = Array.from(Array(20).keys());

const data: { x: number; y: number; value: number }[] = [];

const CHART_DIMENSION_PX = 1000;

for (const x of NUMBERS) {
  for (const y of NUMBERS) {
    data.push({
      value: x + y,
      x,
      y,
    });
  }
}

const ENCODE = { x: "x", y: "y" };

const ITEM_STYLE = {
  color({ dataIndex }: { dataIndex: number }) {
    return COLORS[dataIndex % COLORS.length];
  },
};

const HeatmapChart = (props: Args): JSX.Element => {
  return (
    <RawHeatmapChart
      width={CHART_DIMENSION_PX}
      height={CHART_DIMENSION_PX}
      xAxisData={NUMBERS}
      yAxisData={NUMBERS}
      data={data}
      encode={ENCODE}
      symbolSize={symbolSize}
      itemStyle={ITEM_STYLE}
      {...props}
    />
  );
};

export default {
  component: HeatmapChart,
  title: "Data Viz/HeatmapChart",
} as Meta;

// Default

export const Default = {
  args: {},
  parameters: {},
};

function symbolSize(props: { value: number }) {
  const { value } = props;
  return convertPercentageToDiameter(value);
}

const MAX_DIAMETER_PX = 5;
const RADIUS_OFFSET = 0.2;

function convertPercentageToDiameter(percentage: number): number {
  const maxRadius = MAX_DIAMETER_PX / 2;

  const baseRadius = RADIUS_OFFSET * (MAX_DIAMETER_PX - RADIUS_OFFSET);

  const radius = Math.sqrt(
    percentage * (maxRadius - RADIUS_OFFSET) ** 2 + baseRadius
  );

  return Math.max(Math.round(2 * radius), MAX_DIAMETER_PX);
}
