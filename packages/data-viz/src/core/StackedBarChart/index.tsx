import { cloneElement, HTMLAttributes, useState } from "react";
import {
  Legend,
  SDSTheme,
  Tooltip,
  TooltipTable,
  type LegendItemData,
  type TooltipTableContentProps,
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

export interface StackedBarChartDataItem {
  /**
   * Display name for the segment
   */
  name: string;
  /**
   * Numeric value for the segment
   */
  value: number;
  /**
   * Color for the segment (hex or CSS color)
   */
  color: string;
  /**
   * Unit label to display with the value in amount mode (e.g., "GB", "datasets", "MB")
   * Only shown in legend when mode is "amount"
   */
  unit?: string;
  /**
   * Disable the item (prevents all events on the corresponding legend item and bar segment)
   * @default false
   */
  disabled?: boolean;
  tooltip: TooltipTableContentProps;
}

export interface StackedBarChartProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Title to display above the chart
   */
  title?: string;
  /**
   * Badge text to display next to the title
   * If not provided, defaults to showing item count based on selection:
   * - No selection: total count (e.g., "5")
   * - Partial selection: selected count (e.g., "3 of 5")
   * - All selected: "All"
   */
  badge?: string;
  /**
   * Hide the badge when true
   * @default false
   */
  hideBadge?: boolean;
  /**
   * Array of data items to display in the stacked bar
   */
  data: StackedBarChartDataItem[];
  /**
   * Width of the chart - accepts any CSS width value (e.g., "100%", "20vw", "300px", or number for pixels)
   * @default 240
   */
  width?: number | string;
  /**
   * Height of the bar in pixels
   * @default 16
   */
  barHeight?: number;
  /**
   * Whether to show the legend below the chart
   * @default true
   */
  showLegend?: boolean;
  /**
   * Whether to show percentage values in the legend
   * @default true
   */
  showLegendValues?: boolean;
  /**
   * Array of selected item indices (controlled component)
   */
  selectedIndices?: number[];
  /**
   * Callback when legend selection changes
   */
  onSelectionChange?: (selectedIndices: number[]) => void;
  /**
   * Chart mode - controls how segments are calculated
   * - "percentage": Segments fill entire bar (100%), proportional to their values
   * - "amount": Segments sized based on actual values relative to maxAmount
   * @default "percentage"
   */
  mode?: "percentage" | "amount";
  /**
   * Maximum amount for the bar (used only in "amount" mode)
   * If not provided, defaults to sum of all values (no remaining segment)
   * If provided and sum < maxAmount, shows gray "remaining" segment
   */
  maxAmount?: number;
  /**
   * Label for the remaining/unknown segment in amount mode
   * @default "Remaining"
   */
  remainingLabel?: string;
  /**
   * Unit to display with the remaining segment value in amount mode
   * If not provided, uses the unit from the first data item (if available)
   */
  remainingUnit?: string;
  /**
   * Global unit to display with values in amount mode (e.g., "GB", "datasets", "K")
   * Individual data items can override this with their own unit property
   * Only shown when mode is "amount"
   */
  unit?: string;
}

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

const StackedBarChart = (props: StackedBarChartProps): JSX.Element => {
  const {
    title,
    badge,
    hideBadge = false,
    data,
    width = 240,
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

  // Calculate default badge value
  const defaultBadge = calculateBadgeText(data.length, selectedIndices.length);
  const displayBadge = badge !== undefined ? badge : defaultBadge;

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

  // Calculate percentages for each segment
  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage:
      effectiveMaxAmount > 0 ? (item.value / effectiveMaxAmount) * 100 : 0,
  }));

  // Convert data to legend items format
  const legendItems: LegendItemData[] = dataWithPercentages.map((item) => ({
    name: item.name,
    value: calculateLegendValue(item, mode, showLegendValues, unit),
    color: item.color,
    disabled: item.disabled,
  }));

  // Add remaining item to legend if applicable
  if (hasRemaining && showLegend) {
    // Determine unit for remaining: use remainingUnit if provided, otherwise use unit from first item, then global unit
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
      disabled: true, // Remaining segment is not interactive
    });
  }

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
      // Deselect: remove from array
      newSelectedIndices = selectedIndices.filter((i) => i !== index);
    } else {
      // Select: add to array
      newSelectedIndices = [...selectedIndices, index];
    }

    onSelectionChange(newSelectedIndices);
  };

  const chartContent = (
    <StyledStackedBarChartWrapper>
      <BarContainer width={width}>
        {dataWithPercentages.map((item, index) => {
          const isFirst = index === 0;
          const isLast =
            index === dataWithPercentages.length - 1 && !hasRemaining;

          const barSegment = (
            <BarSegment
              color={item.color}
              percentage={item.percentage}
              height={barHeight}
              isFirst={isFirst}
              isLast={isLast}
              opacity={getSegmentOpacity(index, hoveredIndex, selectedIndices)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSegmentClick(index)}
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
        })}
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
          onSelectionChange={onSelectionChange}
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
        {!hideBadge && <StyledBadge>{displayBadge}</StyledBadge>}
      </TitleContainer>
      {chartContent}
    </ChartWrapper>
  );
};

export default StackedBarChart;
