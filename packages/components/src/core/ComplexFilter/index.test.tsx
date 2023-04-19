import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<ComplexFilter />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders ComplexFilter component", () => {
    render(<Test {...Test.args} />);
    const ComplexFilterElement = screen.getByTestId("complex-filter");
    expect(ComplexFilterElement).not.toBeNull();
  });
});
