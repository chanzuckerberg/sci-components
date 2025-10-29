import { Fragment, useEffect, useRef, useState } from "react";
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
import { StyledAccordion } from "../../style";

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
}

export default function NavigationHeaderSecondaryNav({
  menuProps,
  items,
  hasInvertedStyle,
  isNarrow,
}: NavigationHeaderSecondaryNavProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(
    null
  );
  const theme: SDSTheme = useTheme();

  const open = Boolean(anchorEl);
  function onClose() {
    setAnchorEl(null);
    setActiveDropdownKey(null);
  }

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | string>("100%");

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    setMenuWidth(button.offsetWidth);
  }, []);

  return (
    <StyledSection isNarrow={isNarrow}>
      {items.map((item, index) => {
        const { itemType, label, key, tag, tagColor, ...rest } = item;
        const labelKebabCase = label
          ?.toString()
          .toLowerCase()
          .replace(" ", "-");
        const itemKey = String(key || `${labelKebabCase}-${index}`);
        const isDropdownOpen = open && activeDropdownKey === itemKey;

        if (itemType === "dropdown" && !isNarrow) {
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
                <StyledLabelTextWrapper
                  active={isDropdownOpen}
                  isNarrow={isNarrow}
                >
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
                    sections.length > 1 ||
                    sections.some((section) => section !== "");

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
                            ...subItemRest
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
                              {...subItemRest}
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
        }

        if (itemType === "dropdown" && isNarrow) {
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
                    sections.length > 1 ||
                    sections.some((section) => section !== "");

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
                          const {
                            label: dropdownItemLabel,
                            onClick,
                            ...accordionSubItemRest
                          } = subItem;

                          return (
                            <MenuItem
                              key={`primary-nav-item-${dropdownItemLabel}`}
                              onClick={(e) => {
                                onClick?.(e);
                                onClose();
                              }}
                              sdsType="action"
                              {...accordionSubItemRest}
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
        }

        return (
          <StyledTextItem
            key={`${label}-${itemType}`}
            {...rest}
            onClick={item.onClick}
            hasInvertedStyle={hasInvertedStyle}
            open={false}
            isNarrow={isNarrow}
            sdsStyle="minimal"
          >
            {item.label}
            {tag && (
              <StyledTag
                label={tag}
                color={tagColor as SdsTagColorType}
                hover={false}
              />
            )}
          </StyledTextItem>
        );
      })}
    </StyledSection>
  );
}
