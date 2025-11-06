import { SdsTagColorType } from "src/core/Tag";
import { StyledTag } from "./style";
import { UnifiedNavItem, StyledLabel } from "../shared/UnifiedNavItem";
import { ReactNode, useEffect, Fragment } from "react";
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
import { useNavigationState } from "../shared/useNavigationState";

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
  onClose?: () => void;
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
  onClose: onCloseProp,
}: NavigationHeaderPrimaryNavProps<T>) {
  const theme: SDSTheme = useTheme();

  const {
    anchorEl,
    activeDropdownKey,
    activeDrawerKey,
    contentKey,
    isContentFading,
    open,
    drawerOpen,
    buttonRef,
    menuWidth,
    setAnchorEl,
    setActiveDropdownKey,
    setActiveDrawerKey,
    setContentKey,
    onClose: handleClose,
    onDrawerClose,
    onDrawerOpen,
    cancelDrawerClose,
  } = useNavigationState<T>();

  // Helper function to wrap dropdown items' onClick handlers
  // This automatically sets the parent dropdown as active when an item is clicked
  const wrapDropdownItemsWithActiveKey = (
    dropdownItems: DropdownItem[],
    parentKey: T
  ): DropdownItem[] => {
    return dropdownItems.map((item: DropdownItem) => {
      const originalOnClick = item.onClick;

      return {
        ...item,
        onClick: (e: React.MouseEvent) => {
          // Call original onClick if it exists
          originalOnClick?.(e);
          // Set the active key to the parent dropdown's key
          onChange(parentKey);
        },
      };
    });
  };

  function onClose() {
    handleClose();
    // Close mobile drawer when in narrow mode
    if (isNarrow) {
      onCloseProp?.();
    }
  }

  // Notify parent when drawer state changes (only for drawer style)
  useEffect(() => {
    if (sdsStyle === "drawer" && onDrawerStateChange) {
      onDrawerStateChange(drawerOpen);
    }
  }, [drawerOpen, sdsStyle, onDrawerStateChange]);

  const renderDrawerItem = (
    item: DropdownNavigationHeaderPrimaryNavItem<T>,
    key: T,
    label: ReactNode,
    parentOnClick?: (e: React.MouseEvent) => void,
    rest?: Record<string, unknown>
  ) => {
    const isDrawerOpen = drawerOpen && activeDrawerKey === key;
    const isActive = key === value || isDrawerOpen;
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
        <UnifiedNavItem
          {...rest}
          itemType={item.itemType}
          active={isActive}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
          sdsStyle="minimal"
          onClick={handleClick}
          innerSdsStyle={sdsStyle}
          navVariant="primary"
          component={componentProp}
          href={defaultUrl}
          target={target}
          rel={rel}
        >
          <StyledLabel
            itemType={item.itemType}
            active={isActive}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
            navVariant="primary"
          >
            <StyledLabelTextWrapper active={isActive} isNarrow={isNarrow}>
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
        </UnifiedNavItem>
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
    const isActive = key === value || isDropdownOpen;

    return (
      <Fragment key={key}>
        <UnifiedNavItem
          {...rest}
          itemType={item.itemType}
          ref={buttonRef}
          active={isActive}
          onClick={(e: React.MouseEvent) => {
            setAnchorEl(e.currentTarget);
            setActiveDropdownKey(key);
            onChange(key);
            parentOnClick?.(e);
          }}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
          sdsStyle="minimal"
          innerSdsStyle={sdsStyle}
          navVariant="primary"
        >
          <StyledLabel
            itemType={item.itemType}
            active={isActive}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
            navVariant="primary"
          >
            <StyledLabelTextWrapper active={isActive} isNarrow={isNarrow}>
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
        </UnifiedNavItem>

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
            // Wrap dropdown items to automatically set active key
            const wrappedItems = wrapDropdownItemsWithActiveKey(
              item.items,
              key
            );
            const groupedItems = groupItemsBySection(wrappedItems);
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
                    const {
                      label: subLabel,
                      onClick,
                      ...sectionSubItemRestProps
                    } = subItem;
                    return (
                      <MenuItem
                        key={`menu-item-${subLabel}`}
                        onClick={(e) => {
                          onClick?.(e);
                          onClose();
                        }}
                        sdsType="action"
                        sx={{ minWidth: menuWidth }}
                        {...sectionSubItemRestProps}
                        icon={undefined}
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
    item: DropdownNavigationHeaderPrimaryNavItem<T>,
    key: T
  ) => {
    const labelKebabCase = item.label
      ?.toString()
      .toLowerCase()
      .replace(" ", "-");

    const accordionId = `${labelKebabCase}-dropdown`;

    // Wrap dropdown items to automatically set active key
    const wrappedItems = wrapDropdownItemsWithActiveKey(item.items, key);

    return (
      <AccordionNavItem
        key={accordionId}
        accordionId={accordionId}
        label={item.label}
        items={wrappedItems}
        expandedAccordion={expandedAccordion}
        setExpandedAccordion={setExpandedAccordion}
        accordionRefs={accordionRefs}
        scrollToAccordion={scrollToAccordion}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
        chevronSize={isNarrow ? "s" : "xs"}
        onClose={onClose}
        sdsStyle={sdsStyle}
        sectionProps={item.sectionProps}
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
      <UnifiedNavItem
        key={key}
        {...rest}
        active={isActive}
        sdsStyle="minimal"
        onClick={(e: React.MouseEvent) => {
          onChange(key);
          item.onClick?.(e);
        }}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
        innerSdsStyle={sdsStyle}
        navVariant="primary"
      >
        <StyledLabel
          active={isActive}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
          navVariant="primary"
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
      </UnifiedNavItem>
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
              item as DropdownNavigationHeaderPrimaryNavItem<T>,
              key
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
          transitionDuration={100}
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
                // Wrap dropdown items to automatically set active key
                const wrappedItems = wrapDropdownItemsWithActiveKey(
                  activeDrawerItem.items,
                  activeDrawerItem.key
                );
                const groupedItems = groupItemsBySection(wrappedItems);
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
