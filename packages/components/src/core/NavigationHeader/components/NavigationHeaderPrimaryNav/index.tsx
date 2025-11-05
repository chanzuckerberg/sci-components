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
import { groupItemsBySection } from "../../utils";
import {
  StyledMegaMenuDrawer,
  StyledMegaMenuContent,
  StyledHoverDrawerColumn,
  StyledHoverDrawerContainer,
} from "../../style";
import DrawerContent from "../shared/DrawerContent";
import AccordionNavItem from "../shared/AccordionNavItem";

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

export interface ActionItem {
  label: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  href?: string;
  component?: React.ElementType;
  target?: string;
  rel?: string;
}

export interface SectionProps {
  actions?: ActionItem[];
  colSpan?: number;
}

interface DropdownNavigationHeaderPrimaryNavItem<T extends string>
  extends BaseNavigationHeaderPrimaryNavItem<T> {
  itemType: "dropdown";
  items: DropdownItem[];
  sectionProps?: Record<string, SectionProps>;
  defaultUrl?: string;
  component?: React.ElementType;
  target?: string;
  rel?: string;
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
  expandedAccordion: string | null;
  setExpandedAccordion: (value: string | null) => void;
  accordionRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  scrollToAccordion?: (accordionId: string) => void;
  onDrawerStateChange?: (isOpen: boolean) => void;
  topOffset?: number;
}

