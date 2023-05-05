import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import LoadingIndicator from "../LoadingIndicator";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

const STATUS_CANT_FIND_TEXT = "Status: can't reproduce";

describe("<Dropdown />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("Dropdown component renders correctly", () => {
    render(<Test {...Test.args} />);
    const DropdownElement = screen.getByTestId("dropdown");
    expect(DropdownElement).not.toBeNull();
  });

  it("Upon clicking the button, the dropdown menu closes.", () => {
    const args = {
      ...Test.args,
    };

    render(<Test {...args} />);

    // Open the dropdown
    const DropdownElement = screen.getByTestId("dropdown");
    fireEvent.click(DropdownElement);

    // Click on the button again to close it
    fireEvent.click(DropdownElement);

    const menuItem = screen.queryByText(STATUS_CANT_FIND_TEXT);
    expect(menuItem).toEqual(null);
  });

  it("Prop Test (loeading): Loading indicator correctly renders when loading state is true", () => {
    const args = {
      ...Test.args,
      DropdownMenuProps: {
        loading: true,
        loadingText: (
          <>
            <LoadingIndicator sdsStyle="minimal" />
          </>
        ),
      },
      multiple: true,
      options: [],
    };

    render(<Test {...args} />);

    const DropdownElement = screen.getByTestId("dropdown");
    expect(DropdownElement).not.toBeNull();

    fireEvent.click(DropdownElement);
    expect(screen.getAllByText("Loading")).not.toBeNull();
  });

  it("Prop Test (search): Dropdown component search function correctly filters out Type items", () => {
    const args = {
      ...Test.args,
      search: true,
    };

    render(<Test {...args} />);

    // Open the dropdown
    const DropdownElement = screen.getByTestId("dropdown");
    fireEvent.click(DropdownElement);

    // Select the search input by placeholder
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Status" } });

    // We want to test that there are no items with "Type: *" in the dropdown menu
    // because we have searched for Status
    const typeBugItem = screen.queryByText("Type: bug");
    expect(typeBugItem).toEqual(null);
  });

  it("Prop Test (Label): Dropdown component correctly renders with a new label", () => {
    const args = {
      ...Test.args,
      label: "Test Label",
    };

    render(<Test {...args} />);
    expect(screen.getAllByText("Test Label")).not.toBeNull();
  });

  it("Prop Test (closeOnBlur): Dropdown closes when button is clicked with closeOnBlue set to true", async () => {
    const args = {
      ...Test.args,
      closeOnBlur: true,
    };

    render(<Test {...args} />);

    // Open the dropdown
    const DropdownElement = screen.getByTestId("dropdown");
    fireEvent.click(DropdownElement);

    // Awaiting to find the STATUS_CANT_FIND_TEXT on the screen to
    // make sure that the dropdown is opened
    await screen.findByText(STATUS_CANT_FIND_TEXT);

    // Click on the button again to close it
    fireEvent.click(DropdownElement);

    // Awaiting to find the STATUS_CANT_FIND_TEXT on the screen to
    // make sure that the dropdown is closed
    await screen.findByText(STATUS_CANT_FIND_TEXT);

    const menuItem = screen.queryByText(STATUS_CANT_FIND_TEXT);
    expect(menuItem).toEqual(null);
  });
});
