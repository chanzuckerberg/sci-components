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
  Tooltip,
  TooltipTable,
  type LegendItemData,
} from "@czi-sds/components";
import {
  ChartTitle,
  ChartWrapper,
  BarContainer,
  BarSegment,
  StyledBadge,
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
  isExiting?: boolean;
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
  return effectiveUnit ? `${item.value} ${effectiveUnit}` : `${item.value}`;
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
        ? `${remainingValue} ${effectiveRemainingUnit}`
        : `${remainingValue}`;
    }

    legendItems.push({
      name: remainingLabel,
      value: remainingValueDisplay,
      color: theme?.palette?.sds?.base?.backgroundTertiary,
      disabled: true,
    });
  }

  return legendItems;
};

// Helper: Render a bar segment with optional tooltip
const renderBarSegment = (
  item: AnimatedItem,
  index: number,
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
      percentage={item.percentage}
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
      open={hoveredIndex === item.originalIndex}
      disableInteractive={true}
      PopperProps={{
        disablePortal: false,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 0],
            },
          },
        ],
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
    barHeight: barHeightProp = 16,
    showLegend = true,
    showLegendValues = true,
    legendValueFormat = "percentage",
    selectedIndices = [],
    onSelectionChange,
    selectionBehavior = "dim",
    mode = "porportional",
    maxAmount,
    remainingLabel = "Remaining",
    remainingUnit,
    unit,
    colorGeneratorOptions,
    ...rest
  } = props;

  // Ensure barHeight is at least 1px
  const barHeight = Math.max(1, barHeightProp);

  const theme = useTheme() as SDSTheme;

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
  const previousRemainingPercentageRef = useRef<number>(0);

  // Animate items when removals occur
  const animateItemRemoval = useCallback(
    (
      previousItems: AnimatedItem[],
      nextItems: AnimatedItem[],
      currentRemainingPercentage: number,
      newRemainingPercentage: number
    ): (() => void) | undefined => {
      if (typeof window === "undefined") {
        setAnimatedItems(nextItems);
        previousProcessedRef.current = nextItems;
        setAnimatedRemainingPercentage(newRemainingPercentage);
        previousRemainingPercentageRef.current = newRemainingPercentage;
        return undefined;
      }

      const nextItemsMap = new Map(nextItems.map((item) => [item.key, item]));

      const removedKeys = previousItems
        .filter((item) => !nextItemsMap.has(item.key))
        .map((item) => item.key);

      if (removedKeys.length === 0) {
        return undefined;
      }

      const removedKeySet = new Set(removedKeys);

      // Maintain original order so segments don't jump immediately
      const initialItems = previousItems.map((item) =>
        removedKeySet.has(item.key)
          ? { ...item, isExiting: true }
          : { ...item, isExiting: false }
      );

      setAnimatedItems(initialItems);
      previousProcessedRef.current = initialItems;
      // Keep remaining segment at current percentage initially
      setAnimatedRemainingPercentage(currentRemainingPercentage);

      const frameIds: number[] = [];

      const firstFrame = requestAnimationFrame(() => {
        const secondFrame = requestAnimationFrame(() => {
          setAnimatedItems((prev) => {
            const prevKeys = new Set(prev.map((item) => item.key));

            const updatedPrev = prev.map((item) => {
              if (removedKeySet.has(item.key)) {
                // Animate exiting items to 0
                return { ...item, percentage: 0 };
              }
              // Keep continuing items at their OLD percentages during animation
              // This prevents the flash/jump
              return { ...item, isExiting: false };
            });

            const addedItems = nextItems.filter(
              (item) => !prevKeys.has(item.key)
            );

            return [...updatedPrev, ...addedItems];
          });

          // Animate remaining segment to new percentage
          setAnimatedRemainingPercentage(newRemainingPercentage);
        });

        frameIds.push(secondFrame);
      });

      frameIds.push(firstFrame);

      const timeoutId = window.setTimeout(() => {
        // After animation completes, update to the new percentages
        setAnimatedItems(nextItems);
        previousProcessedRef.current = nextItems;
        setAnimatedRemainingPercentage(newRemainingPercentage);
        previousRemainingPercentageRef.current = newRemainingPercentage;
      }, 350);

      return () => {
        frameIds.forEach((id) => window.cancelAnimationFrame(id));
        window.clearTimeout(timeoutId);
      };
    },
    []
  );

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
    const autoItems = data.filter((item) => !item.color);
    const currentDataKeys = new Set(data.map((item) => item.name));
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
  }, [data, colorGeneratorOptions, isDarkMode, theme, generateColorMap]);

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

  // Calculate percentages and assign colors for each segment
  // default to ornament secondary color if no color is provided
  // Memoize to prevent unnecessary recalculations and re-renders
  const dataWithPercentages: AnimatedItem[] = useMemo(() => {
    return data.map((item, index) => {
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
      };
    });
  }, [data, effectiveMaxAmount, autoColorMap, theme]);

  // Handle data changes and animate exits
  useEffect(() => {
    const previousProcessed = previousProcessedRef.current;

    // If this is the initial render, just set the items
    if (previousProcessed.length === 0) {
      setAnimatedItems(dataWithPercentages);
      previousProcessedRef.current = dataWithPercentages;
      setAnimatedRemainingPercentage(remainingPercentage);
      previousRemainingPercentageRef.current = remainingPercentage;
      return;
    }

    const cleanup = animateItemRemoval(
      previousProcessed,
      dataWithPercentages,
      previousRemainingPercentageRef.current,
      remainingPercentage
    );

    if (cleanup) {
      return cleanup;
    }

    setAnimatedItems(dataWithPercentages);
    previousProcessedRef.current = dataWithPercentages;
    setAnimatedRemainingPercentage(remainingPercentage);
    previousRemainingPercentageRef.current = remainingPercentage;
  }, [dataWithPercentages, remainingPercentage, animateItemRemoval]);

  // Create a Set for O(1) lookups of selected indices
  const selectedIndicesSet = useMemo(
    () => new Set(selectedIndices),
    [selectedIndices]
  );

  // Apply selection styling for hide mode
  // This modifies percentages but keeps all items (including hidden ones at 0%)
  // so animations continue to work smoothly
  const { styledItems, updatedRemainingPercentage, updatedRemainingValue } =
    useMemo(
      () =>
        applySelectionStyling(
          animatedItems,
          selectedIndicesSet,
          selectionBehavior,
          mode,
          hasRemaining,
          effectiveMaxAmount,
          animatedRemainingPercentage,
          remainingValue
        ),
      [
        animatedItems,
        selectedIndicesSet,
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
      theme,
    ]
  );

  // Handle legend item hover and leave
  const handleLegendItemHover = useCallback(
    (_item: LegendItemData, index: number) => setHoveredIndex(index),
    []
  );
  const handleLegendItemLeave = useCallback(() => setHoveredIndex(null), []);

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

  // Handle segment click - toggle selection
  const handleSegmentClick = useCallback(
    (index: number) => {
      if (!onSelectionChange) return;

      const isSelected = selectedIndicesSet.has(index);
      const newSelectedIndices = isSelected
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index];

      handleSelectionChange(newSelectedIndices);
    },
    [
      onSelectionChange,
      selectedIndices,
      selectedIndicesSet,
      handleSelectionChange,
    ]
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
          return renderBarSegment(item, index, {
            barHeight,
            hoveredIndex,
            selectedIndicesSet,
            selectionBehavior,
            isLast: isLastVisible,
            onMouseEnter: () =>
              !item.isExiting && setHoveredIndex(item.originalIndex),
            onMouseLeave: () => setHoveredIndex(null),
            onClick: () =>
              !item.isExiting && handleSegmentClick(item.originalIndex),
          });
        })}
        {hasRemaining && (
          <BarSegment
            key="remaining"
            color={theme?.palette?.sds?.base?.backgroundTertiary}
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
          showValues={showLegendValues}
          onItemMouseEnter={handleLegendItemHover}
          onItemMouseLeave={handleLegendItemLeave}
          selectedIndices={selectedIndices}
          onSelectionChange={
            onSelectionChange ? handleSelectionChange : undefined
          }
          hoveredIndex={hoveredIndex}
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
          <StyledBadge>{displayBadge}</StyledBadge>
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
