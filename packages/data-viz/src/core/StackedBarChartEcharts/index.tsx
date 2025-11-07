import { ECharts, init } from "echarts";
import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Legend, type LegendItemData } from "@czi-sds/components";

import { EMPTY_OBJECT } from "src/common/utils";
import { useUpdateChart } from "./hooks/useUpdateChart";
import {
  CreateChartOptionsProps,
  StackedBarChartDataItem,
} from "./hooks/utils";
import {
  ChartContainer,
  ChartTitle,
  ChartWrapper,
  StyledBadge,
  TitleContainer,
} from "./style";

export type { StackedBarChartDataItem };

export interface StackedBarChartProps
  extends HTMLAttributes<HTMLDivElement>,
    CreateChartOptionsProps {
  echartsRendererMode?: "svg" | "canvas";
  /**
   * Title to display above the chart
   */
  title?: string;
  /**
   * Badge text to display next to the title
   */
  badge?: string;
  /**
   * Use custom SDS Legend component instead of ECharts built-in legend
   * @default false
   */
  useCustomLegend?: boolean;
  /**
   * Show values in the custom legend
   * @default true
   */
  showLegendValues?: boolean;
  /**
   * Array of selected legend item indices (controlled component)
   */
  selectedIndices?: number[];
  /**
   * Callback when legend selection changes
   * @param selectedIndices Array of selected indices
   */
  onSelectionChange?: (selectedIndices: number[]) => void;
}

