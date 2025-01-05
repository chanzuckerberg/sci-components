import { ButtonProps as RawButtonProps } from "@mui/base";
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
import { getFontWeights } from "../styles";
import Icon from "../Icon";

export interface NavigationHeaderProps<T extends string = string> {
  activePrimaryNavKey?: string;
  buttons?: ButtonProps[];
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

export default function NavigationHeader<T extends string = string>({
  activePrimaryNavKey,
  buttons,
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
}: NavigationHeaderProps<T>) {
  const theme = useTheme();
  const fontWeights = getFontWeights({ theme });
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

  const primaryNav = activePrimaryNavKey &&
    setActivePrimaryNavKey &&
    primaryNavItems &&
    primaryNavItems.length > 0 && (
      <NavigationHeaderPrimaryNav
        items={primaryNavItems}
        value={activePrimaryNavKey}
        onChange={setActivePrimaryNavKey}
      />
    );

  const secondaryNav = secondaryNavItems && secondaryNavItems.length > 0 && (
    <NavigationHeaderSecondaryNav items={secondaryNavItems} />
  );

  const buttonsNode = buttons && buttons.length > 0 && (
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
              startIcon={
                <Icon sdsSize="l" sdsIcon="Person" sdsType="iconButton" />
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
            />
          );
        }

        return (
          <Button
            key={key}
            sx={fullWidth}
            sdsStyle="rounded"
            {...(buttonProps as SdsMinimalButtonProps | SdsButtonProps)}
          />
        );
      })}
    </StyledButtonSection>
  );

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
          {buttonsNode}
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
          {buttonsNode}
        </StyledDrawer>
      )}
    </>
  );
}
