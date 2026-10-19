import { Args, Meta } from "@storybook/react-vite";
import { INPUT_SEARCH_EXCLUDED_CONTROLS } from "./constants";
import { InputSearch } from "./stories/default";
import { TestDemo } from "./stories/test";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    id: {
      control: { type: "text" },
      description:
        "The id of the `input` element. Use this prop to make `label` and `helperText` accessible for screen readers.",
      required: true,
    },
    intent: {
      control: { type: INLINE_RADIO },
      description:
        "Alters the border color and visual intent of the search input.",
      options: ["default", "negative", "notice", "positive"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    label: {
      control: { type: "text" },
      description: "The label content.",
      required: true,
    },
    placeholder: {
      control: { type: "text" },
      description:
        "The short hint displayed in the `input` before the user enters a value.",
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      description:
        "Determines the visual style of the component, with options for rounded or square design.",
      options: ["rounded", "square"],
      table: {
        defaultValue: { summary: "square" },
      },
    },
    classes: {
      control: { type: "object" },
      description:
        "Class names for the internal elements: root, label, input, endAdornment, startAdornment, clearButton, and searchButton, alongside MUI's TextField classes.",
    },
  },
  component: InputSearch,
  title: "Components/Inputs/InputSearch",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    id: "Test",
    label: "Search",
    placeholder: "Search",
    classes: {
      root: "",
      label: "",
      input: "",
      endAdornment: "",
      startAdornment: "",
      clearButton: "",
      searchButton: "",
    },
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: INPUT_SEARCH_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
