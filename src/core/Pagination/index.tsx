import React, { forwardRef } from "react";
import { Page } from "./style";
import { DOTS, usePagination } from "./usePagination";

export interface PaginationProps {
  onPageChange: (page: number | string) => void;
  nextPage: () => void;
  previousPage: () => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = forwardRef<HTMLUListElement, PaginationProps>(
  (props: PaginationProps, ref): JSX.Element | null => {
    const {
      onPageChange,
      nextPage,
      previousPage,
      totalCount,
      siblingCount = 1,
      currentPage,
      pageSize,
    } = props;

    const paginationRange =
      usePagination({
        currentPage,
        pageSize,
        siblingCount,
        totalCount,
      }) || [];

    console.log(paginationRange);

    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
      <ul ref={ref}>
        <Page
          key="prevPage"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </Page>

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={pageNumber} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <Page
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              selected={pageNumber === currentPage}
            >
              {pageNumber}
            </Page>
          );
        })}

        <Page
          key="nextPage"
          onClick={nextPage}
          disabled={currentPage === lastPage}
        >
          &gt;
        </Page>
      </ul>
    );
  }
);

export default Pagination;