const StackedBarChart = forwardRef(
  (
    props: StackedBarChartProps,
    ref: ForwardedRef<HTMLDivElement>
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ): JSX.Element => {
    const {
      width,
      height,
      echartsRendererMode = "svg",
      onEvents,
      data,
      barHeight,
      showLegend,
      legend,
      grid,
      options,
      title,
      badge,
      useCustomLegend = false,
      showLegendValues = true,
      selectedIndices,
      onSelectionChange,
      ...rest
    } = props;

    // Validate width and height
    if (!width || !height) {
      throw Error(
        "StackedBarChart must have width and height bigger than Zero!"
      );
    }

    // Ref for the chart container
    const innerRef = useRef<HTMLDivElement | null>(null);

    /**
     * (thuang): We need both a state and a ref to store the chart instance, so
     * some hooks can opt out of re-rendering when the chart instance changes.
     */
    const [chart, setChart] = useState<ECharts | null>(null);
    const chartRef = useRef(chart);

    /**
     * (thuang): Use this ref to store the onEvents prop to prevent
     * unnecessary re-renders when the onEvents prop changes.
     * NOTE: This implies that `onEvents` prop changes alone from the parent
     * won't re-render the chart
     */
    const onEventsRef = useRef(onEvents);

    /**
     * (thuang): Use this function to dispose the chart instance for both
     * the state and the ref. This is to prevent memory leaks.
     */
    const disposeChart = useCallback(() => {
      chartRef.current?.dispose();
      chartRef.current = null;
      setChart(null);
    }, []);

    // Function to initialize the chart
    const initChart = useCallback(() => {
      const onEventsCurrent = onEventsRef.current;
      const { current } = innerRef;

      if (
        !current ||
        chartRef.current ||
        // (thuang): echart's `init()` will throw error if the container has 0 width or height
        current?.getAttribute("height") === "0" ||
        current?.getAttribute("width") === "0"
      ) {
        return;
      }

      // Initialize ECharts instance
      const rawChart = init(current, EMPTY_OBJECT, {
        renderer: echartsRendererMode,
        useDirtyRect: true,
      });

      // Bind events if provided
      if (onEventsCurrent) {
        bindEvents(rawChart, onEventsCurrent);
      }

      setChart(rawChart);
      chartRef.current = rawChart;

      // Cleanup function
      return () => {
        disposeChart();

        // Unbind events if provided
        if (onEventsCurrent) {
          for (const eventName in onEventsCurrent) {
            if (
              Object.prototype.hasOwnProperty.call(
                onEventsCurrent,
                eventName
              ) &&
              typeof eventName === "string" &&
              typeof onEventsCurrent[eventName] === "function"
            ) {
              rawChart.off(eventName, onEventsCurrent[eventName]);
            }
          }
        }
      };
    }, [echartsRendererMode, disposeChart]);

    // Initialize charts on component mount
    useEffect(() => {
      disposeChart();
      initChart();
    }, [initChart, disposeChart]);

    // Hook to update chart data and options
    useUpdateChart({
      barHeight,
      chart,
      data,
      grid,
      height,
      legend,
      onEvents,
      options,
      showLegend: useCustomLegend ? false : showLegend, // Disable ECharts legend if using custom
      width,
    });

    // Convert data to legend items format
    const legendItems: LegendItemData[] = data.map((item) => ({
      name: item.name,
      value: item.value,
      color: item.color,
    }));

    // Handle legend item hover - trigger ECharts highlight
    const handleLegendItemHover = (item: LegendItemData, index: number) => {
      if (!chart) return;

      chart.dispatchAction({
        type: "highlight",
        seriesIndex: index,
      });
    };

    // Handle legend item leave - remove ECharts highlight
    const handleLegendItemLeave = () => {
      if (!chart) return;

      chart.dispatchAction({
        type: "downplay",
      });
    };

    // When selection changes, highlight selected segments or downplay all
    useEffect(() => {
      if (!chart || !useCustomLegend) return;

      if (selectedIndices && selectedIndices.length > 0) {
        // Highlight only selected segments
        selectedIndices.forEach((index) => {
          chart.dispatchAction({
            type: "highlight",
            seriesIndex: index,
          });
        });
      } else {
        // No selection - downplay all
        chart.dispatchAction({
          type: "downplay",
        });
      }
    }, [chart, selectedIndices, useCustomLegend]);

    // Render the chart container
    const chartElement = (
      <ChartContainer height={height} width={width} ref={handleRef} {...rest} />
    );

    // Render custom legend if enabled and showLegend is true
    const customLegendElement =
      useCustomLegend && showLegend ? (
        <Legend
          items={legendItems}
          showValues={showLegendValues}
          onItemMouseEnter={handleLegendItemHover}
          onItemMouseLeave={handleLegendItemLeave}
          selectedIndices={selectedIndices}
          onSelectionChange={onSelectionChange}
        />
      ) : null;

    // If no title, render chart and optional custom legend
    if (!title) {
      return customLegendElement ? (
        <ChartWrapper>
          {chartElement}
          {customLegendElement}
        </ChartWrapper>
      ) : (
        chartElement
      );
    }

    // Render with title, optional badge, chart, and optional custom legend
    return (
      <ChartWrapper>
        <TitleContainer>
          <ChartTitle>{title}</ChartTitle>
          {badge && <StyledBadge>{badge}</StyledBadge>}
        </TitleContainer>
        {chartElement}
        {customLegendElement}
      </ChartWrapper>
    );

    // Function to bind events to the ECharts instance
    function bindEvents(
      instance: ECharts,
      events: CreateChartOptionsProps["onEvents"]
    ) {
      function innerBindEvent(
        eventName: string,
        func: (event: unknown, chart: ECharts) => void
      ) {
        // Ignore invalid event configurations
        if (typeof eventName === "string" && typeof func === "function") {
          // Bind event
          instance.on(eventName, (param) => {
            func(param, instance);
          });
        }
      }

      // Loop through events and bind them
      for (const eventName in events) {
        if (Object.prototype.hasOwnProperty.call(events, eventName)) {
          innerBindEvent(eventName, events[eventName]);
        }
      }
    }

    // Function to handle the ref of the chart container
    function handleRef(element: HTMLDivElement | null) {
      innerRef.current = element;

      if (!ref) return;

      // (thuang): `ref` from `forwardRef` can be a function or a ref object
      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    }
  }
);

StackedBarChart.displayName = "StackedBarChart";

const StackedBarChartMemo = memo(StackedBarChart);

export { StackedBarChartMemo as StackedBarChart };
export default StackedBarChartMemo;
