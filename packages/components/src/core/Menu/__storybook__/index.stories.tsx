import { Meta } from "@storybook/react-webpack5";
import { Menu } from "./stories/default";

export default {
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
