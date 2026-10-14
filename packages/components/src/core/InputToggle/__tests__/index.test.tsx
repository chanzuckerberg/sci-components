import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<InputToggle />", () => {
  generateSnapshots(stories);

  it("renders", () => {
    render(<Test {...Test.args} />);
    const InputToggleElement = screen.getByTestId("test-toggle");
    expect(InputToggleElement).not.toBeNull();
  });

  it("hands its onChange the event and nothing else", () => {
    const onChange = vi.fn();
    render(<Test {...Test.args} onChange={onChange} />);

    fireEvent.click(screen.getByRole("switch"));

    expect(onChange).toHaveBeenCalledTimes(1);
    // MUI's own onChange is given the new checked state as a second argument.
    // This one narrows the signature and passes only the event on, so the
    // state has to be read off its target.
    const [event, ...rest] = onChange.mock.calls[0];
    expect(rest).toEqual([]);
    expect((event.target as HTMLInputElement).checked).toBe(true);
  });
});
