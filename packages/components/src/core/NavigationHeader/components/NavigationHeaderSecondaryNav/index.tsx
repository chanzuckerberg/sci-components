import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import {
  StyledDivider,
  StyledLabelTextWrapper,
  StyledLabelTextWrapperShadow,
  StyledSection,
  StyledSectionHeader,
} from "../style";
import { StyledTextItem, StyledTag } from "./style";
import { SdsTagColorType } from "src/core/Tag";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { SdsMinimalButtonProps } from "src/core/Button";
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

interface TextHeaderSecondaryNavItem extends Partial<SdsMinimalButtonProps> {
  label: string;
  itemType: "text";
  tag?: string;
  tagColor?: SdsTagColorType;
}

interface DropdownHeaderSecondaryNavItem
  extends Partial<SdsMinimalButtonProps> {
  label: string;
  itemType: "dropdown";
  items: DropdownItem[];
  sectionProps?: Record<string, SectionProps>;
  tag?: string;
  tagColor?: SdsTagColorType;
  defaultUrl?: string;
  component?: React.ElementType;
  target?: string;
  rel?: string;
}

export type NavigationHeaderSecondaryNavItem =
  | TextHeaderSecondaryNavItem
  | DropdownHeaderSecondaryNavItem;

export interface NavigationHeaderSecondaryNavProps {
  menuProps?: Partial<MenuProps>;
  items: NavigationHeaderSecondaryNavItem[];
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
}

