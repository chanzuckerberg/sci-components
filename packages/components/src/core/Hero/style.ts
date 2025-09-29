import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  CommonThemeProps,
  fontTitleBoldL,
  fontTitleBoldM,
  fontTitleBoldS,
  fontBodyM,
  fontBodyS,
  getSemanticColors,
  getSpaces,
} from "../styles";
import { HeroProps, HERO_MARGINS } from "./Hero.types";

const doNotForwardProps = [
  "headerText",
  "captionText",
  "maxWidth",
  "useContainerMargin",
  "backgroundFill",
];

interface StyledHeroProps
  extends Omit<HeroProps, "headerText">,
    CommonThemeProps {
  headerText?: HeroProps["headerText"];
  backgroundFill?: HeroProps["backgroundFill"];
}

// Helper function to get responsive margins
const getResponsiveMargins = (useContainerMargin: boolean = true) => {
  if (!useContainerMargin)
    return css`
      margin: 0;
    `;

  return css`
    margin: 0 ${HERO_MARGINS.SMALL}px;

    @media (min-width: 768px) {
      margin: 0 ${HERO_MARGINS.MEDIUM}px;
    }

    @media (min-width: 1200px) {
      margin: 0 ${HERO_MARGINS.LARGE}px;
    }
  `;
};

// Helper function to get background styles based on backgroundFill prop
const getBackgroundStyles = (backgroundFill?: HeroProps["backgroundFill"]) => {
  if (!backgroundFill) return css``;

  if (typeof backgroundFill === "string") {
    // Check if it's a URL or color
    const isUrl =
      backgroundFill.startsWith("http") ||
      backgroundFill.startsWith("/") ||
      backgroundFill.startsWith("./");

    if (isUrl) {
      // If it's a URL, it will be handled by the CardMedia component
      return css``;
    } else {
      // If it's a string, treat it as a color
      return css`
        background-color: ${backgroundFill};
      `;
    }
  } else {
    // If it's a ReactNode, it will be handled by the component
    return css``;
  }
};

// Background wrapper for positioning background elements
export const StyledBackgroundWrapper = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

// Main Hero Container
export const StyledHeroContainer = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledHeroProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    const { backgroundFill, height } = props;

    return css`
      position: relative;
      width: 100%;
      background-color: ${backgroundFill
        ? "transparent"
        : semanticColors?.base?.backgroundPrimary};
      padding: ${spaces?.xl}px 0;
      height: ${height};
      ${getResponsiveMargins(props.useContainerMargin)}
      ${getBackgroundStyles(backgroundFill)}

      display: flex;
      align-items: center;
      text-align: center;

      @media (min-width: 768px) {
        padding: ${spaces?.xxl}px 0;
      }
    `;
  }}
`;

// Content Wrapper with max-width control
export const StyledContentWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledHeroProps) => {
    const { maxWidth = "large" } = props;

    const maxWidthMap = {
      small: "600px",
      medium: "800px",
      large: "1000px",
    };

    return css`
      width: 100%;
      max-width: ${maxWidthMap[maxWidth]};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${props.theme?.spacing?.(3) || "24px"};
    `;
  }}
`;

// Header Text with responsive typography
export const StyledHeaderText = styled("h1", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return css`
      ${fontTitleBoldS(props)} // Small screens (26px)
      color: ${semanticColors?.base?.textPrimary};
      margin: 0;
      text-align: center;

      @media (min-width: 768px) {
        ${fontTitleBoldM(props)}// Medium screens (32px)
      }

      @media (min-width: 1200px) {
        ${fontTitleBoldL(props)}// Large screens (52px on wide, 40px on narrow)
      }
    `;
  }}
`;

// Caption Text with responsive typography
export const StyledCaptionText = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      ${fontBodyS(props)} // Small screens (14px)
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
      margin-top: ${spaces?.s}px;
      text-align: center;
      max-width: 80%;

      @media (min-width: 768px) {
        ${fontBodyM(props)} // Medium+ screens (16px on wide, 14px on narrow)
        max-width: 70%;
      }

      @media (min-width: 1200px) {
        max-width: 60%;
      }
    `;
  }}
`;

// Content Area for additional children
export const StyledContentArea = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: ${spaces?.l}px;

      @media (min-width: 768px) {
        margin-top: ${spaces?.xl}px;
      }
    `;
  }}
`;

// Placeholder content box (for demonstration purposes)
export const StyledPlaceholder = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      width: 200px;
      height: 48px;
      background-color: ${semanticColors?.base?.backgroundSecondary};
      border: 2px dashed ${semanticColors?.base?.divider};
      border-radius: ${spaces?.xxxs}px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${semanticColors?.base?.textSecondary};
      font-size: 12px;

      @media (min-width: 768px) {
        width: 280px;
        height: 56px;
        font-size: 14px;
      }

      @media (min-width: 1200px) {
        width: 320px;
        height: 64px;
      }
    `;
  }}
`;
