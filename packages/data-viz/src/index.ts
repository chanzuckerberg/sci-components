export * from "./core/HeatmapChart";
export { default as HeatmapChart } from "./core/HeatmapChart";

// New HTML/CSS-based StackedBarChart
export { default as StackedBarChart } from "./core/StackedBarChart";
export type {
  StackedBarChartProps,
  StackedBarChartDataItem,
} from "./core/StackedBarChart";

// ECharts-based StackedBarChart (legacy)
export { StackedBarChart as StackedBarChartEcharts } from "./core/StackedBarChartEcharts";
export type {
  StackedBarChartProps as StackedBarChartEchartsProps,
  StackedBarChartDataItem as StackedBarChartEchartsDataItem,
} from "./core/StackedBarChartEcharts";
