import { Args, Meta } from "@storybook/react-vite";
import { Table } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  component: Table,
  title: "Components/Table/Table",
} as Meta;

export const Default = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // For some reason axe is still checking color contrast of the disabled row. Maybe it only
          // takes that into consideration for form controls?
          { enabled: false, id: "color-contrast" },
        ],
      },
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
