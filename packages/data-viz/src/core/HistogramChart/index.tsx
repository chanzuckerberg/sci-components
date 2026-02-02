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

import { EMPTY_OBJECT } from "src/common/utils";
import { useUpdateChart } from "./hooks/useUpdateChart";
import { CreateChartOptionsProps } from "./hooks/utils";
import { ChartContainer } from "./style";

export interface HistogramChartProps
  extends HTMLAttributes<HTMLDivElement>,
    CreateChartOptionsProps {
  echartsRendererMode?: "svg" | "canvas";
}

const HistogramChart = forwardRef(
  (
    props: HistogramChartProps,
    ref: ForwardedRef<HTMLDivElement>
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ): JSX.Element => {
    const {
      axisPointer,
      barCategoryGap,
      barGap,
      barWidth,
      barColor,
      chartTitle,
      showTitle,
      data,
      dataZoom,
      echartsRendererMode = "svg",
      emphasis,
      grid,
      height,
      itemStyle,
      onEvents,
      options,
      width,
      xAxisData,
      xAxisTitle,
      yAxisTitle,
      ...rest
    } = props;

    // Validate width and height
    if (!width || !height) {
      throw Error("Histogram must have width and height bigger than Zero!");
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
      axisPointer,
      barCategoryGap,
      barGap,
      barWidth,
      barColor,
      chart,
      chartTitle,
      showTitle,
      data,
      dataZoom,
      emphasis,
      grid,
      height,
      itemStyle,
      onEvents,
      options,
      width,
      xAxisData,
      xAxisTitle,
      yAxisTitle,
    });

    // Render the chart container
    return (
      <ChartContainer height={height} width={width} ref={handleRef} {...rest} />
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

export default memo(HistogramChart);
