import { SdsTagColorType } from "src/core/Tag";
import {
  PrimaryNavItem,
  StyledAccordion,
  StyledLabel,
  StyledSubItem,
  StyledTag,
} from "./style";
import { ReactNode, useState, useRef, useEffect, Fragment } from "react";
import { StyledSection } from "../style";
import Menu from "src/core/Menu";
import MenuItem from "src/core/MenuItem";
import Icon from "src/core/Icon";
import { SDSTheme } from "src/core/styles";
import { useTheme } from "@mui/material";
import { AccordionDetails, AccordionHeader } from "src/core/Accordion";

interface BaseNavigationHeaderPrimaryNavItem<T extends string>
  extends Record<string, unknown> {
  key: T;
  label: ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
}

export interface TextNavigationHeaderPrimaryNavItem<T extends string>
  extends BaseNavigationHeaderPrimaryNavItem<T> {
  itemType: "text";
  tag?: string;
  tagColor?: SdsTagColorType;
}

interface DropdownItem {
  label: ReactNode;
  onClick?: () => void;
  component?: React.ElementType;
  href?: string;
  rel?: string;
  target?: string;
}

interface DropdownNavigationHeaderPrimaryNavItem<T extends string>
  extends BaseNavigationHeaderPrimaryNavItem<T> {
  itemType: "dropdown";
  items: DropdownItem[];
}

export type NavigationHeaderPrimaryNavItem<T extends string> =
  | TextNavigationHeaderPrimaryNavItem<T>
  | DropdownNavigationHeaderPrimaryNavItem<T>;

export interface NavigationHeaderPrimaryNavProps<T extends string> {
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
  items: NavigationHeaderPrimaryNavItem<T>[];
  onChange(value: T): void;
  value: T;
}

export default function NavigationHeaderPrimaryNav<T extends string>({
  hasInvertedStyle,
  isNarrow,
  items,
  onChange,
  value,
}: NavigationHeaderPrimaryNavProps<T>) {
  const theme: SDSTheme = useTheme();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | string>("100%");

  const open = Boolean(anchorEl);

  function onClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    setMenuWidth(button.offsetWidth);
  }, []);

  return (
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
        const isActive = key === value;

        if (item.itemType === "dropdown" && !isNarrow) {
          const dropdownItem =
            item as DropdownNavigationHeaderPrimaryNavItem<T>;
          return (
            <Fragment key={key}>
              <PrimaryNavItem
                {...rest}
                itemType={item.itemType}
                ref={buttonRef}
                sdsStyle="minimal"
                active={open}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  onChange(key);
                  parentOnClick?.(e);
                }}
                hasInvertedStyle={hasInvertedStyle}
                isNarrow={isNarrow}
              >
                <StyledLabel
                  itemType={item.itemType}
                  active={open}
                  hasInvertedStyle={hasInvertedStyle}
                  isNarrow={isNarrow}
                >
                  {label as ReactNode}
                  <Icon
                    sdsIcon={open ? "ChevronUp" : "ChevronDown"}
                    sdsSize="xs"
                  />
                </StyledLabel>
              </PrimaryNavItem>

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
                {dropdownItem.items.map((subItem: DropdownItem) => {
                  const { label: subLabel, onClick, ...subItemRest } = subItem;
                  return (
                    <MenuItem
                      key={`menu-item-${subLabel}`}
                      onClick={() => {
                        onClick?.();
                        onClose();
                      }}
                      sx={{ minWidth: menuWidth }}
                      {...subItemRest}
                    >
                      {subLabel}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Fragment>
          );
        }

        if (item.itemType === "dropdown" && isNarrow) {
          const dropdownItem =
            item as DropdownNavigationHeaderPrimaryNavItem<T>;
          return (
            <StyledAccordion
              key={`${item.label}-dropdown`}
              id={`${item.label}-dropdown`}
              hasInvertedStyle={hasInvertedStyle}
              isNarrow={isNarrow}
            >
              <AccordionHeader>{item.label}</AccordionHeader>
              <AccordionDetails>
                {dropdownItem.items.map((subItem) => {
                  const {
                    label: dropdownItemLabel,
                    onClick,
                    ...accordionSubItemRest
                  } = subItem;

                  return (
                    <StyledSubItem
                      key={`primary-nav-item-${dropdownItemLabel}`}
                      onClick={() => {
                        onClick?.();
                        onClose();
                      }}
                      {...accordionSubItemRest}
                    >
                      {dropdownItemLabel}
                    </StyledSubItem>
                  );
                })}
              </AccordionDetails>
            </StyledAccordion>
          );
        }

        return (
          <PrimaryNavItem
            key={key}
            {...rest}
            sdsStyle="minimal"
            active={isActive}
            onClick={(e) => {
              onChange(key);
              (item as TextNavigationHeaderPrimaryNavItem<T>).onClick?.(e);
            }}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
          >
            <StyledLabel
              active={isActive}
              hasInvertedStyle={hasInvertedStyle}
              isNarrow={isNarrow}
            >
              {label as ReactNode}

              {"tag" in item && (
                <StyledTag
                  label={tag as string}
                  color={tagColor as SdsTagColorType}
                  hover={false}
                />
              )}
            </StyledLabel>
          </PrimaryNavItem>
        );
      })}
    </StyledSection>
  );
}
