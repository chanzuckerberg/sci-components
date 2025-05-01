import { ECharts, EChartsOption } from "echarts";

export interface CreateChartOptionsProps {
  /**
   * The width of the chart in pixels
   */
  width: number;
  /**
   * The height of the chart in pixels
   */
  height: number;
  /**
   * https://echarts.apache.org/en/option.html#grid
   */
  grid?:
    | EChartsOption["grid"]
    | ((defaultOption: EChartsOption["grid"]) => EChartsOption["grid"]);
  /**
   * The options object to be passed to echarts.setOption()
   * https://echarts.apache.org/en/option.html
   */
  options?: EChartsOption;
  /**
   * Event listeners for the chart
   * https://echarts.apache.org/en/api.html#events
   */
  onEvents?: Record<string, (event: unknown, chart: ECharts) => void>;
}

export function createChartOptions(
  props: CreateChartOptionsProps
): EChartsOption {
  const { grid: gridProp, options } = props;

  const { defaultGrid } = generateDefaultValues(props);

  const customGrid =
    typeof gridProp === "function" ? gridProp(defaultGrid) : gridProp;

  const { series: optionsSeries, ...optionsRest } = options || {};

  return {
    animation: false,
    grid: customGrid || defaultGrid,
    series: [
      Object.assign(
        optionsSeries
          ? Array.isArray(optionsSeries)
            ? optionsSeries[0]
            : optionsSeries
          : [],
        { type: "bar" }
      ),
    ] as EChartsOption["series"],
    ...optionsRest,
  };
}

function generateDefaultValues(props: CreateChartOptionsProps) {
  const { height, width } = props;

  const defaultGrid = {
    containLabel: true,
    height: `${height}px`,
    left: 0,
    top: 0,
    // (atarashansky): this is the key change to align x and y axis
    // labels to fixed spaces
    width: `${width}px`,
  };

  return {
    defaultGrid,
  };
}
