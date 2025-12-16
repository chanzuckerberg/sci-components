import { HTMLAttributes } from "react";

export interface LegendItemData {
  /**
   * Name/label for the legend item
   */
  name: string;
  /**
   * Value to display (optional)
   */
  value?: number | string;
  /**
   * Color for the legend icon
   * Can be overridden by the colors prop in LegendProps
   * Falls back to gray if not provided
   */
  color?: string;
  /**
   * Disable the legend item (prevents all events)
   * @default false
   */
  disabled?: boolean;
}

export interface LegendProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of legend items to display
   */
  items: LegendItemData[];
  /**
   * Optional array of colors to assign to items. If not provided or if the array
   * is shorter than items, will use the color from the item or fall back to gray.
   */
  colors?: string[];
  /**
   * Callback when mouse enters a legend item
   */
  onItemMouseEnter?: (item: LegendItemData, index: number) => void;
  /**
   * Callback when mouse leaves a legend item
   */
  onItemMouseLeave?: (item: LegendItemData, index: number) => void;
  /**
   * Callback when a legend item is clicked
   */
  onItemClick?: (item: LegendItemData, index: number) => void;
  /**
   * Whether to show values in the legend
   * @default false
   */
  showValues?: boolean;
  /**
   * Array of selected item indices (controlled component)
   */
  selectedIndices?: number[];
  /**
   * Callback when selection changes
   * @param selectedIndices Array of selected indices
   */
  onSelectionChange?: (selectedIndices: number[]) => void;
  /**
   * External control for hovered index (for bidirectional hover with charts)
   */
  hoveredIndex?: number | null;
}
