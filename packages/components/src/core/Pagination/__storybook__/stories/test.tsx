import { Args } from "@storybook/react";
import RawPagination from "src/core/Pagination";

export const TestDemo = (props: Args): JSX.Element => (
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
