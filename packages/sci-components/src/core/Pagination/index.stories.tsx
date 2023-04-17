/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import RawPagination from "./index";

const Pagination = (props: Args): JSX.Element => {
  const { pageSize, totalCount, siblingCount, truncateDropdown, sdsStyle } =
    props;
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <RawPagination
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
} as Meta;

// Default

export const Default = {
  args: {
    pageSize: 5,
    siblingCount: 1,
    totalCount: 100,
  },
};

// Test

const TestDemo = (props: Args): JSX.Element => (
  <div>
    <RawPagination
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
    <RawPagination
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
    <RawPagination
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
    <RawPagination
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
    <RawPagination
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
    <RawPagination
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

export const Test = {
  parameters: {
    controls: {
      exclude: [
        "pageSize",
        "sdsStyle",
        "siblingCount",
        "totalCount",
        "truncateDropdown",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
