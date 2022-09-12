/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import CellBasicRaw from "./index";

const CellBasic = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr
          style={{
            display: "block",
            maxWidth: "180px",
          }}
        >
          <CellBasicRaw
            data-testid="CellBasic"
            primaryText="Primary Text"
            tooltipProps={{ sdsStyle: "light" }}
            {...props}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    primaryText: {
      control: { type: "text" },
    },
    primaryTextWrapLineCount: {
      control: { type: "number" },
    },
    secondaryText: {
      control: { type: "text" },
    },
    secondaryTextWrapLineCount: {
      control: { type: "number" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    shouldTextWrap: {
      control: { type: "boolean" },
    },
    tertiaryText: {
      control: { type: "text" },
    },
    tertiaryTextWrapLineCount: {
      control: { type: "number" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    verticalAlign: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
  },
  component: CellBasic,
  title: "Table/CellBasic",
};

const Template: Story = (args) => <CellBasic {...args} />;

export const Default = Template.bind({});

Default.args = {
  primaryText: "Primary Text",
  primaryTextWrapLineCount: 3,
  secondaryText: "Secondary Text",
  secondaryTextWrapLineCount: 1,
  shouldShowTooltipOnHover: true,
  shouldTextWrap: true,
  tertiaryText: "Tertiary Text",
  tertiaryTextWrapLineCount: 1,
  tooltipProps: { sdsStyle: "dark" },
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TableCellStyle = {
  border: "dashed 1px #eee",
  height: 100,
  maxWidth: 160,
  width: 160,
};

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <CellBasicRaw
          data-testid="CellBasicVerticalAlignTest"
          primaryText="Primary Text"
          secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          secondaryTextWrapLineCount={2}
          shouldTextWrap
          verticalAlign="bottom"
          shouldShowTooltipOnHover={false}
          style={TableCellStyle as React.CSSProperties}
        />
        <CellBasicRaw
          data-testid="CellBasicCenterAlignTest"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          verticalAlign="center"
          horizontalAlign="center"
          shouldShowTooltipOnHover={false}
          style={TableCellStyle as React.CSSProperties}
        />
        <CellBasicRaw
          data-testid="CellBasic"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          horizontalAlign="right"
          tooltipProps={{ sdsStyle: "dark", title: "testTooltipTitle" }}
          style={TableCellStyle as React.CSSProperties}
        />
      </tr>
    </tbody>
  </table>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  primaryText: "Primary text",
  secondaryText: "Secondary Text",
};

Test.parameters = {
  controls: {
    exclude: [
      "primaryText",
      "primaryTextWrapLineCount",
      "secondaryText",
      "secondaryTextWrapLineCount",
      "tertiaryText",
      "tertiaryTextWrapLineCount",
      "shouldShowTooltipOnHover",
      "shouldTextWrap",
      "tooltipProps",
      "horizontalAlign",
      "verticalAlign",
    ],
  },
};
