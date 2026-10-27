import { Args, Meta } from "@storybook/react-vite";
import { Accordion } from "./stories/default";
import { ACCORDION_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    defaultExpanded: {
      control: { type: "boolean" },
      description: "If `true`, expands the accordion by default.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    id: {
      control: { type: "text" },
      description:
        "Required. A unique id for each accordion item, also used to derive the ids that link the header and its content for screen readers.",
      required: true,
    },
    subtitle: {
      control: { type: "text" },
      description:
        "Set on AccordionHeader. A text that will be displayed as a subtitle beneath the accordion title.",
    },
    togglePosition: {
      control: { type: "select" },
      description: "Position of the toggle chevron icon.",
      options: ["right", "left"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
    useDivider: {
      control: { type: "boolean" },
      description: "Display a divider line between accordion items.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  component: Accordion,
  title: "Components/Accordion",
} as Meta;

// Default

export const Default = {
  args: {
    id: "default-story",
    togglePosition: "right",
  },
};

// Test

export const Test = {
  args: {
    id: "test-story",
    togglePosition: "right",
  },
  parameters: {
    controls: {
      exclude: ACCORDION_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => (
    <Accordion {...props} data-testid="accordion" />
  ),
};
