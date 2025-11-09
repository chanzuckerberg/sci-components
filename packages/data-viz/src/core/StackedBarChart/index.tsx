import { cloneElement, HTMLAttributes, useState } from "react";
import {
  Legend,
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
  tooltip: TooltipTableContentProps;
}

export interface StackedBarChartProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Title to display above the chart
   */
  title?: string;
  /**
   * Badge text to display next to the title
   */
  badge?: string;
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
}

const StackedBarChart = (props: StackedBarChartProps): JSX.Element => {
  const {
    title,
    badge,
    data,
    width = 240,
    barHeight = 16,
    showLegend = true,
    showLegendValues = true,
    selectedIndices = [],
    onSelectionChange,
    ...rest
  } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages for each segment
  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0,
  }));

  // Convert data to legend items format
  const legendItems: LegendItemData[] = dataWithPercentages.map((item) => ({
    name: item.name,
    value: showLegendValues ? `${Math.round(item.percentage)}%` : undefined,
    color: item.color,
  }));

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

  // Determine if a segment should be dimmed
  const hasSelection = selectedIndices.length > 0;
  const getSegmentOpacity = (index: number) => {
    if (hoveredIndex !== null) {
      // When hovering: full opacity for hovered and selected, dimmed for others
      return hoveredIndex === index || selectedIndices.includes(index)
        ? 1
        : 0.3;
    }
    if (hasSelection) {
      // When selection exists: full opacity for selected, dimmed for others
      return selectedIndices.includes(index) ? 1 : 0.3;
    }
    return 1;
  };

  const chartContent = (
    <StyledStackedBarChartWrapper>
      <BarContainer width={width}>
        {dataWithPercentages.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === dataWithPercentages.length - 1;

          const barSegment = (
            <BarSegment
              color={item.color}
              percentage={item.percentage}
              height={barHeight}
              isFirst={isFirst}
              isLast={isLast}
              opacity={getSegmentOpacity(index)}
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
            >
              {barSegment}
            </Tooltip>
          ) : (
            cloneElement(barSegment, { key: `${item.name}-${index}` })
          );
        })}
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
        {badge ? <StyledBadge>{badge}</StyledBadge> : null}
      </TitleContainer>
      {chartContent}
    </ChartWrapper>
  );
};

export default StackedBarChart;
