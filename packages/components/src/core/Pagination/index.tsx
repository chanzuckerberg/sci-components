import { forwardRef } from "react";
import PageListDropdown from "./components/PageListDropdown";
import {
  Page,
  PaginationExtraProps,
  StyledPagination,
  StyledPaginationButton,
  StyledPaginationChevronList,
} from "./style";
import { usePagination } from "./usePagination";
import Icon from "src/core/Icon";

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
        <StyledPaginationChevronList
          data-order="first"
          key="prevPage"
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPreviousPage()}
        >
          <Icon
            aria-label="Previous page"
            sdsIcon="ChevronLeft"
            sdsSize="xs"
            sdsType="button"
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
                <StyledPaginationButton
                  aria-label="Go to a page"
                  disabled
                  icon="DotsHorizontal"
                  sdsSize="small"
                  sdsStyle="icon"
                  sdsType="tertiary"
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
        <StyledPaginationChevronList
          data-order="last"
          key="onNextPage"
          disabled={currentPage === lastPage}
          onClick={() => currentPage !== lastPage && onNextPage()}
        >
          <Icon
            aria-label="Next page"
            sdsIcon="ChevronRight"
            sdsSize="xs"
            sdsType="button"
          />
        </StyledPaginationChevronList>
      </StyledPagination>
    );
  }
);

export default Pagination;
