import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "../__storybook__/index.stories";
import Hero from "../index";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<Hero />", () => {
  generateSnapshots(stories);

  it("renders hero component with basic props", () => {
    render(
      <Hero
        headerText="Test Header"
        captionText="Test Caption"
        data-testid="hero"
      />
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).not.toBeNull();

    const headerElement = screen.getByText("Test Header");
    expect(headerElement).toBeInTheDocument();

    const captionElement = screen.getByText("Test Caption");
    expect(captionElement).toBeInTheDocument();
  });

  it("renders without caption text", () => {
    render(<Hero headerText="Header Only" data-testid="hero" />);

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();

    const headerElement = screen.getByText("Header Only");
    expect(headerElement).toBeInTheDocument();

    // Should show placeholder when no caption or children
    const placeholderElement = screen.getByText("Content area (placeholder)");
    expect(placeholderElement).toBeInTheDocument();
  });

  it("renders with custom children instead of placeholder", () => {
    render(
      <Hero headerText="Header with Custom Content" data-testid="hero">
        <button>Custom Button</button>
      </Hero>
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();

    const customButton = screen.getByText("Custom Button");
    expect(customButton).toBeInTheDocument();

    // Should not show placeholder when children are provided
    const placeholderElement = screen.queryByText("Content area (placeholder)");
    expect(placeholderElement).not.toBeInTheDocument();
  });

  it("applies maxWidth prop correctly", () => {
    const { rerender } = render(
      <Hero headerText="Header" maxWidth="small" data-testid="hero" />
    );

    let heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();

    // Test different maxWidth values
    rerender(<Hero headerText="Header" maxWidth="medium" data-testid="hero" />);

    heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();

    rerender(<Hero headerText="Header" maxWidth="large" data-testid="hero" />);

    heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();
  });

  it("handles useContainerMargin prop", () => {
    render(
      <Hero headerText="Header" useContainerMargin={false} data-testid="hero" />
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Hero
        headerText="Header"
        className="custom-hero-class"
        data-testid="hero"
      />
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toHaveClass("custom-hero-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLElement>();

    render(<Hero ref={ref} headerText="Header" data-testid="hero" />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("SECTION");
  });

  it("renders with default data-testid when not provided", () => {
    render(<Hero headerText="Header" />);

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();
  });

  it("renders JSX elements as headerText and captionText", () => {
    const headerElement = <span>JSX Header</span>;
    const captionElement = <span>JSX Caption</span>;

    render(
      <Hero
        headerText={headerElement}
        captionText={captionElement}
        data-testid="hero"
      />
    );

    expect(screen.getByText("JSX Header")).toBeInTheDocument();
    expect(screen.getByText("JSX Caption")).toBeInTheDocument();
  });

  it("renders with Test story configuration", () => {
    render(<Test {...Test.args} />);

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();

    const headerElement = screen.getByText("Test Hero Component");
    expect(headerElement).toBeInTheDocument();
  });

  it("applies backgroundFill with color string", () => {
    render(
      <Hero
        headerText="Header with Color Background"
        backgroundFill="#ff0000"
        data-testid="hero"
      />
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();
    expect(heroElement).toHaveStyle("background-color: #ff0000");
  });

  it("applies backgroundFill with image object", () => {
    const imageBackground = {
      src: "https://example.com/image.jpg",
      alt: "Background image",
    };

    render(
      <Hero
        headerText="Header with Image Background"
        backgroundFill={imageBackground}
        data-testid="hero"
      />
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();
    expect(heroElement).toHaveStyle(
      "background-image: url(https://example.com/image.jpg)"
    );
    expect(heroElement).toHaveStyle("background-size: cover");
    expect(heroElement).toHaveStyle("background-position: center");
    expect(heroElement).toHaveStyle("background-repeat: no-repeat");
  });

  it("uses default background when backgroundFill is not provided", () => {
    render(
      <Hero headerText="Header with Default Background" data-testid="hero" />
    );

    const heroElement = screen.getByTestId("hero");
    expect(heroElement).toBeInTheDocument();
    // Should use the default semantic color background
    expect(heroElement).toBeInTheDocument();
  });
});
