import { HTMLAttributes } from "react";

export interface LegendItemData {
  /**
   * The item's label, and the start of its accessible name. Names need not be
   * unique, since items are addressed by index.
   */
  name: string;
  /**
   * Shown after the name when `showValues` is on. Numbers are grouped by
   * locale; a string is printed as given, for a unit or a percentage.
   */
  value?: number | string;
  /**
   * The swatch color. The `colors` palette takes priority over it, and without
   * either the swatch is the theme's grey.
   */
  color?: string;
  /**
   * Dims the item and stops it responding to hover or clicks.
   * @default false
   */
  disabled?: boolean;
}

export interface LegendProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The items, drawn in order. Their indices are what selection, hover, and the
   * callbacks refer to.
   */
  items: LegendItemData[];
  /**
   * A palette applied by index, taking priority over the color on an item.
   * Entries past the end of the array fall back to the item's color, then to
   * grey.
   */
  colors?: string[];
  /**
   * Called when the pointer enters an item. The legend already dims its own
   * swatches, so this is for driving something outside it, such as a highlight
   * on the chart.
   */
  onItemMouseEnter?: (item: LegendItemData, index: number) => void;
  /**
   * Called when the pointer leaves an item.
   */
  onItemMouseLeave?: (item: LegendItemData, index: number) => void;
  /**
   * Fires on a click, alongside any selection change rather than instead of it.
   */
  onItemClick?: (item: LegendItemData, index: number) => void;
  /**
   * Draws each item's value beside its name. Items without a value are
   * unaffected.
   * @default false
   */
  showValues?: boolean;
  /**
   * Indices of the selected items. The legend is controlled: it draws this and
   * never changes it.
   */
  selectedIndices?: number[];
  /**
   * Called with the next selection when an item is clicked, with that index
   * toggled. Without it, clicking selects nothing.
   */
  onSelectionChange?: (selectedIndices: number[]) => void;
  /**
   * Highlights an item from outside, for syncing with a chart. It adds to the
   * legend's own hover rather than replacing it, and `null` reads as no
   * external highlight.
   */
  hoveredIndex?: number | null;
}
