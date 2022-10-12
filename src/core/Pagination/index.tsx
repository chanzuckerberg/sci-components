import React, { forwardRef } from "react";
import Icon from "../Icon";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import {
  Page,
  PaginationExtraProps,
  StyledPagination,
  StyledPaginationButtonIcon,
  StyledPaginationChevronButton,
} from "./style";
import { usePagination } from "./usePagination";

export interface PaginationInternalProps {
  onPageChange: (page: number | string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  truncateDropdown?: boolean;
}

export type PaginationProps = PaginationExtraProps & PaginationInternalProps;

interface PageListDropdownProps {
  pageList: number[];
  onPageChange: (page: number | string) => void;
  sdsStyle: "round" | "square";
}

const PageListDropdown = (props: PageListDropdownProps) => {
  const { pageList, onPageChange, sdsStyle } = props;

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Page sdsStyle={sdsStyle}>
      <StyledPaginationButtonIcon onClick={(e) => handleClick(e)}>
        <Icon sdsIcon="dotsHorizontal" sdsSize="xs" sdsType="iconButton" />
      </StyledPaginationButtonIcon>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {pageList.map((page: number) => {
          return (
            <MenuItem
              onClick={() => {
                onPageChange(page);
                handleClose();
              }}
              key={page}
            >
              {page}
            </MenuItem>
          );
        })}
      </Menu>
    </Page>
  );
};

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
        <StyledPaginationChevronButton
          key="prevPage"
          onClick={() => currentPage > 1 && onPreviousPage()}
          disabled={currentPage === 1}
          sdsSize="small"
        >
          <Icon sdsIcon="chevronLeft" sdsType="iconButton" sdsSize="s" />
        </StyledPaginationChevronButton>

        {paginationRange.map((pageNumber) => {
          if (Array.isArray(pageNumber)) {
            if (truncateDropdown) {
              return (
                <PageListDropdown
                  pageList={pageNumber}
                  onPageChange={onPageChange}
                  key={pageNumber.join()}
                  sdsStyle={sdsStyle}
                />
              );
            }
            return (
              <StyledPaginationButtonIcon disabled>
                <Icon
                  sdsIcon="dotsHorizontal"
                  sdsSize="xs"
                  sdsType="iconButton"
                />
              </StyledPaginationButtonIcon>
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

        <StyledPaginationChevronButton
          key="onNextPage"
          onClick={() => currentPage !== lastPage && onNextPage()}
          disabled={currentPage === lastPage}
          sdsSize="small"
        >
          <Icon sdsIcon="chevronRight" sdsType="iconButton" sdsSize="s" />
        </StyledPaginationChevronButton>
      </StyledPagination>
    );
  }
);

export default Pagination;
