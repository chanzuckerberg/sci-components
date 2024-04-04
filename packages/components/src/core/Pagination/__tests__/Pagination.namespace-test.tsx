import { Pagination, PaginationProps } from "@czi-sds/components";
import React from "react";
import { noop } from "src/common/utils";

const PaginationNameSpaceTest = (props: PaginationProps) => {
  return (
    <Pagination
      sdsStyle="round"
      pageSize={10}
      onPageChange={noop}
      onNextPage={noop}
      onPreviousPage={noop}
      totalCount={100}
      siblingCount={1}
      currentPage={2}
      truncateDropdown
    />
  );
};
