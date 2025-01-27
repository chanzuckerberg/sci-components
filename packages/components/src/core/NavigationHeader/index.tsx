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
  ButtonProps,
  SdsButtonProps,
  SdsMinimalButtonProps,
} from "../Button";
import Icon from "../Icon";

export interface NavigationHeaderProps<T extends string = string> {
  activePrimaryNavKey?: string;
  buttons?: ButtonProps[];
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
      return (
        buttons &&
        buttons.length > 0 && (
          <StyledButtonSection>
            {buttons.map((buttonProps, idx) => {
              const isIconButton = "icon" in buttonProps;
              const key = `button-${idx}`;
              const fullWidth = isNarrow ? { width: "100%" } : undefined;

              if (isIconButton && isNarrow && buttonProps.icon) {
                return (
                  <Button
                    key={key}
                    sx={fullWidth}
                    sdsStyle="minimal"
                    sdsType="secondary"
                    isAllCaps={false}
                    startIcon={<Icon sdsSize="s" sdsIcon="Person" />}
                    customTheme={
                      hasInvertedStyle
                        ? mode === "light"
                          ? "dark"
                          : "light"
                        : "auto"
                    }
                  >
                    {buttonProps.children}
                  </Button>
                );
              }

              if (isIconButton && !isNarrow) {
                return (
                  <Button
                    key={key}
                    sdsIconProps={{ sdsSize: "l" }}
                    sdsStyle="icon"
                    sdsType="secondary"
                    icon={buttonProps.icon}
                    aria-label={String(buttonProps.children)}
                    customTheme={
                      hasInvertedStyle
                        ? mode === "light"
                          ? "dark"
                          : "light"
                        : "auto"
                    }
                  />
                );
              }

              return (
                <StyledHeaderButton
                  key={key}
                  sx={fullWidth}
                  sdsStyle="rounded"
                  {...(buttonProps as SdsMinimalButtonProps | SdsButtonProps)}
                  hasInvertedStyle={hasInvertedStyle}
                />
              );
            })}
          </StyledButtonSection>
        )
      );
    };

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

    return (
      <div ref={ref}>
        <StyledHeader
          elevation={0}
          position="static"
          hasInvertedStyle={hasInvertedStyle}
        >
          {headerContent}
        </StyledHeader>

        {isNarrow && drawerOpen && (
          <StyledDrawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            hasInvertedStyle={hasInvertedStyle}
          >
            {headerContent}
          </StyledDrawer>
        )}
      </div>
    );
  }
);

export default NavigationHeader;
