/* eslint-disable sonarjs/cognitive-complexity */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  StyledButtonSection,
  StyledDrawer,
  StyledAppBar,
  StyledHeaderButton,
  StyledLogoLinkWrapper,
  StyledLogoWrapper,
  StyledNarrowButton,
  StyledNarrowIconButton,
  StyledPrimaryNavContainer,
  StyledSearch,
  StyledTag,
  StyledTitleContainer,
  StyledTitleTagWrapper,
  StyledToolbar,
  StyledWideIconButton,
  StyledDrawerContent,
  StyledSectionDivider,
} from "./style";
import NavigationHeaderPrimaryNav from "./components/NavigationHeaderPrimaryNav";
import NavigationHeaderSecondaryNav from "./components/NavigationHeaderSecondaryNav";
import { ButtonProps, SdsButtonProps, SdsMinimalButtonProps } from "../Button";
import Icon from "../Icon";
import {
  IconButtonProps,
  NavigationHeaderProps,
} from "./NavigationHeader.types";
import { mergeRefs } from "src/common/utils";
import ElevationScroll from "./components/ElevationScroll";
import { getMode } from "../styles";

// Time to wait for accordion animation and scroll to complete (includes MUI animation duration + buffer)
const ACCORDION_SCROLL_DELAY_MS = 500;

