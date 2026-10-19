import { Args, Meta } from "@storybook/react-vite";
import { CELL_HEADER_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { CellHeader } from "./stories/default";

export default {
  argTypes: {
    active: {
      control: { type: "boolean" },
      description:
        "Marks this column as the one currently sorted: the label and chevron take the accent color. It does not sort anything on its own.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    as: {
      control: { type: "text" },
      description: "The element the header cell renders as.",
      table: {
        defaultValue: { summary: "th" },
      },
    },
    direction: {
      control: { type: "select" },
      description:
        'Which chevron to draw: up for "asc", down for "desc". It also sets the icon\'s aria-label.',
      options: ["asc", "desc"],
      table: {
        defaultValue: { summary: "desc" },
      },
    },
    hideSortIcon: {
      control: { type: "boolean" },
      description:
        "Leaves the chevron out for columns that cannot be sorted. An active header keeps its chevron even with this set.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    horizontalAlign: {
      control: { type: "select" },
      description: "Horizontally aligns the label and its chevron.",
      options: ["left", "center", "right"],
      table: {
        defaultValue: { summary: "left" },
      },
    },
    hover: {
      control: { type: "boolean" },
      description:
        "Makes the header interactive: it takes a pointer cursor, reacts to hover, renders the sort chevron and allows the tooltip. A header left at the default draws no chevron and shows no tooltip even if the other sorting props are set, so set this on every sortable column.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
      description:
        "Wraps the header in a Tooltip. It only takes effect while hover is also true.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    shouldTruncate: {
      control: { type: "boolean" },
      description:
        "Keeps a long label on one line and truncates it with an ellipsis instead of wrapping.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    tooltipProps: {
      control: { type: "object" },
      description:
        "Passed to the Tooltip, and overrides the defaults the header sets (arrow, top-start placement, dark style).",
    },
    tooltipSubtitle: {
      control: { type: "text" },
      description: "A second line below the tooltip's title.",
    },
    tooltipText: {
      control: { type: "text" },
      description: "The tooltip's title.",
    },
    width: {
      control: { type: "text" },
      description:
        "Lands on the rendered cell as the HTML width attribute, so a number is read as pixels. Browsers treat it as the width of the whole column, and take it as a minimum rather than a promise.",
    },
  },
  component: CellHeader,
  title: "Components/Table/CellHeader",
} as Meta;

// Default

export const Default = {
  args: {
    active: false,
    direction: "desc",
    hideSortIcon: false,
    hover: true,
    shouldShowTooltipOnHover: true,
    tooltipProps: { sdsStyle: "dark" },
    tooltipText: "This is a header cell",
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: CELL_HEADER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
