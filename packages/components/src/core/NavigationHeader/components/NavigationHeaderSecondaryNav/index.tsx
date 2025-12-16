import { Fragment, ReactNode, useEffect } from "react";
import {
  StyledDivider,
  StyledLabelTextWrapper,
  StyledLabelTextWrapperShadow,
  StyledSection,
  StyledSectionHeader,
} from "../style";
import { StyledTag } from "./style";
import { UnifiedNavItem } from "../shared/UnifiedNavItem";
import { SdsTagColorType } from "src/core/Tag";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { SDSTheme } from "src/core/styles";
import { MenuProps, useTheme } from "@mui/material";
import { DropdownItem, SectionProps } from "../NavigationHeaderPrimaryNav";
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

interface BaseNavigationHeaderSecondaryNavItem<T extends string>
  extends Record<string, unknown> {
  key: T;
  label: ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
}

export interface TextNavigationHeaderSecondaryNavItem<T extends string>
  extends BaseNavigationHeaderSecondaryNavItem<T> {
  itemType: "text";
  tag?: string;
  tagColor?: SdsTagColorType;
}

interface DropdownNavigationHeaderSecondaryNavItem<T extends string>
  extends BaseNavigationHeaderSecondaryNavItem<T> {
  itemType: "dropdown";
  items: DropdownItem[];
  sectionProps?: Record<string, SectionProps>;
  defaultUrl?: string;
  component?: React.ElementType;
  target?: string;
  rel?: string;
}

export type NavigationHeaderSecondaryNavItem<T extends string> =
  | TextNavigationHeaderSecondaryNavItem<T>
  | DropdownNavigationHeaderSecondaryNavItem<T>;

export interface NavigationHeaderSecondaryNavProps<T extends string> {
  menuProps?: Partial<MenuProps>;
  items: NavigationHeaderSecondaryNavItem<T>[];
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
  sdsStyle?: "dropdown" | "drawer";
  expandedAccordion: string | null;
  setExpandedAccordion: (value: string | null) => void;
  accordionRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  scrollToAccordion?: (accordionId: string) => void;
  onDrawerStateChange?: (isOpen: boolean) => void;
  topOffset?: number;
  onClose?: () => void;
  onDrawerStyleNavItemHover?: (
    item: NavigationHeaderSecondaryNavItem<T>
  ) => void;
}

export default function NavigationHeaderSecondaryNav<T extends string>({
  menuProps,
  items,
  hasInvertedStyle,
  isNarrow,
  sdsStyle = "dropdown",
  expandedAccordion,
  setExpandedAccordion,
  accordionRefs,
  scrollToAccordion,
  onDrawerStateChange,
  topOffset = 0,
  onClose: onCloseProp,
  onDrawerStyleNavItemHover,
}: NavigationHeaderSecondaryNavProps<T>) {
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
    item: DropdownNavigationHeaderSecondaryNavItem<T>,
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
      parentOnClick?.(e);
    };

    return (
      <StyledHoverDrawerContainer
        key={key}
        onMouseEnter={() => {
          onDrawerStyleNavItemHover?.(item);
          onDrawerOpen(key);
        }}
        onMouseLeave={onDrawerClose}
      >
        <UnifiedNavItem
          {...rest}
          hasInvertedStyle={hasInvertedStyle}
          active={isDrawerOpen}
          isNarrow={isNarrow}
          sdsStyle="minimal"
          innerSdsStyle={sdsStyle}
          navVariant="secondary"
          onClick={handleClick}
          component={componentProp}
          href={defaultUrl}
          target={target}
          rel={rel}
        >
          <StyledLabelTextWrapper active={isDrawerOpen} isNarrow={isNarrow}>
            {label as ReactNode}
          </StyledLabelTextWrapper>
          <StyledLabelTextWrapperShadow aria-hidden="true" isNarrow={isNarrow}>
            {label as ReactNode}
          </StyledLabelTextWrapperShadow>
          <Icon
            sdsIcon={isDrawerOpen ? "ChevronUp" : "ChevronDown"}
            sdsSize="xs"
          />
        </UnifiedNavItem>
      </StyledHoverDrawerContainer>
    );
  };

  const renderDropdownItem = (
    item: DropdownNavigationHeaderSecondaryNavItem<T>,
    key: T,
    label: ReactNode,
    parentOnClick?: (e: React.MouseEvent) => void,
    rest?: Record<string, unknown>
  ) => {
    const isDropdownOpen = open && activeDropdownKey === key;

    return (
      <Fragment key={key}>
        <UnifiedNavItem
          {...rest}
          ref={buttonRef}
          hasInvertedStyle={hasInvertedStyle}
          active={isDropdownOpen}
          isNarrow={isNarrow}
          sdsStyle="minimal"
          innerSdsStyle={sdsStyle}
          navVariant="secondary"
          onClick={(e: React.MouseEvent) => {
            setAnchorEl(e.currentTarget);
            setActiveDropdownKey(key);
            parentOnClick?.(e);
          }}
        >
          <StyledLabelTextWrapper active={isDropdownOpen} isNarrow={isNarrow}>
            {label as ReactNode}
          </StyledLabelTextWrapper>
          <StyledLabelTextWrapperShadow aria-hidden="true" isNarrow={isNarrow}>
            {label as ReactNode}
          </StyledLabelTextWrapperShadow>
          <Icon
            sdsIcon={isDropdownOpen ? "ChevronUp" : "ChevronDown"}
            sdsSize="xs"
          />
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
    item: DropdownNavigationHeaderSecondaryNavItem<T>,
    _key: T
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
        sectionProps={item.sectionProps}
      />
    );
  };

  const renderTextItem = (
    item: TextNavigationHeaderSecondaryNavItem<T>,
    key: T,
    label: ReactNode,
    tag?: string,
    tagColor?: SdsTagColorType,
    rest?: Record<string, unknown>
  ) => {
    return (
      <UnifiedNavItem
        key={key}
        {...rest}
        onClick={(e: React.MouseEvent) => {
          item.onClick?.(e);
        }}
        hasInvertedStyle={hasInvertedStyle}
        active={false}
        isNarrow={isNarrow}
        sdsStyle="minimal"
        navVariant="secondary"
      >
        {label as ReactNode}
        {tag && (
          <StyledTag
            label={tag as string}
            color={tagColor as SdsTagColorType}
            hover={false}
          />
        )}
      </UnifiedNavItem>
    );
  };

  // Get the active drawer item for rendering shared content
  const activeDrawerItem = items.find(
    (item) => item.itemType === "dropdown" && item.key === contentKey
  ) as DropdownNavigationHeaderSecondaryNavItem<T> | undefined;

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
              item as DropdownNavigationHeaderSecondaryNavItem<T>,
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
              item as DropdownNavigationHeaderSecondaryNavItem<T>,
              key,
              label,
              parentOnClick,
              rest
            );
          }

          // Narrow/Accordion style
          if (item.itemType === "dropdown" && isNarrow) {
            return renderAccordionItem(
              item as DropdownNavigationHeaderSecondaryNavItem<T>,
              key
            );
          }

          // Simple text item
          return renderTextItem(
            item as TextNavigationHeaderSecondaryNavItem<T>,
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
