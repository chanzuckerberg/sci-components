import {
  DiscreteColorGeneratorOptions,
  TooltipTableContentProps,
} from "@czi-sds/components";
import { HTMLAttributes } from "react";

export interface StackedBarChartDataItem {
  /**
   * The segment's label in the legend, and the key the animations track it by.
   * Must be unique within the chart.
   */
  name: string;
  /**
   * The quantity the segment stands for.
   */
  value: number;
  /**
   * Any CSS color. Without it the segment takes a generated palette color,
   * which can shift as categories come and go.
   */
  color?: string;
  /**
   * A unit for this item's counted value, for data that mixes units across
   * categories.
   */
  unit?: string;
  /**
   * Takes the segment and its legend item out of every interaction: no hover,
   * no tooltip, no selection.
   * @default false
   */
  disabled?: boolean;
  /**
   * Content for a TooltipTable shown above the segment on hover. Use it for the
   * breakdown behind the number; a segment without it has no tooltip.
   */
  tooltip?: TooltipTableContentProps;
}

export interface StackedBarChartProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A heading above the bar. It is also what makes room for the badge; with no
   * title, no badge is drawn.
   */
  title?: string;
  /**
   * Overrides the badge text, which otherwise counts the data and the selection
   * ("7", or "3 of 7").
   */
  badge?: string;
  /**
   * Removes the badge, leaving the title on its own.
   * @default false
   */
  hideBadge?: boolean;
  /**
   * The segments, in the order they are drawn.
   */
  data: StackedBarChartDataItem[];
  /**
   * Any CSS width; a number is read as pixels. It sets the width of the whole
   * chart, legend included.
   * @default 100%
   */
  width?: number | string;
  /**
   * Height of the bar in pixels. Values below 1 are clamped to 1, so the bar
   * cannot disappear.
   * @default 16
   */
  barHeight?: number;
  /**
   * Draws the legend below the bar. It is the only place segment names appear,
   * and the only part of the chart a keyboard can reach.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Shows each item's value beside its name in the legend.
   * @default true
   */
  showLegendValues?: boolean;
  /**
   * "percentage" shows the segment's share of the bar, rounded. "count" shows
   * the raw value followed by the item's unit, or the chart's unit if the item
   * has none.
   * @default "percentage"
   */
  legendValueFormat?: "percentage" | "count";
  /**
   * Indices into data that are currently selected. The chart is controlled: it
   * draws this and never changes it.
   */
  selectedIndices?: number[];
  /**
   * Called with the next selection when a segment or legend item is clicked.
   * Without it, clicking selects nothing.
   */
  onSelectionChange?: (
    selectedIndices: number[],
    selectedData: StackedBarChartDataItem[]
  ) => void;
  /**
   * Called when the pointer enters a segment. The chart already syncs its own
   * hover highlight between bar and legend, so this is for driving something
   * outside it.
   */
  onSegmentMouseEnter?: (item: StackedBarChartDataItem, index: number) => void;
  /**
   * Called when the pointer leaves a segment.
   */
  onSegmentMouseLeave?: (item: StackedBarChartDataItem, index: number) => void;
  /**
   * Called when the pointer enters a legend item.
   */
  onLegendItemMouseEnter?: (
    item: StackedBarChartDataItem,
    index: number
  ) => void;
  /**
   * Called when the pointer leaves a legend item.
   */
  onLegendItemMouseLeave?: (
    item: StackedBarChartDataItem,
    index: number
  ) => void;
  /**
   * Fires on a segment click, alongside any selection change rather than
   * instead of it.
   */
  onSegmentClick?: (item: StackedBarChartDataItem, index: number) => void;
  /**
   * The same, for a click on a legend item.
   */
  onLegendItemClick?: (item: StackedBarChartDataItem, index: number) => void;
  /**
   * What a selection does to the unselected segments: fade them to 20% opacity,
   * or drop them from the bar and let the rest take the space.
   * @default "dim"
   */
  selectionBehavior?: "dim" | "hide";
  /**
   * Whether the bar shows a breakdown of the data (segments always fill it) or
   * progress towards maxAmount.
   * @default "proportional"
   */
  mode?: "proportional" | "cumulative";
  /**
   * Cumulative mode only. The value the full bar represents. Any difference
   * between it and the sum of the data is drawn as the Remaining segment.
   */
  maxAmount?: number;
  /**
   * Name of the grey gap segment in cumulative mode.
   * @default "Remaining"
   */
  remainingLabel?: string;
  /**
   * A unit for the Remaining segment's value alone.
   */
  remainingUnit?: string;
  /**
   * The unit appended to counted values, for items that do not carry one of
   * their own.
   */
  unit?: string;
  /**
   * Tunes the generated palette (start hue, rotations, lightness range, gamma).
   * Items with their own color are untouched by it.
   */
  colorGeneratorOptions?: DiscreteColorGeneratorOptions;
}
