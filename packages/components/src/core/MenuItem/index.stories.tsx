/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import RawMenuItem from "./index";
import { DemoWrapper } from "./style";

const MenuItem = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <DemoWrapper>
      <RawMenuItem data-testid="MenuItem" {...props}>
        {name}
      </RawMenuItem>
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
  component: MenuItem,
  parameters: {
    axe: {
      disabledRules: ["aria-required-parent"],
    },
  },
  title: "Dropdowns/MenuItem",
} as Meta;

// Default

export const Default = {
  args: {
    column: "column value here",
    name: "text here",
  },
};

// Test

export const Test = {
  args: {
    column: "test column",
    name: "test text",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MenuItem {...args} />,
};
