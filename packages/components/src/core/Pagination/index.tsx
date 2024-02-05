import { forwardRef } from "react";
import PageListDropdown from "./components/PageListDropdown";
import {
  Page,
  PaginationExtraProps,
  StyledPagination,
  StyledPaginationButtonIcon,
  StyledPaginationChevronButton,
  StyledPaginationChevronList,
} from "./style";
import { usePagination } from "./usePagination";

export interface PaginationInternalProps {
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  truncateDropdown?: boolean;
}

export type PaginationProps = PaginationExtraProps & PaginationInternalProps;

const Pagination = forwardRef<HTMLUListElement, PaginationProps>(
  (props: PaginationProps, ref): JSX.Element | null => {
    const {
      sdsStyle = "round",
      onPageChange,
      onNextPage,
      onPreviousPage,
      totalCount,
      siblingCount = 1,
      currentPage,
      pageSize,
      truncateDropdown = true,
    } = props;

    if (pageSize < 1) {
      throw new Error("PageSize can not be smaller than 1!");
    }

    const paginationRange =
      usePagination({
        currentPage,
        pageSize,
        siblingCount,
        totalCount,
      }) || [];

    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
      <StyledPagination ref={ref} {...props}>
        <StyledPaginationChevronList key="prevPage">
          <StyledPaginationChevronButton
            aria-label="Previous page"
            onClick={() => currentPage > 1 && onPreviousPage()}
            disabled={currentPage === 1}
            sdsSize="small"
            icon="chevronLeft"
            data-order="first"
          />
        </StyledPaginationChevronList>

        {paginationRange.map((pageNumber) => {
          if (Array.isArray(pageNumber)) {
            if (truncateDropdown) {
              return (
                <PageListDropdown
                  pageList={pageNumber}
                  onPageChange={onPageChange}
                  key={pageNumber.join("-")}
                  sdsStyle={sdsStyle}
                />
              );
            }
            return (
              <Page sdsStyle={sdsStyle} key={pageNumber.join("-")}>
                <StyledPaginationButtonIcon
                  aria-label="Go to a page"
                  disabled
                  icon="dotsHorizontal"
                  sdsSize="small"
                />
              </Page>
            );
          }

          return (
            <Page
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              selected={pageNumber === currentPage}
              sdsStyle={sdsStyle}
            >
              {pageNumber}
            </Page>
          );
        })}

        <StyledPaginationChevronList key="onNextPage">
          <StyledPaginationChevronButton
            aria-label="Next page"
            onClick={() => currentPage !== lastPage && onNextPage()}
            disabled={currentPage === lastPage}
            sdsSize="small"
            data-order="last"
            icon="chevronRight"
          />
        </StyledPaginationChevronList>
      </StyledPagination>
    );
  }
);

export default Pagination;
