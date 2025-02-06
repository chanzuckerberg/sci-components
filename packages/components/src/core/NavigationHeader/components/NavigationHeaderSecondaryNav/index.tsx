import { Fragment, useEffect, useRef, useState } from "react";
import { StyledSection } from "../style";
import { StyledAccordion, StyledSubItem, StyledTextItem } from "./style";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";

interface BaseHeaderSecondaryNavItem {
  label: string;
}

interface TextHeaderSecondaryNavItem extends BaseHeaderSecondaryNavItem {
  onClick?(): void;
  type: "text";
}

interface DropdownHeaderSecondaryNavItem extends BaseHeaderSecondaryNavItem {
  type: "dropdown";
  items: Pick<TextHeaderSecondaryNavItem, "label" | "onClick">[];
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
}: {
  item: NavigationHeaderSecondaryNavItem;
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

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
      {item.type === "text" && (
        <StyledTextItem
          sdsStyle="minimal"
          onClick={item.onClick}
          hasInvertedStyle={hasInvertedStyle}
          open={open}
          isNarrow={isNarrow}
        >
          {item.label}
        </StyledTextItem>
      )}

      {item.type === "dropdown" && !isNarrow && (
        <>
          <StyledTextItem
            sdsStyle="minimal"
            ref={buttonRef}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            hasInvertedStyle={hasInvertedStyle}
            open={open}
            isNarrow={isNarrow}
          >
            <span>{item.label}</span>
            <Icon sdsIcon={open ? "ChevronUp" : "ChevronDown"} sdsSize="xs" />
          </StyledTextItem>

          <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
            {item.items.map((subItem) => (
              <MenuItem
                key={subItem.label}
                onClick={() => {
                  subItem.onClick?.();
                  onClose();
                }}
                sx={{ background: "red", width: menuWidth }}
              >
                {subItem.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      {item.type === "dropdown" && isNarrow && (
        <StyledAccordion
          id={`${item.label}-dropdown`}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        >
          <AccordionHeader>{item.label}</AccordionHeader>
          <AccordionDetails>
            {item.items.map((subItem) => (
              <StyledSubItem
                key={subItem.label}
                onClick={() => {
                  subItem.onClick?.();
                  onClose();
                }}
                sx={{ width: menuWidth }}
              >
                {subItem.label}
              </StyledSubItem>
            ))}
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
      {items.map((item) => (
        <SecondaryNavItem
          key={`${item.label}-${item.type}`}
          item={item}
          hasInvertedStyle={hasInvertedStyle}
          isNarrow={isNarrow}
        />
      ))}
    </StyledSection>
  );
}
