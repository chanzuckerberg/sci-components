import { useState } from "react";
import {
  LegendContainer,
  LegendIcon,
  LegendItem,
  LegendLabel,
  LegendValue,
} from "./style";
import { SDSTheme } from "../styles";
import { useTheme } from "@mui/material";
import { LegendItemData, LegendProps } from "./Legend.types";

const Legend = (props: LegendProps): JSX.Element => {
  const {
    items,
    colors,
    onItemMouseEnter,
    onItemMouseLeave,
    onItemClick,
    showValues = false,
    selectedIndices = [],
    onSelectionChange,
    hoveredIndex: externalHoveredIndex,
    ...rest
  } = props;

  const theme = useTheme() as SDSTheme;

  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);

  // Use external hoveredIndex if provided, otherwise use internal state
  const hoveredIndex =
    externalHoveredIndex !== undefined
      ? externalHoveredIndex
      : internalHoveredIndex;

  const handleMouseEnter = (item: LegendItemData, index: number) => {
    if (item.disabled) return;
    setInternalHoveredIndex(index);
    onItemMouseEnter?.(item, index);
  };

  const handleMouseLeave = (item: LegendItemData, index: number) => {
    if (item.disabled) return;
    setInternalHoveredIndex(null);
    onItemMouseLeave?.(item, index);
  };

  const handleClick = (item: LegendItemData, index: number) => {
    if (item.disabled) return;

    if (onSelectionChange) {
      const isSelected = selectedIndices.includes(index);
      let newSelectedIndices: number[];

      if (isSelected) {
        newSelectedIndices = selectedIndices.filter((i) => i !== index);
      } else {
        newSelectedIndices = [...selectedIndices, index];
      }

      onSelectionChange(newSelectedIndices);
    }

    // Still call the original onClick callback
    onItemClick?.(item, index);
  };

  const hasSelection = selectedIndices.length > 0;

  // Gray fallback color
  const fallbackColor = theme?.palette?.sds?.base?.ornamentSecondary;

  return (
    <LegendContainer {...rest}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isSelected = selectedIndices.includes(index);

        // Dim if:
        // - Never dim disabled items (e.g., remaining segment)
        // - When hovering: dim items that are neither hovered nor selected
        // - When not hovering: dim items that are not selected (if there are selections)
        const isDimmed = item.disabled
          ? false
          : hoveredIndex !== null
            ? !isHovered && !isSelected
            : hasSelection && !isSelected;

        // Determine color: use colors prop, then item color, then fallback to gray
        const itemColor = colors?.[index] || item.color || fallbackColor;

        return (
          <LegendItem
            key={`${item.name}-${index}`}
            onMouseEnter={() => handleMouseEnter(item, index)}
            onMouseLeave={() => handleMouseLeave(item, index)}
            onClick={() => handleClick(item, index)}
            role="button"
            tabIndex={item.disabled ? -1 : 0}
            aria-label={`${item.name}${item.value ? `: ${item.value}` : ""}`}
            aria-pressed={isSelected}
            aria-disabled={item.disabled}
            isSelected={isSelected}
            disabled={item.disabled}
          >
            <LegendIcon color={itemColor} isDimmed={isDimmed} />
            <LegendLabel disabled={item.disabled}>{item.name}</LegendLabel>
            {showValues && item.value !== undefined && (
              <LegendValue disabled={item.disabled}>
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

export type { LegendProps, LegendItemData } from "./Legend.types";

export default Legend;
