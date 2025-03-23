import { ButtonProps, LinkProps, AppBarProps } from "@mui/material";
import { ReactNode, ElementType } from "react";
import { SdsProps, SdsIconButtonProps } from "../Button";
import { InputSearchProps } from "../InputSearch";
import { SdsTagColorType } from "../Tag";
import { NavigationHeaderPrimaryNavItem } from "./components/NavigationHeaderPrimaryNav";
import { NavigationHeaderSecondaryNavItem } from "./components/NavigationHeaderSecondaryNav";

export interface NavigationHeaderProps<T extends string = string>
  extends AppBarProps {
  activePrimaryNavKey?: string;
  buttons?: Partial<SdsProps & ButtonProps>[] | React.ReactNode[];
  hasInvertedStyle?: boolean;
  logo?: ReactNode;
  logoUrl?: string;
  logoLinkComponent?: ElementType;
  logoLinkProps?: LinkProps;
  scrollElevation?: boolean;
  primaryNavItems?: NavigationHeaderPrimaryNavItem<T>[];
  primaryNavPosition?: "left" | "right";
  searchProps?: Partial<InputSearchProps>;
  secondaryNavItems?: NavigationHeaderSecondaryNavItem[];
  setActivePrimaryNavKey?(key: string): void;
  showSearch?: boolean;
  tag?: string;
  tagColor?: SdsTagColorType;
  title: string;
  drawerOpen?: boolean;
  setDrawerOpen?: (open: boolean) => void;
}

export type IconButtonProps = SdsIconButtonProps & { children?: string };
