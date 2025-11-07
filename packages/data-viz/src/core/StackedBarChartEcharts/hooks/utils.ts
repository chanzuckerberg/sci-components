import { ECharts, EChartsOption, BarSeriesOption } from "echarts";
import { CommonThemeProps as ThemeProps, getSpaces } from "@czi-sds/components";

export interface StackedBarChartDataItem {
  name: string; // Category name (e.g., "H. sapiens")
  value: number; // Count/value for the category
  color: string; // Color for this segment
}

export interface CreateChartOptionsProps extends ThemeProps {
  /**
   * Array of data items to visualize in the stacked bar
   */
  data: StackedBarChartDataItem[];

  /**
   * Width of the chart in pixels
   */
  width: number;

  /**
   * Height of the chart in pixels
   */
  height: number;

  /**
   * Height of the bar in pixels (default: 16)
   */
  barHeight?: number;

  /**
   * Whether to show the legend
   * @default false
   */
  showLegend?: boolean;

  /**
   * Legend configuration
   * https://echarts.apache.org/en/option.html#legend
   */
  legend?: EChartsOption["legend"];

  /**
   * Custom grid configuration
   */
  grid?:
    | EChartsOption["grid"]
    | ((defaultOption: EChartsOption["grid"]) => EChartsOption["grid"]);

  /**
   * Additional ECharts options to merge
   */
  options?: EChartsOption;

  /**
   * Event listeners for the chart
   */
  onEvents?: Record<string, (event: unknown, chart: ECharts) => void>;
}

export function createChartOptions(
  props: CreateChartOptionsProps
): EChartsOption {
  const {
    data,
    grid: gridProp,
    options,
    barHeight = 16,
    showLegend = false,
    legend: legendProp,
  } = props;

  const { defaultGrid, defaultXAxis, defaultYAxis, defaultLegend } =
    generateDefaultValues(props);

  const customGrid =
    typeof gridProp === "function" ? gridProp(defaultGrid) : gridProp;

  const {
    legend: optionsLegend,
    series: optionsSeries,
    xAxis: optionsXAxis,
    yAxis: optionsYAxis,
    ...optionsRest
  } = options || {};

  // Merge legend configurations
  const finalLegend = showLegend
    ? Object.assign({}, defaultLegend, legendProp, optionsLegend)
    : undefined;

  return {
    animation: true,
    animationDuration: 300,
    animationEasing: "cubicOut",
    grid: customGrid || defaultGrid,
    legend: finalLegend,
    series: createSeriesData(data, barHeight, optionsSeries, props),
    xAxis: [
      Object.assign(
        defaultXAxis,
        optionsXAxis
          ? Array.isArray(optionsXAxis)
            ? optionsXAxis[0]
            : optionsXAxis
          : {}
      ),
    ],
    yAxis: [
      Object.assign(
        defaultYAxis,
        optionsYAxis
          ? Array.isArray(optionsYAxis)
            ? optionsYAxis[0]
            : optionsYAxis
          : {}
      ),
    ],
    tooltip: {
      trigger: "item",
    },
    ...optionsRest,
  };
}

function createSeriesData(
  data: StackedBarChartDataItem[],
  barHeight: number,
  optionsSeries: EChartsOption["series"] | undefined,
  props: CreateChartOptionsProps
): EChartsOption["series"] {
  const spaces = getSpaces(props);
  const GAP_SIZE = spaces?.xxxs || 2;
  console.log("GAP_SIZE", GAP_SIZE);

  return data.map((item, index) => {
    const isFirst = index === 0;
    const isLast = index === data.length - 1;

    // Calculate the width for this segment (accounting for gaps)
    // const segmentWidth = item.value;

    return Object.assign(
      {
        animation: true,
        animationDelay: index * 50,
        animationDuration: 300,
        animationEasing: "cubicOut",
        barWidth: barHeight,
        data: data.map((d) => d.value),
        emphasis: {
          focus: "series",
          itemStyle: {
            color: item.color,
            opacity: 1,
          },
        },
        type: "bar",
        stack: "total",
        // blur: {
        //   itemStyle: {
        //     opacity: 0.2,
        //   },
        // },
        // select: {
        //   disabled: true,
        // },
        itemStyle: {
          borderRadius: isFirst
            ? [2, 0, 0, 2] // Left end - corners?.s = 2px
            : isLast
              ? [0, 2, 2, 0] // Right end - corners?.s = 2px
              : 0, // Middle segments
          color: item.color,
          opacity: 1,
        },
        name: item.name,
      },
      optionsSeries
        ? Array.isArray(optionsSeries)
          ? optionsSeries[index] || {}
          : {}
        : {}
    ) as BarSeriesOption;

    // currentPosition += segmentWidth + GAP_SIZE;

    // return series;
  }) as EChartsOption["series"];
}

function generateDefaultValues(props: CreateChartOptionsProps) {
  const { height, width, showLegend = false } = props;
  const spaces = getSpaces(props);
  const SPACE_M = spaces?.m || 8; // space.m for spacing between elements

  const defaultGrid = {
    bottom: showLegend ? SPACE_M : 0,
    containLabel: false,
    height: `${height}px`,
    left: 0,
    right: 0,
    top: 0,
    width: `${width}px`,
  };

  const defaultXAxis = {
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    show: false,
    splitLine: { show: false },
    type: "value" as const,
  };

  const defaultYAxis = {
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    data: ["bar"],
    show: false,
    splitLine: { show: false },
    type: "category" as const,
  };

  const defaultLegend = {
    animation: true,
    bottom: 0,
    icon: "roundRect",
    itemGap: 8,
    itemHeight: 8,
    itemWidth: 8,
    left: 0,
    orient: "horizontal" as const,
    textStyle: {
      color: "#000000",
      fontFamily: "Inter",
      fontSize: 10,
      fontWeight: 500,
      lineHeight: 14,
    },
    type: "plain" as const,
  };

  return {
    defaultGrid,
    defaultLegend,
    defaultXAxis,
    defaultYAxis,
  };
}
