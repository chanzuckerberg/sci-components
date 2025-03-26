import { Fragment, useEffect, useRef, useState } from "react";
import { StyledSection } from "../style";
import { StyledAccordion, StyledSubItem, StyledTextItem } from "./style";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";
import { SdsMinimalButtonProps } from "src/core/Button";
import { SDSTheme } from "src/core/styles";
import { useTheme } from "@mui/material";

interface BaseHeaderSecondaryNavItem extends Partial<SdsMinimalButtonProps> {
  label: string;
}

interface TextHeaderSecondaryNavItem extends BaseHeaderSecondaryNavItem {
  onClick?(): void;
  itemType: "text";
}

interface DropdownHeaderSecondaryNavItem extends BaseHeaderSecondaryNavItem {
  itemType: "dropdown";
  items: Pick<
    TextHeaderSecondaryNavItem,
    "label" | "onClick" | "component" | "href" | "rel" | "target"
  >[];
}

export type NavigationHeaderSecondaryNavItem =
  | TextHeaderSecondaryNavItem
  | DropdownHeaderSecondaryNavItem;

export interface NavigationHeaderSecondaryNavProps {
  items: NavigationHeaderSecondaryNavItem[];
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

function SecondaryNavItem({
  item,
  hasInvertedStyle,
  isNarrow,
  ...rest
}: {
  item: NavigationHeaderSecondaryNavItem;
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}) {
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
    <Fragment key={item.label}>
      {item.itemType === "text" && (
        <StyledTextItem
          sdsStyle="minimal"
          onClick={item.onClick}
          hasInvertedStyle={hasInvertedStyle}
          open={open}
          isNarrow={isNarrow}
          {...rest}
        >
          {item.label}
        </StyledTextItem>
      )}

      {item.itemType === "dropdown" && !isNarrow && (
        <>
          <StyledTextItem
            sdsStyle="minimal"
            ref={buttonRef}
            hasInvertedStyle={hasInvertedStyle}
            open={open}
            isNarrow={isNarrow}
            {...rest}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              item.onClick?.(event);
            }}
          >
            <span>{item.label}</span>
            <Icon sdsIcon={open ? "ChevronUp" : "ChevronDown"} sdsSize="xs" />
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
              const { label, onClick, ...subItemRest } = subItem;
              return (
                <MenuItem
                  key={label}
                  onClick={() => {
                    onClick?.();
                    onClose();
                  }}
                  sx={{ minWidth: menuWidth }}
                  {...subItemRest}
                >
                  {label}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      )}

      {item.itemType === "dropdown" && isNarrow && (
        <StyledAccordion
          id={`${item.label}-dropdown`}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        >
          <AccordionHeader>{item.label}</AccordionHeader>
          <AccordionDetails>
            {item.items.map((subItem) => {
              const { label, onClick, ...accordionSubItemRest } = subItem;

              return (
                <StyledSubItem
                  key={label}
                  onClick={() => {
                    onClick?.();
                    onClose();
                  }}
                  {...accordionSubItemRest}
                >
                  {label}
                </StyledSubItem>
              );
            })}
          </AccordionDetails>
        </StyledAccordion>
      )}
    </Fragment>
  );
}

export default function NavigationHeaderSecondaryNav({
  items,
  hasInvertedStyle,
  isNarrow,
}: NavigationHeaderSecondaryNavProps) {
  return (
    <StyledSection gap="l" isNarrow={isNarrow}>
      {items.map((item) => {
        const { itemType, label, ...rest } = item;
        return (
          <SecondaryNavItem
            key={`${label}-${itemType}`}
            item={item}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
            {...rest}
          />
        );
      })}
    </StyledSection>
  );
}
