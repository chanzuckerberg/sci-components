import { SdsTagColorType } from "src/core/Tag";
import { PrimaryNavItem, StyledLabel, StyledTag } from "./style";
import { ReactNode, useState, useRef, useEffect, Fragment } from "react";
import {
  StyledDivider,
  StyledLabelTextWrapper,
  StyledLabelTextWrapperShadow,
  StyledSection,
  StyledSectionHeader,
} from "../style";
import Menu from "src/core/Menu";
import MenuItem from "src/core/MenuItem";
import Icon, { IconNameToSizes } from "src/core/Icon";
import { SDSTheme } from "src/core/styles";
import { MenuProps, useTheme } from "@mui/material";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";
import { groupItemsBySection } from "../../utils";
import {
  StyledAccordion,
  StyledMegaMenuDrawer,
  StyledMegaMenuBackdrop,
  StyledMegaMenuContent,
  StyledHoverDrawerColumn,
  StyledHoverDrawerColumnHeader,
  StyledHoverDrawerItem,
  StyledHoverDrawerItemContent,
  StyledHoverDrawerItemIcon,
  StyledHoverDrawerItemText,
  StyledHoverDrawerItemTitle,
  StyledHoverDrawerItemDetails,
  StyledHoverDrawerContainer,
} from "../../style";

interface BaseNavigationHeaderPrimaryNavItem<T extends string>
  extends Record<string, unknown> {
  key: T;
  label: ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
}

export interface TextNavigationHeaderPrimaryNavItem<T extends string>
  extends BaseNavigationHeaderPrimaryNavItem<T> {
  itemType: "text";
  tag?: string;
  tagColor?: SdsTagColorType;
}

export interface DropdownItem {
  label: ReactNode;
  details?: string;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  section?: string;
  onClick?: (event: React.MouseEvent) => void;
  component?: React.ElementType;
  href?: string;
  rel?: string;
  target?: string;
}

interface DropdownNavigationHeaderPrimaryNavItem<T extends string>
  extends BaseNavigationHeaderPrimaryNavItem<T> {
  itemType: "dropdown";
  items: DropdownItem[];
}

export type NavigationHeaderPrimaryNavItem<T extends string> =
  | TextNavigationHeaderPrimaryNavItem<T>
  | DropdownNavigationHeaderPrimaryNavItem<T>;

export interface NavigationHeaderPrimaryNavProps<T extends string> {
  menuProps?: Partial<MenuProps>;
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
  items: NavigationHeaderPrimaryNavItem<T>[];
  onChange(value: T): void;
  value: T;
  sdsStyle?: "dropdown" | "drawer";
}

