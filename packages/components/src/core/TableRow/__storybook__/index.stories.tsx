/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react-vite";
import { TableRow } from "./stories/default";
import { TABLE_ROW_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description:
        "Grays the row out and stops pointer events inside its CellComponents, so controls in the row cannot be used. Tags and icons in the row are dimmed to match.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hover: {
      control: { type: "boolean" },
      description:
        "Gives the row a hover background, and is also required for its tooltip to appear. TableHeader sets it to false for the header row.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    rowHeight: {
      control: { type: "number" },
      description: "Caps the row's height, in pixels.",
    },
    selected: {
      control: { type: "boolean" },
      description:
        "Gives the row's cells the accent surface used for selection. It is styling only; it sets no ARIA state.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
      description:
        "Wraps the row in a Tooltip, but only while hover is also true. On its own it shows nothing: a row tooltip needs tooltipText as well.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    tooltipProps: {
      control: { type: "object" },
      description:
        "Passed to the Tooltip, and overrides the defaults the row sets (arrow, dark style).",
    },
    tooltipSubtitle: {
      control: { type: "text" },
      description: "A second line below the tooltip's title.",
    },
    tooltipText: {
      control: { type: "text" },
      description: "The tooltip's title.",
    },
    useDivider: {
      control: { type: "boolean" },
      description: "Draws the 1px divider along the bottom of the row.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  component: TableRow,
  title: "Components/Table/TableRow",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    hover: true,
    selected: false,
    shouldShowTooltipOnHover: true,
    tooltipProps: { sdsStyle: "dark" },
    tooltipText: "This is a TableRow component",
    useDivider: true,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: TABLE_ROW_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table-row" />,
};
