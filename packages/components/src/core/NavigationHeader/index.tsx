import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  StyledButtonSection,
  StyledDrawer,
  StyledHeader,
  StyledHeaderButton,
  StyledLogoLinkWrapper,
  StyledLogoWrapper,
  StyledNarrowButton,
  StyledNarrowIconButton,
  StyledPrimaryNavContainer,
  StyledSearch,
  StyledShadowCoverElement,
  StyledShadowElement,
  StyledTag,
  StyledTitleContainer,
  StyledToolbar,
  StyledWideIconButton,
} from "./style";
import NavigationHeaderPrimaryNav from "./components/NavigationHeaderPrimaryNav";
import NavigationHeaderSecondaryNav from "./components/NavigationHeaderSecondaryNav";
import { ButtonProps, SdsButtonProps, SdsMinimalButtonProps } from "../Button";
import Icon from "../Icon";
import {
  IconButtonProps,
  NavigationHeaderProps,
} from "./NavigationHeader.types";

const NavigationHeader = forwardRef<HTMLDivElement, NavigationHeaderProps>(
  <T extends string = string>(
    props: NavigationHeaderProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      activePrimaryNavKey,
      buttons,
      hasInvertedStyle,
      logo,
      logoUrl,
      logoLinkComponent = "a",
      logoLinkProps,
      primaryNavItems,
      primaryNavPosition = "left",
      searchProps,
      secondaryNavItems,
      setActivePrimaryNavKey,
      showSearch = true,
      tag,
      tagColor,
      title,
      ...rest
    } = props;
    const navRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
      setIsNarrow(isMdScreen);
    }, [isMdScreen]);

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [isNarrow, setIsNarrow] = useState(isMdScreen);
    const [breakpoint, setBreakpoint] = useState(0);

    const checkScrollable = useCallback(() => {
      if (!navRef.current) return;

      const clientWidth = navRef.current.clientWidth;
      const scrollWidth = navRef.current.scrollWidth;
      const needsScroll = scrollWidth > clientWidth;

      if (needsScroll && !isNarrow) {
        setBreakpoint((prev) => (prev > clientWidth ? prev : clientWidth));
      }

      setIsNarrow(clientWidth <= breakpoint);
    }, [breakpoint, isNarrow]);

    useEffect(() => {
      checkScrollable();

      const resizeObserver = new ResizeObserver(checkScrollable);

      if (navRef.current) {
        resizeObserver.observe(navRef.current);
      }

      return () => resizeObserver.disconnect();
    }, [breakpoint, checkScrollable, isMdScreen, isNarrow]);

    const renderSearch = () => {
      return (
        showSearch && (
          <StyledSearch
            id="nav-bar-search"
            label="Search"
            placeholder="Search"
            sdsStyle="rounded"
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
            {...searchProps}
          />
        )
      );
    };

    const renderLogoNode = () => {
      let logoNode = (
        <StyledTitleContainer
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        >
          <StyledLogoWrapper>{logo}</StyledLogoWrapper>

          <p>{title}</p>

          {tag && <StyledTag color={tagColor} label={tag} hover={false} />}
        </StyledTitleContainer>
      );

      if (logoLinkComponent || logoUrl) {
        logoNode = (
          <StyledLogoLinkWrapper
            component={logoLinkComponent}
            href={logoUrl}
            {...logoLinkProps}
            isNarrow={isNarrow}
          >
            {logoNode}
          </StyledLogoLinkWrapper>
        );
      }

      return logoNode;
    };

    const renderPrimaryNav = () => {
      return (
        activePrimaryNavKey &&
        setActivePrimaryNavKey &&
        primaryNavItems &&
        primaryNavItems.length > 0 && (
          <NavigationHeaderPrimaryNav
            items={primaryNavItems}
            value={activePrimaryNavKey}
            onChange={setActivePrimaryNavKey}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
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
            isNarrow={isNarrow}
          />
        )
      );
    };

    const renderButtonsNode = () => {
      if (!buttons || buttons.length === 0) return null;

      return (
        <StyledButtonSection
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        >
          {buttons.map((buttonProps, idx) => renderButton(buttonProps, idx))}
        </StyledButtonSection>
      );
    };

    const renderButton = (buttonProps: ButtonProps, idx: number) => {
      const isIconButton = "icon" in buttonProps;
      const key = `button-${idx}`;
      const fullWidth = isNarrow ? { width: "100%" } : undefined;

      if (isIconButton && isNarrow && buttonProps.icon) {
        return renderNarrowIconButton(buttonProps, key, fullWidth);
      }

      if (isIconButton && !isNarrow) {
        return renderWideIconButton(buttonProps as IconButtonProps, key);
      }

      return renderDefaultButton(buttonProps, key, fullWidth);
    };

    const renderNarrowIconButton = (
      buttonProps: ButtonProps,
      key: string,
      fullWidth: { width: string } | undefined
    ) => (
      <StyledNarrowIconButton
        key={key}
        sx={fullWidth}
        sdsStyle="minimal"
        sdsType="secondary"
        isAllCaps={false}
        startIcon={<Icon sdsSize="s" sdsIcon="Person" />}
        hasInvertedStyle={hasInvertedStyle}
      >
        {buttonProps.children}
      </StyledNarrowIconButton>
    );

    const renderWideIconButton = (
      buttonProps: IconButtonProps,
      key: string
    ) => (
      <StyledWideIconButton
        key={key}
        sdsIconProps={{ sdsSize: "l" }}
        sdsStyle="icon"
        sdsType="secondary"
        icon={buttonProps.icon}
        aria-label={String(buttonProps.children)}
        hasInvertedStyle={hasInvertedStyle}
      />
    );

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
      />
    );

    const renderHeaderContent = () => {
      const logoNode = renderLogoNode();
      const search = renderSearch();
      const primaryNav = renderPrimaryNav();
      const secondaryNav = renderSecondaryNav();
      const buttonsNode = renderButtonsNode();

      return (
        <StyledToolbar hasInvertedStyle={hasInvertedStyle} isNarrow={isNarrow}>
          {logoNode}

          {!isNarrow && (
            <>
              <StyledPrimaryNavContainer
                primaryNavPosition={primaryNavPosition}
                showSearch={showSearch}
                isNarrow={isNarrow}
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

          {isNarrow && (
            <StyledNarrowButton
              sdsType="secondary"
              sdsStyle="icon"
              icon={drawerOpen ? "XMark" : "LinesHorizontal3"}
              onClick={() => setDrawerOpen((prev) => !prev)}
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

    return (
      <div ref={ref}>
        <StyledHeader
          elevation={0}
          position="static"
          hasInvertedStyle={hasInvertedStyle}
          ref={navRef}
          {...rest}
        >
          {headerContent}
        </StyledHeader>

        {isNarrow && drawerOpen && (
          <StyledDrawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            hasInvertedStyle={hasInvertedStyle}
            ref={ref}
            {...rest}
          >
            <div>
              {headerContent}
              <StyledShadowElement />
              <StyledShadowCoverElement hasInvertedStyle={hasInvertedStyle} />
              {search}
              {primaryNav}
              {secondaryNav}
            </div>

            {buttonsNode}
          </StyledDrawer>
        )}
      </div>
    );
  }
);

export default NavigationHeader;
