import { memo } from "react";
import { NavItemProps } from "src/core/NavigationFooter/NavigationFooter.types";
import { StyledNavItemLink } from "./style";

const NavItem = memo(({ item, hasInvertedStyle, isNarrow }: NavItemProps) => (
  <StyledNavItemLink
    key={item.label}
    href={item.url}
    hasInvertedStyle={hasInvertedStyle}
    isNarrow={isNarrow}
    component={item.component}
    {...item.linkProps}
  >
    {item.label}
  </StyledNavItemLink>
));

NavItem.displayName = "NavItem";

export default NavItem;
