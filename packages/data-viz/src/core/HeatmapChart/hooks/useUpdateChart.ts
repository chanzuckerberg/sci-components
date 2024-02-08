import { throttle } from "lodash";
import { useEffect, useMemo } from "react";
import { CreateChartOptionsProps, createChartOptions } from "./utils";

const UPDATE_THROTTLE_MS = 1 * 100;

export interface UpdateChartProps extends CreateChartOptionsProps {
  chart: echarts.ECharts | null;
}

export function useUpdateChart({
  axisPointer,
  camera,
  chart,
  data,
  emphasis,
  xAxisData,
  yAxisData,
  width,
  height,
  encode,
  itemStyle,
  symbol,
  symbolSize,
  grid,
  options,
  onEvents,
}: UpdateChartProps): void {
  const throttledUpdateChart = useMemo(() => {
    return throttle(
      () => {
        if (!chart || !data || !xAxisData || !yAxisData) {
          return;
        }

        // (thuang): resize() needs to be called before setOption() to prevent
        // TypeError: Cannot read properties of undefined (reading 'shouldBePainted')
        chart.resize();

        const chartOptions = createChartOptions({
          axisPointer,
          camera,
          data,
          emphasis,
          encode,
          grid,
          height,
          itemStyle,
          options,
          symbol,
          symbolSize,
          width,
          xAxisData,
          yAxisData,
        });

        chart.setOption(chartOptions, {
          replaceMerge: ["dataZoom", "tooltip"],
        });

        /**
         * We need to remove old event listeners and bind new ones to
         * make sure that the event listeners are updated when the props change.
         */
        if (onEvents) {
          for (const eventName in onEvents) {
            if (
              Object.prototype.hasOwnProperty.call(onEvents, eventName) &&
              typeof eventName === "string" &&
              typeof onEvents[eventName] === "function"
            ) {
              // Remove old event listener
              chart.off(eventName);

              // Add new event listener
              chart.on(eventName, (event) => {
                onEvents[eventName](event, chart);
              });
            }
          }
        }
      },
      UPDATE_THROTTLE_MS,
      // (thuang): Trailing guarantees that the last call to the function will
      // be executed
      { trailing: true }
    );
  }, [
    axisPointer,
    camera,
    chart,
    data,
    emphasis,
    xAxisData,
    yAxisData,
    width,
    height,
    encode,
    itemStyle,
    symbol,
    symbolSize,
    grid,
    options,
    onEvents,
  ]);

  useEffect(() => {
    return () => throttledUpdateChart.cancel();
  }, [throttledUpdateChart]);

  // Update the charts
  useEffect(() => {
    throttledUpdateChart();
  }, [
    axisPointer,
    camera,
    chart,
    data,
    emphasis,
    xAxisData,
    yAxisData,
    throttledUpdateChart,
    width,
    height,
    encode,
    itemStyle,
    symbol,
    symbolSize,
    grid,
    options,
    onEvents,
  ]);
}
