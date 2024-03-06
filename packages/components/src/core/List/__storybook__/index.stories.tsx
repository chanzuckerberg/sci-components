import { Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { List } from "./stories/default";

export default {
  component: List,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/List",
} as Meta;

// Default

export const Default = {};
