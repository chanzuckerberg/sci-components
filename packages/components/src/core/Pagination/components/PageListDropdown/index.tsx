import { DotsThreeIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import MenuItem from "@components/src/core/MenuItem";
import { StyledPage, StyledPaginationButton } from "../../style";
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
    <StyledPage sdsStyle={sdsStyle}>
      <StyledPaginationButton
        aria-label="Go to a page"
        onClick={handleClick}
        size="small"
        sdsStyle="minimal"
        sdsType="secondary"
        backgroundOnHover={false}
      >
        <DotsThreeIcon {...INTERNAL_ICON_PROPS} size={16} />
      </StyledPaginationButton>
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
              sdsType="action"
            >
              {page}
            </MenuItem>
          );
        })}
      </StyledPaginationDropdownMenu>
    </StyledPage>
  );
};

export default PageListDropdown;
