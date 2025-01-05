import { forwardRef, ReactNode } from "react";
import Tag, { TagProps } from "../Tag";
import {
  StyledBottomSection,
  StyledFooter,
  StyledLinkItemLink,
  StyledLinkSection,
  StyledImageSection,
  StyledLogoWrapper,
  StyledNavItemLink,
  StyledNavSection,
  StyledTopSection,
  StyledMobileImageRow,
  StyledMobileLinkRow,
  StyledDivider,
} from "./style";
import { Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "../Link";

export interface NavigationFooterNavItem {
  label: string;
  url: string;
}

export interface FooterImage {
  image: ReactNode;
  url: string;
}

export interface NavigationFooterProps {
  hasInvertedStyle?: boolean;
  images?: FooterImage[];
  logo?: ReactNode;
  logoUrl?: string;
  navItems?: NavigationFooterNavItem[];
  navLinks?: NavigationFooterNavItem[];
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

export default function NavigationFooter({
  hasInvertedStyle,
  images,
  logo,
  logoUrl,
  navItems,
  navLinks,
  tag,
  tagColor,
  title,
}: NavigationFooterProps) {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));

  function renderImages() {
    if (!images || images.length === 0) {
      return null;
    }

    if (!isNarrow) {
      return images.map(({ image, url }) => (
        <Link key={url} href={url}>
          {image}
        </Link>
      ));
    }

    return groupArray(images, 2).map((imageGroup, index) => (
      <StyledMobileImageRow key={index}>
        {imageGroup.map(({ image, url }) => (
          <Link key={url} href={url}>
            {image}
          </Link>
        ))}
      </StyledMobileImageRow>
    ));
  }

  function renderLink(link: NavigationFooterNavItem, showDivider: boolean) {
    return (
      <>
        <StyledLinkItemLink
          key={link.label}
          href={link.url}
          hasInvertedStyle={hasInvertedStyle}
        >
          {link.label}
        </StyledLinkItemLink>

        {showDivider && (
          <StyledDivider
            orientation="vertical"
            flexItem
            hasInvertedStyle={hasInvertedStyle}
          />
        )}
      </>
    );
  }

  function renderLinks() {
    if (!navLinks || navLinks.length === 0) {
      return null;
    }

    if (!isNarrow) {
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

  let logoNode = (
    <StyledLogoWrapper hasInvertedStyle={hasInvertedStyle}>
      {logo}

      <p>{title}</p>

      {tag && <Tag tagColor={tagColor} label={tag} hover={false} />}
    </StyledLogoWrapper>
  );

  if (logoUrl) {
    logoNode = <Link href={logoUrl}>{logoNode}</Link>;
  }

  return (
    <StyledFooter hasInvertedStyle={hasInvertedStyle}>
      <StyledTopSection hasInvertedStyle={hasInvertedStyle}>
        {logoNode}

        {navItems && navItems.length > 0 && (
          <StyledNavSection>
            {navItems.map((item) => (
              <StyledNavItemLink
                key={item.label}
                href={item.url}
                hasInvertedStyle={hasInvertedStyle}
              >
                {item.label}
              </StyledNavItemLink>
            ))}
          </StyledNavSection>
        )}
      </StyledTopSection>

      <StyledDivider hasInvertedStyle={hasInvertedStyle} />

      <StyledBottomSection>
        <StyledLinkSection>{renderLinks()}</StyledLinkSection>
        <StyledImageSection>{renderImages()}</StyledImageSection>
      </StyledBottomSection>
    </StyledFooter>
  );
}
