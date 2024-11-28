import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { ReactNode } from "react";
import { SdsTagColorType } from "src/core/Tag";
import {
  StyledButtonSection,
  StyledHeader,
  StyledLogoWrapper,
  StyledPrimaryNavContainer,
  StyledSearch,
  StyledTag,
  StyledTitleContainer,
  StyledToolbar,
} from "./style";
import HeaderPrimaryNav from "./components/HeaderPrimaryNav";
import { InputSearchProps } from "../InputSearch";
import HeaderSecondaryNav from "./components/HeaderSecondaryNav";

export { HeaderPrimaryNav, HeaderSecondaryNav };

export interface HeaderProps {
  children?: ReactNode;
  logo?: ReactNode;
  primaryNav?: ReactNode;
  primaryNavPosition?: "left" | "right";
  searchProps?: Partial<InputSearchProps>;
  secondaryNav?: ReactNode;
  showSearch?: boolean;
  tag?: string;
  tagColor?: SdsTagColorType;
  title: string;
}

export default function Header({
  children,
  logo,
  primaryNav,
  primaryNavPosition = "left",
  searchProps,
  secondaryNav,
  showSearch = true,
  tag,
  tagColor,
  title,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = showSearch && (
    <StyledSearch
      id="nav-bar-search"
      label="Search"
      placeholder="Search"
      sdsStyle="rounded"
      {...searchProps}
    />
  );

  return (
    <StyledHeader position="static">
      <StyledToolbar>
        <StyledLogoWrapper>{logo}</StyledLogoWrapper>

        <StyledTitleContainer>
          <p>{title}</p>

          {tag && <StyledTag color={tagColor} label={tag} />}
        </StyledTitleContainer>

        <StyledPrimaryNavContainer primaryNavPosition={primaryNavPosition}>
          {primaryNavPosition === "left" ? (
            <>
              {primaryNav}
              {search}
            </>
          ) : (
            <>
              {search}
              {primaryNav}
            </>
          )}
        </StyledPrimaryNavContainer>

        {secondaryNav}

        {children && <StyledButtonSection>{children}</StyledButtonSection>}
      </StyledToolbar>
    </StyledHeader>
  );
}
