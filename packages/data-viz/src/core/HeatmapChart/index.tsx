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

export interface HeatmapChartProps
  extends HTMLAttributes<HTMLDivElement>,
    CreateChartOptionsProps {
  echartsRendererMode?: "svg" | "canvas";
}

const HeatmapChart = forwardRef(
  (
    props: HeatmapChartProps,
    ref: ForwardedRef<HTMLDivElement>
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ): JSX.Element => {
    const {
      axisPointer,
      width,
      height,
      echartsRendererMode = "svg",
      camera,
      onEvents,
      xAxisData,
      yAxisData,
      data,
      encode,
      emphasis,
      itemStyle,
      symbol,
      symbolSize = 5,
      grid,
      options,
      ...rest
    } = props;

    // Validate width and height
    if (!width || !height) {
      throw Error("Chart must have width and height > 0");
    }

    // State for chart initialization
    const [isChartInitialized, setIsChartInitialized] = useState(false);

    // State for ECharts instance
    const [chart, setChart] = useState<ECharts | null>(null);

    // Ref for the chart container
    const innerRef = useRef<HTMLDivElement | null>(null);

    // Function to initialize the chart
    const initChart = useCallback(() => {
      const { current } = innerRef;

      if (
        !current ||
        isChartInitialized ||
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

      setIsChartInitialized(true);

      // Bind events if provided
      if (onEvents) {
        bindEvents(rawChart, onEvents);
      }

      setChart(rawChart);

      // Cleanup function
      return () => {
        chart?.dispose();

        // Unbind events if provided
        if (onEvents) {
          for (const eventName in onEvents) {
            if (
              Object.prototype.hasOwnProperty.call(onEvents, eventName) &&
              typeof eventName === "string" &&
              typeof onEvents[eventName] === "function"
            ) {
              rawChart.off(eventName, onEvents[eventName]);
            }
          }
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chart, echartsRendererMode, isChartInitialized, onEvents]);

    // Initialize charts on component mount
    useEffect(() => {
      initChart();
    }, [initChart]);

    // Reinitialize chart if renderer mode changes
    useEffect(() => {
      chart?.dispose();
      setIsChartInitialized(false);
      setChart(null);
      initChart();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [echartsRendererMode]);

    // Hook to update chart data and options
    useUpdateChart({
      axisPointer,
      camera,
      chart,
      data,
      emphasis,
      encode,
      grid,
      height,
      itemStyle,
      onEvents,
      options,
      symbol,
      symbolSize,
      width,
      xAxisData,
      yAxisData,
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

export default memo(HeatmapChart);
