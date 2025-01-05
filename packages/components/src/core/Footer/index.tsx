import { ReactNode } from "react";
import Tag, { TagProps } from "../Tag";
import {
  StyledBottomSection,
  StyledFooter,
  StyledLinkItemButton,
  StyledLinkItemLink,
  StyledLinkSection,
  StyledImageSection,
  StyledLogoWrapper,
  StyledNavItemLink,
  StyledNavSection,
  StyledTopSection,
  StyledMobileImageRow,
  StyledMobileLinkRow,
} from "./style";
import { Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface FooterNavItem {
  label: string;
  url: string;
}

export interface FooterProps {
  logo?: ReactNode;
  images?: ReactNode[];
  navItems?: FooterNavItem[];
  navLinks?: FooterNavItem[];
  tag?: string;
  tagColor?: TagProps["tagColor"];
  title: string;
}

function groupArray<T>(array: T[], groupSize: number): T[][] {
  const groups: T[][] = [];

  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize));
  }

  return groups;
}

export default function Footer({
  logo,
  images,
  navItems,
  navLinks,
  tag,
  tagColor,
  title,
}: FooterProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function renderImages() {
    if (!images || images.length === 0) {
      return null;
    }

    if (!isMobile) {
      return images;
    }

    return groupArray(images, 2).map((imageGroup, index) => (
      <StyledMobileImageRow key={index}>{imageGroup}</StyledMobileImageRow>
    ));
  }

  function renderLink(link: FooterNavItem, showDivider: boolean) {
    return (
      <>
        <StyledLinkItemLink key={link.label} href={link.url}>
          {link.label}
        </StyledLinkItemLink>

        {showDivider && <Divider orientation="vertical" flexItem />}
      </>
    );
  }

  function renderLinks() {
    if (!navLinks || navLinks.length === 0) {
      return null;
    }

    if (!isMobile) {
      return navLinks.map((link, index) =>
        renderLink(link, index < navLinks.length - 1)
      );
    }

    return groupArray(navLinks, 3).map((linkGroup, index) => (
      <StyledMobileLinkRow key={index}>
        {linkGroup.map((link, linkIndex) =>
          renderLink(link, linkIndex < linkGroup.length - 1)
        )}
      </StyledMobileLinkRow>
    ));
  }

  return (
    <StyledFooter>
      <StyledTopSection>
        <StyledLogoWrapper>
          {logo}

          <p>{title}</p>

          {tag && <Tag tagColor={tagColor} label={tag} />}
        </StyledLogoWrapper>

        {navItems && navItems.length > 0 && (
          <StyledNavSection>
            {navItems.map((item) => (
              <StyledNavItemLink key={item.label} href={item.url}>
                {item.label}
              </StyledNavItemLink>
            ))}
          </StyledNavSection>
        )}
      </StyledTopSection>

      <Divider />

      <StyledBottomSection>
        <StyledLinkSection>{renderLinks()}</StyledLinkSection>
        <StyledImageSection>{renderImages()}</StyledImageSection>
      </StyledBottomSection>
    </StyledFooter>
  );
}