export default function NavigationHeaderPrimaryNav<T extends string>({
  menuProps,
  hasInvertedStyle,
  isNarrow,
  items,
  onChange,
  value,
  sdsStyle = "dropdown",
}: NavigationHeaderPrimaryNavProps<T>) {
  const theme: SDSTheme = useTheme();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState<T | null>(null);
  const [activeDrawerKey, setActiveDrawerKey] = useState<T | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | string>("100%");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = Boolean(anchorEl);
  const drawerOpen = activeDrawerKey !== null;

  function onClose() {
    setAnchorEl(null);
    setActiveDropdownKey(null);
  }

  function onDrawerClose() {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDrawerKey(null);
    }, 300);
  }

  function onDrawerOpen(key: T) {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDrawerKey(key);
  }

  function cancelDrawerClose() {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    setMenuWidth(button.offsetWidth);
  }, []);

  const renderDrawerContent = (
    drawerItems: DropdownItem[],
    section: string,
    hasMultipleSections: boolean
  ) => {
    return (
      <>
        {section && hasMultipleSections && (
          <StyledHoverDrawerColumnHeader hasInvertedStyle={hasInvertedStyle}>
            {section}
          </StyledHoverDrawerColumnHeader>
        )}
        {drawerItems.map((subItem: DropdownItem, index: number) => {
          const {
            label: subLabel,
            details,
            icon,
            onClick,
            ...subItemRest
          } = subItem;
          const hasDetails = !!details;
          const hasIcon = !!icon;
          const iconSize = hasDetails ? "l" : "s";

          const renderIcon = () => {
            if (!icon) return null;

            const iconContent =
              typeof icon !== "string" ? (
                icon
              ) : (
                <Icon sdsIcon={icon} sdsSize={iconSize} />
              );

            return (
              <StyledHoverDrawerItemIcon
                hasDetails={hasDetails}
                hasInvertedStyle={hasInvertedStyle}
              >
                {iconContent}
              </StyledHoverDrawerItemIcon>
            );
          };

          return (
            <StyledHoverDrawerItem
              key={`drawer-item-${section || "default"}-${subLabel}-${index}`}
              onClick={(e) => {
                onClick?.(e);
                setActiveDrawerKey(null);
              }}
              sdsStyle="minimal"
              sdsType="secondary"
              hasInvertedStyle={hasInvertedStyle}
              hasIcon={hasIcon}
              {...subItemRest}
            >
              <StyledHoverDrawerItemContent>
                {renderIcon()}
                <StyledHoverDrawerItemText>
                  <StyledHoverDrawerItemTitle
                    hasInvertedStyle={hasInvertedStyle}
                  >
                    {subLabel}
                  </StyledHoverDrawerItemTitle>
                  {details && (
                    <StyledHoverDrawerItemDetails
                      hasInvertedStyle={hasInvertedStyle}
                    >
                      {details}
                    </StyledHoverDrawerItemDetails>
                  )}
                </StyledHoverDrawerItemText>
              </StyledHoverDrawerItemContent>
            </StyledHoverDrawerItem>
          );
        })}
      </>
    );
  };

  const renderDrawerItem = (
    item: DropdownNavigationHeaderPrimaryNavItem<T>,
    key: T,
    label: ReactNode,
    parentOnClick?: (e: React.MouseEvent) => void,
    rest?: Record<string, unknown>
  ) => {
    const isDrawerOpen = drawerOpen && activeDrawerKey === key;
    const groupedItems = groupItemsBySection(item.items);
    const sections = Object.keys(groupedItems);
    const hasMultipleSections =
      sections.length > 1 || sections.some((section) => section !== "");

    return (
      <Fragment key={key}>
        <StyledHoverDrawerContainer
          onMouseEnter={() => onDrawerOpen(key)}
          onMouseLeave={onDrawerClose}
        >
          <PrimaryNavItem
            {...rest}
            itemType={item.itemType}
            sdsStyle="minimal"
            active={isDrawerOpen}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
            onClick={(e) => {
              onChange(key);
              parentOnClick?.(e);
            }}
          >
            <StyledLabel
              itemType={item.itemType}
              active={isDrawerOpen}
              hasInvertedStyle={hasInvertedStyle}
              isNarrow={isNarrow}
            >
              <StyledLabelTextWrapper active={isDrawerOpen} isNarrow={isNarrow}>
                {label as ReactNode}
              </StyledLabelTextWrapper>
              <StyledLabelTextWrapperShadow
                aria-hidden="true"
                isNarrow={isNarrow}
              >
                {label as ReactNode}
              </StyledLabelTextWrapperShadow>
              <Icon
                sdsIcon={isDrawerOpen ? "ChevronUp" : "ChevronDown"}
                sdsSize="xs"
              />
            </StyledLabel>
          </PrimaryNavItem>
        </StyledHoverDrawerContainer>

        {isDrawerOpen && (
          <StyledMegaMenuDrawer
            anchor="top"
            open={isDrawerOpen}
            onClose={() => setActiveDrawerKey(null)}
            hasInvertedStyle={hasInvertedStyle}
            hideBackdrop
            disableScrollLock
            transitionDuration={225}
            SlideProps={{
              onMouseEnter: cancelDrawerClose,
              onMouseLeave: onDrawerClose,
            }}
          >
            <StyledMegaMenuContent
              key={`drawer-content-${key}`}
              hasInvertedStyle={hasInvertedStyle}
            >
              {sections.map((section) => (
                <StyledHoverDrawerColumn
                  key={`drawer-section-${section || "default"}`}
                  hasInvertedStyle={hasInvertedStyle}
                  totalColumns={sections.length}
                >
                  {renderDrawerContent(
                    groupedItems[section],
                    section,
                    hasMultipleSections
                  )}
                </StyledHoverDrawerColumn>
              ))}
            </StyledMegaMenuContent>
          </StyledMegaMenuDrawer>
        )}
      </Fragment>
    );
  };

  const renderDropdownItem = (
    item: DropdownNavigationHeaderPrimaryNavItem<T>,
    key: T,
    label: ReactNode,
    parentOnClick?: (e: React.MouseEvent) => void,
    rest?: Record<string, unknown>
  ) => {
    const isDropdownOpen = open && activeDropdownKey === key;

    return (
      <Fragment key={key}>
        <PrimaryNavItem
          {...rest}
          itemType={item.itemType}
          ref={buttonRef}
          sdsStyle="minimal"
          active={isDropdownOpen}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setActiveDropdownKey(key);
            onChange(key);
            parentOnClick?.(e);
          }}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        >
          <StyledLabel
            itemType={item.itemType}
            active={isDropdownOpen}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
          >
            <StyledLabelTextWrapper active={isDropdownOpen} isNarrow={isNarrow}>
              {label as ReactNode}
            </StyledLabelTextWrapper>
            <StyledLabelTextWrapperShadow
              aria-hidden="true"
              isNarrow={isNarrow}
            >
              {label as ReactNode}
            </StyledLabelTextWrapperShadow>
            <Icon
              sdsIcon={isDropdownOpen ? "ChevronUp" : "ChevronDown"}
              sdsSize="xs"
            />
          </StyledLabel>
        </PrimaryNavItem>

        <Menu
          anchorEl={anchorEl}
          open={isDropdownOpen}
          onClose={onClose}
          slotProps={{
            paper: {
              style: {
                marginTop: theme?.app?.spacing?.s,
              },
            },
          }}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
          transformOrigin={{
            horizontal: "left",
            vertical: "top",
          }}
          {...menuProps}
          disablePortal
        >
          {(() => {
            const groupedItems = groupItemsBySection(item.items);
            const sections = Object.keys(groupedItems);
            const hasMultipleSections =
              sections.length > 1 || sections.some((section) => section !== "");

            return sections.map((section, sectionIndex) => {
              const sectionItems = groupedItems[section];
              const showDivider = hasMultipleSections && sectionIndex > 0;

              return (
                <div key={`section-${section || "default"}`}>
                  {showDivider && (
                    <StyledDivider
                      hasSection={!!section}
                      isNarrow={isNarrow}
                      hasInvertedStyle={hasInvertedStyle}
                    />
                  )}
                  {section && hasMultipleSections && (
                    <StyledSectionHeader
                      isNarrow={isNarrow}
                      hasInvertedStyle={hasInvertedStyle}
                    >
                      {section}
                    </StyledSectionHeader>
                  )}
                  {sectionItems.map((subItem: DropdownItem) => {
                    const { label: subLabel, onClick } = subItem;
                    return (
                      <MenuItem
                        key={`menu-item-${subLabel}`}
                        onClick={(e) => {
                          onClick?.(e);
                          onClose();
                        }}
                        sdsType="action"
                        sx={{ minWidth: menuWidth }}
                      >
                        {subLabel}
                      </MenuItem>
                    );
                  })}
                </div>
              );
            });
          })()}
        </Menu>
      </Fragment>
    );
  };

  const renderAccordionItem = (
    item: DropdownNavigationHeaderPrimaryNavItem<T>
  ) => {
    const labelKebabCase = item.label
      ?.toString()
      .toLowerCase()
      .replace(" ", "-");

    return (
      <StyledAccordion
        key={`${labelKebabCase}-dropdown`}
        id={`${labelKebabCase}-dropdown`}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
      >
        <AccordionHeader chevronSize={isNarrow ? "s" : "xs"}>
          {item.label}
        </AccordionHeader>
        <AccordionDetails>
          {(() => {
            const groupedItems = groupItemsBySection(item.items);
            const sections = Object.keys(groupedItems);
            const hasMultipleSections =
              sections.length > 1 || sections.some((section) => section !== "");

            return sections.map((section, sectionIndex) => {
              const sectionItems = groupedItems[section];
              const showDivider = hasMultipleSections && sectionIndex > 0;

              return (
                <Fragment key={`section-${section || "default"}`}>
                  {showDivider && (
                    <StyledDivider
                      hasSection={!!section}
                      isNarrow={isNarrow}
                      hasInvertedStyle={hasInvertedStyle}
                    />
                  )}
                  {section && hasMultipleSections && (
                    <StyledSectionHeader
                      isNarrow={isNarrow}
                      hasInvertedStyle={hasInvertedStyle}
                    >
                      {section}
                    </StyledSectionHeader>
                  )}
                  {sectionItems.map((subItem) => {
                    const { label: dropdownItemLabel, onClick } = subItem;

                    return (
                      <MenuItem
                        key={`primary-nav-item-${dropdownItemLabel}`}
                        onClick={(e) => {
                          onClick?.(e);
                          onClose();
                        }}
                        sdsType="action"
                      >
                        {dropdownItemLabel}
                      </MenuItem>
                    );
                  })}
                </Fragment>
              );
            });
          })()}
        </AccordionDetails>
      </StyledAccordion>
    );
  };

  const renderTextItem = (
    item: TextNavigationHeaderPrimaryNavItem<T>,
    key: T,
    label: ReactNode,
    tag?: string,
    tagColor?: SdsTagColorType,
    rest?: Record<string, unknown>
  ) => {
    const isActive = key === value;

    return (
      <PrimaryNavItem
        key={key}
        {...rest}
        sdsStyle="minimal"
        active={isActive}
        onClick={(e) => {
          onChange(key);
          item.onClick?.(e);
        }}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
      >
        <StyledLabel
          active={isActive}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        >
          <StyledLabelTextWrapper active={isActive} isNarrow={isNarrow}>
            {label as ReactNode}
          </StyledLabelTextWrapper>
          <StyledLabelTextWrapperShadow aria-hidden="true" isNarrow={isNarrow}>
            {label as ReactNode}
          </StyledLabelTextWrapperShadow>

          {tag && (
            <StyledTag
              label={tag as string}
              color={tagColor as SdsTagColorType}
              hover={false}
            />
          )}
        </StyledLabel>
      </PrimaryNavItem>
    );
  };

  return (
    <>
      {drawerOpen && (
        <StyledMegaMenuBackdrop
          onClick={() => setActiveDrawerKey(null)}
          onMouseEnter={onDrawerClose}
        />
      )}
      <StyledSection isNarrow={isNarrow}>
        {items.map((item) => {
          const {
            key,
            label,
            tag,
            tagColor,
            onClick: parentOnClick,
            ...rest
          } = item;

          // Drawer style (hover-based)
          if (
            item.itemType === "dropdown" &&
            !isNarrow &&
            sdsStyle === "drawer"
          ) {
            return renderDrawerItem(
              item as DropdownNavigationHeaderPrimaryNavItem<T>,
              key,
              label,
              parentOnClick,
              rest
            );
          }

          // Dropdown style (click-based)
          if (
            item.itemType === "dropdown" &&
            !isNarrow &&
            sdsStyle === "dropdown"
          ) {
            return renderDropdownItem(
              item as DropdownNavigationHeaderPrimaryNavItem<T>,
              key,
              label,
              parentOnClick,
              rest
            );
          }

          // Narrow/Accordion style
          if (item.itemType === "dropdown" && isNarrow) {
            return renderAccordionItem(
              item as DropdownNavigationHeaderPrimaryNavItem<T>
            );
          }

          // Simple text item
          return renderTextItem(
            item as TextNavigationHeaderPrimaryNavItem<T>,
            key,
            label,
            "tag" in item ? (tag as string) : undefined,
            "tagColor" in item ? (tagColor as SdsTagColorType) : undefined,
            rest
          );
        })}
      </StyledSection>
    </>
  );
}
