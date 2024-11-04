import { ReactNode } from "react";
import Tag, { TagProps } from "../Tag";
import {
  StyledBottomSection,
  StyledFooter,
  StyledLinkItemButton,
  StyledLinkItemLink,
  StyledLinkSection,
  StyledLogoSection,
  StyledLogoWrapper,
  StyledNavItemLink,
  StyledNavSection,
  StyledTopSection,
} from "./style";
import { Divider } from "@mui/material";

export interface FooterNavItem {
  label: string;
  url: string;
}

export interface FooterProps {
  logo?: ReactNode;
  images?: ReactNode;
  navItems?: FooterNavItem[];
  navLinks?: FooterNavItem[];
  tag?: string;
  tagColor?: TagProps["tagColor"];
  title: string;
}

export default function Footer({
  logo,
  images,
  navItems,
  navLinks,
  tag,
  tagColor,
  title,
}: FooterProps) {
  return (
    <StyledFooter>
      <StyledTopSection>
        <StyledLogoWrapper>
          {logo}

          <p>{title}</p>

          {tag && <Tag tagColor={tagColor} label={tag} />}
        </StyledLogoWrapper>

        {navItems && navItems.length > 0 && (
          <StyledNavSection>
            {navItems.map((item) => (
              <StyledNavItemLink key={item.label} href={item.url}>
                {item.label}
              </StyledNavItemLink>
            ))}
          </StyledNavSection>
        )}
      </StyledTopSection>

      <Divider />

      <StyledBottomSection>
        <StyledLinkSection>
          {navLinks &&
            navLinks.map((link, index) => (
              <>
                <StyledLinkItemLink key={link.label} href={link.url}>
                  {link.label}
                </StyledLinkItemLink>

                {index < navLinks.length - 1 && (
                  <Divider orientation="vertical" flexItem />
                )}
              </>
            ))}
        </StyledLinkSection>

        {images && <StyledLogoSection>{images}</StyledLogoSection>}
      </StyledBottomSection>
    </StyledFooter>
  );
}
