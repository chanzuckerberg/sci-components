import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef, ReactNode, useState } from "react";
import { SdsTagColorType } from "src/core/Tag";
import {
  StyledButtonSection,
  StyledDrawer,
  StyledHeader,
  StyledHeaderButton,
  StyledLogoLinkWrapper,
  StyledLogoWrapper,
  StyledNarrowButton,
  StyledPrimaryNavContainer,
  StyledSearch,
  StyledTag,
  StyledTitleContainer,
  StyledToolbar,
} from "./style";
import NavigationHeaderPrimaryNav, {
  NavigationHeaderPrimaryNavItem,
} from "./components/NavigationHeaderPrimaryNav";
import { InputSearchProps } from "../InputSearch";
import NavigationHeaderSecondaryNav, {
  NavigationHeaderSecondaryNavItem,
} from "./components/NavigationHeaderSecondaryNav";
import Button, {
  SdsProps,
  ButtonProps,
  SdsButtonProps,
  SdsIconButtonProps,
  SdsMinimalButtonProps,
} from "../Button";
import Icon from "../Icon";

export interface NavigationHeaderProps<T extends string = string> {
  activePrimaryNavKey?: string;
  buttons?: (SdsProps & ButtonProps)[];
  hasInvertedStyle?: boolean;
  logo?: ReactNode;
  logoUrl?: string;
  primaryNavItems?: NavigationHeaderPrimaryNavItem<T>[];
  primaryNavPosition?: "left" | "right";
  searchProps?: Partial<InputSearchProps>;
  secondaryNavItems?: NavigationHeaderSecondaryNavItem[];
  setActivePrimaryNavKey?(key: string): void;
  showSearch?: boolean;
  tag?: string;
  tagColor?: SdsTagColorType;
  title: string;
}

type IconButtonProps = SdsIconButtonProps & { children: string };

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

    const theme = useTheme();
    const mode = theme?.palette?.mode || "light";

    const isNarrow = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(true);

    const renderSearch = () => {
      return (
        showSearch && (
          <StyledSearch
            id="nav-bar-search"
            label="Search"
            placeholder="Search"
            sdsStyle="rounded"
            customTheme={
              hasInvertedStyle ? (mode === "light" ? "dark" : "light") : "auto"
            }
            hasInvertedStyle={hasInvertedStyle}
            {...searchProps}
          />
        )
      );
    };

    const renderLogoNode = () => {
      let logoNode = (
        <StyledTitleContainer hasInvertedStyle={hasInvertedStyle}>
          <StyledLogoWrapper>{logo}</StyledLogoWrapper>

          <p>{title}</p>

          {tag && <StyledTag color={tagColor} label={tag} hover={false} />}
        </StyledTitleContainer>
      );

      if (logoUrl) {
        logoNode = (
          <StyledLogoLinkWrapper href={logoUrl}>
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
            hasInverseStyle={hasInvertedStyle}
          />
        )
      );
    };

    const renderButtonsNode = () => {
      if (!buttons || buttons.length === 0) return null;

      return (
        <StyledButtonSection>
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
      <Button
        key={key}
        sx={fullWidth}
        sdsStyle="minimal"
        sdsType="secondary"
        isAllCaps={false}
        startIcon={<Icon sdsSize="s" sdsIcon="Person" />}
        customTheme={
          hasInvertedStyle ? (mode === "light" ? "dark" : "light") : "auto"
        }
      >
        {buttonProps.children}
      </Button>
    );

    const renderWideIconButton = (
      buttonProps: IconButtonProps,
      key: string
    ) => (
      <Button
        key={key}
        sdsIconProps={{ sdsSize: "l" }}
        sdsStyle="icon"
        sdsType="secondary"
        icon={buttonProps.icon}
        aria-label={String(buttonProps.children)}
        customTheme={
          hasInvertedStyle ? (mode === "light" ? "dark" : "light") : "auto"
        }
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
        <StyledToolbar hasInvertedStyle={hasInvertedStyle}>
          {logoNode}

          {!isNarrow && (
            <>
              <StyledPrimaryNavContainer
                primaryNavPosition={primaryNavPosition}
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
              customTheme={
                hasInvertedStyle
                  ? mode === "light"
                    ? "dark"
                    : "light"
                  : "auto"
              }
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
      <>
        <StyledHeader
          elevation={0}
          position="static"
          hasInvertedStyle={hasInvertedStyle}
          ref={ref}
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
            {headerContent}

            {search}
            {primaryNav}
            {secondaryNav}
            {buttonsNode}
          </StyledDrawer>
        )}
      </>
    );
  }
);

export default NavigationHeader;
