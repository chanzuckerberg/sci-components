/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import BasicCell from "../BasicCell";
import TableRaw from "./index";

const Table = (props: Args): JSX.Element => {
  return (
    <TableRaw {...props}>
      <tbody>
        {/* TODO: Use SDS Row component after it is added */}
        <tr>
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
        </tr>
        <tr>
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
          <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
        </tr>
      </tbody>
    </TableRaw>
  );
};

export default {
  component: Table,
  title: "Table",
};

const Template: Story = (args) => <Table {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => (
  <TableRaw data-testid="Table">
    <tbody>
      <tr>
        <BasicCell primaryText="Primary" shouldShowTooltipOnHover={false} />
      </tr>
    </tbody>
  </TableRaw>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
