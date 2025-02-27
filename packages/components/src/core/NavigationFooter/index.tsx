import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  ElementType,
} from "react";
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
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "../Link";

export interface NavigationFooterNavItem {
  label: string;
  url: string;
  component?: ElementType;
  linkProps?: Record<string, unknown>;
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
  const footerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsNarrow(isMdScreen);
  }, [isMdScreen]);

  const [isNarrow, setIsNarrow] = useState(isMdScreen);
  const [breakpoint, setBreakpoint] = useState(0);

  const checkScrollable = useCallback(() => {
    if (!footerRef.current) return;

    const clientWidth = footerRef.current.clientWidth;
    const scrollWidth = footerRef.current.scrollWidth;
    const needsScroll = scrollWidth > clientWidth;

    if (needsScroll && !isNarrow) {
      setBreakpoint((prev) => (prev > clientWidth ? prev : clientWidth));
    }

    setIsNarrow(clientWidth <= breakpoint);
  }, [breakpoint, isNarrow]);

  useEffect(() => {
    checkScrollable();

    const resizeObserver = new ResizeObserver(checkScrollable);

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [breakpoint, checkScrollable, isMdScreen, isNarrow]);

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
          component={link.component}
          {...link.linkProps}
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
    <StyledLogoWrapper isNarrow={isNarrow} hasInvertedStyle={hasInvertedStyle}>
      {logo}

      <p>{title}</p>

      {tag && <Tag tagColor={tagColor} label={tag} hover={false} />}
    </StyledLogoWrapper>
  );

  if (logoUrl) {
    logoNode = <Link href={logoUrl}>{logoNode}</Link>;
  }

  return (
    <StyledFooter
      ref={footerRef}
      hasInvertedStyle={hasInvertedStyle}
      isNarrow={isNarrow}
    >
      <StyledTopSection isNarrow={isNarrow} hasInvertedStyle={hasInvertedStyle}>
        {logoNode}

        {navItems && navItems.length > 0 && (
          <StyledNavSection isNarrow={isNarrow}>
            {navItems.map((item) => (
              <StyledNavItemLink
                key={item.label}
                href={item.url}
                hasInvertedStyle={hasInvertedStyle}
                isNarrow={isNarrow}
                component={item.component}
                {...item.linkProps}
              >
                {item.label}
              </StyledNavItemLink>
            ))}
          </StyledNavSection>
        )}
      </StyledTopSection>

      <StyledDivider hasInvertedStyle={hasInvertedStyle} />

      <StyledBottomSection isNarrow={isNarrow}>
        <StyledLinkSection isNarrow={isNarrow}>
          {renderLinks()}
        </StyledLinkSection>
        <StyledImageSection isNarrow={isNarrow}>
          {renderImages()}
        </StyledImageSection>
      </StyledBottomSection>
    </StyledFooter>
  );
}
