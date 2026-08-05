import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

/**
 * The width the input ends up with, read off the stylesheet rather than the
 * layout, which jsdom does not compute. MUI applies `fullWidth` by putting
 * `width: 100%` into the same emotion class the SDS styles extend, so whichever
 * of the two is declared last is the one that applies.
 */
function widthOf(element: HTMLElement): string | undefined {
  const classes = new Set(element.className.split(" ").filter(Boolean));

  const css = Array.from(document.querySelectorAll("style"))
    .map((tag) => tag.textContent ?? "")
    .join("\n");

  const declarations: string[] = [];

  for (const [, selector, body] of css.matchAll(/\.([\w-]+)\{([^{}]*)\}/g)) {
    if (!classes.has(selector)) continue;
    declarations.push(...(body.match(/(?:^|;)width:([^;}]+)/g) ?? []));
  }

  const last = declarations[declarations.length - 1];

  return last?.replace(/^;?width:/, "");
}

describe("<InputDropdown />", () => {
  generateSnapshots(stories);

  it("renders InputDropdown component", () => {
    render(<Test {...Test.args} />);
    const InputDropdownElement = screen.getByTestId("InputDropdown");
    expect(InputDropdownElement).not.toBeNull();
  });

  it("opens the menu on click", () => {
    render(<Test {...Test.args} />);
    const InputDropdownElement = screen.getByTestId("InputDropdown");
    fireEvent.click(InputDropdownElement);
    expect(screen.getAllByText("Menu Item 1")).not.toBeNull();
  });

  it("sizes itself to its content when given no width", () => {
    render(<Test {...Test.args} />);
    expect(widthOf(screen.getByTestId("InputDropdown"))).toBeUndefined();
  });

  it("reads a bare number as pixels", () => {
    render(<Test {...Test.args} width="240" />);
    expect(widthOf(screen.getByTestId("InputDropdown"))).toBe("240px");
  });

  it("passes any other value through as a CSS width", () => {
    render(<Test {...Test.args} width="50%" />);
    expect(widthOf(screen.getByTestId("InputDropdown"))).toBe("50%");
  });

  it("leaves MUI's fullWidth in charge when given no width", () => {
    render(<Test {...Test.args} fullWidth />);
    expect(widthOf(screen.getByTestId("InputDropdown"))).toBe("100%");
  });

  it("takes precedence over fullWidth when given both", () => {
    render(<Test {...Test.args} fullWidth width="240" />);
    expect(widthOf(screen.getByTestId("InputDropdown"))).toBe("240px");
  });
});
