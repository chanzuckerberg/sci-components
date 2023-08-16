import { ECharts, ElementEvent, init } from "echarts";
import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
  memo,
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
  onChartMouseMove?: (event: ElementEvent, chart: ECharts) => void;
  /**
   * TODO(thuang): We still need to expose `configs` prop as described in the
   * doc below as an escape hatch that gives SDS users full control of echarts config options:
   * https://docs.google.com/document/d/1GuO-vUFylQpU7D-IB1HPuInvVk6Z0iJ0ZXchFDyxZLY/edit#bookmark=id.ah4nkv44hdfp
   */
}

function HeatmapChart(
  props: HeatmapChartProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const {
    width,
    height,
    echartsRendererMode = "canvas",
    onChartMouseMove,
    xAxisData,
    yAxisData,
    data,
    encode,
    itemStyle,
    symbolSize = 5,
    grid,
    ...rest
  } = props;

  if (!width || !height) {
    throw Error("Chart must have width and height > 0");
  }

  const [isChartInitialized, setIsChartInitialized] = useState(false);

  const [chart, setChart] = useState<ECharts | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Initialize charts
  useEffect(() => {
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

    setIsChartInitialized(true);

    const rawChart = init(current, EMPTY_OBJECT, {
      renderer: echartsRendererMode,
      useDirtyRect: true,
    });

    if (onChartMouseMove) {
      rawChart.getZr().on("mousemove", function (event: ElementEvent) {
        onChartMouseMove(event, rawChart);
      });
    }

    setChart(rawChart);
  }, [innerRef, isChartInitialized, echartsRendererMode, onChartMouseMove]);

  useUpdateChart({
    chart,
    data,
    encode,
    grid,
    height,
    itemStyle,
    symbolSize,
    width,
    xAxisData,
    yAxisData,
  });

  return (
    <ChartContainer height={height} width={width} ref={handleRef} {...rest} />
  );

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

export default memo(forwardRef(HeatmapChart));
