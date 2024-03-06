import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Table } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  component: Table,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Table/Table",
} as Meta;

export const Default = {
  parameters: {
    axe: {
      disabledRules: [
        // For some reason axe is still checking color contrast of the disabled row. Maybe it only
        // takes that into consideration for form controls?
        "color-contrast",
      ],
    },
  },
};

// Test

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table" />,
};