const NavigationHeader = forwardRef<HTMLDivElement, NavigationHeaderProps>(
  <T extends string = string>(
    props: NavigationHeaderProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      activePrimaryNavKey = "",
      buttons,
      sdsStyle = "dropdown",
      menuProps = {
        disableScrollLock: true,
        disablePortal: true,
      },
      backgroundAppearance = "matchBackground",
      logo,
      logoUrl,
      logoLinkComponent = "a",
      logoLinkProps,
      scrollElevation = true,
      primaryNavItems,
      primaryNavPosition = "left",
      searchProps,
      secondaryNavItems,
      setActivePrimaryNavKey,
      showSearch = true,
      tag,
      tagColor,
      title,
      drawerOpen: controlledDrawerOpen,
      setDrawerOpen: onDrawerOpenChange,
      isSticky = true,
      ...rest
    } = props;
    const navRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const mode = getMode({ theme });
    const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

    /**
     * In Light Mode
     * - backgroundAppearance: matchBackground would result in the background being light
     * - backgroundAppearance: dark would result in the background being dark
     * In Dark Mode
     * - backgroundAppearance: matchBackground would result in the background being dark
     * - backgroundAppearance: dark would result in the background being dark
     */
    const hasInvertedStyle = useMemo(
      () => (mode === "light" ? backgroundAppearance === "dark" : false),
      [backgroundAppearance, mode]
    );

    // Use controlled or uncontrolled drawer state
    const [internalDrawerOpen, setInternalDrawerOpen] = useState(false);
    const drawerOpen = controlledDrawerOpen ?? internalDrawerOpen;
    const setDrawerOpen = (open: boolean | ((prev: boolean) => boolean)) => {
      const newOpen = typeof open === "function" ? open(drawerOpen) : open;
      if (onDrawerOpenChange) {
        onDrawerOpenChange(newOpen);
      } else {
        setInternalDrawerOpen(newOpen);
      }
    };

    const [dimensions, setDimensions] = useState({
      breakpoint: 0,
      isNarrow: isMdScreen,
    });

    // Shared accordion state for both primary and secondary nav
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
      null
    );
    const accordionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Track if any hover drawer is open (for sdsStyle="drawer")
    // Use separate state for primary and secondary nav to avoid race conditions
    const [isPrimaryDrawerOpen, setIsPrimaryDrawerOpen] = useState(false);
    const [isSecondaryDrawerOpen, setIsSecondaryDrawerOpen] = useState(false);
    const isAnyDrawerOpen = isPrimaryDrawerOpen || isSecondaryDrawerOpen;

    useEffect(() => {
      setDimensions((prev) => ({ ...prev, isNarrow: isMdScreen }));
    }, [isMdScreen]);

    const scrollToAccordion = useCallback(
      (accordionId: string) => {
        // Wait for accordion animation to complete (MUI default is 300ms)
        setTimeout(() => {
          const accordionElement = accordionRefs.current.get(accordionId);
          if (accordionElement) {
            const accordionHeader = accordionElement.querySelector(
              ".MuiAccordionSummary-root"
            );
            if (accordionHeader && navRef.current) {
              // Find the scrollable container (drawer paper for narrow mode)
              const drawerPaper = accordionElement.closest(".MuiDrawer-paper");

              if (drawerPaper) {
                // Narrow mode: scroll within the drawer
                const accordionRect = accordionHeader.getBoundingClientRect();
                const drawerRect = drawerPaper.getBoundingClientRect();
                const navRect = navRef.current.getBoundingClientRect();

                // Calculate scroll position: current scroll + accordion position - nav height
                const currentScroll = drawerPaper.scrollTop;
                const accordionTop = accordionRect.top - drawerRect.top;
                const targetScroll =
                  currentScroll +
                  accordionTop -
                  navRect.height -
                  (sdsStyle === "drawer" ? 0 : 8);

                drawerPaper.scrollTo({
                  top: Math.max(0, targetScroll),
                  behavior: "smooth",
                });
              }
            }
          }
        }, ACCORDION_SCROLL_DELAY_MS);
      },
      [sdsStyle]
    );

    const handlePrimaryDrawerStateChange = useCallback((isOpen: boolean) => {
      setIsPrimaryDrawerOpen(isOpen);
    }, []);

    const handleSecondaryDrawerStateChange = useCallback((isOpen: boolean) => {
      setIsSecondaryDrawerOpen(isOpen);
    }, []);

    const checkScrollable = useCallback(() => {
      if (!navRef.current) return;

      const clientWidth = navRef.current.clientWidth;
      const scrollWidth = navRef.current.scrollWidth;
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

      if (navRef.current) {
        resizeObserver.observe(navRef.current);
      }

      return () => resizeObserver.disconnect();
    }, [checkScrollable]);

    const renderSearch = () => {
      return (
        showSearch && (
          <StyledSearch
            id="nav-bar-search"
            label="Search"
            placeholder="Search"
            sdsStyle="rounded"
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={dimensions.isNarrow}
            {...searchProps}
          />
        )
      );
    };

    const renderLogoNode = () => {
      let logoNode = (
        <StyledTitleContainer
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={dimensions.isNarrow}
        >
          {logo && <StyledLogoWrapper>{logo}</StyledLogoWrapper>}

          <StyledTitleTagWrapper>
            {title && <p>{title}</p>}

            {tag && <StyledTag color={tagColor} label={tag} hover={false} />}
          </StyledTitleTagWrapper>
        </StyledTitleContainer>
      );

      if (logoLinkComponent || logoUrl) {
        logoNode = (
          <StyledLogoLinkWrapper
            component={logoLinkComponent}
            href={logoUrl}
            {...logoLinkProps}
            isNarrow={dimensions.isNarrow}
          >
            {logoNode}
          </StyledLogoLinkWrapper>
        );
      }

      return logoNode;
    };

    const renderPrimaryNav = () => {
      return (
        setActivePrimaryNavKey &&
        primaryNavItems &&
        primaryNavItems.length > 0 && (
          <NavigationHeaderPrimaryNav
            items={primaryNavItems}
            value={activePrimaryNavKey}
            onChange={setActivePrimaryNavKey}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={dimensions.isNarrow}
            menuProps={menuProps}
            sdsStyle={sdsStyle}
            expandedAccordion={expandedAccordion}
            setExpandedAccordion={setExpandedAccordion}
            accordionRefs={accordionRefs}
            scrollToAccordion={scrollToAccordion}
            onDrawerStateChange={handlePrimaryDrawerStateChange}
          />
        )
      );
    };

    const renderSecondaryNav = () => {
      return (
        secondaryNavItems &&
        secondaryNavItems.length > 0 && (
          <NavigationHeaderSecondaryNav
            items={secondaryNavItems}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={dimensions.isNarrow}
            menuProps={menuProps}
            sdsStyle={sdsStyle}
            expandedAccordion={expandedAccordion}
            setExpandedAccordion={setExpandedAccordion}
            accordionRefs={accordionRefs}
            scrollToAccordion={scrollToAccordion}
            onDrawerStateChange={handleSecondaryDrawerStateChange}
          />
        )
      );
    };

    const renderButtonsNode = () => {
      if (!buttons || buttons.length === 0) return null;

      return (
        <StyledButtonSection
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={dimensions.isNarrow}
        >
          {buttons.map((buttonProps, idx) => renderButton(buttonProps, idx))}
        </StyledButtonSection>
      );
    };

    const renderButton = (
      buttonProps: Partial<ButtonProps> | React.ReactNode,
      idx: number
    ) => {
      const key = `button-${idx}`;
      const fullWidth = dimensions.isNarrow ? { width: "100%" } : undefined;

      if (React.isValidElement(buttonProps)) {
        return React.cloneElement(buttonProps as React.ReactElement, {
          hasInvertedStyle,
          key,
          sx: {
            ...(buttonProps.props?.sx || {}),
            ...fullWidth,
          },
        });
      }

      if (typeof buttonProps === "object" && buttonProps !== null) {
        const buttonPropsObj = buttonProps as ButtonProps;
        const isIconButton = "icon" in buttonPropsObj;

        if (isIconButton && dimensions.isNarrow && buttonPropsObj.icon) {
          return renderNarrowIconButton(buttonPropsObj, key, fullWidth);
        }

        if (isIconButton && !dimensions.isNarrow) {
          return renderWideIconButton(buttonPropsObj as IconButtonProps, key);
        }

        return renderDefaultButton(buttonPropsObj, key, fullWidth);
      }

      return null;
    };

    const renderNarrowIconButton = (
      buttonProps: ButtonProps,
      key: string,
      fullWidth: { width: string } | undefined
    ) => (
      <StyledNarrowIconButton
        key={key}
        sx={fullWidth}
        isAllCaps={false}
        startIcon={<Icon sdsSize="s" sdsIcon="Person" />}
        hasInvertedStyle={hasInvertedStyle}
        {...buttonProps}
        sdsStyle="minimal"
        sdsType="secondary"
        isNarrow={dimensions.isNarrow}
      >
        {buttonProps.children}
      </StyledNarrowIconButton>
    );

    const renderWideIconButton = (
      buttonProps: IconButtonProps,
      key: string
    ) => {
      return (
        <StyledWideIconButton
          key={key}
          aria-label={String(buttonProps.children)}
          hasInvertedStyle={hasInvertedStyle}
          {...buttonProps}
          sdsStyle="icon"
          sdsType="secondary"
          sdsSize="small"
          icon={buttonProps.icon}
        />
      );
    };

    const renderDefaultButton = (
      buttonProps: ButtonProps,
      key: string,
      fullWidth: { width: string } | undefined
    ) => (
      <StyledHeaderButton
        key={key}
        sx={fullWidth}
        {...(buttonProps as SdsMinimalButtonProps | SdsButtonProps)}
        sdsStyle="rounded"
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={dimensions.isNarrow}
      />
    );

    const renderHeaderContent = () => {
      const logoNode = renderLogoNode();
      const search = renderSearch();
      const primaryNav = renderPrimaryNav();
      const secondaryNav = renderSecondaryNav();
      const buttonsNode = renderButtonsNode();

      return (
        <StyledToolbar
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={dimensions.isNarrow}
        >
          {logoNode}

          {!dimensions.isNarrow && (
            <>
              <StyledPrimaryNavContainer
                primaryNavPosition={primaryNavPosition}
                showSearch={showSearch}
                isNarrow={dimensions.isNarrow}
              >
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
              {buttonsNode}
            </>
          )}

          {dimensions.isNarrow && (
            <StyledNarrowButton
              sdsType="tertiary"
              sdsStyle="icon"
              icon={drawerOpen ? "XMark" : "LinesHorizontal3"}
              onClick={() => setDrawerOpen((prev) => !prev)}
              hasInvertedStyle={hasInvertedStyle}
            />
          )}
        </StyledToolbar>
      );
    };

    const headerContent = renderHeaderContent();
    const search = renderSearch();
    const primaryNav = renderPrimaryNav();
    const secondaryNav = renderSecondaryNav();
    const buttonsNode = renderButtonsNode();

    const position =
      sdsStyle === "drawer" ? "sticky" : isSticky ? "sticky" : "relative";

    // Disable elevation when drawer style is active and any drawer is open
    const effectiveScrollElevation =
      scrollElevation && !(sdsStyle === "drawer" && isAnyDrawerOpen);

    return (
      <>
        <ElevationScroll {...props} shouldElevate={effectiveScrollElevation}>
          <StyledAppBar
            elevation={0}
            hasInvertedStyle={hasInvertedStyle}
            ref={mergeRefs([ref, navRef])}
            aria-label="Main navigation"
            tabIndex={0}
            position={position}
            {...rest}
          >
            {headerContent}
          </StyledAppBar>
        </ElevationScroll>

        {dimensions.isNarrow && drawerOpen && (
          <StyledDrawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            hasInvertedStyle={hasInvertedStyle}
            role="dialog"
            aria-label="Navigation menu"
          >
            <ElevationScroll
              {...props}
              shouldElevate={effectiveScrollElevation}
            >
              <StyledAppBar
                elevation={10}
                hasInvertedStyle={hasInvertedStyle}
                ref={mergeRefs([ref, navRef])}
                aria-label="Main navigation"
                tabIndex={0}
                position={position}
                {...rest}
              >
                {headerContent}
              </StyledAppBar>
            </ElevationScroll>
            <StyledDrawerContent>
              <div>
                {search}
                {primaryNav}
                {primaryNav && secondaryNav && (
                  <StyledSectionDivider hasInvertedStyle={hasInvertedStyle} />
                )}
                {secondaryNav}
              </div>

              {buttonsNode}
            </StyledDrawerContent>
          </StyledDrawer>
        )}
      </>
    );
  }
);

export type {
  NavigationHeaderProps,
  IconButtonProps,
} from "./NavigationHeader.types";

export type {
  NavigationHeaderPrimaryNavItem,
  NavigationHeaderPrimaryNavProps,
} from "./components/NavigationHeaderPrimaryNav";

export type {
  NavigationHeaderSecondaryNavItem,
  NavigationHeaderSecondaryNavProps,
} from "./components/NavigationHeaderSecondaryNav";

export default NavigationHeader;
