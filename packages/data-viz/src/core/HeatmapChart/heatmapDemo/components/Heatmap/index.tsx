import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { StyledContainer, StyledHeatmapWrapper } from "./style";
import { useRef } from "react";
import { XAxisWrapper } from "../XAxisChart/style";
import XAxisChart, { XAxisRefType } from "../XAxisChart";
import {
  Y_ITEM_COUNT,
  X_ITEM_COUNT,
  X_AXIS_WIDTH,
  Y_AXIS_WIDTH,
  HEATMAP_ITEM_SIZE,
  Y_AXIS_REVERSE,
} from "../utils";
import YAxisChart, { YAxisRefType } from "../YAxisChart";
import { YAxisWrapper } from "../YAxisChart/style";
import ECharts from "../ECharts";
import { getInstanceByDom } from "echarts";

const Heatmap = () => {
  const clickedLabelX = useRef<number>(-1);
  const clickedLabelY = useRef<number>(-1);
  const XAxisChartRef = useRef<XAxisRefType>(null);
  const YAxisChartRef = useRef<YAxisRefType>(null);
  const geneNames = useSelector(
    (state: RootState) => state.dataReducer.geneNames
  );
  const size = useSelector((state: RootState) => state.dataReducer.size);
  const emphasis = useSelector(
    (state: RootState) => state.dataReducer.emphasis
  );
  const heatmapCanvasSize = useSelector(
    (state: RootState) => state.dataReducer.heatmapCanvasSize
  );
  const camera = useSelector((state: RootState) => state.dataReducer.camera);

  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <StyledContainer>
      <YAxisWrapper
        id="y-axis-wrapper"
        height={camera ? heatmapCanvasSize.height : HEATMAP_ITEM_SIZE * size}
        width={Y_AXIS_WIDTH}
        bottom={0}
      >
        <YAxisChart
          reverse
          ref={YAxisChartRef}
          geneNames={geneNames}
          // eslint-disable-next-line sonarjs/cognitive-complexity
          labelClicked={(label) => {
            clickedLabelX.current = -1;

            if (XAxisChartRef.current) {
              XAxisChartRef.current.changeActiveLabel(-1);
            }

            if (chartRef.current) {
              const echartInstance = getInstanceByDom(chartRef.current);

              if (echartInstance) {
                if (label.index === clickedLabelY.current) {
                  echartInstance.dispatchAction({
                    seriesIndex: 0,
                    type: "downplay",
                  });
                  clickedLabelY.current = -1;
                } else {
                  clickedLabelY.current = label.index;

                  echartInstance.dispatchAction({
                    seriesIndex: [0],
                    type: "downplay",
                  });

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const echartInstanceOptions: any = echartInstance.getOption();
                  const data = echartInstanceOptions.dataset[0].source;

                  const { start, end } = echartInstanceOptions.dataZoom[0]
                    ? echartInstanceOptions.dataZoom[0]
                    : { end: 100, start: 0 };

                  const itemSize = heatmapCanvasSize.height / X_ITEM_COUNT;
                  const heatmapFullHeight = itemSize * size;
                  const quantizedCount = (itemSize * 100) / heatmapFullHeight;
                  const xMin = start / quantizedCount;
                  const xMax = end / quantizedCount;

                  const dataIndex = data
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map(({ x: xData, y: yData, value }: any, idx: any) =>
                      label.index === yData &&
                      xData > xMin - 1 &&
                      xData < xMax + 1 &&
                      Number.isFinite(value)
                        ? idx
                        : null
                    )
                    .filter((v: null) => v !== null);

                  echartInstance.dispatchAction({
                    dataIndex,
                    seriesIndex: 0,
                    type: "highlight",
                  });
                }
              }
            }
          }}
        />
      </YAxisWrapper>

      <XAxisWrapper
        id="x-axis-wrapper"
        height={X_AXIS_WIDTH}
        width={camera ? heatmapCanvasSize.width : HEATMAP_ITEM_SIZE * size}
        left={Y_AXIS_WIDTH}
      >
        <XAxisChart
          ref={XAxisChartRef}
          geneNames={geneNames}
          // eslint-disable-next-line sonarjs/cognitive-complexity
          labelClicked={(label) => {
            clickedLabelY.current = -1;

            if (YAxisChartRef.current) {
              YAxisChartRef.current.changeActiveLabel(-1);
            }

            if (chartRef.current) {
              const echartInstance = getInstanceByDom(chartRef.current);

              if (echartInstance) {
                if (label.index === clickedLabelX.current) {
                  echartInstance?.dispatchAction({
                    seriesIndex: 0,
                    type: "downplay",
                  });
                  clickedLabelX.current = -1;
                } else {
                  clickedLabelX.current = label.index;

                  echartInstance?.dispatchAction({
                    seriesIndex: [0],
                    type: "downplay",
                  });

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const chartInstanceOptions: any = echartInstance.getOption();

                  const data = chartInstanceOptions.dataset[0].source;

                  const { start, end } = chartInstanceOptions.dataZoom[1]
                    ? chartInstanceOptions.dataZoom[1]
                    : { end: 100, start: 0 };

                  const itemSize = heatmapCanvasSize.height / Y_ITEM_COUNT;
                  const heatmapFullHeight = itemSize * size;
                  const quantizedCount = (itemSize * 100) / heatmapFullHeight;
                  const yMin = start / quantizedCount;
                  const yMax = end / quantizedCount;

                  const dataIndex = data
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map(({ x: xData, y: yData, value }: any, idx: any) =>
                      label.index === xData &&
                      yData > yMin - 1 &&
                      yData < yMax + 1 &&
                      Number.isFinite(value)
                        ? idx
                        : null
                    )
                    .filter((v: null) => v !== null);

                  echartInstance?.dispatchAction({
                    dataIndex,
                    seriesIndex: 0,
                    type: "highlight",
                  });
                }
              }
            }
          }}
        />
      </XAxisWrapper>

      <StyledHeatmapWrapper>
        <ECharts
          ref={chartRef}
          xAxisLabelRef={clickedLabelX}
          yAxisLabelRef={clickedLabelY}
          onItemClicked={(item) => {
            if (XAxisChartRef.current && YAxisChartRef.current) {
              if (!item?.x || !item?.y) {
                XAxisChartRef.current.changeActiveLabel(null);
                YAxisChartRef.current.changeActiveLabel(null);
              } else {
                if (emphasis !== "row")
                  XAxisChartRef.current.changeActiveLabel(item?.x);
                if (emphasis !== "column")
                  YAxisChartRef.current.changeActiveLabel(item?.y);
              }
            }

            clickedLabelX.current = item?.x ? item.x : -1;
            clickedLabelY.current = item?.y ? item.y : -1;
          }}
          // eslint-disable-next-line sonarjs/cognitive-complexity
          onAxisChange={(start, end, dir) => {
            // Scroll horizontally
            if (dir === "horizontal") {
              const itemSize = heatmapCanvasSize.width / X_ITEM_COUNT;

              const heatmapFullWidth = itemSize * size;
              const maxToLeft = (size - X_ITEM_COUNT) * itemSize;
              const quantizedMove = Math.round(
                start / ((itemSize * 100) / heatmapFullWidth)
              );

              let moveToLeft = quantizedMove * itemSize;

              moveToLeft =
                (moveToLeft < maxToLeft ? moveToLeft : maxToLeft) * -1;
              if (
                XAxisChartRef &&
                XAxisChartRef.current &&
                XAxisChartRef.current.getWrapperRef() &&
                XAxisChartRef.current.getWrapperRef().current
              ) {
                (
                  XAxisChartRef.current.getWrapperRef()
                    .current as HTMLDivElement
                ).style.left = `${moveToLeft}px`;
              }
            } else {
              // Scroll Vertically
              const itemSize = heatmapCanvasSize.height / Y_ITEM_COUNT;
              const heatmapFullHeight = itemSize * size;
              const maxToBottom = (size - Y_ITEM_COUNT) * itemSize;
              // console.table({itemSize, heatmapFullHeight, maxToBottom});

              const quantizedMove = Math.round(
                start / ((itemSize * 100) / heatmapFullHeight)
              );
              let moveToBottom = quantizedMove * itemSize;
              moveToBottom =
                (moveToBottom < maxToBottom ? moveToBottom : maxToBottom) * -1;
              if (
                YAxisChartRef &&
                YAxisChartRef.current &&
                YAxisChartRef.current.getWrapperRef() &&
                YAxisChartRef.current.getWrapperRef().current
              ) {
                if (Y_AXIS_REVERSE) {
                  (
                    YAxisChartRef.current.getWrapperRef()
                      .current as HTMLDivElement
                  ).style.top = `${moveToBottom}px`;
                } else {
                  (
                    YAxisChartRef.current.getWrapperRef()
                      .current as HTMLDivElement
                  ).style.bottom = `${moveToBottom}px`;
                }
              }
            }
          }}
        />
      </StyledHeatmapWrapper>
    </StyledContainer>
  );
};

export default Heatmap;
