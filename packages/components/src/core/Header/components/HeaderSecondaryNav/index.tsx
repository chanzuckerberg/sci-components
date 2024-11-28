import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { StyledSection } from "../style";
import { StyledTextItem } from "./style";
import Dropdown from "src/core/Dropdown";
import Menu from "src/core/Menu";
import Icon from "src/core/Icon";
import MenuItem from "src/core/MenuItem";

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

export type HeaderSecondaryNavItem =
  | TextHeaderSecondaryNavItem
  | DropdownHeaderSecondaryNavItem;

export interface HeaderSecondaryNavProps {
  items: HeaderSecondaryNavItem[];
}

function SecondaryNavItem({ item }: { item: HeaderSecondaryNavItem }) {
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
        <StyledTextItem onClick={item.onClick}>{item.label}</StyledTextItem>
      )}

      {item.type === "dropdown" && (
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
    </Fragment>
  );
}

export default function HeaderSecondaryNav({ items }: HeaderSecondaryNavProps) {
  return (
    <StyledSection>
      {items.map((item) => (
        <SecondaryNavItem key={`${item.label}-${item.type}`} item={item} />
      ))}
    </StyledSection>
  );
}
