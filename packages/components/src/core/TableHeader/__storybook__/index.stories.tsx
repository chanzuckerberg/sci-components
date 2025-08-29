/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react-webpack5";
import { TableHeader } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  component: TableHeader,
  title: "Components/Table/TableHeader",
} as Meta;

export const Default = {};

// Test

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table-header" />,
};
