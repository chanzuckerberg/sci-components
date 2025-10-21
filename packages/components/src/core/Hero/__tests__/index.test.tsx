import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "../__storybook__/index.stories";
import Hero from "../index";

// Test IDs
const OVERLAY_MEDIA_TEST_ID = "overlay-media";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<Hero />", () => {
  generateSnapshots(stories);

  describe("Basic rendering", () => {
    it("renders hero component with required props", () => {
      render(<Hero headerText="Test Header" data-testid="hero" />);

      const heroElement = screen.getByTestId("hero");
      expect(heroElement).toBeInTheDocument();
      expect(heroElement.tagName).toBe("SECTION");

      const headerElement = screen.getByText("Test Header");
      expect(headerElement).toBeInTheDocument();
      expect(headerElement.tagName).toBe("H1");
    });

    it("renders with headerText and captionText", () => {
      render(
        <Hero
          headerText="Test Header"
          captionText="Test Caption"
          data-testid="hero"
        />
      );

      expect(screen.getByText("Test Header")).toBeInTheDocument();
      expect(screen.getByText("Test Caption")).toBeInTheDocument();
    });

    it("renders without captionText", () => {
      render(<Hero headerText="Header Only" data-testid="hero" />);

      expect(screen.getByText("Header Only")).toBeInTheDocument();
      expect(screen.queryByText("Test Caption")).not.toBeInTheDocument();
    });

    it("renders with children", () => {
      render(
        <Hero headerText="Header with Children" data-testid="hero">
          <button>Custom Button</button>
          <div>Custom Content</div>
        </Hero>
      );

      expect(screen.getByText("Custom Button")).toBeInTheDocument();
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("renders with all text content types together", () => {
      render(
        <Hero headerText="Header" captionText="Caption" data-testid="hero">
          <div>Children Content</div>
        </Hero>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Caption")).toBeInTheDocument();
      expect(screen.getByText("Children Content")).toBeInTheDocument();
    });
  });

  describe("Header font sizes", () => {
    it("renders with small header font size", () => {
      render(
        <Hero headerText="Small Header" headerFontSize="s" data-testid="hero" />
      );

      const header = screen.getByText("Small Header");
      expect(header).toBeInTheDocument();
    });

    it("renders with medium header font size (default)", () => {
      render(
        <Hero
          headerText="Medium Header"
          headerFontSize="m"
          data-testid="hero"
        />
      );

      const header = screen.getByText("Medium Header");
      expect(header).toBeInTheDocument();
    });

    it("renders with large header font size", () => {
      render(
        <Hero headerText="Large Header" headerFontSize="l" data-testid="hero" />
      );

      const header = screen.getByText("Large Header");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Text alignment", () => {
    it("renders with left text alignment", () => {
      render(
        <Hero
          headerText="Left Aligned"
          textAlignment="left"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with center text alignment", () => {
      render(
        <Hero
          headerText="Center Aligned"
          textAlignment="center"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with right text alignment", () => {
      render(
        <Hero
          headerText="Right Aligned"
          textAlignment="right"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Text color inversion", () => {
    it("renders with inverted text color", () => {
      render(
        <Hero
          headerText="Inverted Text"
          captionText="Inverted Caption"
          hasInvertTextColor={true}
          data-testid="hero"
        />
      );

      expect(screen.getByText("Inverted Text")).toBeInTheDocument();
      expect(screen.getByText("Inverted Caption")).toBeInTheDocument();
    });

    it("renders with normal text color (default)", () => {
      render(
        <Hero
          headerText="Normal Text"
          captionText="Normal Caption"
          hasInvertTextColor={false}
          data-testid="hero"
        />
      );

      expect(screen.getByText("Normal Text")).toBeInTheDocument();
      expect(screen.getByText("Normal Caption")).toBeInTheDocument();
    });
  });

  describe("Hero height", () => {
    it("renders with custom heroHeight", () => {
      render(
        <Hero
          headerText="Custom Height"
          heroHeight="500px"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with default height (fit-content)", () => {
      render(<Hero headerText="Default Height" data-testid="hero" />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Overlay content configuration", () => {
    it("renders with custom overlayContentWidth", () => {
      render(
        <Hero
          headerText="Custom Width"
          overlayContentWidth="50%"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with overlayContentPosition top-left", () => {
      render(
        <Hero
          headerText="Top Left"
          overlayContentPosition="top-left"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with overlayContentPosition center", () => {
      render(
        <Hero
          headerText="Center"
          overlayContentPosition="center"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with overlayContentPosition bottom-right", () => {
      render(
        <Hero
          headerText="Bottom Right"
          overlayContentPosition="bottom-right"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Container margins", () => {
    it("renders with custom overlayContainerMinMargin", () => {
      render(
        <Hero
          headerText="Custom Margins"
          overlayContainerMinMargin={{
            small: 16,
            medium: 32,
            large: 64,
          }}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Background fill", () => {
    it("renders with color string background", () => {
      render(
        <Hero
          headerText="Color Background"
          backgroundFill="#ff0000"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with rgb color background", () => {
      render(
        <Hero
          headerText="RGB Background"
          backgroundFill="rgb(255, 0, 0)"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with React node background (image)", () => {
      const imageElement = (
        <img src="https://example.com/image.jpg" alt="Background" />
      );

      render(
        <Hero
          headerText="Image Background"
          backgroundFill={imageElement}
          data-testid="hero"
        />
      );

      const heroElement = screen.getByTestId("hero");
      expect(heroElement).toBeInTheDocument();
      expect(screen.getByAltText("Background")).toBeInTheDocument();
    });

    it("renders with React node background (video)", () => {
      const videoElement = (
        <video data-testid="background-video">
          <source src="https://example.com/video.mp4" type="video/mp4" />
          <track kind="captions" />
        </video>
      );

      render(
        <Hero
          headerText="Video Background"
          backgroundFill={videoElement}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByTestId("background-video")).toBeInTheDocument();
    });

    it("renders without backgroundFill (default)", () => {
      render(<Hero headerText="No Background" data-testid="hero" />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Darkening effects", () => {
    it("renders with darkening mask enabled", () => {
      render(
        <Hero
          headerText="With Darkening Mask"
          darkeningMask={true}
          darkeningMaskColor="#000000"
          darkeningMaskOpacity={0.5}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders without darkening mask", () => {
      render(
        <Hero
          headerText="Without Darkening Mask"
          darkeningMask={false}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with custom darkening mask color", () => {
      render(
        <Hero
          headerText="Custom Mask Color"
          darkeningMask={true}
          darkeningMaskColor="#ff0000"
          darkeningMaskOpacity={0.3}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with darkening vignette enabled", () => {
      render(
        <Hero
          headerText="With Vignette"
          darkeningVignette={true}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders without darkening vignette", () => {
      render(
        <Hero
          headerText="Without Vignette"
          darkeningVignette={false}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with both darkening mask and vignette", () => {
      render(
        <Hero
          headerText="Both Effects"
          darkeningMask={true}
          darkeningMaskOpacity={0.4}
          darkeningVignette={true}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Overlay media", () => {
    it("renders with overlay media (image)", () => {
      const overlayImage = (
        <img src="https://example.com/overlay.jpg" alt="Overlay" />
      );

      render(
        <Hero
          headerText="With Overlay Image"
          overlayMedia={overlayImage}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByAltText("Overlay")).toBeInTheDocument();
    });

    it("renders with overlay media (video)", () => {
      const overlayVideo = (
        <video data-testid="overlay-video">
          <source src="https://example.com/overlay.mp4" type="video/mp4" />
          <track kind="captions" />
        </video>
      );

      render(
        <Hero
          headerText="With Overlay Video"
          overlayMedia={overlayVideo}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByTestId("overlay-video")).toBeInTheDocument();
    });

    it("renders without overlay media", () => {
      render(<Hero headerText="No Overlay Media" data-testid="hero" />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("renders with overlayMediaPosition center", () => {
      const overlayMedia = <div>Overlay Content</div>;

      render(
        <Hero
          headerText="Centered Overlay"
          overlayMedia={overlayMedia}
          overlayMediaPosition="center"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByText("Overlay Content")).toBeInTheDocument();
    });

    it("renders with overlayMediaPosition top-left", () => {
      const overlayMedia = (
        <div data-testid={OVERLAY_MEDIA_TEST_ID}>Media Content</div>
      );

      render(
        <Hero
          headerText="Top Left Position"
          overlayMedia={overlayMedia}
          overlayMediaPosition="top-left"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId(OVERLAY_MEDIA_TEST_ID)).toBeInTheDocument();
    });

    it("renders with overlayMediaPosition bottom-right", () => {
      const overlayMedia = (
        <div data-testid={OVERLAY_MEDIA_TEST_ID}>Media Content</div>
      );

      render(
        <Hero
          headerText="Bottom Right Position"
          overlayMedia={overlayMedia}
          overlayMediaPosition="bottom-right"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId(OVERLAY_MEDIA_TEST_ID)).toBeInTheDocument();
    });

    it("renders with overlayMediaMaxHeight and overlayMediaMaxWidth", () => {
      const overlayMedia = (
        <div data-testid={OVERLAY_MEDIA_TEST_ID}>Media Content</div>
      );

      render(
        <Hero
          headerText="Sized Header"
          overlayMedia={overlayMedia}
          overlayMediaMaxHeight="300px"
          overlayMediaMaxWidth="400px"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId(OVERLAY_MEDIA_TEST_ID)).toBeInTheDocument();
    });

    it("renders with overlayMediaMargin as string", () => {
      const overlayMedia = (
        <div data-testid={OVERLAY_MEDIA_TEST_ID}>Media Content</div>
      );

      render(
        <Hero
          headerText="Margin Header"
          overlayMedia={overlayMedia}
          overlayMediaMargin="20px"
          data-testid="hero"
        />
      );

      expect(screen.getByTestId(OVERLAY_MEDIA_TEST_ID)).toBeInTheDocument();
    });

    it("renders with overlayMediaMargin as responsive object", () => {
      const overlayMedia = (
        <div data-testid={OVERLAY_MEDIA_TEST_ID}>Media Content</div>
      );

      render(
        <Hero
          headerText="Responsive Header"
          overlayMedia={overlayMedia}
          overlayMediaMargin={{
            small: "10px",
            medium: "20px",
            large: "30px",
          }}
          data-testid="hero"
        />
      );

      expect(screen.getByTestId(OVERLAY_MEDIA_TEST_ID)).toBeInTheDocument();
    });
  });

  describe("Complex scenarios", () => {
    it("renders fully featured hero with all props", () => {
      const backgroundImage = (
        <img src="https://example.com/bg.jpg" alt="Background" />
      );
      const overlayMedia = (
        <img src="https://example.com/overlay.jpg" alt="Overlay" />
      );

      render(
        <Hero
          headerText="Full Featured Hero"
          captionText="Complete caption text"
          headerFontSize="l"
          hasInvertTextColor={true}
          textAlignment="center"
          heroHeight="600px"
          backgroundFill={backgroundImage}
          darkeningMask={true}
          darkeningMaskColor="#000000"
          darkeningMaskOpacity={0.6}
          darkeningVignette={true}
          overlayMedia={overlayMedia}
          overlayMediaPosition="right"
          overlayMediaMaxHeight="400px"
          overlayMediaMaxWidth="500px"
          overlayMediaMargin="40px"
          overlayContentWidth="60%"
          overlayContentPosition="left"
          overlayContainerMinMargin={{
            small: 24,
            medium: 40,
            large: 120,
          }}
          data-testid="hero"
        >
          <button>Call to Action</button>
        </Hero>
      );

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByText("Full Featured Hero")).toBeInTheDocument();
      expect(screen.getByText("Complete caption text")).toBeInTheDocument();
      expect(screen.getByText("Call to Action")).toBeInTheDocument();
      expect(screen.getByAltText("Background")).toBeInTheDocument();
      expect(screen.getByAltText("Overlay")).toBeInTheDocument();
    });

    it("renders minimal hero with only required props", () => {
      render(<Hero headerText="Minimal Hero" data-testid="hero" />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByText("Minimal Hero")).toBeInTheDocument();
    });
  });

  describe("HTML attributes and ref", () => {
    it("applies custom className", () => {
      render(
        <Hero
          headerText="Custom Class"
          className="custom-hero-class"
          data-testid="hero"
        />
      );

      const heroElement = screen.getByTestId("hero");
      expect(heroElement).toHaveClass("custom-hero-class");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();

      render(<Hero ref={ref} headerText="Ref Test" data-testid="hero" />);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("SECTION");
    });

    it("applies custom data-testid", () => {
      render(<Hero headerText="Custom TestID" data-testid="custom-hero" />);

      expect(screen.getByTestId("custom-hero")).toBeInTheDocument();
    });
  });

  describe("Storybook test story", () => {
    it("renders with Test story configuration", () => {
      render(<Test {...Test.args} />);

      const heroElement = screen.getByTestId("hero");
      expect(heroElement).toBeInTheDocument();
    });
  });
});
