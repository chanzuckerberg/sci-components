import { memo } from "react";
import { FooterLinkProps } from "../../NavigationFooter.types";
import { StyledLinkItemLink, StyledDivider } from "./style";

const FooterLink = memo(
  ({ link, showDivider, hasInvertedStyle }: FooterLinkProps) => (
    <>
      <StyledLinkItemLink
        key={link.label}
        href={link.url}
        hasInvertedStyle={hasInvertedStyle}
        component={link.component}
        {...link.linkProps}
      >
        {link.label}
      </StyledLinkItemLink>

      {showDivider && (
        <StyledDivider
          orientation="vertical"
          flexItem
          hasInvertedStyle={hasInvertedStyle}
        />
      )}
    </>
  )
);

FooterLink.displayName = "FooterLink";

export default FooterLink;
