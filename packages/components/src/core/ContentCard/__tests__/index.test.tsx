import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import Button from "src/core/Button";
import ContentCardActions from "../components/ContentCardActions";
import { ContentCardBody } from "..";

global.ResizeObserver = class {
  observe() {}

  unobserve() {}

  disconnect() {}
};

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);
const CONTENT_CARD_TEST_ID = "content-card";

describe("ContentCard", () => {
  generateSnapshots(stories);

  it("renders content card with default props", () => {
    render(<Test />);
    expect(screen.getByTestId(CONTENT_CARD_TEST_ID)).toBeInTheDocument();
  });

  it("renders content card with image", () => {
    render(
      <Test
        visualElementType="image"
        image="https://picsum.photos/1000"
        imageSize={300}
      />
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("renders content card with icon", () => {
    render(
      <Test
        visualElementType="icon"
        icon={<div data-testid="test-icon">Icon</div>}
      />
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders content card with text content", () => {
    render(
      <Test
        overlineText="Overline"
        titleText="Title"
        subtitleText="Subtitle"
        metadataText="Metadata"
      />
    );
    expect(screen.getByText("Overline")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Metadata")).toBeInTheDocument();
  });

  it("renders clickable card", () => {
    const onClick = jest.fn();
    render(<Test clickableCard onClick={onClick} />);
    const card = screen.getByTestId(CONTENT_CARD_TEST_ID);
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders content card with buttons", () => {
    render(
      <Test>
        <ContentCardBody>
          <div>Content Card Body</div>
        </ContentCardBody>

        <ContentCardActions>
          <Button key="1" sdsStyle="minimal" sdsType="primary">
            Button
          </Button>
          <Button key="2" sdsStyle="minimal" sdsType="secondary">
            Second Button
          </Button>
        </ContentCardActions>
      </Test>
    );
    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  it("renders content card with different button positions", () => {
    render(
      <Test buttonsPosition="right">
        <ContentCardBody>
          <div>Content Card Body</div>
        </ContentCardBody>

        <ContentCardActions>
          <Button key="1" sdsStyle="minimal" sdsType="primary">
            Button
          </Button>
          <Button key="2" sdsStyle="minimal" sdsType="secondary">
            Second Button
          </Button>
        </ContentCardActions>
      </Test>
    );
    const button = screen.getByText("Button");
    expect(button).toBeInTheDocument();
  });

  it("renders content card with different image positions", () => {
    render(
      <Test
        visualElementType="image"
        image="https://picsum.photos/1000"
        imagePosition="right"
      />
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("renders content card with different types", () => {
    render(<Test sdsType="narrow" />);
    expect(screen.getByTestId(CONTENT_CARD_TEST_ID)).toBeInTheDocument();
  });

  it("renders content card with ReactNode as titleText", () => {
    const CustomTitle = () => (
      <span data-testid="custom-title">Custom Title</span>
    );
    render(<Test titleText={<CustomTitle />} />);
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });
});
