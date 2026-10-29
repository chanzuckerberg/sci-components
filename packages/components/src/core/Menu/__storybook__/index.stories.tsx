import { Meta } from "@storybook/react-vite";
import { Menu } from "./stories/default";

export default {
  argTypes: {
    anchorOrigin: {
      control: { type: "object" },
      description:
        "The point on the anchor element that the menu attaches to, as `{ vertical, horizontal }`.",
      table: {
        defaultValue: {
          summary: '{ vertical: "bottom", horizontal: "center" }',
        },
      },
    },
    column: {
      control: { type: "text" },
      description:
        "Not a Menu prop: the story passes it through to the menu's root element, where it has no visible effect. The right-hand column text is set on each MenuItem.",
    },
    transformOrigin: {
      control: { type: "object" },
      description:
        "The point on the menu that lines up with the anchor origin, as `{ vertical, horizontal }`.",
      table: {
        defaultValue: { summary: '{ vertical: "top", horizontal: "center" }' },
      },
    },
  },
  component: Menu,
  title: "Components/Dropdowns/Menu",
} as Meta;

// Default

export const Default = {};

// Custom Placement

export const CustomPlacement = {
  args: {
    anchorOrigin: {
      horizontal: "right",
      vertical: "bottom",
    },
    column: "column value",
    transformOrigin: {
      horizontal: "right",
      vertical: "top",
    },
  },
};
