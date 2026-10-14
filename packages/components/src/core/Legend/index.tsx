import { useState } from "react";
import {
  LegendContainer,
  LegendIcon,
  LegendItem,
  LegendLabel,
  LegendValue,
  StyledLegendPopover,
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
    overflowItem,
    overflowMenuItems = [],
    ...rest
  } = props;

  const theme = useTheme() as SDSTheme;

  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);
  const [overflowAnchor, setOverflowAnchor] = useState<HTMLElement | null>(
    null
  );

  // Use external hoveredIndex if provided, otherwise use internal state
  const hoveredIndex = externalHoveredIndex ?? internalHoveredIndex;

  // The grouped entry takes the index after `items`; overflow items follow it
  const overflowEntryIndex = items.length;
  const overflowStart = items.length + 1;
  const hasOverflow = overflowMenuItems.length > 0;

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
      const newSelectedIndices = isSelected
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index];

      onSelectionChange(newSelectedIndices);
    }

    // Still call the original onClick callback
    onItemClick?.(item, index);
  };

  // The grouped entry is rendered as the last item; hover and selection on
  // any menu item count toward it
  const overflowEntry: LegendItemData = { name: "Other", ...overflowItem };
  const entries = hasOverflow ? [...items, overflowEntry] : items;

  const handleOverflowSelectionChange = (indices: number[]) => {
    onSelectionChange?.([
      ...selectedIndices.filter((i) => i < overflowStart),
      ...indices.map((i) => i + overflowStart),
    ]);
  };

  const hasSelection = selectedIndices.length > 0;

  // Gray fallback color
  const fallbackColor = theme?.palette?.sds?.base?.ornamentSecondary;

  return (
    <>
      <LegendContainer {...rest}>
        {entries.map((item, index) => {
          const isOverflowEntry = hasOverflow && index === overflowEntryIndex;
          const isHovered = isOverflowEntry
            ? hoveredIndex !== null && hoveredIndex >= index
            : hoveredIndex === index;
          const isSelected = isOverflowEntry
            ? selectedIndices.some((i) => i >= index)
            : selectedIndices.includes(index);
          const itemColor = colors?.[index] || item.color || fallbackColor;

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

          return (
            <LegendItem
              key={`${item.name}-${index}`}
              onMouseEnter={() => handleMouseEnter(item, index)}
              onMouseLeave={() => handleMouseLeave(item, index)}
              onClick={(event) => {
                if (!isOverflowEntry) return handleClick(item, index);
                setOverflowAnchor(event.currentTarget);
                onItemClick?.(item, index);
              }}
              role="button"
              tabIndex={item.disabled ? -1 : 0}
              aria-label={`${item.name}${item.value ? `: ${item.value}` : ""}`}
              aria-pressed={isSelected}
              aria-disabled={item.disabled}
              aria-haspopup={isOverflowEntry ? "true" : undefined}
              aria-expanded={
                isOverflowEntry ? overflowAnchor !== null : undefined
              }
              isSelected={isSelected}
              disabled={item.disabled}
              isHovered={isHovered}
            >
              <LegendIcon
                color={itemColor}
                isDimmed={isDimmed}
              />
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
      {hasOverflow && (
        <StyledLegendPopover
          open={overflowAnchor !== null}
          anchorEl={overflowAnchor}
          onClose={() => setOverflowAnchor(null)}
        >
          <Legend
            items={overflowMenuItems}
            selectedIndices={selectedIndices
              .filter((i) => i >= overflowStart)
              .map((i) => i - overflowStart)}
            onSelectionChange={
              onSelectionChange ? handleOverflowSelectionChange : undefined
            }
            hoveredIndex={
              hoveredIndex !== null && hoveredIndex >= overflowStart
                ? hoveredIndex - overflowStart
                : null
            }
            onItemMouseEnter={(item, index) =>
              handleMouseEnter(item, index + overflowStart)
            }
            onItemMouseLeave={(item, index) =>
              handleMouseLeave(item, index + overflowStart)
            }
            onItemClick={
              onItemClick
                ? (item, index) => onItemClick(item, index + overflowStart)
                : undefined
            }
          />
        </StyledLegendPopover>
      )}
    </>
  );
};

export type { LegendProps, LegendItemData } from "./Legend.types";

export default Legend;
