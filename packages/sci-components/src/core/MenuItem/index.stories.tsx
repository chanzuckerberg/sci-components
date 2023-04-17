/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import MenuItem from "./index";
import { DemoWrapper } from "./style";

const Demo = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <DemoWrapper>
      <MenuItem data-testid="MenuItem" {...props}>
        {name}
      </MenuItem>
    </DemoWrapper>
  );
};

export default {
  argTypes: {
    column: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    isMultiSelect: {
      control: { type: "boolean" },
    },
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "bacteria",
        "barChartHorizontal3",
        "checkCircle",
        "gear",
        "flagCheck",
      ],
    },
    sdsIconProps: { control: { type: "object" } },
    selected: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  parameters: {
    axe: {
      disabledRules: ["aria-required-parent"],
    },
  },
  title: "MenuItem",
} as Meta;

export const Default = {
  args: {
    column: "column value here",
    name: "text here",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

// Test

export const Test = {
  args: {
    column: "test column",
    name: "test text",
  },
};
