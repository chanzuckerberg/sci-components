import throttle from "lodash/throttle";
import { useEffect, useMemo } from "react";
import { CreateChartOptionsProps, createChartOptions } from "./utils";

const UPDATE_THROTTLE_MS = 1 * 100;

export interface UpdateChartProps extends CreateChartOptionsProps {
  chart: echarts.ECharts | null;
}

export function useUpdateChart({
  chart,
  data,
  xAxisData,
  yAxisData,
  width,
  height,
  encode,
  itemStyle,
  symbolSize,
  grid,
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

        chart.setOption(
          createChartOptions({
            data,
            encode,
            grid,
            height,
            itemStyle,
            symbolSize,
            width,
            xAxisData,
            yAxisData,
          })
        );
      },
      UPDATE_THROTTLE_MS,
      // (thuang): Trailing guarantees that the last call to the function will
      // be executed
      { trailing: true }
    );
  }, [
    chart,
    data,
    xAxisData,
    yAxisData,
    width,
    height,
    encode,
    itemStyle,
    symbolSize,
    grid,
  ]);

  useEffect(() => {
    return () => throttledUpdateChart.cancel();
  }, [throttledUpdateChart]);

  // Update the charts
  useEffect(() => {
    throttledUpdateChart();
  }, [
    chart,
    data,
    xAxisData,
    yAxisData,
    throttledUpdateChart,
    width,
    height,
    encode,
    itemStyle,
    symbolSize,
    grid,
  ]);
}
