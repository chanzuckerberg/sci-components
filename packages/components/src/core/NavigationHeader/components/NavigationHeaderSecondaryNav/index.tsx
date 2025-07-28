import { Fragment, useEffect, useRef, useState } from "react";
import { StyledDivider, StyledSection, StyledSectionHeader } from "../style";
import { StyledAccordion, StyledSubItem, StyledTextItem } from "./style";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";
import { SdsMinimalButtonProps } from "src/core/Button";
import { SDSTheme } from "src/core/styles";
import { useTheme } from "@mui/material";
import { DropdownItem } from "../NavigationHeaderPrimaryNav";
import { groupItemsBySection } from "../../utils";

interface TextHeaderSecondaryNavItem extends Partial<SdsMinimalButtonProps> {
  label: string;
  itemType: "text";
}

interface DropdownHeaderSecondaryNavItem
  extends Partial<SdsMinimalButtonProps> {
  label: string;
  itemType: "dropdown";
  items: DropdownItem[];
}

export type NavigationHeaderSecondaryNavItem =
  | TextHeaderSecondaryNavItem
  | DropdownHeaderSecondaryNavItem;

export interface NavigationHeaderSecondaryNavProps {
  items: NavigationHeaderSecondaryNavItem[];
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

export default function NavigationHeaderSecondaryNav({
  items,
  hasInvertedStyle,
  isNarrow,
}: NavigationHeaderSecondaryNavProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const theme: SDSTheme = useTheme();

  const open = Boolean(anchorEl);
  function onClose() {
    setAnchorEl(null);
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
    <StyledSection gap="l" isNarrow={isNarrow}>
      {items.map((item) => {
        const { itemType, label, key, ...rest } = item;

        if (itemType === "dropdown" && !isNarrow) {
          return (
            <Fragment key={`${key}-${label}-dropdown`}>
              <StyledTextItem
                {...rest}
                ref={buttonRef}
                hasInvertedStyle={hasInvertedStyle}
                open={open}
                isNarrow={isNarrow}
                sdsStyle="minimal"
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                  item.onClick?.(event);
                }}
              >
                <span>{label}</span>
                <Icon
                  sdsIcon={open ? "ChevronUp" : "ChevronDown"}
                  sdsSize="xs"
                />
              </StyledTextItem>

              <Menu
                anchorEl={anchorEl}
                open={open}
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
                          />
                        )}
                        {section && hasMultipleSections && (
                          <StyledSectionHeader isNarrow={isNarrow}>
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
              key={`${label}-dropdown`}
              id={`${label}-dropdown`}
              hasInvertedStyle={hasInvertedStyle}
              isNarrow={isNarrow}
            >
              <AccordionHeader>{label}</AccordionHeader>
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
                          />
                        )}
                        {section && hasMultipleSections && (
                          <StyledSectionHeader isNarrow={isNarrow}>
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
                            <StyledSubItem
                              key={`primary-nav-item-${dropdownItemLabel}`}
                              onClick={(e) => {
                                onClick?.(e);
                                onClose();
                              }}
                              {...accordionSubItemRest}
                            >
                              {dropdownItemLabel}
                            </StyledSubItem>
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
            open={open}
            isNarrow={isNarrow}
            sdsStyle="minimal"
          >
            {item.label}
          </StyledTextItem>
        );
      })}
    </StyledSection>
  );
}
