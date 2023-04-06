/* eslint-disable no-use-before-define */
import { Args, Meta, Story } from "@storybook/react";
import * as React from "react";
import CellHeaderRaw, { CellHeaderDirection } from "./index";

const CellHeader = (props: Args): JSX.Element => {
  const { direction, ...rest } = props;
  const [sorting, setSorting] = React.useState<CellHeaderDirection>(direction);

  React.useEffect(() => {
    setSorting(direction);
  }, [direction]);

  const clickHandler = () => {
    setSorting((prevState) => {
      return prevState === "asc" ? "desc" : "asc";
    });
  };

  return (
    <table>
      <tbody>
        <tr>
          <CellHeaderRaw onClick={clickHandler} direction={sorting} {...rest}>
            Header
          </CellHeaderRaw>
        </tr>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    active: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["asc", "desc"],
    },
    hideSortIcon: {
      control: { type: "boolean" },
    },
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    tooltipText: {
      control: { type: "text" },
    },
  },
  component: CellHeader,
  title: "Table/CellHeader",
} as Meta;

const Template: Story = (args) => <CellHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  active: false,
  direction: "desc",
  hideSortIcon: false,
  shouldShowTooltipOnHover: true,
  tooltipProps: { sdsStyle: "dark" },
  tooltipText: "This is a header cell",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export const Ascending = Template.bind({});

Ascending.args = {
  direction: "asc",
};

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <CellHeaderRaw
          data-testid="CellHeader"
          horizontalAlign="right"
          shouldShowTooltipOnHover
          active
          tooltipText="testTooltipTitle"
        >
          Header
        </CellHeaderRaw>
      </tr>
    </tbody>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  controls: {
    exclude: [
      "active",
      "direction",
      "hideSortIcon",
      "horizontalAlign",
      "shouldShowTooltipOnHover",
      "tooltipProps",
      "tooltipText",
    ],
  },
};
