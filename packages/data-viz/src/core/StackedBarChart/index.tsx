import {
  cloneElement,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  getDiscreteColor,
  LEGEND_OVERFLOW_INDEX,
  Legend,
  SDSTheme,
  Tag,
  Tooltip,
  TooltipTable,
  type LegendItemData,
} from "@czi-sds/components";
import {
  ChartTitle,
  ChartWrapper,
  BarContainer,
  BarSegment,
  TitleContainer,
  StyledStackedBarChartWrapper,
} from "./style";
import { useTheme } from "@mui/material";
import {
  StackedBarChartDataItem,
  StackedBarChartProps,
} from "./StackedBarChart.types";

// Color map key for the cumulative remaining segment, which has no data item
const REMAINING_COLOR_KEY = "__remaining__";

// Type for tracking items with animation state
type AnimatedItem = StackedBarChartDataItem & {
  percentage: number;
  color: string;
  key: string;
  originalIndex: number;
  isEntering: boolean;
  isExiting: boolean;
};

// Helper: Calculate badge display text based on selection state
const calculateBadgeText = (
  totalItems: number,
  selectedCount: number
): string => {
  if (selectedCount === 0 || selectedCount === totalItems)
    return `${totalItems}`;
  return `${selectedCount} of ${totalItems}`;
};

// Helper: Calculate legend value display
const calculateLegendValue = (
  item: StackedBarChartDataItem & { percentage: number },
  showLegendValues: boolean,
  legendValueFormat: "percentage" | "count",
  globalUnit?: string
): string | undefined => {
  if (!showLegendValues) return undefined;

  if (legendValueFormat === "percentage") {
    return `${Math.round(item.percentage)}%`;
  }

  // Count format: show value with optional unit
  const effectiveUnit = item.unit || globalUnit;
  const formattedValue = item.value.toLocaleString();
  return effectiveUnit ? `${formattedValue} ${effectiveUnit}` : formattedValue;
};

// Helper: Get segment opacity based on hover and selection state
const getSegmentOpacity = (
  index: number,
  hoveredIndex: number | null,
  selectedIndicesSet: Set<number>,
  selectionBehavior: "dim" | "hide"
): number => {
  const hasSelection = selectedIndicesSet.size > 0;

  // Hide mode doesn't use opacity - segments animate to 0% width instead
  if (selectionBehavior === "hide") {
    return 1;
  }

  // Dim mode
  if (hoveredIndex !== null) {
    return hoveredIndex === index || selectedIndicesSet.has(index) ? 1 : 0.2;
  }

  if (hasSelection) {
    return selectedIndicesSet.has(index) ? 1 : 0.2;
  }

  return 1;
};

// Helper: Apply cumulative mode hide styling
const applyCumulativeHideStyling = (
  items: AnimatedItem[],
  selectedIndicesSet: Set<number>,
  selectedTotal: number,
  hasRemaining: boolean,
  effectiveMaxAmount: number
) => {
  const newRemainingValue = hasRemaining
    ? effectiveMaxAmount - selectedTotal
    : 0;
  const newRemainingPercentage = hasRemaining
    ? (newRemainingValue / effectiveMaxAmount) * 100
    : 0;

  const styledItems = items.map((item) => {
    const isSelected = selectedIndicesSet.has(item.originalIndex);
    return {
      ...item,
      percentage: isSelected ? item.percentage : 0,
    };
  });

  return {
    styledItems,
    updatedRemainingPercentage: newRemainingPercentage,
    updatedRemainingValue: newRemainingValue,
  };
};

// Helper: Apply proportional mode hide styling
const applyProportionalHideStyling = (
  items: AnimatedItem[],
  selectedIndicesSet: Set<number>,
  selectedTotal: number
) => {
  if (selectedTotal === 0) {
    return {
      styledItems: items.map((item) => ({ ...item, percentage: 0 })),
      updatedRemainingPercentage: 0,
      updatedRemainingValue: 0,
    };
  }

  const styledItems = items.map((item) => {
    const isSelected = selectedIndicesSet.has(item.originalIndex);
    const newPercentage = isSelected ? (item.value / selectedTotal) * 100 : 0;
    return {
      ...item,
      percentage: newPercentage,
    };
  });

  return {
    styledItems,
    updatedRemainingPercentage: 0,
    updatedRemainingValue: 0,
  };
};

