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
  const hasSelection = selectedIndices.length > 0;

  // Gray fallback color
  const fallbackColor = theme?.palette?.sds?.base?.ornamentSecondary;

  // The grouped entry takes the index after `items`; overflow items follow it
  const overflowEntryIndex = items.length;
  const overflowStart = items.length + 1;
  const hasOverflow = overflowMenuItems.length > 0;

  const getIsDimmed = (
    isHovered: boolean,
    isSelected: boolean,
    disabled?: boolean
  ) => {
    if (disabled) return false;
    if (hoveredIndex !== null) return !isHovered && !isSelected;
    return hasSelection && !isSelected;
  };

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

  const overflowEntry: LegendItemData = { name: "Other", ...overflowItem };
  const isOverflowSelected = selectedIndices.some(
    (i) => i >= overflowEntryIndex
  );
  const isOverflowHovered =
    hoveredIndex !== null && hoveredIndex >= overflowEntryIndex;

  const handleOverflowSelectionChange = (indices: number[]) => {
    onSelectionChange?.([
      ...selectedIndices.filter((i) => i < overflowStart),
      ...indices.map((i) => i + overflowStart),
    ]);
  };

  return (
    <>
      <LegendContainer {...rest}>
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isSelected = selectedIndices.includes(index);
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
              isHovered={isHovered}
            >
              <LegendIcon
                color={itemColor}
                isDimmed={getIsDimmed(isHovered, isSelected, item.disabled)}
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
        {hasOverflow && (
          <LegendItem
            onMouseEnter={() =>
              handleMouseEnter(overflowEntry, overflowEntryIndex)
            }
            onMouseLeave={() =>
              handleMouseLeave(overflowEntry, overflowEntryIndex)
            }
            onClick={(event) => {
              setOverflowAnchor(event.currentTarget);
              onItemClick?.(overflowEntry, overflowEntryIndex);
            }}
            role="button"
            tabIndex={0}
            aria-label={`${overflowEntry.name}${overflowEntry.value ? `: ${overflowEntry.value}` : ""}`}
            aria-pressed={isOverflowSelected}
            aria-haspopup="true"
            aria-expanded={overflowAnchor !== null}
            isSelected={isOverflowSelected}
            isHovered={isOverflowHovered}
          >
            <LegendIcon
              color={overflowEntry.color || fallbackColor}
              isDimmed={getIsDimmed(isOverflowHovered, isOverflowSelected)}
            />
            <LegendLabel>{overflowEntry.name}</LegendLabel>
            {showValues && overflowEntry.value !== undefined && (
              <LegendValue>
                {typeof overflowEntry.value === "number"
                  ? overflowEntry.value.toLocaleString()
                  : overflowEntry.value}
              </LegendValue>
            )}
          </LegendItem>
        )}
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
