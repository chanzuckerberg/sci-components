import { HeatmapChart, HeatmapChartProps } from "@czi-sds/data-viz";
import { EChartsOption } from "echarts";

const NUMBERS = Array.from(Array(20).keys());

const data: { x: number; y: number; value: number }[] = [];

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
  color() {
    return getRandomColorRGB();
  },
};

const Y_AXIS_BOTTOM_PADDING = "10px";

export function grid(
  defaultOption: EChartsOption["grid"]
): EChartsOption["grid"] {
  return {
    ...defaultOption,
    bottom: Y_AXIS_BOTTOM_PADDING,
  };
}

const HeatmapNameSpaceTest = (props: HeatmapChartProps) => {
  return (
    <HeatmapChart
      width={1000}
      height={1000}
      xAxisData={NUMBERS}
      yAxisData={NUMBERS}
      data={data}
      encode={ENCODE}
      symbolSize={symbolSize}
      itemStyle={ITEM_STYLE}
      grid={grid}
    />
  );
};

// Generate a random color in RGB
function getRandomColorRGB() {
  const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255

  return `rgb(${red}, ${green}, ${blue})`;
}

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
