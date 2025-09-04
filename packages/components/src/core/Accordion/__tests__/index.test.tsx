import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<Accordion />", () => {
  generateSnapshots(stories);

  it("renders accordion component", () => {
    render(<Test />);
    const accordionElement = screen.getByTestId("accordion");
    expect(accordionElement).not.toBeNull();
  });

  it("opens and closes the accordion when clicked", async () => {
    const ariaExpanded = "aria-expanded";

    render(<Test />);

    // Starts closed
    const accordionHeader = screen.getByRole("button");
    expect(accordionHeader).toHaveAttribute(ariaExpanded, "false");
    expect(screen.getByText(/Lorem ipsum/)).not.toBeVisible();

    // It opens when clicked.
    fireEvent.click(accordionHeader);
    expect(accordionHeader).toHaveAttribute(ariaExpanded, "true");
    expect(screen.getByText(/Lorem ipsum/)).toBeVisible();

    // And closes when clicked again.
    fireEvent.click(accordionHeader);
    expect(accordionHeader).toHaveAttribute(ariaExpanded, "false");

    await waitFor(() => {
      expect(screen.getByText(/Lorem ipsum/)).not.toBeVisible();
    });
  });
});
