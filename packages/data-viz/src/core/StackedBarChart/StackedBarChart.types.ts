import { TooltipTableContentProps } from "@czi-sds/components";
import { HTMLAttributes } from "react";

export interface StackedBarChartDataItem {
  /**
   * Display name for the segment
   */
  name: string;
  /**
   * Numeric value for the segment
   */
  value: number;
  /**
   * Color for the segment (hex or CSS color)
   * If not provided, colors will be automatically generated using cubehelix palette
   */
  color?: string;
  /**
   * Unit label to display with the value in amount mode (e.g., "GB", "datasets", "MB")
   * Only shown in legend when mode is "amount"
   */
  unit?: string;
  /**
   * Disable the item (prevents all events on the corresponding legend item and bar segment)
   * @default false
   */
  disabled?: boolean;
  tooltip: TooltipTableContentProps;
}

export interface StackedBarChartProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Title to display above the chart
   */
  title?: string;
  /**
   * Badge text to display next to the title
   * If not provided, defaults to showing item count based on selection:
   * - No selection: total count (e.g., "5")
   * - Partial selection: selected count (e.g., "3 of 5")
   * - All selected: "All"
   */
  badge?: string;
  /**
   * Hide the badge when true
   * @default false
   */
  hideBadge?: boolean;
  /**
   * Array of data items to display in the stacked bar
   */
  data: StackedBarChartDataItem[];
  /**
   * Width of the chart - accepts any CSS width value (e.g., "100%", "20vw", "300px", or number for pixels)
   * @default 100%
   */
  width?: number | string;
  /**
   * Height of the bar in pixels
   * @default 16
   */
  barHeight?: number;
  /**
   * Whether to show the legend below the chart
   * @default true
   */
  showLegend?: boolean;
  /**
   * Whether to show percentage values in the legend
   * @default true
   */
  showLegendValues?: boolean;
  /**
   * Array of selected item indices (controlled component)
   */
  selectedIndices?: number[];
  /**
   * Callback when legend selection changes
   */
  onSelectionChange?: (
    selectedIndices: number[],
    selectedData: StackedBarChartDataItem[]
  ) => void;
  /**
   * Chart mode - controls how segments are calculated
   * - "percentage": Segments fill entire bar (100%), proportional to their values
   * - "amount": Segments sized based on actual values relative to maxAmount
   * @default "percentage"
   */
  mode?: "percentage" | "amount";
  /**
   * Maximum amount for the bar (used only in "amount" mode)
   * If not provided, defaults to sum of all values (no remaining segment)
   * If provided and sum < maxAmount, shows gray "remaining" segment
   */
  maxAmount?: number;
  /**
   * Label for the remaining/unknown segment in amount mode
   * @default "Remaining"
   */
  remainingLabel?: string;
  /**
   * Unit to display with the remaining segment value in amount mode
   * If not provided, uses the unit from the first data item (if available)
   */
  remainingUnit?: string;
  /**
   * Global unit to display with values in amount mode (e.g., "GB", "datasets", "K")
   * Individual data items can override this with their own unit property
   * Only shown when mode is "amount"
   */
  unit?: string;
}
