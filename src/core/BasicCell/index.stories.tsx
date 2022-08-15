/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import InputText from "../InputText";
import BasicCellRaw from "./index";

const BasicCell = (props: Args): JSX.Element => {
  const [maxWidth, setMaxWidth] = React.useState(100);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxWidth(+event.target.value);
  };

  return (
    <table>
      <tbody>
        <tr>
          {/* <span>Set a max-width to see text wrap inside the cell</span> */}
          <td>
            <InputText
              id="maxWidth"
              label="Set a max-width to see text wrap inside the cell"
              placeholder="max-width"
              value={maxWidth}
              onChange={changeHandler}
            />
          </td>
        </tr>
        <tr
          style={{
            display: "block",
            maxWidth: `${maxWidth}px`,
          }}
        >
          <BasicCellRaw
            data-testid="BasicCell"
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
    textPosition: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    tooltipProps: {
      control: { type: "object" },
    },
  },
  component: BasicCell,
  title: "BasicCell",
};

const Template: Story = (args) => <BasicCell {...args} />;

export const Default = Template.bind({});

Default.args = {
  primaryText: "Primary Text",
  primaryTextWrapLineCount: 3,
  secondaryText: "Secondary Text",
  secondaryTextWrapLineCount: 1,
  shouldShowTooltipOnHover: true,
  shouldTextWrap: true,
  tooltipProps: { sdsStyle: "dark" },
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <BasicCellRaw
          data-testid="BasicCell"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          textPosition="right"
          tooltipProps={{ sdsStyle: "light", title: "testTooltipTitle" }}
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
