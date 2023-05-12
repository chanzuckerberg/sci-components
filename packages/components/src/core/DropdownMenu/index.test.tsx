import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<DropdownMenu />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders DropdownMenu component", () => {
    render(<Test {...Test.args} />);
    const DropdownMenuElement = screen.getByTestId("dropdown-menu");
    expect(DropdownMenuElement).not.toBeNull();
  });
});
