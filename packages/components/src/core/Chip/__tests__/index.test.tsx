import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import Chip from "..";

const { Test } = composeStories(stories);

const REMOVE_LUNG = { name: "Remove Lung" };

describe("<Chip />", () => {
  generateSnapshots(stories);

  it("renders Chip component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("chip");
    expect(elements.length).toBeTruthy();
  });

  it("is a single button named after the filter it removes", () => {
    render(<Chip label="Lung" onDelete={() => {}} />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("button", REMOVE_LUNG)).toBeInTheDocument();
  });

  it("removes itself once whether the chip or its X is clicked", () => {
    const onDelete = vi.fn();
    render(<Chip label="Lung" onDelete={onDelete} />);

    const chip = screen.getByRole("button", REMOVE_LUNG);

    fireEvent.click(chip);
    expect(onDelete).toHaveBeenCalledTimes(1);

    fireEvent.click(chip.querySelector(".MuiChip-deleteIcon") as Element);
    expect(onDelete).toHaveBeenCalledTimes(2);
  });

  it("removes itself on Enter, Backspace and Delete", () => {
    const onDelete = vi.fn();
    render(<Chip label="Lung" onDelete={onDelete} />);

    const chip = screen.getByRole("button", REMOVE_LUNG);

    fireEvent.keyDown(chip, { key: "Enter" });
    fireEvent.keyUp(chip, { key: "Backspace" });
    fireEvent.keyUp(chip, { key: "Delete" });
    expect(onDelete).toHaveBeenCalledTimes(3);
  });

  it("takes an accessible name of its own", () => {
    render(
      <Chip
        aria-label="Remove the lung filter"
        label="Lung"
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: "Remove the lung filter" })
    ).toBeInTheDocument();
  });
});
