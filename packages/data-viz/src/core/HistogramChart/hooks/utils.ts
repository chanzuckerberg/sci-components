import {
  AxisPointerComponentOption,
  BarSeriesOption,
  DataZoomComponentOption,
  DatasetComponentOption,
  ECharts,
  EChartsOption,
} from "echarts";

export interface CreateChartOptionsProps {
  /**
   * Display reference line and axis value under mouse pointer
   * https://echarts.apache.org/en/option.html#axisPointer
   */
  axisPointer?: EChartsOption["axisPointer"];
  /**
   * The data array for the histogram
   * Can be array of numbers [1, 2, 3] or array of [x, y] pairs [[0, 10], [1, 20]]
   */
  data?: DatasetComponentOption["source"];
  /**
   * For zooming/panning large datasets
   * https://echarts.apache.org/en/option.html#dataZoom
   */
  dataZoom?: EChartsOption["dataZoom"];
  /**
   * Chart title configuration
   * https://echarts.apache.org/en/option.html#title
   */
  chartTitle?: EChartsOption["title"] | string;
  /**
   * Whether to show the title (default: true if title provided)
   */
  showTitle?: boolean;
  /**
   * Whether to show the y-axis grid
   */
  showYAxisGrid?: boolean;
  /**
   * Whether to show the x-axis grid
   */
  showXAxisGrid?: boolean;
  /**
   * Customize the style of each bar when mouse hovers
   * https://echarts.apache.org/en/option.html#series-bar.emphasis
   */
  emphasis?: BarSeriesOption["emphasis"];
  /**
   * The data for the x axis (category labels)
   * e.g., ["0-10", "10-20", "20-30"]
   */
  xAxisData?: (string | number)[];
  /**
   * The width of the chart in pixels
   */
  width: number;
  /**
   * The height of the chart in pixels
   */
  height: number;
  /**
   * Customize the style of each bar (color, border, etc.)
   * https://echarts.apache.org/en/option.html#series-bar.itemStyle
   */
  itemStyle?: BarSeriesOption["itemStyle"];
  /**
   * Width of the bars - can be number (pixels) or string (percentage)
   * https://echarts.apache.org/en/option.html#series-bar.barWidth
   */
  barWidth?: BarSeriesOption["barWidth"];
  /**
   * Gap between bars in same category
   */
  barGap?: BarSeriesOption["barGap"];
  /**
   * Gap between bar categories (0 for histogram look)
   */
  barCategoryGap?: BarSeriesOption["barCategoryGap"];
  /**
   * Bar color (shorthand for itemStyle.color)
   * https://echarts.apache.org/en/option.html#series-bar.color
   */
  barColor?: BarSeriesOption["color"];
  /**
   * https://echarts.apache.org/en/option.html#grid
   */
  grid?:
    | EChartsOption["grid"]
    | ((defaultOption: EChartsOption["grid"]) => EChartsOption["grid"]);
  /**
   * The options object to be passed to echarts.setOption()
   * Use this to customize axis labels, tooltips, etc.
   * @example
   * // Custom axis title positioning:
   * options={{
   *   xAxis: { nameLocation: "end", nameGap: 20 },
   *   yAxis: { nameRotate: 0, nameGap: 50 }
   * }}
   */
  options?: EChartsOption;
  /**
   * Label for the x-axis
   */
  xAxisTitle?: string;
  /**
   * Title for the y-axis
   */
  yAxisTitle?: string;
  /**
   * Reference/background distribution data for comparison
   * Same format as `data` - array of [x, y] pairs
   */
  referenceData?: DatasetComponentOption["source"];

  /**
   * Color of the reference distribution bars
   * @default "rgba(128, 128, 128, 0.3)"
   */
  referenceColor?: BarSeriesOption["color"];
  /**
   * Event listeners for the chart
   * https://echarts.apache.org/en/api.html#events
   */
  /**
   * Threshold range to highlight on the chart
   * Shows a horizontal band between min and max y-values
   */
  threshold?: {
    min: number;
    max: number;
    color?: string; // default: "rgba(200, 200, 200, 0.3)"
  };
  onEvents?: Record<string, (event: unknown, chart: ECharts) => void>;
}
/**
 * Helper to normalize ECharts option that can be an array or single value
 */
