import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<NavigationJumpTo />", () => {
  generateSnapshots(stories);

  it("renders navigation jump to component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("navigation-jump-to");
    expect(elements).toBeTruthy();
  });

  it("renders the correct number of navigation items", () => {
    const items = [
      { elementRef: { current: null }, title: "Item 1" },
      { elementRef: { current: null }, title: "Item 2" },
      { elementRef: { current: null }, title: "Item 3" },
    ];

    render(<Test items={items} />);
    const navigationItems = screen.getAllByRole("tab");
    expect(navigationItems).toHaveLength(items.length);
  });

  it("scrolls to the correct section when a navigation item is clicked", () => {
    const items = [
      {
        elementRef: {
          current: {
            getAttribute: () => {
              return "test-item-1";
            },
            scrollIntoView: jest.fn(),
            setAttribute: jest.fn(),
          },
        },
        title: "Item 1",
      },
      {
        elementRef: {
          current: {
            getAttribute: () => {
              return "test-item-1";
            },
            scrollIntoView: jest.fn(),
            setAttribute: jest.fn(),
          },
        },
        title: "Item 2",
      },
    ];

    render(<Test items={items} />);
    const navigationItem = screen.getByText("Item 2");
    fireEvent.click(navigationItem);

    expect(items[1].elementRef.current.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(items[1].elementRef.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });
});
