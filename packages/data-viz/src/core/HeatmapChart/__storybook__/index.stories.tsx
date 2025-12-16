import { Args, Meta } from "@storybook/react-webpack5";
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
        labels: [
          "No axis pointer",
          "Show axis pointer on mousemove",
          "Show axis pointer on click",
        ],
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
      mapping: HEATMAP_TOOLTIP_OPTIONS,
      options: Object.keys(HEATMAP_TOOLTIP_OPTIONS),
    },
  },
  component: HeatmapChart,
  tags: ["beta"],
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
    axisPointer: HEATMAP_AXIS_POINTER_OPTIONS[1],
    camera: {
      active: true,
      height: 20,
      width: 40,
    },
    echartsRendererMode: "svg",
    symbol: "circle",
    tooltip: HEATMAP_TOOLTIP_OPTIONS[1],
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
