import { SdsTagColorType } from "src/core/Tag";
import { PrimaryNavItem, StyledLabel } from "./style";
import { ReactNode } from "react";
import { StyledTag } from "../../style";
import { StyledSection } from "../style";

export interface NavigationHeaderPrimaryNavItem<T extends string> {
  key: T;
  label: ReactNode;
  tag?: string;
  tagColor?: SdsTagColorType;
}

export interface NavigationHeaderPrimaryNavProps<T extends string> {
  hasInvertedStyle?: boolean;
  items: NavigationHeaderPrimaryNavItem<T>[];
  onChange(value: T): void;
  value: T;
}

export default function NavigationHeaderPrimaryNav<T extends string>({
  hasInvertedStyle,
  items,
  onChange,
  value,
}: NavigationHeaderPrimaryNavProps<T>) {
  return (
    <StyledSection>
      {items.map((item) => {
        const isActive = item.key === value;

        return (
          <PrimaryNavItem
            active={isActive}
            key={item.key}
            onClick={() => onChange(item.key)}
            hasInvertedStyle={hasInvertedStyle}
          >
            <StyledLabel active={isActive} hasInvertedStyle={hasInvertedStyle}>
              {item.label}
            </StyledLabel>

            {item.tag && <StyledTag label={item.tag} color={item.tagColor} />}
          </PrimaryNavItem>
        );
      })}
    </StyledSection>
  );
}
