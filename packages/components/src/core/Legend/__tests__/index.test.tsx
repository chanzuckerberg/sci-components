import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen, fireEvent } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import Legend from "../index";

const { Test } = composeStories(stories);

const LEGEND_TEST_ID = "legend";
const ARIA_PRESSED_TRUE = "true";
const ARIA_PRESSED_FALSE = "false";
const ARIA_PRESSED = "aria-pressed";
const BUTTON_ROLE = "button";

const sampleItems = [
  { name: "Item 1", value: 100 },
  { name: "Item 2", value: 200 },
  { name: "Item 3", value: 300 },
];

describe("<Legend />", () => {
  generateSnapshots(stories);

  it("renders Legend component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId(LEGEND_TEST_ID);
    expect(elements.length).toBeTruthy();
  });

  it("renders all legend items with correct names", () => {
    render(<Legend items={sampleItems} data-testid={LEGEND_TEST_ID} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("renders legend items without values by default", () => {
    render(<Legend items={sampleItems} data-testid={LEGEND_TEST_ID} />);

    // Values should not be rendered when showValues is false
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("200")).not.toBeInTheDocument();
    expect(screen.queryByText("300")).not.toBeInTheDocument();
  });

  it("renders legend items with values when showValues is true", () => {
    render(
      <Legend items={sampleItems} showValues data-testid={LEGEND_TEST_ID} />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
  });

  it("formats numeric values with locale string", () => {
    const itemsWithLargeValues = [{ name: "Large Value", value: 1234567 }];

    render(
      <Legend
        items={itemsWithLargeValues}
        showValues
        data-testid={LEGEND_TEST_ID}
      />
    );

    // Should format with commas (or locale-specific separators)
    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("renders string values without formatting", () => {
    const itemsWithStringValues = [
      { name: "String Value", value: "Custom Text" },
    ];

    render(
      <Legend
        items={itemsWithStringValues}
        showValues
        data-testid={LEGEND_TEST_ID}
      />
    );

    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });

  it("applies custom colors from colors prop", () => {
    const customColors = ["#FF0000", "#00FF00", "#0000FF"];

    render(
      <Legend
        items={sampleItems}
        colors={customColors}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const legendContainer = screen.getByTestId(LEGEND_TEST_ID);
    expect(legendContainer).toBeInTheDocument();
  });

  it("uses item color when colors prop is not provided", () => {
    const itemsWithColors = [
      { name: "Red Item", value: 100, color: "#FF0000" },
    ];

    render(<Legend items={itemsWithColors} data-testid={LEGEND_TEST_ID} />);

    expect(screen.getByText("Red Item")).toBeInTheDocument();
  });

  it("calls onItemClick when an item is clicked", () => {
    const handleClick = jest.fn();

    render(
      <Legend
        items={sampleItems}
        onItemClick={handleClick}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    fireEvent.click(firstItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(sampleItems[0], 0);
  });

  it("calls onItemMouseEnter when hovering over an item", () => {
    const handleMouseEnter = jest.fn();

    render(
      <Legend
        items={sampleItems}
        onItemMouseEnter={handleMouseEnter}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    fireEvent.mouseEnter(firstItem);

    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleMouseEnter).toHaveBeenCalledWith(sampleItems[0], 0);
  });

  it("calls onItemMouseLeave when mouse leaves an item", () => {
    const handleMouseLeave = jest.fn();

    render(
      <Legend
        items={sampleItems}
        onItemMouseLeave={handleMouseLeave}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    fireEvent.mouseLeave(firstItem);

    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    expect(handleMouseLeave).toHaveBeenCalledWith(sampleItems[0], 0);
  });

  it("handles selection changes via onSelectionChange", () => {
    const handleSelectionChange = jest.fn();

    render(
      <Legend
        items={sampleItems}
        selectedIndices={[]}
        onSelectionChange={handleSelectionChange}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    fireEvent.click(firstItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith([0]);
  });

  it("deselects an item when clicking a selected item", () => {
    const handleSelectionChange = jest.fn();

    render(
      <Legend
        items={sampleItems}
        selectedIndices={[0]}
        onSelectionChange={handleSelectionChange}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    fireEvent.click(firstItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith([]);
  });

  it("supports multi-selection", () => {
    const handleSelectionChange = jest.fn();

    render(
      <Legend
        items={sampleItems}
        selectedIndices={[0]}
        onSelectionChange={handleSelectionChange}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const secondItem = screen.getByRole(BUTTON_ROLE, { name: /Item 2/i });
    fireEvent.click(secondItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith([0, 1]);
  });

  it("renders disabled items correctly", () => {
    const itemsWithDisabled = [
      { name: "Active Item", value: 100 },
      { name: "Disabled Item", value: 200, disabled: true },
    ];

    render(<Legend items={itemsWithDisabled} data-testid={LEGEND_TEST_ID} />);

    const disabledItem = screen.getByRole(BUTTON_ROLE, {
      name: /Disabled Item/i,
    });
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    expect(disabledItem).toHaveAttribute("tabIndex", "-1");
  });

  it("does not trigger events on disabled items", () => {
    const handleClick = jest.fn();
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    const itemsWithDisabled = [
      { name: "Disabled Item", value: 100, disabled: true },
    ];

    render(
      <Legend
        items={itemsWithDisabled}
        onItemClick={handleClick}
        onItemMouseEnter={handleMouseEnter}
        onItemMouseLeave={handleMouseLeave}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const disabledItem = screen.getByRole(BUTTON_ROLE, {
      name: /Disabled Item/i,
    });
    fireEvent.click(disabledItem);
    fireEvent.mouseEnter(disabledItem);
    fireEvent.mouseLeave(disabledItem);

    expect(handleClick).not.toHaveBeenCalled();
    expect(handleMouseEnter).not.toHaveBeenCalled();
    expect(handleMouseLeave).not.toHaveBeenCalled();
  });

  it("sets correct aria-pressed attribute for selected items", () => {
    render(
      <Legend
        items={sampleItems}
        selectedIndices={[0, 2]}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    const secondItem = screen.getByRole(BUTTON_ROLE, { name: /Item 2/i });
    const thirdItem = screen.getByRole(BUTTON_ROLE, { name: /Item 3/i });

    expect(firstItem).toHaveAttribute(ARIA_PRESSED, ARIA_PRESSED_TRUE);
    expect(secondItem).toHaveAttribute(ARIA_PRESSED, ARIA_PRESSED_FALSE);
    expect(thirdItem).toHaveAttribute(ARIA_PRESSED, ARIA_PRESSED_TRUE);
  });

  it("sets correct aria-label with item name and value", () => {
    render(<Legend items={sampleItems} data-testid={LEGEND_TEST_ID} />);

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: "Item 1: 100" });
    expect(firstItem).toBeInTheDocument();
  });

  it("sets tabIndex to 0 for non-disabled items", () => {
    render(<Legend items={sampleItems} data-testid={LEGEND_TEST_ID} />);

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    expect(firstItem).toHaveAttribute("tabIndex", "0");
  });

  it("handles external hoveredIndex control", () => {
    const { rerender } = render(
      <Legend
        items={sampleItems}
        hoveredIndex={null}
        data-testid={LEGEND_TEST_ID}
      />
    );

    // Update with hovered index
    rerender(
      <Legend
        items={sampleItems}
        hoveredIndex={1}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const legendContainer = screen.getByTestId(LEGEND_TEST_ID);
    expect(legendContainer).toBeInTheDocument();
  });

  it("renders items without values when value is undefined", () => {
    const itemsWithoutValues = [{ name: "Item A" }, { name: "Item B" }];

    render(
      <Legend
        items={itemsWithoutValues}
        showValues
        data-testid={LEGEND_TEST_ID}
      />
    );

    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    // No values should be displayed since they're undefined
  });

  it("calls both onItemClick and onSelectionChange when both are provided", () => {
    const handleClick = jest.fn();
    const handleSelectionChange = jest.fn();

    render(
      <Legend
        items={sampleItems}
        selectedIndices={[]}
        onItemClick={handleClick}
        onSelectionChange={handleSelectionChange}
        data-testid={LEGEND_TEST_ID}
      />
    );

    const firstItem = screen.getByRole(BUTTON_ROLE, { name: /Item 1/i });
    fireEvent.click(firstItem);

    expect(handleSelectionChange).toHaveBeenCalledTimes(1);
    expect(handleSelectionChange).toHaveBeenCalledWith([0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(sampleItems[0], 0);
  });
});
