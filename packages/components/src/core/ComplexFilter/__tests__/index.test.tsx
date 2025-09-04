import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("<ComplexFilter />", () => {
  generateSnapshots(stories);

  it("renders ComplexFilter component", () => {
    render(<Test {...Test.args} />);
    const ComplexFilterElement = screen.getByTestId("complex-filter");
    expect(ComplexFilterElement).not.toBeNull();
  });
});
