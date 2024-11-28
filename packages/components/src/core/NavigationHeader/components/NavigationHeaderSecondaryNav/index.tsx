import { Fragment, useEffect, useRef, useState } from "react";
import { StyledSection } from "../style";
import { StyledAccordion, StyledTextItem } from "./style";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";
import { useMediaQuery, useTheme } from "@mui/material";
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
}

function SecondaryNavItem({
  item,
}: {
  item: NavigationHeaderSecondaryNavItem;
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment key={item.label}>
      {item.type === "text" && (
        <StyledTextItem onClick={item.onClick}>{item.label}</StyledTextItem>
      )}

      {item.type === "dropdown" && !isMobile && (
        <>
          <StyledTextItem
            ref={buttonRef}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <span>{item.label}</span>
            <Icon
              sdsIcon={open ? "ChevronUp" : "ChevronDown"}
              sdsType="button"
              sdsSize="xs"
            />
          </StyledTextItem>

          <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
            {item.items.map((subItem) => (
              <MenuItem
                key={subItem.label}
                onClick={() => {
                  subItem.onClick?.();
                  onClose();
                }}
                sx={{ width: menuWidth }}
              >
                {subItem.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      {item.type === "dropdown" && isMobile && (
        <StyledAccordion id={`${item.label}-dropdown`}>
          <AccordionHeader>{item.label}</AccordionHeader>
          <AccordionDetails>
            {item.items.map((subItem) => (
              <MenuItem
                key={subItem.label}
                onClick={() => {
                  subItem.onClick?.();
                  onClose();
                }}
                sx={{ width: menuWidth }}
              >
                {subItem.label}
              </MenuItem>
            ))}
          </AccordionDetails>
        </StyledAccordion>
      )}
    </Fragment>
  );
}

export default function NavigationHeaderSecondaryNav({
  items,
}: NavigationHeaderSecondaryNavProps) {
  return (
    <StyledSection>
      {items.map((item) => (
        <SecondaryNavItem key={`${item.label}-${item.type}`} item={item} />
      ))}
    </StyledSection>
  );
}
