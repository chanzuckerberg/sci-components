import { ReactNode } from "react";

export interface HeroProps {
  /**
   * The main header text displayed prominently in the hero section
   */
  headerText: ReactNode;
  /**
   * Optional caption text that appears below the header
   */
  captionText?: ReactNode;
  /**
   * Optional content area that can contain any React node
   * This appears as a placeholder/content area in the design
   */
  children?: ReactNode;
  /**
   * Controls the maximum width of the hero container
   * @default "large"
   */
  maxWidth?: "small" | "medium" | "large";
  /**
   * Additional CSS class name for custom styling
   */
  className?: string;
  /**
   * Custom margin behavior - can override default container margin
   * Set to false to remove default margins
   * @default true
   */
  useContainerMargin?: boolean;
  /**
   * Background fill that can be either a color string or any React node (image, CardMedia, etc.)
   * When an image is provided, it will stretch to cover the entire component background
   */
  backgroundFill?: ReactNode;
  /**
   * The height of the hero container
   */
  height?: string;
  /**
   * Test ID for testing purposes
   */
  "data-testid"?: string;
}

// Breakpoint constants based on the design specifications
export const HERO_BREAKPOINTS = {
  SMALL: 768, // Mobile breakpoint
  MEDIUM: 1024, // Tablet breakpoint
  LARGE: 1200, // Desktop breakpoint
} as const;

// Default margin values based on the images
export const HERO_MARGINS = {
  SMALL: 24, // 24px margins on small screens
  MEDIUM: 40, // 40px margins on medium screens
  LARGE: 120, // 120px margins on large screens
} as const;
