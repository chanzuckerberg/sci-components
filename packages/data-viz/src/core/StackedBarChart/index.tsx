import {
  cloneElement,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  generateDiscreteColors,
  getMode,
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
  return effectiveUnit
    ? `${item.value.toLocaleString()} ${effectiveUnit}`
    : `${item.value}`;
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
    remainingOpensMenu: boolean;
    theme: SDSTheme;
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
    remainingOpensMenu,
    theme,
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
      remainingValueDisplay = effectiveRemainingUnit
        ? `${remainingValue.toLocaleString()} ${effectiveRemainingUnit}`
        : `${remainingValue.toLocaleString()}`;
    }

    legendItems.push({
      name: remainingLabel,
      value: remainingValueDisplay,
      color: theme?.palette?.sds?.base?.backgroundTertiary,
      disabled: !remainingOpensMenu,
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
    colorGeneratorOptions,
    maxItems,
    ...rest
  } = props;

  // Ensure barHeight is at least 1px
  const barHeight = Math.max(1, barHeightProp);

  const theme = useTheme() as SDSTheme;

  // In cumulative mode, items past maxItems fold into the remaining segment,
  // whose legend entry opens a menu listing them. Selection and hover indices
  // keep referring to positions in `data`.
  const visibleCount =
    mode === "cumulative" && maxItems !== undefined && maxItems < data.length
      ? Math.max(0, maxItems)
      : data.length;
  const chartData = useMemo(
    () => data.slice(0, visibleCount),
    [data, visibleCount]
  );
  const hiddenItems = useMemo(
    () => data.slice(visibleCount),
    [data, visibleCount]
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedItems, setAnimatedItems] = useState<AnimatedItem[]>([]);
  const [autoColorMap, setAutoColorMap] = useState<Map<string, string>>(
    new Map()
  );
  const [animatedRemainingPercentage, setAnimatedRemainingPercentage] =
    useState<number>(0);
  const previousProcessedRef = useRef<AnimatedItem[]>([]);
  const previousDataKeysRef = useRef<Set<string>>(new Set());
  const previousColorOptionsRef = useRef<{
    options: typeof colorGeneratorOptions;
    isDarkMode: boolean;
  } | null>(null);

  // Detect dark mode from theme
  const isDarkMode = useMemo(() => getMode({ theme }) === "dark", [theme]);

  // Helper to generate color map for auto items
  const generateColorMap = useCallback(
    (items: StackedBarChartDataItem[]): Map<string, string> => {
      const palette = generateDiscreteColors(items.length, {
        ...(colorGeneratorOptions || {}),
        isDarkMode,
      });

      const newColorMap = new Map<string, string>();
      items.forEach((item, index) => {
        newColorMap.set(
          item.name,
          palette[index] || theme?.palette?.sds?.base?.ornamentSecondary
        );
      });

      return newColorMap;
    },
    [colorGeneratorOptions, isDarkMode, theme]
  );

  // Effect to manage auto-generated colors
  useEffect(() => {
    const autoItems = chartData.filter((item) => !item.color);
    const currentDataKeys = new Set(chartData.map((item) => item.name));
    const previousDataKeys = previousDataKeysRef.current;
    const previousColorOptions = previousColorOptionsRef.current;

    // Check if color generation options changed
    const colorOptionsChanged =
      !previousColorOptions ||
      previousColorOptions.isDarkMode !== isDarkMode ||
      previousColorOptions.options !== colorGeneratorOptions;

    // Update refs
    previousDataKeysRef.current = currentDataKeys;
    previousColorOptionsRef.current = {
      options: colorGeneratorOptions,
      isDarkMode,
    };

    if (autoItems.length === 0) {
      if (autoColorMap.size > 0) {
        setAutoColorMap(new Map());
      }
      return;
    }

    const hasNewItems = autoItems.some(
      (item) => !previousDataKeys.has(item.name)
    );

    const shouldRegenerateColors =
      autoColorMap.size === 0 || hasNewItems || colorOptionsChanged;

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
  }, [chartData, colorGeneratorOptions, isDarkMode, theme, generateColorMap]);

  // Calculate display badge value
  const displayBadge =
    badge ?? calculateBadgeText(data.length, selectedIndices.length);

  // Calculate totals and remaining segments for cumulative mode
  const {
    effectiveMaxAmount,
    hasRemaining,
    remainingValue,
    remainingPercentage,
  } = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const visibleTotal = chartData.reduce((sum, item) => sum + item.value, 0);
    const maxAmountValue =
      mode === "cumulative" && maxAmount ? maxAmount : total;
    const hasRemainingSegment =
      mode === "cumulative" && visibleTotal < maxAmountValue;
    const remaining = hasRemainingSegment ? maxAmountValue - visibleTotal : 0;
    const remainingPct = hasRemainingSegment
      ? (remaining / maxAmountValue) * 100
      : 0;

    return {
      effectiveMaxAmount: maxAmountValue,
      hasRemaining: hasRemainingSegment,
      remainingValue: remaining,
      remainingPercentage: remainingPct,
    };
  }, [data, chartData, mode, maxAmount]);

  // The remaining segment stands in for the hidden items. It has no data
  // entry, so it takes the index after `data`.
  const hasOverflow = hasRemaining && hiddenItems.length > 0;
  const overflowIndex = data.length;

  // Hidden items only appear as swatches in the overflow menu
  const hiddenColors = useMemo(
    () =>
      hasOverflow
        ? generateDiscreteColors(hiddenItems.length, {
            ...(colorGeneratorOptions || {}),
            isDarkMode,
          })
        : [],
    [hasOverflow, hiddenItems.length, colorGeneratorOptions, isDarkMode]
  );

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
        originalIndex: index, // Track original index for selection
        isEntering: false,
        isExiting: false,
      };
    });
  }, [chartData, effectiveMaxAmount, autoColorMap, theme]);

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

  // Hidden items share the remaining segment, so hover and selection styling
  // operate on chart indices where every hidden index maps to that segment
  const toChartIndex = useCallback(
    (index: number) =>
      hasOverflow && index >= visibleCount ? overflowIndex : index,
    [hasOverflow, visibleCount, overflowIndex]
  );
  const hoveredChartIndex =
    hoveredIndex === null ? null : toChartIndex(hoveredIndex);
  const selectedChartIndices = useMemo(
    () => new Set(selectedIndices.map(toChartIndex)),
    [selectedIndices, toChartIndex]
  );

  // Apply selection styling for hide mode
  // This modifies percentages but keeps all items (including hidden ones at 0%)
  // so animations continue to work smoothly
  const { styledItems, updatedRemainingPercentage, updatedRemainingValue } =
    useMemo(
      () =>
        applySelectionStyling(
          animatedItems,
          selectedChartIndices,
          selectionBehavior,
          mode,
          hasRemaining,
          effectiveMaxAmount,
          animatedRemainingPercentage,
          remainingValue
        ),
      [
        animatedItems,
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

  // Convert data to legend items format
  // Use updated remaining values when in hide mode with selections
  const legendItems = useMemo(
    () =>
      buildLegendItems(dataWithPercentages, {
        showLegendValues,
        legendValueFormat,
        unit,
        hasRemaining,
        showLegend,
        remainingValue: displayRemainingValue,
        remainingPercentage: displayRemainingPercentage,
        remainingLabel,
        remainingUnit,
        remainingOpensMenu: hasOverflow,
        theme,
      }),
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
      hasOverflow,
      theme,
    ]
  );

  // Legend order is visible items, the remaining entry, then the menu of
  // hidden items. Map data indices to and from that order.
  const toLegendIndex = useCallback(
    (index: number) => {
      if (!hasOverflow || index < visibleCount) return index;
      return index === overflowIndex ? visibleCount : index + 1;
    },
    [hasOverflow, visibleCount, overflowIndex]
  );
  const fromLegendIndex = useCallback(
    (index: number) => {
      if (!hasOverflow || index < visibleCount) return index;
      return index === visibleCount ? overflowIndex : index - 1;
    },
    [hasOverflow, visibleCount, overflowIndex]
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
      handleSelectionChange,
    ]
  );

  const remainingMenuItems = useMemo<LegendItemData[]>(
    () =>
      hasOverflow
        ? hiddenItems.map((item, index) => ({
            name: item.name,
            color:
              item.color ||
              hiddenColors[index] ||
              theme?.palette?.sds?.base?.ornamentSecondary,
            disabled: item.disabled,
          }))
        : [],
    [hasOverflow, hiddenItems, hiddenColors, theme]
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
            color={theme?.palette?.sds?.base?.backgroundTertiary}
            percentage={displayRemainingPercentage}
            height={barHeight}
            isLast={true}
            opacity={
              hasOverflow
                ? getSegmentOpacity(
                    overflowIndex,
                    hoveredChartIndex,
                    selectedChartIndices,
                    selectionBehavior
                  )
                : 1
            }
            disabled={true}
          />
        )}
      </BarContainer>

      {showLegend && (
        <Legend
          items={legendItems}
          lastItemMenuItems={remainingMenuItems}
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