// Helper: Apply selection styling and recalculate percentages for hide mode
const applySelectionStyling = (
  items: AnimatedItem[],
  selectedIndicesSet: Set<number>,
  selectionBehavior: "dim" | "hide",
  mode: StackedBarChartProps["mode"],
  hasRemaining: boolean,
  effectiveMaxAmount: number,
  baseRemainingPercentage: number,
  baseRemainingValue: number
): {
  styledItems: AnimatedItem[];
  updatedRemainingPercentage: number;
  updatedRemainingValue: number;
} => {
  const hasSelection = selectedIndicesSet.size > 0;

  // If no selection or dim mode, return items as-is with base remaining values
  if (selectionBehavior !== "hide" || !hasSelection) {
    return {
      styledItems: items,
      updatedRemainingPercentage: baseRemainingPercentage,
      updatedRemainingValue: baseRemainingValue,
    };
  }

  // Calculate total of selected items
  const selectedTotal = items
    .filter((item) => selectedIndicesSet.has(item.originalIndex))
    .reduce((sum, item) => sum + item.value, 0);

  // Apply mode-specific styling
  return mode === "cumulative"
    ? applyCumulativeHideStyling(
        items,
        selectedIndicesSet,
        selectedTotal,
        hasRemaining,
        effectiveMaxAmount
      )
    : applyProportionalHideStyling(items, selectedIndicesSet, selectedTotal);
};

// Helper: Build legend items from data with optional remaining segment
const buildLegendItems = (
  dataWithPercentages: AnimatedItem[],
  options: {
    showLegendValues: boolean;
    legendValueFormat: "percentage" | "count";
    unit?: string;
    hasRemaining: boolean;
    showLegend: boolean;
    remainingValue: number;
    remainingPercentage: number;
    remainingLabel: string;
    remainingUnit?: string;
    remainingColor?: string;
  }
): LegendItemData[] => {
  const {
    showLegendValues,
    legendValueFormat,
    unit,
    hasRemaining,
    showLegend,
    remainingValue,
    remainingPercentage,
    remainingLabel,
    remainingUnit,
    remainingColor,
  } = options;

  const legendItems: LegendItemData[] = dataWithPercentages.map((item) => ({
    name: item.name,
    value: calculateLegendValue(
      item,
      showLegendValues,
      legendValueFormat,
      unit
    ),
    color: item.color,
    disabled: item.disabled,
  }));

  // Add remaining item to legend if applicable
  if (hasRemaining && showLegend) {
    let remainingValueDisplay: string | undefined;

    if (!showLegendValues) {
      remainingValueDisplay = undefined;
    } else if (legendValueFormat === "percentage") {
      remainingValueDisplay = `${Math.round(remainingPercentage)}%`;
    } else {
      // Count format
      // Use remainingUnit or global unit (never a custom unit from data items)
      const effectiveRemainingUnit = remainingUnit || unit || "";
      const formattedRemaining = remainingValue.toLocaleString();
      remainingValueDisplay = effectiveRemainingUnit
        ? `${formattedRemaining} ${effectiveRemainingUnit}`
        : formattedRemaining;
    }

    legendItems.push({
      name: remainingLabel,
      value: remainingValueDisplay,
      color: remainingColor,
      disabled: true,
    });
  }

  return legendItems;
};

