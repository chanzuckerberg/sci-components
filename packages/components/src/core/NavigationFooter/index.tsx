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
} from "./style";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "../Link";
import NavItem from "./components/NavItem";
import FooterLink from "./components/FooterLink";
import MobileLinkRow from "./components/MobileLinkRow";
import { NavigationFooterProps } from "./NavigationFooter.types";
import { StyledDivider } from "./components/FooterLink/style";

const MemoizedStyledDivider = memo(StyledDivider);

function NavigationFooter({
  hasInvertedStyle,
  images,
  logo,
  logoUrl,
  logoComponent,
  logoLinkProps,
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
      const newBreakpoint = needsScroll
        ? prev.breakpoint > scrollWidth
          ? prev.breakpoint
          : scrollWidth
        : prev.breakpoint;

      const newIsNarrow = prev.isNarrow
        ? clientWidth < newBreakpoint
          ? true
          : false
        : needsScroll;

      return {
        breakpoint: newBreakpoint,
        isNarrow: newIsNarrow,
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

    const imageElements = images.map(
      ({ image, url, component, linkProps }, index) => (
        <Link
          key={url ? url + index : index}
          href={url}
          component={component}
          {...linkProps}
        >
          {image}
        </Link>
      )
    );

    return dimensions.isNarrow ? (
      <StyledMobileImageRow>{imageElements}</StyledMobileImageRow>
    ) : (
      imageElements
    );
  }, [images, dimensions.isNarrow]);

  const renderLinks = useCallback(() => {
    if (!navLinks?.length) return null;

    if (!dimensions.isNarrow) {
      return navLinks.map((link, index) => (
        <FooterLink
          key={link.label + index}
          link={link}
          showDivider={index < navLinks.length - 1}
          hasInvertedStyle={hasInvertedStyle}
        />
      ));
    }

    return (
      <MobileLinkRow links={navLinks} hasInvertedStyle={hasInvertedStyle} />
    );
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

    return logoUrl ? (
      <Link href={logoUrl} component={logoComponent} {...logoLinkProps}>
        {node}
      </Link>
    ) : (
      node
    );
  }, [
    dimensions.isNarrow,
    hasInvertedStyle,
    logo,
    title,
    tag,
    tagColor,
    logoUrl,
    logoComponent,
    logoLinkProps,
  ]);

  const navItemsSection = useMemo(() => {
    if (!navItems?.length) return null;

    return (
      <StyledNavSection isNarrow={dimensions.isNarrow}>
        {navItems.map((item, index) => (
          <NavItem
            key={item.label + index}
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
