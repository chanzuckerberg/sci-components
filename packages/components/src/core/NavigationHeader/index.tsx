import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode, useState } from "react";
import { SdsTagColorType } from "src/core/Tag";
import {
  StyledButtonSection,
  StyledDrawer,
  StyledHeader,
  StyledLogoLinkWrapper,
  StyledLogoWrapper,
  StyledPrimaryNavContainer,
  StyledSearch,
  StyledTag,
  StyledTitleContainer,
  StyledToolbar,
} from "./style";
import NavigationHeaderPrimaryNav from "./components/NavigationHeaderPrimaryNav";
import { InputSearchProps } from "../InputSearch";
import NavigationHeaderSecondaryNav from "./components/NavigationHeaderSecondaryNav";
import Button from "../Button";
import Link from "../Link";

export { NavigationHeaderPrimaryNav, NavigationHeaderSecondaryNav };

export interface NavigationHeaderProps {
  children?: ReactNode;
  logo?: ReactNode;
  logoUrl?: string;
  primaryNav?: ReactNode;
  primaryNavPosition?: "left" | "right";
  searchProps?: Partial<InputSearchProps>;
  secondaryNav?: ReactNode;
  showSearch?: boolean;
  tag?: string;
  tagColor?: SdsTagColorType;
  title: string;
}

export default function NavigationHeader({
  children,
  logo,
  logoUrl,
  primaryNav,
  primaryNavPosition = "left",
  searchProps,
  secondaryNav,
  showSearch = true,
  tag,
  tagColor,
  title,
}: NavigationHeaderProps) {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));
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

  let logoNode = (
    <StyledTitleContainer>
      <StyledLogoWrapper>{logo}</StyledLogoWrapper>

      <p>{title}</p>

      {tag && <StyledTag color={tagColor} label={tag} hover={false} />}
    </StyledTitleContainer>
  );

  if (logoUrl) {
    logoNode = (
      <StyledLogoLinkWrapper href={logoUrl}>{logoNode}</StyledLogoLinkWrapper>
    );
  }

  const headerContent = (
    <StyledToolbar>
      {logoNode}

      {!isNarrow && (
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

      {isNarrow && (
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
      <StyledHeader elevation={0} position="static">
        {headerContent}
      </StyledHeader>

      {isNarrow && drawerOpen && (
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
