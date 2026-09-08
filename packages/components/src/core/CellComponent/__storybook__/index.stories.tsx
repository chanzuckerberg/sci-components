import { Args, Meta } from "@storybook/react-vite";
import { CellComponent } from "./stories/default";
import { CELL_COMPONENT_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import InputToggle from "@components/src/core/InputToggle";

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
    width: {
      control: { type: "text" },
    },
  },
  component: CellComponent,
  parameters: {
    a11y: {
      config: {
        rules: [
          { enabled: false, id: "aria-input-field-name" },
          { enabled: false, id: "aria-required-children" },
          { enabled: false, id: "aria-required-parent" },
          { enabled: false, id: "button-name" },
          { enabled: false, id: "color-contrast" },
          { enabled: false, id: "list" },
          { enabled: false, id: "listitem" },
          { enabled: false, id: "label" },
        ],
      },
    },
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
        {...props}
      >
        <p>This is a Cell Component with a toggle!</p>
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
