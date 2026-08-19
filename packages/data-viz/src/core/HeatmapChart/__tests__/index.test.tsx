import { render, screen } from "@testing-library/react";
import { getInstanceByDom } from "echarts";
import HeatmapChart from "..";

const DATA = [{ percentage: 0.5, x: 0, y: 0 }];

function optionOf(element: HTMLElement) {
  return getInstanceByDom(element)?.getOption() as Record<string, unknown>;
}

function dataZoomOf(element: HTMLElement) {
  return optionOf(element).dataZoom as Record<string, unknown>[];
}

describe("<HeatmapChart />", () => {
  it("gives the chart the dataZoom it is passed", () => {
    render(
      <HeatmapChart
        data-testid="heatmap"
        camera={{ active: true, height: 2, width: 2 }}
        data={DATA}
        dataZoom={{ moveOnMouseWheel: true }}
        encode={{ x: "x", y: "y" }}
        height={100}
        width={100}
        xAxisData={["gene1"]}
        yAxisData={["cellType1"]}
      />
    );

    // One object is read as a change to both axes, on top of the defaults the
    // camera window sets - which is why the default of false is what it is
    // overriding here.
    const [x, y] = dataZoomOf(screen.getByTestId("heatmap"));

    expect(x.moveOnMouseWheel).toBe(true);
    expect(y.moveOnMouseWheel).toBe(true);
  });

  it("leaves the chart unzoomed while the camera is off", () => {
    render(
      <HeatmapChart
        data-testid="heatmap"
        data={DATA}
        dataZoom={{ moveOnMouseWheel: true }}
        encode={{ x: "x", y: "y" }}
        height={100}
        width={100}
        xAxisData={["gene1"]}
        yAxisData={["cellType1"]}
      />
    );

    // dataZoom is the camera window's own configuration, so without an active
    // camera there is nothing for it to configure.
    expect(dataZoomOf(screen.getByTestId("heatmap"))).toEqual([]);
  });
});
