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
  selectedIndices: number[]
): number => {
  const hasSelection = selectedIndices.length > 0;

  if (hoveredIndex !== null) {
    return hoveredIndex === index || selectedIndices.includes(index) ? 1 : 0.3;
  }

  if (hasSelection) {
    return selectedIndices.includes(index) ? 1 : 0.3;
  }

  return 1;
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
    data: StackedBarChartDataItem[];
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
    data,
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
      const effectiveRemainingUnit =
        remainingUnit || data[0]?.unit || unit || "";
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
    isFirst: boolean;
    isLast: boolean;
    barHeight: number;
    hoveredIndex: number | null;
    selectedIndices: number[];
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
  }
): JSX.Element => {
  const {
    isFirst,
    isLast,
    barHeight,
    hoveredIndex,
    selectedIndices,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = options;

  const barSegment = (
    <BarSegment
      color={item.color}
      percentage={item.percentage}
      height={barHeight}
      isFirst={isFirst}
      isLast={isLast}
      opacity={getSegmentOpacity(
        item.originalIndex,
        hoveredIndex,
        selectedIndices
      )}
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
    barHeight = 16,
    showLegend = true,
    showLegendValues = true,
    legendValueFormat = "percentage",
    selectedIndices = [],
    onSelectionChange,
    mode = "porportional",
    maxAmount,
    remainingLabel = "Remaining",
    remainingUnit,
    unit,
    colorGeneratorOptions,
    ...rest
  } = props;

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

  // Helper to animate items when removals occur
  const animateItemRemoval = (
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
  };

  // Detect dark mode from theme
  const isDarkMode = getMode({ theme }) === "dark";

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
      JSON.stringify(previousColorOptions.options) !==
        JSON.stringify(colorGeneratorOptions);

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

  // Calculate default badge value
  const defaultBadge = calculateBadgeText(data.length, selectedIndices.length);
  const displayBadge = badge ? badge : defaultBadge;

  // Calculate total value from data
  const dataTotal = data.reduce((sum, item) => sum + item.value, 0);

  // Determine the effective max amount
  const effectiveMaxAmount =
    mode === "cumulative" && maxAmount ? maxAmount : dataTotal;

  // Calculate if there's a remaining segment
  const hasRemaining = mode === "cumulative" && dataTotal < effectiveMaxAmount;
  const remainingValue = hasRemaining ? effectiveMaxAmount - dataTotal : 0;
  const remainingPercentage = hasRemaining
    ? (remainingValue / effectiveMaxAmount) * 100
    : 0;

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
  }, [dataWithPercentages, remainingPercentage]);

  // Convert data to legend items format
  const legendItems = useMemo(
    () =>
      buildLegendItems(dataWithPercentages, {
        showLegendValues,
        legendValueFormat,
        unit,
        hasRemaining,
        showLegend,
        remainingValue,
        remainingPercentage,
        remainingLabel,
        remainingUnit,
        data,
        theme,
      }),
    [
      dataWithPercentages,
      showLegendValues,
      legendValueFormat,
      unit,
      hasRemaining,
      showLegend,
      remainingValue,
      remainingPercentage,
      remainingLabel,
      remainingUnit,
      data,
      theme,
    ]
  );

  // Handle legend item hover
  const handleLegendItemHover = useCallback(
    (item: LegendItemData, index: number) => {
      setHoveredIndex(index);
    },
    []
  );

  // Handle legend item leave
  const handleLegendItemLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Handle segment click - toggle selection
  const handleSegmentClick = useCallback(
    (index: number) => {
      if (!onSelectionChange) return;

      const isSelected = selectedIndices.includes(index);
      let newSelectedIndices: number[];

      if (isSelected) {
        newSelectedIndices = selectedIndices.filter((i) => i !== index);
      } else {
        newSelectedIndices = [...selectedIndices, index];
      }

      const selectedData = data.filter((item, itemIndex) =>
        newSelectedIndices.includes(itemIndex)
      );
      onSelectionChange(newSelectedIndices, selectedData);
    },
    [onSelectionChange, selectedIndices, data]
  );

  const chartContent = (
    <StyledStackedBarChartWrapper>
      <BarContainer
        width={width}
        barHeight={barHeight}
        isEmpty={animatedItems.length === 0}
      >
        {animatedItems.map((item, index) =>
          renderBarSegment(item, index, {
            isFirst: index === 0,
            isLast: index === animatedItems.length - 1 && !hasRemaining,
            barHeight,
            hoveredIndex,
            selectedIndices,
            onMouseEnter: () =>
              !item.isExiting && setHoveredIndex(item.originalIndex),
            onMouseLeave: () => setHoveredIndex(null),
            onClick: () =>
              !item.isExiting && handleSegmentClick(item.originalIndex),
          })
        )}
        {hasRemaining && (
          <BarSegment
            key="remaining"
            color={theme?.palette?.sds?.base?.backgroundTertiary}
            percentage={animatedRemainingPercentage}
            height={barHeight}
            isFirst={animatedItems.length === 0}
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
            onSelectionChange
              ? (newSelectedIndices: number[]) => {
                  const selectedData = data.filter((item, itemIndex) =>
                    newSelectedIndices.includes(itemIndex)
                  );
                  onSelectionChange(newSelectedIndices, selectedData);
                }
              : undefined
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
