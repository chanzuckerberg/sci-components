import {
  StackedBarChart,
  StackedBarChartProps,
  StackedBarChartDataItem,
} from "@czi-sds/data-viz";

const SAMPLE_DATA: StackedBarChartDataItem[] = [
  { name: "Category A", value: 100, color: "#ff0000" },
  { name: "Category B", value: 200, color: "#00ff00" },
  { name: "Category C", value: 150, color: "#0000ff" },
];

const StackedBarChartNameSpaceTest = (props: StackedBarChartProps) => {
  return <StackedBarChart width={500} height={16} data={SAMPLE_DATA} />;
};
