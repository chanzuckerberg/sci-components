import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { StyledSection } from "../style";
import { StyledAccordion, StyledSubItem, StyledTextItem } from "./style";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";
import { SdsMinimalButtonProps } from "src/core/Button";
import { SDSTheme } from "src/core/styles";
import { useTheme } from "@mui/material";

interface TextHeaderSecondaryNavItem extends Partial<SdsMinimalButtonProps> {
  label: string;
  itemType: "text";
}

interface DropdownItem {
  label: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  component?: React.ElementType;
  href?: string;
  rel?: string;
  target?: string;
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
        const { itemType, label, ...rest } = item;

        if ("itemType" in item && itemType === "dropdown" && !isNarrow) {
          return (
            <Fragment key={`${label}-dropdown`}>
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
                {item.items.map((subItem) => {
                  const { label: menuLabel, onClick, ...subItemRest } = subItem;
                  return (
                    <MenuItem
                      key={`menu-item-${menuLabel}`}
                      onClick={(event) => {
                        onClick?.(event);
                        onClose();
                      }}
                      sx={{ minWidth: menuWidth }}
                      {...subItemRest}
                    >
                      {menuLabel}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Fragment>
          );
        }

        if ("itemType" in item && itemType === "dropdown" && isNarrow) {
          return (
            <StyledAccordion
              key={`${label}-dropdown`}
              id={`${label}-dropdown`}
              hasInvertedStyle={hasInvertedStyle}
              isNarrow={isNarrow}
            >
              <AccordionHeader>{label}</AccordionHeader>
              <AccordionDetails>
                {item.items.map((subItem) => {
                  const {
                    label: accordionLabel,
                    onClick,
                    ...accordionSubItemRest
                  } = subItem;

                  return (
                    <StyledSubItem
                      key={`accordion-item-${accordionLabel}`}
                      onClick={(event) => {
                        onClick?.(event);
                        onClose();
                      }}
                      {...accordionSubItemRest}
                    >
                      {accordionLabel}
                    </StyledSubItem>
                  );
                })}
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
