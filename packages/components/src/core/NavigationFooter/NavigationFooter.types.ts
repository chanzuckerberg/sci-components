import { ReactNode, ElementType } from "react";
import { TagProps } from "../Tag";

export interface NavigationFooterNavItem {
  label: string;
  url?: string;
  component?: ElementType;
  linkProps?: Record<string, unknown>;
}

export interface FooterImage {
  image: ReactNode;
  url?: string;
  component?: ElementType;
  linkProps?: Record<string, unknown>;
}

export interface NavigationFooterProps {
  hasInvertedStyle?: boolean;
  images?: FooterImage[];
  logo?: ReactNode;
  logoUrl?: string;
  logoComponent?: ElementType;
  logoLinkProps?: Record<string, unknown>;
  navItems?: NavigationFooterNavItem[];
  navLinks?: NavigationFooterNavItem[];
  tag?: string;
  tagColor?: TagProps["tagColor"];
  title: string;
}

export interface NavItemProps {
  item: NavigationFooterNavItem;
  hasInvertedStyle?: boolean;
  isNarrow?: boolean;
}

export interface FooterLinkProps {
  link: NavigationFooterNavItem;
  showDivider: boolean;
  hasInvertedStyle?: boolean;
}
