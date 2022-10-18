/* eslint-disable no-use-before-define */
import { Args, Story } from "@storybook/react";
import * as React from "react";
import PaginationRaw from "./index";

const Pagination = (props: Args): JSX.Element => {
  const { pageSize, totalCount, siblingCount, truncateDropdown, sdsStyle } =
    props;
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <PaginationRaw
      sdsStyle={sdsStyle}
      pageSize={pageSize}
      onPageChange={(page: number) => {
        setCurrentPage(page);
      }}
      onNextPage={() => setCurrentPage(currentPage + 1)}
      onPreviousPage={() => setCurrentPage(currentPage - 1)}
      totalCount={totalCount}
      siblingCount={siblingCount}
      currentPage={currentPage}
      truncateDropdown={truncateDropdown}
    />
  );
};

export default {
  argTypes: {
    pageSize: {
      control: { type: "number" },
    },
    sdsStyle: {
      control: { type: "select" },
      options: ["round", "square"],
    },
    siblingCount: {
      control: { type: "number" },
    },
    totalCount: {
      control: { type: "number" },
    },
    truncateDropdown: {
      control: { type: "boolean" },
    },
  },
  component: Pagination,
  title: "Table/Pagination",
};

const Template: Story = (args) => <Pagination {...args} />;

export const Default = Template.bind({});

Default.args = {
  pageSize: 5,
  siblingCount: 1,
  totalCount: 100,
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => (
  <div>
    <PaginationRaw
      data-testid="Pagination"
      pageSize={4}
      onPageChange={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalCount={20}
      siblingCount={1}
      currentPage={2}
      truncateDropdown
      {...props}
    />
    <PaginationRaw
      data-testid="Pagination-disabled-left-arrow"
      pageSize={4}
      onPageChange={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalCount={20}
      siblingCount={1}
      currentPage={1}
      truncateDropdown
    />
    <PaginationRaw
      data-testid="Pagination-with-left-dropdown"
      pageSize={4}
      onPageChange={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalCount={30}
      siblingCount={1}
      currentPage={5}
      truncateDropdown
    />
    <PaginationRaw
      data-testid="Pagination-with-right-dropdown"
      pageSize={4}
      onPageChange={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalCount={60}
      siblingCount={1}
      currentPage={3}
      truncateDropdown
    />
    <PaginationRaw
      data-testid="Pagination-with-both-dropdowns"
      pageSize={4}
      onPageChange={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalCount={30}
      siblingCount={1}
      currentPage={4}
      truncateDropdown
    />
    <PaginationRaw
      data-testid="Pagination-disabled-dropdown"
      pageSize={4}
      onPageChange={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalCount={30}
      siblingCount={1}
      currentPage={7}
      truncateDropdown={false}
    />
  </div>
);

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  controls: {
    exclude: [
      "pageSize",
      "sdsStyle",
      "siblingCount",
      "totalCount",
      "truncateDropdown",
    ],
  },
};
