import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

const DROPDOWN_MENU = "dropdown-menu";

describe("<DropdownMenu />", () => {
  generateSnapshots(stories);

  it("renders DropdownMenu component", () => {
    render(<Test {...Test.args} />);
    const DropdownMenuElement = screen.getByTestId(DROPDOWN_MENU);
    expect(DropdownMenuElement).not.toBeNull();
  });

  it("shows a subtitle only alongside a title", () => {
    const { rerender } = render(
      <Test {...Test.args} subTitle="Subtitle" title={undefined} />
    );
    expect(screen.queryByText("Subtitle")).toBeNull();

    rerender(<Test {...Test.args} subTitle="Subtitle" title="Title" />);
    expect(screen.queryByText("Subtitle")).not.toBeNull();
  });

  it("keeps the popper at its minimum width whatever width asks for", () => {
    render(<Test {...Test.args} width={40} />);

    const popper = screen
      .getByTestId(DROPDOWN_MENU)
      .closest(".MuiPopper-root") as HTMLElement;

    expect(window.getComputedStyle(popper).minWidth).toBe("160px");
    expect(window.getComputedStyle(popper).width).toBe("40px");
  });

  it("ignores width when the options are laid out in columns", () => {
    render(
      <Test
        {...Test.args}
        options={[
          { name: "Column", options: [{ name: "One" }, { name: "Two" }] },
        ]}
        width={300}
      />
    );

    const popper = screen
      .getByTestId(DROPDOWN_MENU)
      .closest(".MuiPopper-root") as HTMLElement;

    expect(window.getComputedStyle(popper).width).toBe("auto");
  });
});
