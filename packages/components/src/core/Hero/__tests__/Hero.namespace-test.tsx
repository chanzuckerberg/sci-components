import React from "react";
import { Hero, HeroProps } from "@czi-sds/components";

const HeroNameSpaceTest = (props: HeroProps) => {
  return (
    <>
      {/* Basic Hero */}
      <Hero
        headerText="Welcome to Our Platform"
        captionText="Discover amazing features and capabilities"
      />

      {/* Hero with custom font size and text alignment */}
      <Hero
        headerText="Large Header with Center Alignment"
        captionText="This is a centered hero with a large header"
        headerFontSize="l"
        textAlignment="center"
      />

      {/* Hero with background fill and inverted text */}
      <Hero
        headerText="Hero with Background Color"
        captionText="Using inverted text color for better contrast"
        backgroundFill="#6ca6ff"
        hasInvertTextColor
        textAlignment="center"
      />

      {/* Hero with background image */}
      <Hero
        headerText="Hero with Background Image"
        captionText="Beautiful background with darkening mask"
        backgroundFill={
          <img src="https://picsum.photos/2000" alt="Hero Background" />
        }
        darkeningMask
        darkeningMaskOpacity={0.5}
        hasInvertTextColor
        heroHeight="500px"
      />

      {/* Hero with overlay media */}
      <Hero
        headerText="Hero with Overlay Media"
        captionText="Positioned on the right side"
        backgroundFill="#f0f0f0"
        overlayMedia={
          <img src="https://picsum.photos/1000" alt="Overlay Media" />
        }
        overlayMediaPosition="right"
        overlayMediaMaxHeight="300px"
        overlayMediaMaxWidth="400px"
        overlayContentWidth="50%"
        overlayContentPosition="left"
        heroHeight="500px"
      />

      {/* Hero with children */}
      <Hero
        headerText="Hero with Custom Content"
        captionText="Including buttons and other elements"
        textAlignment="center"
      >
        <button style={{ padding: "10px 20px", marginTop: "16px" }}>
          Get Started
        </button>
      </Hero>

      {/* Full-featured Hero */}
      <Hero
        headerText="Full-Featured Hero"
        captionText="With all available features enabled"
        headerFontSize="l"
        textAlignment="left"
        backgroundFill={
          <img src="https://picsum.photos/2000" alt="Background" />
        }
        darkeningMask
        darkeningMaskColor="#000000"
        darkeningMaskOpacity={0.6}
        darkeningVignette
        hasInvertTextColor
        overlayMedia={<img src="https://picsum.photos/800" alt="Overlay" />}
        overlayMediaPosition="right"
        overlayMediaMaxHeight="350px"
        overlayMediaMaxWidth="450px"
        overlayMediaMargin="40px"
        overlayContentWidth="50%"
        overlayContentPosition="left"
        heroHeight="600px"
        overlayContainerMinMargin={{
          small: 24,
          medium: 40,
          large: 120,
        }}
        className="custom-hero-class"
      >
        <div style={{ marginTop: "20px" }}>
          <button style={{ padding: "12px 24px", marginRight: "12px" }}>
            Primary Action
          </button>
          <button style={{ padding: "12px 24px" }}>Secondary Action</button>
        </div>
      </Hero>
    </>
  );
};

export default HeroNameSpaceTest;
