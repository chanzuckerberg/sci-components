import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<Pagination />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders pagination component", () => {
    render(<Test />);
    const elements = screen.getByTestId("Pagination");
    expect(elements).toBeTruthy();
  });

  it("go to previous page is disabled if currentPage === 1", () => {
    render(<Test />);
    const element = screen.getByTestId("Pagination-disabled-left-arrow");
    const button = element.getElementsByTagName("button")[0];
    expect(button.disabled).toBeTruthy();
  });

  it("should have a dropdown for left hidden pages list", () => {
    render(<Test />);
    const element = screen.getByTestId("Pagination-with-left-dropdown");
    const listItem = element.getElementsByTagName("li")[1];
    const leftMenuButton = listItem.getElementsByTagName("button")[0];
    expect(leftMenuButton).toBeTruthy();
  });

  it("should have a dropdown for right hidden pages list", () => {
    render(<Test />);
    const element = screen.getByTestId("Pagination-with-right-dropdown");
    const listItem = element.getElementsByTagName("li")[5];
    const rightMenuButton = listItem.getElementsByTagName("button")[0];
    expect(rightMenuButton).toBeTruthy();
  });

  it("should have a dropdown for both left and right hidden pages list", () => {
    render(<Test />);
    const element = screen.getByTestId("Pagination-with-both-dropdowns");
    const listItems = element.getElementsByTagName("li");
    const leftMenuButton = listItems[1].getElementsByTagName("button")[0];
    const rightMenuButton = listItems[5].getElementsByTagName("button")[0];
    expect(leftMenuButton && rightMenuButton).toBeTruthy();
  });

  it("should open right dropdown on click", async () => {
    render(<Test />);
    const element = screen.getByTestId("Pagination-with-right-dropdown");
    const listItem = element.getElementsByTagName("li")[5];
    const rightMenuButton = listItem.getElementsByTagName("button")[0];

    fireEvent.click(rightMenuButton);
    expect(screen.getAllByText("13")).not.toBeNull();
  });

  it("should not open disabled dropdown on click", async () => {
    render(<Test />);
    const element = screen.getByTestId("Pagination-disabled-dropdown");
    const listItem = element.getElementsByTagName("li")[1];
    const leftMenuButton = listItem.getElementsByTagName("button")[0];
    expect(leftMenuButton.disabled).toBeTruthy();
  });
});
