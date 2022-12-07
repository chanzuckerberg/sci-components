import React, { forwardRef } from "react";
import Icon from "../Icon";
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
        <StyledPaginationChevronList>
          <StyledPaginationChevronButton
            aria-label="Previous page"
            key="prevPage"
            onClick={() => currentPage > 1 && onPreviousPage()}
            disabled={currentPage === 1}
            sdsSize="small"
            data-order="first"
          >
            <Icon sdsIcon="chevronLeft" sdsType="iconButton" sdsSize="s" />
          </StyledPaginationChevronButton>
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
              <Page sdsStyle={sdsStyle}>
                <StyledPaginationButtonIcon
                  aria-label="Go to a page"
                  key={pageNumber.join("-")}
                  disabled
                >
                  <Icon
                    sdsIcon="dotsHorizontal"
                    sdsSize="xs"
                    sdsType="iconButton"
                  />
                </StyledPaginationButtonIcon>
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

        <StyledPaginationChevronList>
          <StyledPaginationChevronButton
            aria-label="Next page"
            key="onNextPage"
            onClick={() => currentPage !== lastPage && onNextPage()}
            disabled={currentPage === lastPage}
            sdsSize="small"
            data-order="last"
          >
            <Icon sdsIcon="chevronRight" sdsType="iconButton" sdsSize="s" />
          </StyledPaginationChevronButton>
        </StyledPaginationChevronList>
      </StyledPagination>
    );
  }
);

export default Pagination;
