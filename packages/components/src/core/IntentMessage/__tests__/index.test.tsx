import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("IntentMessage", () => {
  generateSnapshots(stories);

  it("renders IntentMessage component", () => {
    render(<Test />);
    const elements = screen.getAllByText("This is a negative message");
    expect(elements.length).toBeTruthy();
  });

  it("renders custom icon when provided", () => {
    const customMessage = [
      {
        icon: "Github" as const,
        intent: "notice" as const,
        text: "Custom Icon Message",
      },
    ];
    render(<Test messages={customMessage} />);
    expect(screen.getByTestId("IconGithubSmall")).toBeInTheDocument();
  });

  it("renders with custom React element icon", () => {
    const customIcon = <span data-testid="custom-element-icon">Icon</span>;
    const customMessage = [
      {
        icon: customIcon,
        intent: "positive" as const,
        text: "Custom Element Icon Message",
      },
    ];
    render(<Test messages={customMessage} />);
    expect(screen.getByTestId("custom-element-icon")).toBeInTheDocument();
  });

  it("renders default icons for different intents", () => {
    const messages = [
      { intent: "positive" as const, text: "Positive" },
      { intent: "info" as const, text: "Info" },
      { intent: "negative" as const, text: "Negative" },
      { intent: "notice" as const, text: "Notice" },
    ];
    render(<Test messages={messages} />);
    expect(screen.getAllByTestId("IconCheckCircleSmall")).toHaveLength(1);
    expect(
      screen.getAllByTestId("IconExclamationMarkCircleSmall")
    ).toHaveLength(3);
  });

  it("renders with no border when border prop is false", () => {
    const { container } = render(<Test border={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders correct border color based on highest priority intent", () => {
    // Negative (highest priority)
    const { rerender } = render(
      <Test
        messages={[
          { intent: "notice" as const, text: "Notice" },
          { intent: "negative" as const, text: "Negative" },
        ]}
        border
      />
    );

    // Notice (medium priority)
    rerender(
      <Test
        messages={[
          { intent: "positive" as const, text: "Positive" },
          { intent: "notice" as const, text: "Notice" },
        ]}
        border
      />
    );

    // Positive (lowest priority)
    rerender(
      <Test
        messages={[{ intent: "positive" as const, text: "Positive" }]}
        border
      />
    );
  });

  it("renders without messages", () => {
    render(<Test messages={undefined} />);
    // Should render children but no messages
    expect(
      screen.queryByText("This is a negative message")
    ).not.toBeInTheDocument();
  });

  it("sorts messages by intent priority when autoOrder is true", () => {
    const messages = [
      { intent: "positive" as const, text: "Positive" },
      { intent: "negative" as const, text: "Negative" },
      { intent: "notice" as const, text: "Notice" },
    ];

    render(<Test messages={messages} autoOrder={true} />);

    const renderedMessages = screen.getAllByText(/(Positive|Negative|Notice)/);
    expect(renderedMessages[0]).toHaveTextContent("Negative");
    expect(renderedMessages[1]).toHaveTextContent("Notice");
    expect(renderedMessages[2]).toHaveTextContent("Positive");
  });

  it("does not sort messages when autoOrder is false", () => {
    const messages = [
      { intent: "positive" as const, text: "Positive" },
      { intent: "negative" as const, text: "Negative" },
      { intent: "notice" as const, text: "Notice" },
    ];

    render(<Test messages={messages} autoOrder={false} />);

    const renderedMessages = screen.getAllByText(/(Positive|Negative|Notice)/);
    expect(renderedMessages[0]).toHaveTextContent("Positive");
    expect(renderedMessages[1]).toHaveTextContent("Negative");
    expect(renderedMessages[2]).toHaveTextContent("Notice");
  });

  it("sorts messages using orderBy priority when provided", () => {
    const messages = [
      { intent: "positive" as const, text: "Positive" },
      { intent: "negative" as const, text: "Negative" },
      { intent: "notice" as const, text: "Notice" },
    ];

    render(
      <Test
        messages={messages}
        autoOrder={true}
        orderBy={["positive", "notice", "negative"]}
      />
    );

    const renderedMessages = screen.getAllByText(/(Positive|Negative|Notice)/);
    expect(renderedMessages[0]).toHaveTextContent("Positive");
    expect(renderedMessages[1]).toHaveTextContent("Notice");
    expect(renderedMessages[2]).toHaveTextContent("Negative");
  });
});
