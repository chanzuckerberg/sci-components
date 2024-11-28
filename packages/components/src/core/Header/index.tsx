import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode, useState } from "react";
import { SdsTagColorType } from "src/core/Tag";
import {
  StyledButtonSection,
  StyledDrawer,
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
import Button from "../Button";

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
  const [drawerOpen, setDrawerOpen] = useState(true);

  const search = showSearch && (
    <StyledSearch
      id="nav-bar-search"
      label="Search"
      placeholder="Search"
      sdsStyle="rounded"
      {...searchProps}
    />
  );

  const buttons = children && (
    <StyledButtonSection>{children}</StyledButtonSection>
  );

  const headerContent = (
    <StyledToolbar>
      <StyledTitleContainer>
        <StyledLogoWrapper>{logo}</StyledLogoWrapper>

        <p>{title}</p>

        {tag && <StyledTag color={tagColor} label={tag} />}
      </StyledTitleContainer>

      {!isMobile && (
        <>
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
          {buttons}
        </>
      )}

      {isMobile && (
        <Button
          sdsType="secondary"
          sdsStyle="icon"
          icon={drawerOpen ? "XMark" : "LinesHorizontal3"}
          onClick={() => setDrawerOpen((prev) => !prev)}
        />
      )}
    </StyledToolbar>
  );

  return (
    <>
      <StyledHeader position="static">{headerContent}</StyledHeader>

      {isMobile && drawerOpen && (
        <StyledDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {headerContent}

          {search}
          {primaryNav}
          {secondaryNav}
          {buttons}
        </StyledDrawer>
      )}
    </>
  );
}
