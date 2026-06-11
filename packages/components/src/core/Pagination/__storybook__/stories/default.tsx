import { Args } from "@storybook/react-vite";
import { useState } from "react";
import RawPagination from "@components/src/core/Pagination";

export const Pagination = (props: Args): JSX.Element => {
  const { pageSize, totalCount, siblingCount, truncateDropdown, sdsStyle } =
    props;
  const [currentPage, setCurrentPage] = useState(1);
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
