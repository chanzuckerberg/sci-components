import { ReactNode } from "react";

export interface HeroProps {
  heroHeight?: string;
  children?: ReactNode;
  overlayContainerMinMargin?: {
    small: number;
    medium: number;
    large: number;
  };
}

export const HERO_MARGINS = {
  SMALL: 24,
  MEDIUM: 40,
  LARGE: 120,
} as const;
