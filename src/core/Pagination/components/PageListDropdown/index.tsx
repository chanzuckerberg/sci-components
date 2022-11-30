import React, { useState } from "react";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { Page, StyledPaginationButtonIcon } from "../../style";
import { StyledPaginationDropdownMenu } from "./style";

interface PageListDropdownProps {
  pageList: number[];
  onPageChange: (page: number) => void;
  sdsStyle: "round" | "square";
}

const PageListDropdown = (props: PageListDropdownProps) => {
  const { pageList, onPageChange, sdsStyle } = props;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Page sdsStyle={sdsStyle}>
      <StyledPaginationButtonIcon
        aria-label="Go to a page"
        onClick={handleClick}
      >
        <Icon sdsIcon="dotsHorizontal" sdsSize="xs" sdsType="iconButton" />
      </StyledPaginationButtonIcon>
      <StyledPaginationDropdownMenu
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
      </StyledPaginationDropdownMenu>
    </Page>
  );
};

export default PageListDropdown;
