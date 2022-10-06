/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import PaginationRow from "./index";

const Pagination = (props: Args): JSX.Element => {
  const { pageSize = 5 } = props;
  return (
    <PaginationRow
      pageSize={pageSize}
      onPageChange={() => {}}
      nextPage={() => {}}
      previousPage={() => {}}
      totalCount={300}
      siblingCount={1}
      currentPage={20}
    />
  );
};

export default {
  argTypes: {
    pageSize: {
      control: { type: "number" },
    },
  },
  component: Pagination,
  title: "Pagination",
};

const Template: Story = (args) => <Pagination {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

// const TestDemo = (): JSX.Element => <PaginationRow pageSize={2} />;

// const TestTemplate: Story = (args) => <TestDemo {...args} />;

// export const Test = TestTemplate.bind({});
