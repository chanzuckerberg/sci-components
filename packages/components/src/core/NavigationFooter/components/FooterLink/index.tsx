import { forwardRef, memo } from "react";
import { FooterLinkProps } from "../../NavigationFooter.types";
import { StyledLinkItemLink } from "./style";

const FooterLink = memo(
  forwardRef<HTMLAnchorElement, FooterLinkProps>(
    ({ link, showDivider, hasInvertedStyle }, ref) => (
      <StyledLinkItemLink
        ref={ref}
        href={link.url}
        hasInvertedStyle={hasInvertedStyle}
        component={link.component}
        showDivider={showDivider}
        {...link.linkProps}
      >
        {link.label}
      </StyledLinkItemLink>
    )
  )
);

FooterLink.displayName = "FooterLink";

export default FooterLink;
