import { cloneElement, useState } from "react";
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

// Helper: Calculate badge display text based on selection state
const calculateBadgeText = (
  totalItems: number,
  selectedCount: number
): string => {
  if (selectedCount === 0) return `${totalItems}`;
  if (selectedCount === totalItems) return "All";
  return `${selectedCount} of ${totalItems}`;
};

// Helper: Calculate legend value display
const calculateLegendValue = (
  item: StackedBarChartDataItem & { percentage: number },
  mode: "percentage" | "amount",
  showLegendValues: boolean,
  globalUnit?: string
): string | undefined => {
  if (!showLegendValues) return undefined;

  if (mode === "percentage") {
    return `${Math.round(item.percentage)}%`;
  }

  // Amount mode: show value with optional unit
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
  dataWithPercentages: Array<
    StackedBarChartDataItem & { percentage: number; color: string }
  >,
  options: {
    mode: "percentage" | "amount";
    showLegendValues: boolean;
    unit?: string;
    hasRemaining: boolean;
    showLegend: boolean;
    remainingValue: number;
    remainingLabel: string;
    remainingUnit?: string;
    data: StackedBarChartDataItem[];
    theme: SDSTheme;
  }
): LegendItemData[] => {
  const {
    mode,
    showLegendValues,
    unit,
    hasRemaining,
    showLegend,
    remainingValue,
    remainingLabel,
    remainingUnit,
    data,
    theme,
  } = options;

  const legendItems: LegendItemData[] = dataWithPercentages.map((item) => ({
    name: item.name,
    value: calculateLegendValue(item, mode, showLegendValues, unit),
    color: item.color,
    disabled: item.disabled,
  }));

  // Add remaining item to legend if applicable
  if (hasRemaining && showLegend) {
    const effectiveRemainingUnit = remainingUnit || data[0]?.unit || unit || "";
    const remainingValueDisplay = showLegendValues
      ? effectiveRemainingUnit
        ? `${remainingValue} ${effectiveRemainingUnit}`
        : `${remainingValue}`
      : undefined;

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
  item: StackedBarChartDataItem & { percentage: number; color: string },
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
      opacity={getSegmentOpacity(index, hoveredIndex, selectedIndices)}
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
      key={`${item.name}-${index}`}
      hasInvertedStyle={false}
      open={hoveredIndex === index}
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
    cloneElement(barSegment, { key: `${item.name}-${index}` })
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
    selectedIndices = [],
    onSelectionChange,
    mode = "percentage",
    maxAmount,
    remainingLabel = "Remaining",
    remainingUnit,
    unit,
    ...rest
  } = props;

  const theme = useTheme() as SDSTheme;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Detect dark mode from theme
  const isDarkMode = getMode({ theme }) === "dark";

  // Calculate default badge value
  const defaultBadge = calculateBadgeText(data.length, selectedIndices.length);
  const displayBadge = badge ? badge : defaultBadge;

  // Calculate total value from data
  const dataTotal = data.reduce((sum, item) => sum + item.value, 0);

  // Determine the effective max amount
  const effectiveMaxAmount =
    mode === "amount" && maxAmount ? maxAmount : dataTotal;

  // Calculate if there's a remaining segment
  const hasRemaining = mode === "amount" && dataTotal < effectiveMaxAmount;
  const remainingValue = hasRemaining ? effectiveMaxAmount - dataTotal : 0;
  const remainingPercentage = hasRemaining
    ? (remainingValue / effectiveMaxAmount) * 100
    : 0;

  // Generate colors if not provided in data
  const hasColors = data.every((item) => item.color);
  const generatedColors = !hasColors
    ? generateDiscreteColors(data.length, isDarkMode)
    : [];

  // Calculate percentages and assign colors for each segment
  // default to ornament secondary color if no color is provided
  const dataWithPercentages = data.map((item, index) => ({
    ...item,
    color:
      item.color ||
      generatedColors[index] ||
      theme?.palette?.sds?.base?.ornamentSecondary,
    percentage:
      effectiveMaxAmount > 0 ? (item.value / effectiveMaxAmount) * 100 : 0,
  }));

  // Convert data to legend items format
  const legendItems = buildLegendItems(dataWithPercentages, {
    mode,
    showLegendValues,
    unit,
    hasRemaining,
    showLegend,
    remainingValue,
    remainingLabel,
    remainingUnit,
    data,
    theme,
  });

  // Handle legend item hover
  const handleLegendItemHover = (item: LegendItemData, index: number) => {
    setHoveredIndex(index);
  };

  // Handle legend item leave
  const handleLegendItemLeave = () => {
    setHoveredIndex(null);
  };

  // Handle segment click - toggle selection
  const handleSegmentClick = (index: number) => {
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
  };

  const chartContent = (
    <StyledStackedBarChartWrapper>
      <BarContainer width={width}>
        {dataWithPercentages.map((item, index) =>
          renderBarSegment(item, index, {
            isFirst: index === 0,
            isLast: index === dataWithPercentages.length - 1 && !hasRemaining,
            barHeight,
            hoveredIndex,
            selectedIndices,
            onMouseEnter: () => setHoveredIndex(index),
            onMouseLeave: () => setHoveredIndex(null),
            onClick: () => handleSegmentClick(index),
          })
        )}
        {hasRemaining && (
          <BarSegment
            key="remaining"
            color={theme?.palette?.sds?.base?.backgroundTertiary}
            percentage={remainingPercentage}
            height={barHeight}
            isFirst={false}
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
