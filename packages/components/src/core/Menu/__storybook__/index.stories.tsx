import { Meta } from "@storybook/react";
import { Menu } from "./stories/default";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

export default {
  component: Menu,
  parameters: {
    badges: [BADGE.STABLE],
  },
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
