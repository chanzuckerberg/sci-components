import { MouseEvent, useState } from "react";
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
    lastItemMenuItems = [],
    ...rest
  } = props;

  const theme = useTheme() as SDSTheme;

  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  // Use external hoveredIndex if provided, otherwise use internal state
  const hoveredIndex = externalHoveredIndex ?? internalHoveredIndex;

  // When menu items are given, the final item opens the menu. Menu item
  // indices continue after `items`.
  const hasOverflowMenu = lastItemMenuItems.length > 0;
  const overflowItemIndex = items.length;
  const isOverflowTrigger = (index: number) => hasOverflowMenu && index === overflowItemIndex - 1;

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

  const handleClick = (
    item: LegendItemData,
    index: number,
    event: MouseEvent<HTMLElement>
  ) => {
    if (item.disabled) return;

    if (isOverflowTrigger(index)) {
      setMenuAnchor(event.currentTarget);
      onItemClick?.(item, index);
      return;
    }

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

  const handleMenuSelectionChange = (indices: number[]) => {
    onSelectionChange?.([
      ...selectedIndices.filter((i) => i < overflowItemIndex),
      ...indices.map((i) => i + overflowItemIndex),
    ]);
  };

  const hasSelection = selectedIndices.length > 0;

  // Gray fallback color
  const fallbackColor = theme?.palette?.sds?.base?.ornamentSecondary;

  return (
    <>
      <LegendContainer {...rest}>
        {items.map((item, index) => {
          const opensMenu = isOverflowTrigger(index);
          
          // Hovering or selecting a menu item also counts for the trigger
          const isHovered = opensMenu
            ? hoveredIndex !== null && hoveredIndex >= index
            : hoveredIndex === index;
          const isSelected = opensMenu
            ? selectedIndices.some((i) => i >= index)
            : selectedIndices.includes(index);
          
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
              onClick={(event) => handleClick(item, index, event)}
              role="button"
              tabIndex={item.disabled ? -1 : 0}
              aria-label={`${item.name}${item.value ? `: ${item.value}` : ""}`}
              aria-pressed={isSelected}
              aria-disabled={item.disabled}
              aria-haspopup={opensMenu ? "true" : undefined}
              aria-expanded={opensMenu ? menuAnchor !== null : undefined}
              isSelected={isSelected}
              disabled={item.disabled}
              isHovered={isHovered}
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
      {hasOverflowMenu && (
        <StyledLegendPopover
          open={menuAnchor !== null}
          anchorEl={menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
          <Legend
            items={lastItemMenuItems}
            selectedIndices={selectedIndices
              .filter((i) => i >= overflowItemIndex)
              .map((i) => i - overflowItemIndex)}
            onSelectionChange={
              onSelectionChange ? handleMenuSelectionChange : undefined
            }
            hoveredIndex={
              hoveredIndex !== null && hoveredIndex >= overflowItemIndex
                ? hoveredIndex - overflowItemIndex
                : null
            }
            onItemMouseEnter={(item, index) =>
              handleMouseEnter(item, index + overflowItemIndex)
            }
            onItemMouseLeave={(item, index) =>
              handleMouseLeave(item, index + overflowItemIndex)
            }
            onItemClick={
              onItemClick
                ? (item, index) => onItemClick(item, index + overflowItemIndex)
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