// Helper: Render a bar segment with optional tooltip
const renderBarSegment = (
  item: AnimatedItem,
  options: {
    barHeight: number;
    hoveredIndex: number | null;
    selectedIndicesSet: Set<number>;
    selectionBehavior: "dim" | "hide";
    isLast: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
  }
): JSX.Element => {
  const {
    barHeight,
    hoveredIndex,
    selectedIndicesSet,
    selectionBehavior,
    isLast,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = options;

  // Mark hidden segments with data-hide attribute when in hide mode
  const isHidden = selectionBehavior === "hide" && item.percentage === 0;

  const barSegment = (
    <BarSegment
      color={item.color}
      percentage={item.isEntering || item.isExiting ? 0 : item.percentage}
      height={barHeight}
      opacity={getSegmentOpacity(
        item.originalIndex,
        hoveredIndex,
        selectedIndicesSet,
        selectionBehavior
      )}
      isLast={isLast}
      data-hide={isHidden}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );

  return item.tooltip !== undefined ? (
    <Tooltip
      title={null}
      componentSlot={<TooltipTable {...item.tooltip} />}
      placement="top"
      key={item.key}
      hasInvertedStyle={false}
      open={hoveredIndex === item.originalIndex && !isHidden}
      disableInteractive={true}
      slotProps={{
        popper: {
          disablePortal: false,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 0],
              },
            },
          ],
        },
      }}
    >
      {barSegment}
    </Tooltip>
  ) : (
    cloneElement(barSegment, { key: item.key })
  );
};

