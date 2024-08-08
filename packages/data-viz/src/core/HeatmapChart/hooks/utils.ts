"use client";

import {
  AxisPointerComponentOption,
  DataZoomComponentOption,
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
   * Display reference line and axis value under mouse pointer
   * https://echarts.apache.org/en/option.html#axisPointer
   */
  axisPointer?: EChartsOption["axisPointer"];
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
   * The `dataZoom` prop is utilized for implementing zoom functionality within a
   * specific area of the chart. This feature empowers users to inspect data in
   * granular detail, obtain an overview of the entire dataset, or eliminate
   * outlier points.
   * By applying the `dataZoom` prop while locking the zoom level, the chart
   * efficiently renders a confined portion of the heatmap. This selective
   * rendering strategy becomes especially advantageous when dealing with
   * extensive datasets. Instead of rendering the entire heatmap at once,
   * the chart dynamically loads and renders specific segments as the user
   * scrolls through the data. This approach optimizes performance and enables
   * the creation of heatmaps with large amounts of data.
   * https://echarts.apache.org/en/option.html#dataZoom
   */
  dataZoom?: EChartsOption["dataZoom"];
  /**
   * The `camera` prop is utilized for implementing camera view port functionality
   * within a specific area of the chart. This feature empowers users to render
   * a confined portion of the heatmap. This selective rendering strategy becomes
   * especially advantageous when dealing with extensive datasets. Instead of
   * rendering the entire heatmap at once, the chart dynamically loads and renders
   * specific segments as the user scrolls through the data. This approach optimizes
   * performance and enables the creation of heatmaps with large amounts of data.
   *
   * The `height` and `width` properties are used to specify the dimensions of the
   * camera view port. The `active` property is used to enable or disable the camera
   * view port functionality.
   */
  camera?: {
    active: boolean;
    height: number;
    width: number;
  };
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
    axisPointer,
    camera,
    data,
    dataZoom,
    emphasis,
    encode,
    grid: gridProp,
    itemStyle = DEFAULT_ITEM_STYLE,
    options,
    symbolSize,
    symbol = "rect",
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
    axisPointer: mergeAxisPointer(
      defaultAxisPointer,
      axisPointer,
      optionsAxisPointer
    ),
    dataZoom: camera?.active
      ? mergeDataZoom(defaultDataZoom, dataZoom, optionsDataZoom)
      : [],
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

function mergeAxisPointer(
  defaultAxisPointer: AxisPointerComponentOption,
  axisPointer: EChartsOption["axisPointer"],
  optionsAxisPointer: EChartsOption["axisPointer"]
): EChartsOption["axisPointer"] {
  const finalAxisPointer = Array.isArray(axisPointer)
    ? axisPointer // if it's an array, assume that the user has [{...propsToChangeOnX}] OR [ , {...propsToChangeOnY}] OR [{...propsToChangeOnX}, {...propsToChangeOnY}]
    : [axisPointer, axisPointer]; // else if the user only supplies one AxisPointer object, we assume they want the props to apply to both x and y axisPointer objects

  const finalOptionsAxisPointer = Array.isArray(optionsAxisPointer)
    ? optionsAxisPointer
    : [optionsAxisPointer, optionsAxisPointer];

  // merge x axisPointer options
  const x = {
    ...defaultAxisPointer,
    ...finalAxisPointer[0],
    ...finalOptionsAxisPointer?.[0],
  };

  // merge y axisPointer options
  const y = {
    ...defaultAxisPointer,
    ...finalAxisPointer[1],
    ...finalOptionsAxisPointer[1],
  };

  return [x, y] as EChartsOption["axisPointer"];
}

function mergeDataZoom(
  defaultDataZoom: DataZoomComponentOption[],
  dataZoom: EChartsOption["dataZoom"],
  optionsDataZoom: EChartsOption["dataZoom"]
): EChartsOption["dataZoom"] {
  const finalDataZoom = Array.isArray(dataZoom)
    ? dataZoom // if it's an array, assume that the user has [{...propsToChangeOnX}] OR [ , {...propsToChangeOnY}] OR [{...propsToChangeOnX}, {...propsToChangeOnY}]
    : [dataZoom, dataZoom]; // else if the user only supplies one dataZoom object, we assume they want the props to apply to both x and y zoom objects

  const finalOptionsDataZoom = Array.isArray(optionsDataZoom)
    ? optionsDataZoom
    : [optionsDataZoom, optionsDataZoom];

  // merge x dataZoom options
  const x = {
    ...defaultDataZoom[0],
    ...finalDataZoom[0],
    ...finalOptionsDataZoom?.[0],
  };

  // merge y dataZoom options
  const y = {
    ...defaultDataZoom[1],
    ...finalDataZoom[1],
    ...finalOptionsDataZoom[1],
  };

  return [x, y] as EChartsOption["dataZoom"];
}

function generateDefaultValues(props: CreateChartOptionsProps) {
  const { camera, height, symbol, width, xAxisData, yAxisData } = props;

  const defaultGrid = {
    height: `${height}px`,
    left: 0,
    top: 0,
    // (atarashansky): this is the key change to align x and y axis
    // labels to fixed spaces
    width: `${width}px`,
  };

  const defaultAxisPointer = {
    label: { show: false },
    show: false,
    triggerOn: "mousemove",
  } as AxisPointerComponentOption;

  const defaultXAxis = {
    axisLabel: { fontSize: 0, rotate: 90 },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    boundaryGap: true,
    data: xAxisData,
    splitLine: {
      show: false,
    },
    type: "category",
  };

  const defaultYAxis = {
    axisLabel: { fontSize: 0 },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    boundaryGap: true,
    data: yAxisData,
    splitLine: {
      show: false,
    },
  };

  const defaultEmphasis = {
    itemStyle: {
      borderColor: symbol === "circle" ? "black" : "white",
      borderType: "solid",
      borderWidth: symbol === "circle" ? 2 : 4,
      opacity: 1,
    },
    scale: false,
  };

  const defaultCamera = {
    height: camera && camera.height ? camera.height : 20,
    width: camera && camera.width ? camera.width : 40,
  };

  const defaultDataZoom = [
    {
      // end index of the x axis window
      endValue: defaultCamera.width - 1,
      filterMode: "filter",
      moveOnMouseMove: true,
      // There's a PR to allow touchpad panning
      // https://github.com/apache/echarts/pull/19352
      moveOnMouseWheel: false,
      orient: "horizontal",
      preventDefaultMouseMove: true,
      // start index of the x axis window
      startValue: 0,
      throttle: 0,
      type: "inside",
      xAxisIndex: 0,
      zoomOnMouseWheel: false,
    },
    {
      // end index of the y axis window
      endValue: defaultCamera.height - 1,
      filterMode: "filter",
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      orient: "vertical",
      preventDefaultMouseMove: true,
      // start index of the y axis window
      startValue: 0,
      throttle: 0,
      type: "inside",
      yAxisIndex: 0,
      zoomOnMouseWheel: false,
    },
  ] as DataZoomComponentOption[];

  return {
    defaultAxisPointer,
    defaultDataZoom,
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
