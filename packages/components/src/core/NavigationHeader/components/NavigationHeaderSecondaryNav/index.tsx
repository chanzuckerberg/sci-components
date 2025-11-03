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
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";
import { SdsMinimalButtonProps } from "src/core/Button";
import { SDSTheme } from "src/core/styles";
import { MenuProps, useTheme } from "@mui/material";
import { DropdownItem } from "../NavigationHeaderPrimaryNav";
import { groupItemsBySection } from "../../utils";
import {
  StyledAccordion,
  StyledMegaMenuDrawer,
  StyledMegaMenuBackdrop,
  StyledMegaMenuContent,
  StyledHoverDrawerColumn,
  StyledHoverDrawerContainer,
} from "../../style";
import DrawerContent from "../shared/DrawerContent";

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
  tag?: string;
  tagColor?: SdsTagColorType;
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
}

export default function NavigationHeaderSecondaryNav({
  menuProps,
  items,
  hasInvertedStyle,
  isNarrow,
  sdsStyle = "dropdown",
}: NavigationHeaderSecondaryNavProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(
    null
  );
  const [activeDrawerKey, setActiveDrawerKey] = useState<string | null>(null);
  const theme: SDSTheme = useTheme();
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

  function onDrawerOpen(key: string) {
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
    const groupedItems = groupItemsBySection(item.items);
    const sections = Object.keys(groupedItems);
    const hasMultipleSections =
      sections.length > 1 || sections.some((section) => section !== "");

    return (
      <Fragment key={`${itemKey}-${label}-drawer`}>
        <StyledHoverDrawerContainer
          onMouseEnter={() => onDrawerOpen(itemKey)}
          onMouseLeave={onDrawerClose}
        >
          <StyledTextItem
            {...rest}
            hasInvertedStyle={hasInvertedStyle}
            open={isDrawerOpen}
            isNarrow={isNarrow}
            sdsStyle="minimal"
          >
            <StyledLabelTextWrapper active={isDrawerOpen} isNarrow={isNarrow}>
              {label}
            </StyledLabelTextWrapper>
            <StyledLabelTextWrapperShadow
              aria-hidden="true"
              isNarrow={isNarrow}
            >
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
              key={`drawer-content-${itemKey}`}
              hasInvertedStyle={hasInvertedStyle}
            >
              {sections.map((section) => (
                <StyledHoverDrawerColumn
                  key={`drawer-section-${section || "default"}`}
                  hasInvertedStyle={hasInvertedStyle}
                  totalColumns={sections.length}
                >
                  <DrawerContent
                    drawerItems={groupedItems[section]}
                    section={section}
                    hasMultipleSections={hasMultipleSections}
                    hasInvertedStyle={hasInvertedStyle}
                    onItemClick={() => setActiveDrawerKey(null)}
                  />
                </StyledHoverDrawerColumn>
              ))}
            </StyledMegaMenuContent>
          </StyledMegaMenuDrawer>
        )}
      </Fragment>
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
          sdsStyle="minimal"
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
    return (
      <StyledAccordion
        key={`${labelKebabCase}-dropdown`}
        id={`${labelKebabCase}-dropdown`}
        hasInvertedStyle={hasInvertedStyle}
      >
        <AccordionHeader chevronSize="s">{label}</AccordionHeader>
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
        sdsStyle="minimal"
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

  return (
    <>
      {drawerOpen && (
        <StyledMegaMenuBackdrop
          onClick={() => setActiveDrawerKey(null)}
          onMouseEnter={onDrawerClose}
        />
      )}
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
    </>
  );
}