const StackedBarChart = (props: StackedBarChartProps): JSX.Element => {
  const {
    title,
    badge,
    hideBadge = false,
    data,
    width = "100%",
    barHeight: barHeightProp = 8,
    showLegend = true,
    showLegendValues = true,
    legendValueFormat = "percentage",
    selectedIndices = [],
    onSelectionChange,
    onSegmentMouseEnter,
    onSegmentMouseLeave,
    onLegendItemMouseEnter,
    onLegendItemMouseLeave,
    onSegmentClick,
    onLegendItemClick,
    selectionBehavior = "dim",
    mode = "proportional",
    maxAmount,
    remainingLabel = "Remaining",
    remainingUnit,
    unit,
    maxVisibleItems,
    overflowColor,
    ...rest
  } = props;

  // Ensure barHeight is at least 1px
  const barHeight = Math.max(1, barHeightProp);

  const theme = useTheme() as SDSTheme;

  // Items past maxVisibleItems collapse into one "Other" segment and legend
  // entry. Selection and hover indices keep referring to positions in `data`.
  const visibleCount =
    maxVisibleItems !== undefined && maxVisibleItems < data.length
      ? Math.max(0, maxVisibleItems)
      : data.length;
  const hiddenItems = useMemo(
    () => data.slice(visibleCount),
    [data, visibleCount]
  );
  const hasOverflow = hiddenItems.length > 0;
  const chartData = useMemo<StackedBarChartDataItem[]>(() => {
    if (!hasOverflow) return data;
    return [
      ...data.slice(0, visibleCount),
      {
        name: remainingLabel,
        value: hiddenItems.reduce((sum, item) => sum + item.value, 0),
        color: overflowColor,
      },
    ];
  }, [
    data,
    hiddenItems,
    hasOverflow,
    visibleCount,
    remainingLabel,
    overflowColor,
  ]);

  // Calculate totals and remaining segments for cumulative mode
  const {
    effectiveMaxAmount,
    hasRemaining,
    remainingValue,
    remainingPercentage,
  } = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const maxAmountValue =
      mode === "cumulative" && maxAmount ? maxAmount : total;
    const hasRemainingSegment = mode === "cumulative" && total < maxAmountValue;
    const remaining = hasRemainingSegment ? maxAmountValue - total : 0;
    const remainingPct = hasRemainingSegment
      ? (remaining / maxAmountValue) * 100
      : 0;

    return {
      effectiveMaxAmount: maxAmountValue,
      hasRemaining: hasRemainingSegment,
      remainingValue: remaining,
      remainingPercentage: remainingPct,
    };
  }, [data, mode, maxAmount]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedItems, setAnimatedItems] = useState<AnimatedItem[]>([]);
  const [autoColorMap, setAutoColorMap] = useState<Map<string, string>>(
    new Map()
  );
  const [animatedRemainingPercentage, setAnimatedRemainingPercentage] =
    useState<number>(0);
  const previousProcessedRef = useRef<AnimatedItem[]>([]);
  const previousDataKeysRef = useRef<Set<string>>(new Set());

  // Visible items, the grouped item, hidden items, then the remaining segment
  // take consecutive positions in one color cycle
  const colorItems = useMemo(() => {
    const items = hasOverflow ? [...chartData, ...hiddenItems] : [...chartData];
    if (hasRemaining) items.push({ name: REMAINING_COLOR_KEY, value: 0 });
    return items;
  }, [chartData, hiddenItems, hasOverflow, hasRemaining]);
  const generateColorMap = useCallback(
    (items: StackedBarChartDataItem[]): Map<string, string> =>
      new Map(items.map((item, index) => [item.name, getDiscreteColor(index)])),
    []
  );

  // Assign colors to items without one. Colors are only reassigned when new
  // items appear, so removing an item keeps the other colors stable.
  useEffect(() => {
    const autoItems = colorItems.filter((item) => !item.color);
    const currentDataKeys = new Set(colorItems.map((item) => item.name));
    const previousDataKeys = previousDataKeysRef.current;
    previousDataKeysRef.current = currentDataKeys;

    if (autoItems.length === 0) {
      if (autoColorMap.size > 0) {
        setAutoColorMap(new Map());
      }
      return;
    }

    const hasNewItems = autoItems.some(
      (item) => !previousDataKeys.has(item.name)
    );

    const shouldRegenerateColors = autoColorMap.size === 0 || hasNewItems;

    if (shouldRegenerateColors) {
      setAutoColorMap(generateColorMap(autoItems));
    } else {
      const autoKeys = new Set(autoItems.map((item) => item.name));
      const updatedMap = new Map(autoColorMap);
      let hasChanges = false;

      for (const key of Array.from(updatedMap.keys())) {
        if (!autoKeys.has(key)) {
          updatedMap.delete(key);
          hasChanges = true;
        }
      }

      if (hasChanges) {
        setAutoColorMap(updatedMap);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorItems, generateColorMap]);

  const remainingColor =
    autoColorMap.get(REMAINING_COLOR_KEY) ??
    theme?.palette?.sds?.base?.backgroundTertiary;

  // Calculate display badge value
  const displayBadge =
    badge ?? calculateBadgeText(data.length, selectedIndices.length);

  // Calculate percentages and assign colors for each segment
  // default to ornament secondary color if no color is provided
  const dataWithPercentages: AnimatedItem[] = useMemo(() => {
    return chartData.map((item, index) => {
      const resolvedColor =
        item.color ||
        autoColorMap.get(item.name) ||
        theme?.palette?.sds?.base?.ornamentSecondary;

      return {
        ...item,
        color: resolvedColor,
        percentage:
          effectiveMaxAmount > 0 ? (item.value / effectiveMaxAmount) * 100 : 0,
        key: item.name, // Use name as stable key for tracking
        originalIndex:
          hasOverflow && index === visibleCount ? LEGEND_OVERFLOW_INDEX : index,
        isEntering: false,
        isExiting: false,
      };
    });
  }, [
    chartData,
    hasOverflow,
    visibleCount,
    effectiveMaxAmount,
    autoColorMap,
    theme,
  ]);

  // Handle data change animations for enters/exits.
  useEffect(() => {
    const prevItems = previousProcessedRef.current;
    const nextItems = dataWithPercentages;
    const nextItemsMap = new Map(nextItems.map((item) => [item.key, item]));

    // If this is the initial render, just set the items
    if (prevItems.length === 0) {
      setAnimatedItems(nextItems);
      setAnimatedRemainingPercentage(remainingPercentage);
      previousProcessedRef.current = nextItems;
      return;
    }

    // 1. Prepare for animation (added segments are 0-width).
    const step1Items = [...prevItems];
    let currentInsertionIndex = 0;
    for (const item of nextItems) {
      const step1Index = step1Items.findIndex(
        (step1Item) => step1Item.key === item.key
      );
      if (step1Index === -1) {
        step1Items.splice(currentInsertionIndex, 0, {
          ...item,
          isEntering: true,
        });
        currentInsertionIndex++;
      } else {
        currentInsertionIndex = step1Index + 1;
      }
    }
    setAnimatedItems(step1Items);

    // 2. Animate to final state (removed segments are 0 width).
    const timeoutIds: number[] = [];
    timeoutIds.push(
      window.setTimeout(() => {
        const step2Items = step1Items.map(
          (item) => nextItemsMap.get(item.key) ?? { ...item, isExiting: true }
        );
        setAnimatedItems(step2Items);
        setAnimatedRemainingPercentage(remainingPercentage);
        // 3. Final state (removed segments gone)
        timeoutIds.push(
          window.setTimeout(() => {
            setAnimatedItems(nextItems);
            previousProcessedRef.current = nextItems;
          }, 350)
        );
      }, 0)
    );

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [dataWithPercentages, remainingPercentage]);

  // Hidden items share the "Other" segment, so hover and selection styling
  // operate on chart indices where every hidden index maps to that segment
  const toChartIndex = useCallback(
    (index: number) =>
      hasOverflow && index >= visibleCount ? LEGEND_OVERFLOW_INDEX : index,
    [hasOverflow, visibleCount]
  );
  const hoveredChartIndex =
    hoveredIndex === null ? null : toChartIndex(hoveredIndex);
  const selectedChartIndices = useMemo(
    () => new Set(selectedIndices.map(toChartIndex)),
    [selectedIndices, toChartIndex]
  );

  // In hide mode only the selected hidden items should size the Other segment
  const itemsForSelection = useMemo(() => {
    if (!hasOverflow || selectedIndices.length === 0) return animatedItems;
    const selectedHiddenValue = hiddenItems.reduce(
      (sum, item, index) =>
        selectedIndices.includes(visibleCount + index) ? sum + item.value : sum,
      0
    );
    return animatedItems.map((item) =>
      item.originalIndex === LEGEND_OVERFLOW_INDEX
        ? { ...item, value: selectedHiddenValue }
        : item
    );
  }, [animatedItems, hasOverflow, hiddenItems, selectedIndices, visibleCount]);

  // Apply selection styling for hide mode
  // This modifies percentages but keeps all items (including hidden ones at 0%)
  // so animations continue to work smoothly
  const { styledItems, updatedRemainingPercentage, updatedRemainingValue } =
    useMemo(
      () =>
        applySelectionStyling(
          itemsForSelection,
          selectedChartIndices,
          selectionBehavior,
          mode,
          hasRemaining,
          effectiveMaxAmount,
          animatedRemainingPercentage,
          remainingValue
        ),
      [
        itemsForSelection,
        selectedChartIndices,
        selectionBehavior,
        mode,
        hasRemaining,
        effectiveMaxAmount,
        animatedRemainingPercentage,
        remainingValue,
      ]
    );

  // Calculate display values for hide mode
  const isHideMode = selectionBehavior === "hide" && selectedIndices.length > 0;
  const displayRemainingPercentage = isHideMode
    ? updatedRemainingPercentage
    : animatedRemainingPercentage;
  const displayRemainingValue = isHideMode
    ? updatedRemainingValue
    : remainingValue;

  // Convert data to legend items format (always use full data, not filtered)
  // Use updated remaining values when in hide mode with selections
  const legendItems = useMemo(
    () =>
      buildLegendItems(
        dataWithPercentages.filter(
          (item) => item.originalIndex !== LEGEND_OVERFLOW_INDEX
        ),
        {
          showLegendValues,
          legendValueFormat,
          unit,
          hasRemaining,
          showLegend,
          remainingValue: displayRemainingValue,
          remainingPercentage: displayRemainingPercentage,
          remainingLabel,
          remainingUnit,
          remainingColor,
        }
      ),
    [
      dataWithPercentages,
      showLegendValues,
      legendValueFormat,
      unit,
      hasRemaining,
      showLegend,
      displayRemainingValue,
      displayRemainingPercentage,
      remainingLabel,
      remainingUnit,
      remainingColor,
    ]
  );

  // The legend lists visible items, then the remaining entry (cumulative mode),
  // then the overflow group. Hidden data indices therefore shift past the
  // remaining entry in the legend's index space.
  const legendOffset = hasRemaining ? 1 : 0;
  const toLegendIndex = useCallback(
    (index: number) => (index >= visibleCount ? index + legendOffset : index),
    [visibleCount, legendOffset]
  );
  const fromLegendIndex = useCallback(
    (index: number) => (index > visibleCount ? index - legendOffset : index),
    [visibleCount, legendOffset]
  );

  // Handle legend item hover and leave
  const handleLegendItemHover = useCallback(
    (_item: LegendItemData, legendIndex: number) => {
      const index = fromLegendIndex(legendIndex);
      setHoveredIndex(index);
      if (onLegendItemMouseEnter && data[index]) {
        onLegendItemMouseEnter(data[index], index);
      }
    },
    [onLegendItemMouseEnter, data, fromLegendIndex]
  );
  const handleLegendItemLeave = useCallback(
    (_item: LegendItemData, legendIndex: number) => {
      const index = fromLegendIndex(legendIndex);
      setHoveredIndex(null);
      if (onLegendItemMouseLeave && data[index]) {
        onLegendItemMouseLeave(data[index], index);
      }
    },
    [onLegendItemMouseLeave, data, fromLegendIndex]
  );

  // Handle legend item click
  const handleLegendItemClickInternal = useCallback(
    (_item: LegendItemData, legendIndex: number) => {
      const index = fromLegendIndex(legendIndex);
      if (onLegendItemClick && data[index]) {
        onLegendItemClick(data[index], index);
      }
    },
    [onLegendItemClick, data, fromLegendIndex]
  );

  // Handle selection change - reusable logic for both segment and legend
  const handleSelectionChange = useCallback(
    (newSelectedIndices: number[]) => {
      if (!onSelectionChange) return;

      const selectedData = data.filter((item, itemIndex) =>
        newSelectedIndices.includes(itemIndex)
      );
      onSelectionChange(newSelectedIndices, selectedData);
    },
    [onSelectionChange, data]
  );

  // Handle segment click - toggle selection and call onSegmentClick
  const handleSegmentClick = useCallback(
    (index: number) => {
      // Call onSegmentClick callback if provided
      if (onSegmentClick && data[index]) {
        onSegmentClick(data[index], index);
      }

      // Handle selection change
      if (!onSelectionChange) return;

      // The Other segment selects or clears every hidden item at once
      if (index === LEGEND_OVERFLOW_INDEX) {
        const anyHiddenSelected = selectedIndices.some(
          (i) => i >= visibleCount
        );
        handleSelectionChange(
          anyHiddenSelected
            ? selectedIndices.filter((i) => i < visibleCount)
            : [
                ...selectedIndices,
                ...hiddenItems.map((_, i) => visibleCount + i),
              ]
        );
        return;
      }

      const isSelected = selectedChartIndices.has(index);
      const newSelectedIndices = isSelected
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index];

      handleSelectionChange(newSelectedIndices);
    },
    [
      onSelectionChange,
      onSegmentClick,
      data,
      selectedIndices,
      selectedChartIndices,
      hiddenItems,
      visibleCount,
      handleSelectionChange,
    ]
  );

  const overflowAnimatedItem = dataWithPercentages.find(
    (item) => item.originalIndex === LEGEND_OVERFLOW_INDEX
  );
  const overflowLegendItem = overflowAnimatedItem && {
    name: overflowAnimatedItem.name,
    color: overflowAnimatedItem.color,
    value: calculateLegendValue(
      overflowAnimatedItem,
      showLegendValues,
      legendValueFormat,
      unit
    ),
  };
  const overflowLegendItems = useMemo<LegendItemData[]>(
    () =>
      hiddenItems.map((item) => ({
        name: item.name,
        color:
          item.color ||
          autoColorMap.get(item.name) ||
          theme?.palette?.sds?.base?.ornamentSecondary,
        disabled: item.disabled,
      })),
    [hiddenItems, autoColorMap, theme]
  );

  // Calculate the last visible segment (percentage > 0)
  const lastVisibleIndex = useMemo(() => {
    for (let i = styledItems.length - 1; i >= 0; i--) {
      if (styledItems[i].percentage > 0) {
        return i;
      }
    }
    return -1;
  }, [styledItems]);

  const chartContent = (
    <StyledStackedBarChartWrapper>
      <BarContainer
        width={width}
        barHeight={barHeight}
        isEmpty={styledItems.length === 0 && !hasRemaining}
      >
        {styledItems.map((item, index) => {
          const isLastVisible = index === lastVisibleIndex && !hasRemaining;
          return renderBarSegment(item, {
            barHeight,
            hoveredIndex: hoveredChartIndex,
            selectedIndicesSet: selectedChartIndices,
            selectionBehavior,
            isLast: isLastVisible,
            onMouseEnter: () => {
              if (!item.isExiting) {
                setHoveredIndex(item.originalIndex);
                if (onSegmentMouseEnter && data[item.originalIndex]) {
                  onSegmentMouseEnter(
                    data[item.originalIndex],
                    item.originalIndex
                  );
                }
              }
            },
            onMouseLeave: () => {
              setHoveredIndex(null);
              if (onSegmentMouseLeave && data[item.originalIndex]) {
                onSegmentMouseLeave(
                  data[item.originalIndex],
                  item.originalIndex
                );
              }
            },
            onClick: () =>
              !item.isExiting && handleSegmentClick(item.originalIndex),
          });
        })}
        {previousProcessedRef.current.length > 0 && (
          <BarSegment
            key="remaining"
            color={remainingColor}
            percentage={displayRemainingPercentage}
            height={barHeight}
            isLast={true}
            opacity={1}
            disabled={true}
          />
        )}
      </BarContainer>

      {showLegend && (
        <Legend
          items={legendItems}
          overflowItems={overflowLegendItems}
          overflowItem={overflowLegendItem}
          showValues={showLegendValues}
          onItemMouseEnter={handleLegendItemHover}
          onItemMouseLeave={handleLegendItemLeave}
          onItemClick={
            onLegendItemClick ? handleLegendItemClickInternal : undefined
          }
          selectedIndices={selectedIndices.map(toLegendIndex)}
          onSelectionChange={
            onSelectionChange
              ? (indices) => handleSelectionChange(indices.map(fromLegendIndex))
              : undefined
          }
          hoveredIndex={
            hoveredIndex === null ? null : toLegendIndex(hoveredIndex)
          }
        />
      )}
    </StyledStackedBarChartWrapper>
  );

  // If no title, render chart and optional legend without wrapper
  if (!title) {
    return (
      <ChartWrapper width={width} {...rest}>
        {chartContent}
      </ChartWrapper>
    );
  }

  // Render with title and optional badge
  return (
    <ChartWrapper width={width} {...rest}>
      <TitleContainer>
        <ChartTitle>{title}</ChartTitle>
        {!hideBadge && displayBadge && (
          <Tag
            label={displayBadge}
            sdsType="secondary"
            sdsStyle="rounded"
            color="neutral"
            hover={false}
          />
        )}
      </TitleContainer>
      {chartContent}
    </ChartWrapper>
  );
};

export type {
  StackedBarChartProps,
  StackedBarChartDataItem,
} from "./StackedBarChart.types";

export default StackedBarChart;
