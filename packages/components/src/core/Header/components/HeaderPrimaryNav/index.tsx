import { SdsTagColorType } from "src/core/Tag";
import { PrimaryNavItem, StyledLabel } from "./style";
import { ReactNode } from "react";
import { StyledTag } from "../../style";
import { StyledSection } from "../style";

export interface HeaderPrimaryNavItem<T extends string> {
  key: T;
  label: ReactNode;
  tag?: string;
  tagColor?: SdsTagColorType;
}

export interface HeaderPrimaryNavProps<T extends string> {
  items: HeaderPrimaryNavItem<T>[];
  value: T;
  onChange(value: T): void;
}

export default function HeaderPrimaryNav<T extends string>({
  items,
  value,
  onChange,
}: HeaderPrimaryNavProps<T>) {
  return (
    <StyledSection>
      {items.map((item) => {
        const isActive = item.key === value;

        return (
          <PrimaryNavItem
            active={isActive}
            key={item.key}
            onClick={() => onChange(item.key)}
          >
            <StyledLabel active={isActive}>{item.label}</StyledLabel>

            {item.tag && <StyledTag label={item.tag} color={item.tagColor} />}
          </PrimaryNavItem>
        );
      })}
    </StyledSection>
  );
}