function normalizeOption<T>(
  option: T | T[] | undefined
): T | Record<string, unknown> {
  if (!option) return {};
  return Array.isArray(option) ? option[0] : option;
}

export function createChartOptions(
  props: CreateChartOptionsProps
): EChartsOption {
  const {
    axisPointer,
    data,
    dataZoom,
    emphasis,
    grid: gridProp,
    itemStyle,
    barWidth,
    barColor,
    barGap = "0%",
    barCategoryGap = "0%",
    options,
    xAxisData,
    chartTitle,
    showTitle,
    referenceData,
    referenceColor,
    threshold,
  } = props;

  const {
    defaultAxisPointer,
    defaultDataZoom,
    defaultEmphasis,
    defaultGrid,
    defaultXAxis,
    defaultYAxis,
  } = generateDefaultValues(props);

  const customGrid =
    typeof gridProp === "function" ? gridProp(defaultGrid) : gridProp;

  const {
    axisPointer: optionsAxisPointer,
    dataZoom: optionsDataZoom,
    series: optionsSeries,
    xAxis: optionsXAxis,
    yAxis: optionsYAxis,
    ...optionsRest
  } = options || {};

  return {
    animation: false,
    title:
      typeof chartTitle === "string"
        ? { text: chartTitle, show: showTitle !== false }
        : chartTitle,
    axisPointer: axisPointer || optionsAxisPointer || defaultAxisPointer,
    dataZoom: dataZoom || optionsDataZoom || defaultDataZoom,
    dataset: data ? { source: data } : undefined,
    grid: customGrid || defaultGrid,
    series: [
      // Reference distribution (background) - only if referenceData provided
      ...(referenceData
        ? [
            {
              type: "bar" as const,
              data: referenceData,
              barWidth,
              barGap: "0%",
              barCategoryGap: "0%",
              itemStyle: {
                color: referenceColor || "rgba(128, 128, 128, 0.3)",
              },
              emphasis: { disabled: true },
              z: 1,
            },
          ]
        : []),
      // Main distribution (foreground)
      Object.assign(
        {
          emphasis: Object.assign({}, defaultEmphasis, emphasis),
          itemStyle: {
            ...(barColor && { color: barColor }),
            ...itemStyle,
          },
          barWidth,
          barGap: referenceData ? "-100%" : barGap,
          barCategoryGap,
          data: data,
          z: 2,
          ...(threshold && {
            markArea: {
              silent: true,
              itemStyle: {
                color: threshold.color || "rgba(200, 200, 200, 0.3)",
              },
              data: [[{ yAxis: threshold.min }, { yAxis: threshold.max }]],
            },
          }),
        },
        normalizeOption(optionsSeries),
        { type: "bar" }
      ),
    ] as EChartsOption["series"],
    xAxis: [
      Object.assign(
        {},
        defaultXAxis,
        xAxisData ? { data: xAxisData } : {},
        normalizeOption(optionsXAxis)
      ),
    ],
    yAxis: [Object.assign({}, defaultYAxis, normalizeOption(optionsYAxis))],
    ...optionsRest,
  };
}

function generateDefaultValues(props: CreateChartOptionsProps) {
  const { xAxisTitle, yAxisTitle } = props;

  const defaultGrid = {
    containLabel: true,
  };

  const defaultAxisPointer = {
    label: { show: false },
    show: false,
    triggerOn: "mousemove",
  } as AxisPointerComponentOption;

  const defaultXAxis = {
    type: "value" as const,
    axisLine: { show: true },
    axisTick: { show: true },
    splitLine: { show: true },
    splitNumber: 5,
    name: xAxisTitle,
    nameLocation: "middle" as const,
    nameGap: 35,
  };

  const defaultYAxis = {
    type: "value" as const,
    axisLine: { show: true },
    axisTick: { show: true },
    splitLine: { show: true },
    splitNumber: 5,
    name: yAxisTitle,
    nameLocation: "middle" as const,
    nameRotate: 90,
    nameGap: 40,
  };

  const defaultEmphasis: BarSeriesOption["emphasis"] = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  const defaultDataZoom: DataZoomComponentOption[] = [];

  return {
    defaultAxisPointer,
    defaultDataZoom,
    defaultEmphasis,
    defaultGrid,
    defaultXAxis,
    defaultYAxis,
  };
}