export default function NavigationHeaderSecondaryNav({
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
}: NavigationHeaderSecondaryNavProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(
    null
  );
  const [activeDrawerKey, setActiveDrawerKey] = useState<string | null>(null);
  const theme: SDSTheme = useTheme();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [contentKey, setContentKey] = useState<string | null>(null);
  const [isContentFading, setIsContentFading] = useState(false);

  const open = Boolean(anchorEl);
  const drawerOpen = activeDrawerKey !== null;

  function onClose() {
    setAnchorEl(null);
    setActiveDropdownKey(null);
    // Close mobile drawer when in narrow mode
    if (isNarrow) {
      onCloseProp?.();
    }
  }

  function onDrawerClose() {
    // Clear any pending hover enter timeout
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
    }
    // Clear any existing close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDrawerKey(null);
      setContentKey(null);
    }, 200);
  }

  function onDrawerOpen(key: string) {
    // Clear any pending close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // If drawer is already open with different content, add a delay before changing
    if (activeDrawerKey !== null && activeDrawerKey !== key) {
      // Clear any pending hover enter timeout
      if (hoverEnterTimeoutRef.current) {
        clearTimeout(hoverEnterTimeoutRef.current);
      }

      // Wait 50ms before changing content
      hoverEnterTimeoutRef.current = setTimeout(() => {
        setIsContentFading(true);
        setTimeout(() => {
          setActiveDrawerKey(key);
          setContentKey(key);
          setIsContentFading(false);
        }, 150);
      }, 100);
    } else {
      // First time opening or reopening same drawer - open immediately
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
      if (hoverEnterTimeoutRef.current) {
        clearTimeout(hoverEnterTimeoutRef.current);
      }
    };
  }, []);

  // Notify parent when drawer state changes (only for drawer style)
  useEffect(() => {
    if (sdsStyle === "drawer" && onDrawerStateChange) {
      onDrawerStateChange(drawerOpen);
    }
  }, [drawerOpen, sdsStyle, onDrawerStateChange]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | string>("100%");

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    setMenuWidth(button.offsetWidth);
  }, []);

  const renderDrawerItem = (
    item: DropdownHeaderSecondaryNavItem,
    itemKey: string,
    label: ReactNode,
    tag?: string,
    tagColor?: SdsTagColorType,
    rest?: Record<string, unknown>
  ) => {
    const isDrawerOpen = drawerOpen && activeDrawerKey === itemKey;
    const { defaultUrl, component, target, rel, onClick } = item;

    // If defaultUrl is provided without a component, default to anchor tag
    const componentProp = defaultUrl && !component ? "a" : component;

    return (
      <StyledHoverDrawerContainer
        key={`${itemKey}-${label}-drawer`}
        onMouseEnter={() => onDrawerOpen(itemKey)}
        onMouseLeave={onDrawerClose}
      >
        <StyledTextItem
          {...rest}
          hasInvertedStyle={hasInvertedStyle}
          open={isDrawerOpen}
          isNarrow={isNarrow}
          // sdsStyle={sdsStyle as unknown as undefined}
          onClick={onClick}
          component={componentProp}
          href={defaultUrl}
          target={target}
          rel={rel}
        >
          <StyledLabelTextWrapper active={isDrawerOpen} isNarrow={isNarrow}>
            {label}
          </StyledLabelTextWrapper>
          <StyledLabelTextWrapperShadow aria-hidden="true" isNarrow={isNarrow}>
            {label}
          </StyledLabelTextWrapperShadow>
          {tag && (
            <StyledTag
              label={tag}
              color={tagColor as SdsTagColorType}
              hover={false}
            />
          )}
          <Icon
            sdsIcon={isDrawerOpen ? "ChevronUp" : "ChevronDown"}
            sdsSize="xs"
          />
        </StyledTextItem>
      </StyledHoverDrawerContainer>
    );
  };

  const renderDropdownItem = (
    item: DropdownHeaderSecondaryNavItem,
    itemKey: string,
    label: ReactNode,
    tag?: string,
    tagColor?: SdsTagColorType,
    rest?: Record<string, unknown>
  ) => {
    const isDropdownOpen = open && activeDropdownKey === itemKey;

    return (
      <Fragment key={`${itemKey}-${label}-dropdown`}>
        <StyledTextItem
          {...rest}
          ref={buttonRef}
          hasInvertedStyle={hasInvertedStyle}
          open={isDropdownOpen}
          isNarrow={isNarrow}
          // sdsStyle={sdsStyle as unknown as undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setActiveDropdownKey(itemKey);
            item.onClick?.(event);
          }}
        >
          <StyledLabelTextWrapper active={isDropdownOpen} isNarrow={isNarrow}>
            {label}
          </StyledLabelTextWrapper>
          <StyledLabelTextWrapperShadow aria-hidden="true" isNarrow={isNarrow}>
            {label}
          </StyledLabelTextWrapperShadow>
          {tag && (
            <StyledTag
              label={tag}
              color={tagColor as SdsTagColorType}
              hover={false}
            />
          )}
          <Icon
            sdsIcon={isDropdownOpen ? "ChevronUp" : "ChevronDown"}
            sdsSize="xs"
          />
        </StyledTextItem>

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
    item: DropdownHeaderSecondaryNavItem,
    labelKebabCase: string,
    label: ReactNode
  ) => {
    const accordionId = `${labelKebabCase}-dropdown`;

    return (
      <AccordionNavItem
        key={accordionId}
        accordionId={accordionId}
        label={label}
        items={item.items}
        expandedAccordion={expandedAccordion}
        setExpandedAccordion={setExpandedAccordion}
        accordionRefs={accordionRefs}
        scrollToAccordion={scrollToAccordion}
        hasInvertedStyle={hasInvertedStyle}
        isNarrow={isNarrow}
        chevronSize="s"
        onClose={onClose}
        sdsStyle={sdsStyle}
        sectionProps={item.sectionProps}
      />
    );
  };

  const renderTextItem = (
    label: ReactNode,
    itemType: string,
    tag?: string,
    tagColor?: SdsTagColorType,
    rest?: Record<string, unknown>,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  ) => {
    return (
      <StyledTextItem
        key={`${label}-${itemType}`}
        {...rest}
        onClick={onClick}
        hasInvertedStyle={hasInvertedStyle}
        open={false}
        isNarrow={isNarrow}
        // sdsStyle={sdsStyle as unknown as undefined}
      >
        {label}
        {tag && (
          <StyledTag
            label={tag}
            color={tagColor as SdsTagColorType}
            hover={false}
          />
        )}
      </StyledTextItem>
    );
  };

  // Get the active drawer item for rendering shared content
  const activeDrawerItem = items.find((item, index) => {
    const { label, key } = item;
    const labelKebabCase = label?.toString().toLowerCase().replace(" ", "-");
    const itemKey = String(key || `${labelKebabCase}-${index}`);
    return item.itemType === "dropdown" && itemKey === contentKey;
  }) as DropdownHeaderSecondaryNavItem | undefined;

  return (
    <>
      <StyledSection isNarrow={isNarrow}>
        {items.map((item, index) => {
          const { itemType, label, key, tag, tagColor, ...rest } = item;
          const labelKebabCase = label
            ?.toString()
            .toLowerCase()
            .replace(" ", "-");
          const itemKey = String(key || `${labelKebabCase}-${index}`);

          // Drawer style (hover-based)
          if (itemType === "dropdown" && !isNarrow && sdsStyle === "drawer") {
            return renderDrawerItem(
              item as DropdownHeaderSecondaryNavItem,
              itemKey,
              label,
              tag,
              tagColor,
              rest
            );
          }

          // Dropdown style (click-based)
          if (itemType === "dropdown" && !isNarrow && sdsStyle === "dropdown") {
            return renderDropdownItem(
              item as DropdownHeaderSecondaryNavItem,
              itemKey,
              label,
              tag,
              tagColor,
              rest
            );
          }

          // Narrow/Accordion style
          if (itemType === "dropdown" && isNarrow) {
            return renderAccordionItem(
              item as DropdownHeaderSecondaryNavItem,
              labelKebabCase,
              label
            );
          }

          // Simple text item
          return renderTextItem(
            item.label,
            itemType,
            tag,
            tagColor,
            rest,
            item.onClick
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
