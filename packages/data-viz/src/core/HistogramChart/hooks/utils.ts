import {
  AxisPointerComponentOption,
  BarSeriesOption,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemAPI,
  DataZoomComponentOption,
  DatasetComponentOption,
  ECharts,
  EChartsOption,
} from "echarts";

export type HistogramBin = [binStart: number, binEnd: number, count: number];

export interface CreateChartOptionsProps {
  /**
   * Display reference line and axis value under mouse pointer
   * https://echarts.apache.org/en/option.html#axisPointer
   */
  axisPointer?: EChartsOption["axisPointer"];
  /**
   * The data array for the histogram
   * Array of [binStart, binEnd, count] triples, e.g. [[0, 10, 5], [10, 20, 12]]
   */
  data?: HistogramBin[];
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
   * Array of [binStart, binEnd, count] triples — can have different bin sizes than `data`
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

function createRenderItem(fillColor: string) {
  return (
    params: CustomSeriesRenderItemParams,
    api: CustomSeriesRenderItemAPI
  ) => {
    const x0 = api.value!(0) as number;
    const x1 = api.value!(1) as number;
    const y = api.value!(2) as number;

    const pBottom = api.coord!([x0, 0]);
    const pTop = api.coord!([x0, y]);
    const pRight = api.coord!([x1, 0]);

    const left = Math.round(pBottom[0]);
    const right = Math.round(pRight[0]);
    const bottom = Math.round(pBottom[1]);
    const top = Math.round(pTop[1]);

    const width = Math.max(1, right - left);
    const height = Math.max(0, bottom - top);

    return {
      type: "rect" as const,
      shape: { x: left, y: top, width, height },
      style: api.style!({
        fill: fillColor,
        stroke: fillColor,
        lineWidth: 1,
      }),
    };
  };
}

function computeXAxisBounds(
  data: HistogramBin[] | undefined,
  referenceData: DatasetComponentOption["source"] | undefined
): { min: number; max: number } | null {
  if (!Array.isArray(data) || data.length === 0) return null;

  let xMin = data[0][0];
  let xMax = data[data.length - 1][1];

  if (Array.isArray(referenceData) && referenceData.length > 0) {
    const refBins = referenceData as HistogramBin[];
    xMin = Math.min(xMin, refBins[0][0]);
    xMax = Math.max(xMax, refBins[refBins.length - 1][1]);
  }

  return { min: xMin, max: xMax };
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
    barColor,
    options,
    chartTitle,
    showTitle,
    showXAxisGrid,
    showYAxisGrid,
    referenceData,
    referenceColor,
    threshold,
  } = props;

  const {
    defaultAxisPointer,
    defaultDataZoom,
    defaultEmphasis,
    defaultXAxis,
    defaultGrid,
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

  // Snap x-axis bounds to the data range so that every bar fits fully inside
  // the grid area. Without this, ECharts auto-picks "nice" round tick values
  // which may end before the last bin edge, causing a clipped 1px line artifact.
  const xAxisBounds = computeXAxisBounds(data, referenceData);
  if (xAxisBounds) {
    defaultXAxis.min = xAxisBounds.min;
    defaultXAxis.max = xAxisBounds.max;
  }

  return {
    animation: false,
    title:
      typeof chartTitle === "string"
        ? { text: chartTitle, show: showTitle !== false }
        : chartTitle,
    axisPointer: axisPointer || optionsAxisPointer || defaultAxisPointer,
    dataZoom: dataZoom || optionsDataZoom || defaultDataZoom,
    grid: customGrid || defaultGrid,
    series: [
      // Reference distribution (background) - only if referenceData provided
      ...(referenceData
        ? [
            {
              type: "custom" as const,
              data: referenceData,
              clip: true,
              renderItem: createRenderItem(
                (referenceColor as string) || "rgba(128, 128, 128, 0.3)"
              ),
              emphasis: { disabled: true },
              z: 1,
            },
          ]
        : []),
      // Main distribution (foreground)
      Object.assign(
        {
          type: "custom" as const,
          data: data,
          clip: true,
          renderItem: createRenderItem(
            (itemStyle?.color as string) || (barColor as string) || "#7a7a7a"
          ),
          emphasis: Object.assign({}, defaultEmphasis, emphasis),
          z: 2,
          markArea: threshold
            ? {
                silent: true,
                itemStyle: {
                  color: threshold.color || "rgba(200, 200, 200, 0.3)",
                },
                data: [[{ yAxis: threshold.min }, { yAxis: threshold.max }]],
              }
            : { data: [] },
        },
        normalizeOption(optionsSeries)
      ),
    ] as EChartsOption["series"],
    xAxis: [
      Object.assign(
        {},
        defaultXAxis,
        { splitLine: { show: showXAxisGrid ?? true } },
        normalizeOption(optionsXAxis)
      ),
    ],
    yAxis: [
      Object.assign(
        {},
        defaultYAxis,
        { splitLine: { show: showYAxisGrid ?? true } },
        normalizeOption(optionsYAxis)
      ),
    ],
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

  const defaultXAxis: Record<string, unknown> = {
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
