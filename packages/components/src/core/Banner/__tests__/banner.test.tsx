import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<Banner />", () => {
  generateSnapshots(stories);

  it("renders banner component", async () => {
    render(<Test {...Test.args} />);
    const banner = screen.getByRole("banner");
    expect(banner).not.toBeNull();
  });

  it("renders text given to it", () => {
    const text = "this is a test component";
    render(<Test {...Test.args}>{text}</Test>);
    const bannerText = screen.getByText(text);
    expect(bannerText).not.toBeNull();
  });

  it("can be dismissed", async () => {
    render(<Test {...Test.args} />);
    const banner = screen.getByRole("banner");
    expect(banner).not.toBeNull();

    const closeButton = screen.getByRole("button");
    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(closeButton, click);

    const banner2 = screen.queryByRole("banner");
    expect(banner2).toBeNull();
  });

  it("executes callback on close", () => {
    const onClose = vi.fn();
    render(<Test {...Test.args} onClose={onClose} />);

    const closeButton = screen.getByRole("button");
    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(closeButton, click);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("hands dismissal to the caller once dismissed is set", () => {
    const onClose = vi.fn();
    render(<Test {...Test.args} dismissed={false} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("banner")).not.toBeNull();
  });

  it("renders nothing while dismissed is true", () => {
    render(<Test {...Test.args} dismissed />);
    expect(screen.queryByRole("banner")).toBeNull();
  });

  it("stays dismissed after dismissing itself", () => {
    const { rerender } = render(<Test {...Test.args} />);

    fireEvent.click(screen.getByRole("button"));
    rerender(<Test {...Test.args} intent="negative" />);

    expect(screen.queryByRole("banner")).toBeNull();
  });

  it("does not render a close button when it is not dismissible", () => {
    render(<Test {...Test.args} dismissible={false} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