export default function NavigationHeaderPrimaryNav<T extends string>({
  menuProps,
  hasInvertedStyle,
  isNarrow,
  items,
  onChange,
  value,
  sdsStyle = "dropdown",
  expandedAccordion,
  setExpandedAccordion,
  accordionRefs,
  scrollToAccordion,
  onDrawerStateChange,
  topOffset = 0,
}: NavigationHeaderPrimaryNavProps<T>) {
  const theme: SDSTheme = useTheme();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState<T | null>(null);
  const [activeDrawerKey, setActiveDrawerKey] = useState<T | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | string>("100%");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [contentKey, setContentKey] = useState<T | null>(null);
  const [isContentFading, setIsContentFading] = useState(false);

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
      setContentKey(null);
    }, 200);
  }

  function onDrawerOpen(key: T) {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // If drawer is already open with different content, fade out then change
    if (activeDrawerKey !== null && activeDrawerKey !== key) {
      setIsContentFading(true);
      setTimeout(() => {
        setActiveDrawerKey(key);
        setContentKey(key);
        setIsContentFading(false);
      }, 150);
    } else {
      // First time opening or reopening same drawer
      setActiveDrawerKey(key);
      setContentKey(key);
      setIsContentFading(false);
    }
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

  // Notify parent when drawer state changes (only for drawer style)
  useEffect(() => {
    if (sdsStyle === "drawer" && onDrawerStateChange) {
      onDrawerStateChange(drawerOpen);
    }
  }, [drawerOpen, sdsStyle, onDrawerStateChange]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    setMenuWidth(button.offsetWidth);
  }, []);

  const renderDrawerItem = (
    item: DropdownNavigationHeaderPrimaryNavItem<T>,
    key: T,
    label: ReactNode,
    parentOnClick?: (e: React.MouseEvent) => void,
    rest?: Record<string, unknown>
  ) => {
    const isDrawerOpen = drawerOpen && activeDrawerKey === key;
    const { defaultUrl, component, target, rel } = item;

    // If defaultUrl is provided without a component, default to anchor tag
    const componentProp = defaultUrl && !component ? "a" : component;

    const handleClick = (e: React.MouseEvent) => {
      onChange(key);
      parentOnClick?.(e);
    };

    return (
      <StyledHoverDrawerContainer
        key={key}
        onMouseEnter={() => onDrawerOpen(key)}
        onMouseLeave={onDrawerClose}
      >
        <PrimaryNavItem
          {...rest}
          itemType={item.itemType}
          active={isDrawerOpen}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
          sdsStyle="minimal"
          onClick={handleClick}
          innerSdsStyle={sdsStyle}
          component={componentProp}
          href={defaultUrl}
          target={target}
          rel={rel}
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
          active={isDropdownOpen}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setActiveDropdownKey(key);
            onChange(key);
            parentOnClick?.(e);
          }}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
          sdsStyle="minimal"
          innerSdsStyle={sdsStyle}
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

    const accordionId = `${labelKebabCase}-dropdown`;

    return (
      <AccordionNavItem
        key={accordionId}
        accordionId={accordionId}
        label={item.label}
        items={item.items}
        expandedAccordion={expandedAccordion}
        setExpandedAccordion={setExpandedAccordion}
        accordionRefs={accordionRefs}
        scrollToAccordion={scrollToAccordion}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
        chevronSize={isNarrow ? "s" : "xs"}
        onClose={onClose}
        sdsStyle={sdsStyle}
      />
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
        active={isActive}
        sdsStyle="minimal"
        onClick={(e) => {
          onChange(key);
          item.onClick?.(e);
        }}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
        innerSdsStyle={sdsStyle}
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

  // Get the active drawer item for rendering shared content
  const activeDrawerItem = items.find(
    (item) => item.itemType === "dropdown" && item.key === contentKey
  ) as DropdownNavigationHeaderPrimaryNavItem<T> | undefined;

  return (
    <>
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

      {/* Shared drawer for all hover-based dropdown items */}
      {sdsStyle === "drawer" && !isNarrow && (
        <StyledMegaMenuDrawer
          anchor="top"
          open={drawerOpen}
          onClose={() => {
            setActiveDrawerKey(null);
            setContentKey(null);
          }}
          hasInvertedStyle={hasInvertedStyle}
          hideBackdrop={false}
          disableScrollLock
          transitionDuration={225}
          topOffset={topOffset}
          SlideProps={{
            onMouseEnter: cancelDrawerClose,
            onMouseLeave: onDrawerClose,
          }}
        >
          <StyledMegaMenuContent
            hasInvertedStyle={hasInvertedStyle}
            style={{
              opacity: isContentFading ? 0 : 1,
            }}
          >
            {activeDrawerItem &&
              (() => {
                const groupedItems = groupItemsBySection(
                  activeDrawerItem.items
                );
                const sections = Object.keys(groupedItems);
                const hasMultipleSections =
                  sections.length > 1 ||
                  sections.some((section) => section !== "");

                // Calculate total columns needed accounting for colSpan
                const totalColumns = sections.reduce((acc, section) => {
                  const colSpan =
                    activeDrawerItem.sectionProps?.[section]?.colSpan || 1;
                  return acc + colSpan;
                }, 0);

                // Expand sections into columns
                const columns: Array<{
                  section: string;
                  items: DropdownItem[];
                  sectionProps?: SectionProps;
                  showHeader: boolean;
                  isLastColumn: boolean;
                }> = [];

                sections.forEach((section) => {
                  const sectionProps =
                    activeDrawerItem.sectionProps?.[section] || {};
                  const colSpan = sectionProps.colSpan || 1;
                  const sectionItems = groupedItems[section];

                  if (colSpan <= 1) {
                    // Single column section
                    columns.push({
                      section,
                      items: sectionItems,
                      sectionProps,
                      showHeader: true,
                      isLastColumn: true,
                    });
                  } else {
                    // Multi-column section - split items
                    const itemsPerColumn = Math.ceil(
                      sectionItems.length / colSpan
                    );
                    for (let i = 0; i < colSpan; i++) {
                      const start = i * itemsPerColumn;
                      const end = start + itemsPerColumn;
                      columns.push({
                        section,
                        items: sectionItems.slice(start, end),
                        sectionProps,
                        showHeader: i === 0, // Only show header on first column
                        isLastColumn: i === colSpan - 1, // Only show actions on last column
                      });
                    }
                  }
                });

                return columns.map((column, index) => (
                  <StyledHoverDrawerColumn
                    key={`drawer-column-${column.section}-${index}`}
                    hasInvertedStyle={hasInvertedStyle}
                    totalColumns={totalColumns}
                  >
                    <DrawerContent
                      drawerItems={column.items}
                      sectionProps={column.sectionProps}
                      section={column.section}
                      hasMultipleSections={hasMultipleSections}
                      hasInvertedStyle={hasInvertedStyle}
                      showHeader={column.showHeader}
                      isLastColumn={column.isLastColumn}
                      onItemClick={() => {
                        setActiveDrawerKey(null);
                        setContentKey(null);
                      }}
                    />
                  </StyledHoverDrawerColumn>
                ));
              })()}
          </StyledMegaMenuContent>
        </StyledMegaMenuDrawer>
      )}
    </>
  );
}
