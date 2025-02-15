import { SdsTagColorType } from "src/core/Tag";
import { PrimaryNavItem, StyledLabel } from "./style";
import { ReactNode } from "react";
import { StyledTag } from "../../style";
import { StyledSection } from "../style";

export interface NavigationHeaderPrimaryNavItem<T extends string>
  extends Record<string, unknown> {
  key: T;
  label: ReactNode;
  tag?: string;
  tagColor?: SdsTagColorType;
  onClick?: (e: React.SyntheticEvent) => void;
}

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
  return (
    <StyledSection isNarrow={isNarrow}>
      {items.map((item) => {
        const { key, label, tag, tagColor, ...rest } = item;
        const isActive = key === value;

        return (
          <PrimaryNavItem
            key={key}
            {...rest}
            sdsStyle="square"
            active={isActive}
            onClick={(e) => {
              onChange(key);
              item.onClick?.(e);
            }}
            hasInvertedStyle={hasInvertedStyle}
            isNarrow={isNarrow}
          >
            <StyledLabel
              active={isActive}
              hasInvertedStyle={hasInvertedStyle}
              isNarrow={isNarrow}
            >
              {label}
            </StyledLabel>

            {tag && <StyledTag label={tag} color={tagColor} hover={false} />}
          </PrimaryNavItem>
        );
      })}
    </StyledSection>
  );
}
