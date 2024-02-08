import { createContext } from "react";
import { EChartsType } from "echarts";

export interface ChartContextValue {
  chartInstance: EChartsType | undefined;
  setChartInstance: React.Dispatch<
    React.SetStateAction<EChartsType | undefined>
  >;
}

export const AppContext = createContext<ChartContextValue | undefined>(
  undefined
);
