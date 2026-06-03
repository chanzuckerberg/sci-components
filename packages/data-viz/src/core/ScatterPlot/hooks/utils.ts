import {
  AxisPointerComponentOption,
  DatasetComponentOption,
  ECharts,
  EChartsOption,
  ScatterSeriesOption,
} from "echarts";

const DEFAULT_ITEM_STYLE = {
  color() {
    return "rgb(0, 0, 0)";
  },
};

export interface CreateChartOptionsProps {
  /**
   * The data array to be visualized
   * The data point object shape can be whatever you like, but it must be consistent with the `encode` option
   * For example, if the data point shape is:
   * {
   *   geneIndex: 0,
   *   cellTypeIndex: 0,
   *   percentage: 0.5
   * }
   * and you want geneIndex to be encoded to x axis and cellTypeIndex to be encoded to y axis, then make sure your encode option is:
   * encode: {
   *   x: 'geneIndex',
   *   y: 'cellTypeIndex'
   * }
   */
  data: DatasetComponentOption["source"];
  /**
   * Customize the style of each cell item when mouse hovers on it, such as color, border, opacity, etc.
   * https://echarts.apache.org/en/option.html#series-scatter.emphasis
   */
  emphasis?: ScatterSeriesOption["emphasis"];
  /**
   * The data for the x axis
   * For example:
   * [{ value: "gene1", textStyle: { color: "red" } }, "gene2", "gene3"]
   */
  xAxisData: CategoryAxisData;
  /**
   * The data for the y axis
   * For example:
   * [{ value: "cellType1", textStyle: { color: "red" } }, "cellType2", "cellType3"]
   */
  yAxisData: CategoryAxisData;
  /**
   * The width of the chart in pixels
   */
  width: number;
  /**
   * The height of the chart in pixels
   */
  height: number;
  /**
   * Provide a mapping of data key to x/y axis encoding
   * For example, if the data is:
   * {
   *   geneIndex: 0,
   *   cellTypeIndex: 0,
   *   percentage: 0.5
   * }
   * and we want to encode `geneIndex` to x axis and `cellTypeIndex` to y axis, then
   * encode: {
   *  x: 'geneIndex',
   *  y: 'cellTypeIndex'
   * }
   * https://echarts.apache.org/en/option.html#series-scatter.encode
   */
  encode?: {
    x: string;
    y: string;
  };
  /**
   * Customize the style of each cell item, such as color, border, opacity, etc.
   * https://echarts.apache.org/en/option.html#series-scatter.itemStyle
   */
  itemStyle?: ScatterSeriesOption["itemStyle"];
  /**
   * The shape of the symbol.
   */
  symbol?: "circle" | "rect" | "roundRect";
  /**
   * `symbolSize` can be set to single numbers like 10, or use an array to represent width and height. For example, [20, 10] means symbol width is 20, and height is 10.
   *
   * If size of symbols needs to be different, you can set with callback function in the following format:
   *
   * (value: Array|number, params: Object) => number|Array
   *
   * The first parameter value is the value in data, and the second parameter params is the rest parameters of data item.
   * https://echarts.apache.org/en/option.html#series-scatter.symbolSize
   */
  symbolSize?: ScatterSeriesOption["symbolSize"];
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
  const {
    data,
    emphasis,
    encode,
    grid: gridProp,
    itemStyle = DEFAULT_ITEM_STYLE,
    options,
    symbolSize,
    symbol = "rect",
  } = props;

  const { defaultEmphasis, defaultGrid, defaultXAxis, defaultYAxis } =
    generateDefaultValues(props);

  const customGrid =
    typeof gridProp === "function" ? gridProp(defaultGrid) : gridProp;

  const {
    series: optionsSeries,
    xAxis: optionsXAxis,
    yAxis: optionsYAxis,
    ...optionsRest
  } = options || {};

  return {
    animation: false,
    dataset: {
      source: data as DatasetComponentOption["source"],
    },
    grid: customGrid || defaultGrid,
    series: [
      Object.assign(
        {
          emphasis: Object.assign(defaultEmphasis, emphasis),
          encode,
          itemStyle,
          legendHoverLink: false,
          symbol,
          symbolSize,
        },
        optionsSeries
          ? Array.isArray(optionsSeries)
            ? optionsSeries[0]
            : optionsSeries
          : [],
        { symbol: symbol, type: "scatter" }
      ),
    ] as EChartsOption["series"],
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
    ...optionsRest,
  };
}

function generateDefaultValues(props: CreateChartOptionsProps) {
  const { height, width } = props;

  const defaultGrid = {
    height: `${height}px`,
    left: 0,
    top: 0,
    // (atarashansky): this is the key change to align x and y axis
    // labels to fixed spaces
    width: `${width}px`,
  };

  const defaultAxisPointer = {} as AxisPointerComponentOption;

  const defaultXAxis = {};

  const defaultYAxis = {};

  const defaultEmphasis = {};

  return {
    defaultAxisPointer,
    defaultEmphasis,
    defaultGrid,
    defaultXAxis,
    defaultYAxis,
  };
}

type OrdinalRawValue = string | number;

/**
 * (thuang): This copies echarts' CategoryAxisBaseOption["data"] type, since it's not exported
 */
type CategoryAxisData = (
  | OrdinalRawValue
  | {
      value: OrdinalRawValue;
      /**
       * (thuang): This should be echarts `TextCommonOption` type, but it's not exported
       */
      textStyle?: never;
    }
)[];
