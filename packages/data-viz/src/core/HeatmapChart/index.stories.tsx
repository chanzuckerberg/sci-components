import { Args, Meta } from "@storybook/react";
import RawHeatmapChart from "./index";
import { COLORS } from "./storyUtils";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { ScatterSeriesOption } from "echarts";
import App from "./heatmapDemo/App";
import { Provider } from "react-redux";
import { store } from "./heatmapDemo/store";

const HEATMAP_SIZE = 100;
const HEATMAP_ITEM_SIZE = 20;

const NUMBERS = Array.from(Array(HEATMAP_SIZE).keys());

const data: { x: number; y: number; value: number }[] = [];

for (const x of NUMBERS) {
  for (const y of NUMBERS) {
    data.push({
      value: Math.round(Math.random() * 100),
      x,
      y,
    });
  }
}

const ENCODE = { x: "x", y: "y" };

const ITEM_STYLE = {
  borderColor: "white",
  borderType: "solid",
  borderWidth: 1,
  color({ data: { value } }: { data: { value: number } }) {
    return COLORS[Math.round((value / 100) * (COLORS.length - 1))];
  },
  opacity: 1,
} as ScatterSeriesOption["itemStyle"];

const HeatmapChart = (props: Args): JSX.Element => {
  const { camera, symbol, tooltip, ...rest } = props;

  const CHART_WIDTH_PX =
    HEATMAP_ITEM_SIZE * (camera && camera.active ? camera.width : HEATMAP_SIZE);
  const CHART_HEIGHT_PX =
    HEATMAP_ITEM_SIZE *
    (camera && camera.active ? camera.height : HEATMAP_SIZE);

  return (
    <>
      <RawHeatmapChart
        width={CHART_WIDTH_PX}
        height={CHART_HEIGHT_PX}
        camera={camera}
        xAxisData={NUMBERS}
        yAxisData={NUMBERS}
        data={data}
        encode={ENCODE}
        symbol={symbol}
        symbolSize={(p) => symbolSize(p, symbol)}
        itemStyle={ITEM_STYLE}
        emphasis={{
          itemStyle: {
            borderColor: symbol === "circle" ? "black" : "white",
            borderType: "solid",
            borderWidth: symbol === "circle" ? 2 : 4,
            opacity: 1,
          },
          scale: false,
        }}
        options={{
          series: [
            {
              type: "scatter",
            },
          ],
          tooltip: tooltip,
        }}
        {...rest}
      />
    </>
  );
};

const tooltipOptions = [
  { show: false },
  {
    enterable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (param: any) {
      return param.data
        ? [
            `X-Axis: <strong>${param.data.x}</strong><br/>`,
            `Y-Axis: <strong>${param.data.y}</strong><br/><br/>`,
            `${param.marker} <strong>${param.data.value}</strong>`,
          ].join("")
        : [];
    },
    show: true,
  },
];

const axisPointerOptions = [
  {
    show: false,
    type: "none",
  },
  {
    show: true,
    triggerOn: "mousemove",
    type: "none",
  },
  {
    show: true,
    triggerOn: "click",
    type: "none",
  },
];

export default {
  argTypes: {
    axisPointer: {
      control: {
        labels: [
          "No axis pointer",
          "Show axis pointer on mousemove",
          "Show axis pointer on click",
        ],
        type: "select",
      },
      mapping: axisPointerOptions,
      options: Object.keys(axisPointerOptions),
    },
    camera: {
      control: {
        type: "object",
      },
    },
    echartsRendererMode: {
      control: {
        labels: ["Canvas", "SVG"],
        type: "select",
      },
      options: ["canvas", "svg"],
    },
    symbol: {
      control: {
        labels: ["Circle", "Rectangle", "Round Rectangle"],
        type: "select",
      },
      options: ["circle", "rect", "roundRect"],
    },
    tooltip: {
      control: {
        labels: ["No tooltip", "Show Tooltip"],
        type: "select",
      },
      mapping: tooltipOptions,
      options: Object.keys(tooltipOptions),
    },
  },
  component: HeatmapChart,
  parameters: {
    badges: [BADGE.BETA],
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/HeatmapChart [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    axisPointer: axisPointerOptions[1],
    camera: {
      active: true,
      height: 20,
      width: 40,
    },
    echartsRendererMode: "svg",
    symbol: "circle",
    tooltip: tooltipOptions[1],
  },
  parameters: {},
};

function symbolSize(props: { value: number }, symbol: string) {
  const { value } = props;
  return convertPercentageToDiameter(value, symbol);
}

function convertPercentageToDiameter(
  percentage: number,
  symbol: string
): number {
  if (symbol !== "circle") {
    return HEATMAP_ITEM_SIZE;
  } else {
    return (percentage * HEATMAP_ITEM_SIZE) / 100;
  }
}

const HeatmapDemoComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export const HeatmapDemo = {
  parameters: {
    /**
     * Axe is complaining about color contrast of Axis-labels and
     * since the colors are by design and the contrast is not an issue,
     * the rule is disabled for this story.
     */
    axe: {
      disabledRules: ["color-contrast"],
    },
    controls: {
      exclude: [
        "axisPointer",
        "camera",
        "echartsRendererMode",
        "symbol",
        "tooltip",
      ],
    },
    // This parameter is used to set the story's layout to fullscreen
    // and remove the padding around the storybook root element
    layout: "fullscreen",
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <HeatmapDemoComponent {...args} />,
};
