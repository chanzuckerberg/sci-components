import { Args, Meta } from "@storybook/react";
import InputToggle from "../../InputToggle";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { CellComponent } from "./stories/default";
import { CELL_COMPONENT_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    verticalAlign: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
  },
  component: CellComponent,
  parameters: {
    axe: {
      disabledRules: [
        "color-contrast",
        // Unfortunately the MUI Switch component renders an input field without a label, which
        // fails an axe check.
        "label",
      ],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Table/CellComponent",
} as Meta;

// Default

export const Default = {
  args: {
    horizontalAlign: "left",
    verticalAlign: "center",
  },
  render: (props: Args) => {
    const { horizontalAlign, verticalAlign } = props;

    return (
      <CellComponent
        horizontalAlign={horizontalAlign}
        verticalAlign={verticalAlign}
        data-testid="CellComponent"
        style={{ height: 100, width: 100 }}
        {...props}
      >
        <InputToggle />
      </CellComponent>
    );
  },
};

// Test

export const Test = {
  parameters: {
    controls: { exclude: CELL_COMPONENT_EXCLUDED_CONTROLS },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
