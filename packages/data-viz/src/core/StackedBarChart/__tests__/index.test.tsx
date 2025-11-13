/* eslint-disable sonarjs/no-duplicate-string */
import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen, fireEvent } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import StackedBarChart from "../index";

const { Test } = composeStories(stories);

const STACKED_BAR_CHART_TEST_ID = "stacked-bar-chart";
const BUTTON_ROLE = "button";

const sampleData = [
  {
    name: "Category A",
    value: 100,
    tooltip: { showSectionHeader: false, data: [] },
  },
  {
    name: "Category B",
    value: 200,
    tooltip: { showSectionHeader: false, data: [] },
  },
  {
    name: "Category C",
    value: 300,
    tooltip: { showSectionHeader: false, data: [] },
  },
];

describe("<StackedBarChart />", () => {
  generateSnapshots(stories);

  it("renders StackedBarChart component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId(STACKED_BAR_CHART_TEST_ID);
    expect(elements.length).toBeTruthy();
  });

  it("renders with title", () => {
    render(
      <StackedBarChart
        data={sampleData}
        title="Test Chart"
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("Test Chart")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <StackedBarChart
        data={sampleData}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const chartElement = screen.getByTestId(STACKED_BAR_CHART_TEST_ID);
    expect(chartElement).toBeInTheDocument();
  });

  it("displays default badge with item count", () => {
    render(
      <StackedBarChart
        data={sampleData}
        title="Test Chart"
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays custom badge text", () => {
    render(
      <StackedBarChart
        data={sampleData}
        title="Test Chart"
        badge="Custom Badge"
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("hides badge when hideBadge is true", () => {
    render(
      <StackedBarChart
        data={sampleData}
        title="Test Chart"
        badge="Badge Text"
        hideBadge
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.queryByText("Badge Text")).not.toBeInTheDocument();
  });

  it("displays Count of items in badge when all items are selected", () => {
    render(
      <StackedBarChart
        data={sampleData}
        title="Test Chart"
        selectedIndices={[0, 1, 2]}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays 'X of Y' badge for partial selection", () => {
    render(
      <StackedBarChart
        data={sampleData}
        title="Test Chart"
        selectedIndices={[0, 1]}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("2 of 3")).toBeInTheDocument();
  });

  it("shows legend by default", () => {
    render(
      <StackedBarChart
        data={sampleData}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
    expect(screen.getByText("Category C")).toBeInTheDocument();
  });

  it("hides legend when showLegend is false", () => {
    render(
      <StackedBarChart
        data={sampleData}
        showLegend={false}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.queryByText("Category A")).not.toBeInTheDocument();
    expect(screen.queryByText("Category B")).not.toBeInTheDocument();
    expect(screen.queryByText("Category C")).not.toBeInTheDocument();
  });

  it("shows percentage values in legend in percentage mode", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="porportional"
        showLegendValues
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    // 100/(100+200+300) = 17%, 200/600 = 33%, 300/600 = 50%
    expect(screen.getByText("17%")).toBeInTheDocument();
    expect(screen.getByText("33%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("shows amount values with unit in cumulative mode", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="cumulative"
        unit="datasets"
        showLegendValues
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("100 datasets")).toBeInTheDocument();
    expect(screen.getByText("200 datasets")).toBeInTheDocument();
    expect(screen.getByText("300 datasets")).toBeInTheDocument();
  });

  it("hides legend values when showLegendValues is false", () => {
    render(
      <StackedBarChart
        data={sampleData}
        showLegendValues={false}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
  });

  it("renders remaining segment in cumulative mode with maxAmount", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="cumulative"
        maxAmount={1000}
        showLegendValues
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    // Total is 600, remaining is 400
    expect(screen.getByText("Remaining")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
  });

  it("uses custom remainingLabel", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="cumulative"
        maxAmount={1000}
        remainingLabel="Unknown"
        showLegendValues
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("uses remainingUnit for remaining segment", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="cumulative"
        maxAmount={1000}
        remainingUnit="GB"
        showLegendValues
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("400 GB")).toBeInTheDocument();
  });

  it("calls onSelectionChange when segment is clicked", () => {
    const handleSelectionChange = jest.fn();

    render(
      <StackedBarChart
        data={sampleData}
        selectedIndices={[]}
        onSelectionChange={handleSelectionChange}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const firstLegendItem = screen.getByRole(BUTTON_ROLE, {
      name: /Category A/i,
    });
    fireEvent.click(firstLegendItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith([0], [sampleData[0]]);
  });

  it("deselects item when clicking selected item", () => {
    const handleSelectionChange = jest.fn();

    render(
      <StackedBarChart
        data={sampleData}
        selectedIndices={[0]}
        onSelectionChange={handleSelectionChange}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const firstLegendItem = screen.getByRole(BUTTON_ROLE, {
      name: /Category A/i,
    });
    fireEvent.click(firstLegendItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith([], []);
  });

  it("supports multi-selection", () => {
    const handleSelectionChange = jest.fn();

    render(
      <StackedBarChart
        data={sampleData}
        selectedIndices={[0]}
        onSelectionChange={handleSelectionChange}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const secondLegendItem = screen.getByRole(BUTTON_ROLE, {
      name: /Category B/i,
    });
    fireEvent.click(secondLegendItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith(
      [0, 1],
      [sampleData[0], sampleData[1]]
    );
  });

  it("respects custom width", () => {
    render(
      <StackedBarChart
        data={sampleData}
        width="500px"
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const chartElement = screen.getByTestId(STACKED_BAR_CHART_TEST_ID);
    expect(chartElement).toBeInTheDocument();
  });

  it("renders with custom colors from data", () => {
    const dataWithColors = [
      {
        name: "Red Item",
        value: 100,
        color: "#FF0000",
        tooltip: { showSectionHeader: false, data: [] },
      },
      {
        name: "Blue Item",
        value: 200,
        color: "#0000FF",
        tooltip: { showSectionHeader: false, data: [] },
      },
    ];

    render(
      <StackedBarChart
        data={dataWithColors}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("Red Item")).toBeInTheDocument();
    expect(screen.getByText("Blue Item")).toBeInTheDocument();
  });

  it("generates colors when not provided in data", () => {
    render(
      <StackedBarChart
        data={sampleData}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    // Just verify the chart renders - color generation is internal
    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
    expect(screen.getByText("Category C")).toBeInTheDocument();
  });

  it("renders disabled items in legend", () => {
    const dataWithDisabled = [
      {
        name: "Active Item",
        value: 100,
        tooltip: { showSectionHeader: false, data: [] },
      },
      {
        name: "Disabled Item",
        value: 200,
        disabled: true,
        tooltip: { showSectionHeader: false, data: [] },
      },
    ];

    render(
      <StackedBarChart
        data={dataWithDisabled}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const disabledItem = screen.getByRole(BUTTON_ROLE, {
      name: /Disabled Item/i,
    });
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
  });

  it("uses item-specific units over global unit", () => {
    const dataWithUnits = [
      {
        name: "Item with GB",
        value: 100,
        unit: "GB",
        tooltip: { showSectionHeader: false, data: [] },
      },
      {
        name: "Item with MB",
        value: 200,
        unit: "MB",
        tooltip: { showSectionHeader: false, data: [] },
      },
    ];

    render(
      <StackedBarChart
        data={dataWithUnits}
        mode="cumulative"
        unit="KB"
        showLegendValues
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.getByText("100 GB")).toBeInTheDocument();
    expect(screen.getByText("200 MB")).toBeInTheDocument();
  });

  it("does not render remaining segment when total equals maxAmount", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="cumulative"
        maxAmount={600}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.queryByText("Remaining")).not.toBeInTheDocument();
  });

  it("does not render remaining segment in percentage mode", () => {
    render(
      <StackedBarChart
        data={sampleData}
        mode="porportional"
        maxAmount={1000}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    expect(screen.queryByText("Remaining")).not.toBeInTheDocument();
  });

  it("handles empty data array", () => {
    render(
      <StackedBarChart
        data={[]}
        title="Empty Chart"
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const chartElement = screen.getByTestId(STACKED_BAR_CHART_TEST_ID);
    expect(chartElement).toBeInTheDocument();
    expect(screen.getByText("Empty Chart")).toBeInTheDocument();
  });

  it("renders without onSelectionChange callback", () => {
    render(
      <StackedBarChart
        data={sampleData}
        data-testid={STACKED_BAR_CHART_TEST_ID}
      />
    );

    const firstLegendItem = screen.getByRole(BUTTON_ROLE, {
      name: /Category A/i,
    });

    // Should not throw error when clicking without callback
    expect(() => fireEvent.click(firstLegendItem)).not.toThrow();
  });

  it("passes additional props to wrapper", () => {
    render(
      <StackedBarChart
        data={sampleData}
        data-testid={STACKED_BAR_CHART_TEST_ID}
        aria-label="Test Chart"
      />
    );

    const chartElement = screen.getByTestId(STACKED_BAR_CHART_TEST_ID);
    expect(chartElement).toHaveAttribute("aria-label", "Test Chart");
  });
});
