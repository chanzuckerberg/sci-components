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
      mapping: HEATMAP_AXIS_POINTER_OPTIONS,
      options: Object.keys(HEATMAP_AXIS_POINTER_OPTIONS),
    },
    camera: {
      control: {
        type: "object",
      },
    },
    echartsRendererMode: {
      control: {
        labels: { canvas: "Canvas", svg: "SVG" },
        type: "select",
      },
      options: ["canvas", "svg"],
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
      options: ["circle", "rect", "roundRect"],
    },
    tooltip: {
      control: {
        labels: { none: "No tooltip", visible: "Show Tooltip" },
        type: "select",
      },
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
