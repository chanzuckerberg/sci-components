import { Args, Meta } from "@storybook/react-vite";
import {
  HEATMAP_AXIS_POINTER_OPTIONS,
  HEATMAP_TOOLTIP_OPTIONS,
} from "./constants";
import App from "./stories/heatmapDemo/App";
import { Provider } from "react-redux";
import { store } from "./stories/heatmapDemo/store";
import { HeatmapChart } from "./stories/default";

export default {
  argTypes: {
    axisPointer: {
      control: {
        labels: {
          none: "No axis pointer",
          mousemove: "Show axis pointer on mousemove",
          click: "Show axis pointer on click",
        },
        type: "select",
      },
      description:
        "The crosshair following the pointer. One object applies to both axes; a two-entry array configures them separately. See https://echarts.apache.org/en/option.html#axisPointer.",
      mapping: HEATMAP_AXIS_POINTER_OPTIONS,
      options: Object.keys(HEATMAP_AXIS_POINTER_OPTIONS),
      table: {
        defaultValue: { summary: "hidden" },
      },
    },
    camera: {
      control: {
        type: "object",
      },
      description:
        "Renders only a window of the grid, measured in cells, and lets the pointer pan it, so very large heatmaps stay fast. Sizes are ignored unless `active` is true, and default to 40 × 20 cells.",
      table: {
        defaultValue: { summary: "inactive" },
      },
    },
    echartsRendererMode: {
      control: {
        labels: { canvas: "Canvas", svg: "SVG" },
        type: "select",
      },
      description:
        "Which renderer ECharts initialises with. Canvas copes better with very large grids. Changing it rebuilds the chart.",
      options: ["canvas", "svg"],
      table: {
        defaultValue: { summary: "svg" },
      },
    },
    symbol: {
      control: {
        labels: {
          circle: "Circle",
          rect: "Rectangle",
          roundRect: "Round Rectangle",
        },
        type: "select",
      },
      description:
        "The shape of a cell. Circles turn the grid into a dot plot, where diameter can carry a second measurement.",
      options: ["circle", "rect", "roundRect"],
      table: {
        defaultValue: { summary: "rect" },
      },
    },
    tooltip: {
      control: {
        labels: { none: "No tooltip", visible: "Show Tooltip" },
        type: "select",
      },
      description:
        "Story-only: an ECharts tooltip config that the story passes through the chart's options. It switches between no tooltip and one showing the hovered cell's x, y and value.",
      mapping: HEATMAP_TOOLTIP_OPTIONS,
      options: Object.keys(HEATMAP_TOOLTIP_OPTIONS),
    },
  },
  component: HeatmapChart,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/HeatmapChart",
} as Meta;

// Default

export const Default = {
  args: {
    axisPointer: HEATMAP_AXIS_POINTER_OPTIONS.mousemove,
    camera: {
      active: true,
      height: 20,
      width: 40,
    },
    echartsRendererMode: "svg",
    symbol: "circle",
    tooltip: HEATMAP_TOOLTIP_OPTIONS.visible,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

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
    a11y: {
      config: { rules: [{ enabled: false, id: "color-contrast" }] },
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
    test: {
      timeout: 60 * 1000,
    },
  },
  render: (args: Args) => <HeatmapDemoComponent {...args} />,
};
