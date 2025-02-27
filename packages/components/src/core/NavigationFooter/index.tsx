import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import Tag from "../Tag";
import {
  StyledBottomSection,
  StyledFooter,
  StyledLinkSection,
  StyledImageSection,
  StyledLogoWrapper,
  StyledNavSection,
  StyledTopSection,
  StyledMobileImageRow,
  StyledMobileLinkRow,
} from "./style";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "../Link";
import NavItem from "./components/NavItem";
import FooterLink from "./components/FooterLink";
import { NavigationFooterProps } from "./NavigationFooter.types";
import { StyledDivider } from "./components/FooterLink/style";

function groupArray<T>(array: T[], groupSize: number): T[][] {
  const groups: T[][] = [];

  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize));
  }

  return groups;
}

const MemoizedStyledDivider = memo(StyledDivider);

function NavigationFooter({
  hasInvertedStyle,
  images,
  logo,
  logoUrl,
  navItems,
  navLinks,
  tag,
  tagColor,
  title,
  ...rest
}: NavigationFooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [dimensions, setDimensions] = useState({
    breakpoint: 0,
    isNarrow: isMdScreen,
  });

  useEffect(() => {
    setDimensions((prev) => ({ ...prev, isNarrow: isMdScreen }));
  }, [isMdScreen]);

  const checkScrollable = useCallback(() => {
    if (!footerRef.current) return;

    const clientWidth = footerRef.current.clientWidth;
    const scrollWidth = footerRef.current.scrollWidth;
    const needsScroll = scrollWidth > clientWidth;

    setDimensions((prev) => {
      const newBreakpoint =
        needsScroll && !prev.isNarrow
          ? Math.max(prev.breakpoint, clientWidth)
          : prev.breakpoint;

      return {
        breakpoint: newBreakpoint,
        isNarrow: clientWidth <= newBreakpoint,
      };
    });
  }, []);

  useEffect(() => {
    checkScrollable();
    const resizeObserver = new ResizeObserver(checkScrollable);

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [checkScrollable]);

  const renderImages = useCallback(() => {
    if (!images?.length) return null;

    if (!dimensions.isNarrow) {
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
  }, [images, dimensions.isNarrow]);

  const renderLinks = useCallback(() => {
    if (!navLinks?.length) return null;

    if (!dimensions.isNarrow) {
      return navLinks.map((link, index) => (
        <FooterLink
          key={link.label}
          link={link}
          showDivider={index < navLinks.length - 1}
          hasInvertedStyle={hasInvertedStyle}
        />
      ));
    }

    return groupArray(navLinks, 3).map((linkGroup, index) => (
      <StyledMobileLinkRow key={index}>
        {linkGroup.map((link, linkIndex) => (
          <FooterLink
            key={link.label}
            link={link}
            showDivider={linkIndex < linkGroup.length - 1}
            hasInvertedStyle={hasInvertedStyle}
          />
        ))}
      </StyledMobileLinkRow>
    ));
  }, [navLinks, dimensions.isNarrow, hasInvertedStyle]);

  const logoNode = useMemo(() => {
    const node = (
      <StyledLogoWrapper
        isNarrow={dimensions.isNarrow}
        hasInvertedStyle={hasInvertedStyle}
      >
        {logo}
        <p>{title}</p>
        {tag && <Tag tagColor={tagColor} label={tag} hover={false} />}
      </StyledLogoWrapper>
    );

    return logoUrl ? <Link href={logoUrl}>{node}</Link> : node;
  }, [
    logo,
    title,
    tag,
    tagColor,
    logoUrl,
    dimensions.isNarrow,
    hasInvertedStyle,
  ]);

  const navItemsSection = useMemo(() => {
    if (!navItems?.length) return null;

    return (
      <StyledNavSection isNarrow={dimensions.isNarrow}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={dimensions.isNarrow}
          />
        ))}
      </StyledNavSection>
    );
  }, [navItems, hasInvertedStyle, dimensions.isNarrow]);

  return (
    <StyledFooter
      ref={footerRef}
      hasInvertedStyle={hasInvertedStyle}
      isNarrow={dimensions.isNarrow}
      {...rest}
    >
      <StyledTopSection
        isNarrow={dimensions.isNarrow}
        hasInvertedStyle={hasInvertedStyle}
      >
        {logoNode}
        {navItemsSection}
      </StyledTopSection>

      <MemoizedStyledDivider hasInvertedStyle={hasInvertedStyle} />

      <StyledBottomSection isNarrow={dimensions.isNarrow}>
        <StyledLinkSection isNarrow={dimensions.isNarrow}>
          {renderLinks()}
        </StyledLinkSection>
        <StyledImageSection isNarrow={dimensions.isNarrow}>
          {renderImages()}
        </StyledImageSection>
      </StyledBottomSection>
    </StyledFooter>
  );
}

export * from "./NavigationFooter.types";

export default NavigationFooter;
