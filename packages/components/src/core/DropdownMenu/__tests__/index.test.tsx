import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("<DropdownMenu />", () => {
  generateSnapshots(stories);

  it("renders DropdownMenu component", () => {
    render(<Test {...Test.args} />);
    const DropdownMenuElement = screen.getByTestId("dropdown-menu");
    expect(DropdownMenuElement).not.toBeNull();
  });
});
