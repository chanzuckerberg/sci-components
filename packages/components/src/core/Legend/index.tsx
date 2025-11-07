import { HTMLAttributes, useEffect, useState } from "react";
import {
  LegendContainer,
  LegendIcon,
  LegendItem,
  LegendLabel,
  LegendValue,
} from "./style";

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
   */
  color: string;
}

export interface LegendProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of legend items to display
   */
  items: LegendItemData[];
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
}

const Legend = (props: LegendProps): JSX.Element => {
  const {
    items,
    onItemMouseEnter,
    onItemMouseLeave,
    onItemClick,
    showValues = false,
    selectedIndices = [],
    onSelectionChange,
    ...rest
  } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [localSelectedIndices, setLocalSelectedIndices] =
    useState<number[]>(selectedIndices);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalSelectedIndices(selectedIndices);
  }, [selectedIndices]);

  const handleMouseEnter = (item: LegendItemData, index: number) => {
    setHoveredIndex(index);
    onItemMouseEnter?.(item, index);
  };

  const handleMouseLeave = (item: LegendItemData, index: number) => {
    setHoveredIndex(null);
    onItemMouseLeave?.(item, index);
  };

  const handleClick = (item: LegendItemData, index: number) => {
    // Handle selection toggle
    if (onSelectionChange) {
      const isSelected = localSelectedIndices.includes(index);
      let newSelectedIndices: number[];

      if (isSelected) {
        // Deselect: remove from array
        newSelectedIndices = localSelectedIndices.filter((i) => i !== index);
      } else {
        // Select: add to array
        newSelectedIndices = [...localSelectedIndices, index];
      }

      setLocalSelectedIndices(newSelectedIndices);
      onSelectionChange?.(newSelectedIndices);
    }

    // Still call the original onClick callback
    onItemClick?.(item, index);
  };

  const hasSelection = localSelectedIndices.length > 0;

  return (
    <LegendContainer {...rest}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isSelected = localSelectedIndices.includes(index);

        // Dim if:
        // - When hovering: dim items that are neither hovered nor selected
        // - When not hovering: dim items that are not selected (if there are selections)
        const isDimmed =
          hoveredIndex !== null
            ? !isHovered && !isSelected
            : hasSelection && !isSelected;

        return (
          <LegendItem
            key={`${item.name}-${index}`}
            onMouseEnter={() => handleMouseEnter(item, index)}
            onMouseLeave={() => handleMouseLeave(item, index)}
            onClick={() => handleClick(item, index)}
            role="button"
            tabIndex={0}
            aria-label={`${item.name}${item.value ? `: ${item.value}` : ""}`}
            aria-pressed={isSelected}
            isSelected={isSelected}
          >
            <LegendIcon color={item.color} isDimmed={isDimmed} />
            <LegendLabel>{item.name}</LegendLabel>
            {showValues && item.value !== undefined && (
              <LegendValue>
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </LegendValue>
            )}
          </LegendItem>
        );
      })}
    </LegendContainer>
  );
};

export default Legend;
