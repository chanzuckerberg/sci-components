/* eslint-disable sonarjs/no-duplicate-string */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  CommonThemeProps,
  fontHeaderL,
  fontHeaderM,
  fontBodyXxxs,
  getSemanticColors,
  getSpaces,
  fontHeaderS,
  getBreakpoints,
} from "../styles";
import {
  HeroMargins,
  HeroProps,
  overlayContentPositionAlignMapping,
  overlayContentPositionJustifyMapping,
  textAlignmentMapping,
} from "./Hero.types";

const doNotForwardProps = ["heroHeight", "overlayContainerMinMargin"];

interface StyledHeroProps extends HeroProps, CommonThemeProps {
  heroHeight?: string;
}

const getResponsivePadding = (props: StyledHeroProps) => {
  const { overlayContainerMinMargin } = props;
  const spaces = getSpaces(props);

  return css`
    padding: ${spaces?.xxl}px
      ${overlayContainerMinMargin?.small || HeroMargins.SMALL}px;

    @media (min-width: 768px) {
      padding: ${spaces?.xxl}px
        ${overlayContainerMinMargin?.medium || HeroMargins.MEDIUM}px;
    }

    @media (min-width: 1200px) {
      padding: ${spaces?.xxl}px
        ${overlayContainerMinMargin?.large || HeroMargins.LARGE}px;
    }
  `;
};

// Main Hero Container
export const StyledHeroContainer = styled("section", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledHeroProps) => {
    const { heroHeight = "fit-content", overlayContentPosition } = props;
    const breakpoints = getBreakpoints(props);

    return css`
      ${getResponsivePadding(props)};
      display: flex;
      position: relative;
      overflow: hidden;
      height: ${heroHeight};
      width: 100%;
      flex-direction: column;
      align-items: ${overlayContentPosition
        ? overlayContentPositionAlignMapping[overlayContentPosition]
        : "center"};
      justify-content: ${overlayContentPosition
        ? overlayContentPositionJustifyMapping[overlayContentPosition]
        : "center"};

      ${breakpoints?.down("md")} {
        height: fit-content;
      }
    `;
  }}
`;

export const OverlayContent = styled("div")`
  ${(props: StyledHeroProps) => {
    const { textAlignment, overlayContentWidth = "100%" } = props;

    return css`
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: ${textAlignment
        ? textAlignmentMapping[textAlignment]
        : "start"};
      text-align: ${textAlignment};
      width: ${overlayContentWidth};
    `;
  }}
`;

export const HeroTitle = styled("h1")`
  ${(props: StyledHeroProps) => {
    const { headerFontSize = "m" } = props;
    if (headerFontSize === "s") {
      return fontHeaderS(props);
    } else if (headerFontSize === "m") {
      return fontHeaderM(props);
    } else if (headerFontSize === "l") {
      return fontHeaderL(props);
    }
  }}

  ${(props: StyledHeroProps) => {
    const { hasInvertTextColor } = props;
    const semanticColors = getSemanticColors(props);

    return css`
      color: ${hasInvertTextColor
        ? semanticColors?.base?.textPrimaryInverse
        : semanticColors?.base?.textPrimary};
    `;
  }}

  margin: 0;
  padding: 0;
`;

export const HeroCaption = styled("p")`
  ${fontBodyXxxs}

  ${(props: StyledHeroProps) => {
    const { hasInvertTextColor } = props;
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return css`
      color: ${hasInvertTextColor
        ? semanticColors?.base?.textPrimaryInverse
        : semanticColors?.base?.textPrimary};

      margin: ${spaces?.m}px 0 0;
    `;
  }}

  padding: 0;
`;

export const ContentSlot = styled("div")`
  ${(props: StyledHeroProps) => {
    const spaces = getSpaces(props);

    return css`
      margin: ${spaces?.l}px 0 0;
      width: 100%;
      height: 100%;
    `;
  }}
`;

export const DarkeningMask = styled("div")`
  ${(props: StyledHeroProps) => {
    const { darkeningMaskColor = "#000", darkeningMaskOpacity = 0 } = props;

    return css`
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${darkeningMaskColor};
      opacity: ${darkeningMaskOpacity};
    `;
  }}
`;

export const DemoContentSlot = styled("div")`
  ${(props: StyledHeroProps) => {
    const semanticColors = getSemanticColors(props);

    return css`
      color: ${semanticColors?.base?.textPrimary};
      border: 1px dashed ${semanticColors?.base?.borderSecondary};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 100%;
    `;
  }}
`;

export const DarkeningVignette = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  z-index: 1;
  background-image: linear-gradient(
    to bottom,
    black 0%,
    rgba(0, 0, 0, 0.738) 19%,
    rgba(0, 0, 0, 0.541) 34%,
    rgba(0, 0, 0, 0.382) 47%,
    rgba(0, 0, 0, 0.278) 56.5%,
    rgba(0, 0, 0, 0.194) 65%,
    rgba(0, 0, 0, 0.126) 73%,
    rgba(0, 0, 0, 0.075) 80.2%,
    rgba(0, 0, 0, 0.042) 86.1%,
    rgba(0, 0, 0, 0.021) 91%,
    rgba(0, 0, 0, 0.008) 95.2%,
    rgba(0, 0, 0, 0.002) 98.2%,
    transparent 100%
  );
`;

export const OverlayMediaWrapper = styled("div")`
  ${(props: StyledHeroProps) => {
    const { overlayMediaPosition } = props;
    return css`
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      flex-direction: column;
      align-items: ${overlayMediaPosition
        ? overlayContentPositionAlignMapping[overlayMediaPosition]
        : "center"};
      justify-content: ${overlayMediaPosition
        ? overlayContentPositionJustifyMapping[overlayMediaPosition]
        : "center"};
      height: 100%;
    `;
  }}
`;

export const OverlayMedia = styled("div")`
  ${(props: StyledHeroProps) => {
    const { overlayMediaMaxHeight, overlayMediaMaxWidth, overlayMediaMargin } =
      props;
    const breakpoints = getBreakpoints(props);

    return css`
      position: absolute;
      z-index: 1;
      width: ${overlayMediaMaxWidth};
      height: ${overlayMediaMaxHeight};
      margin: ${overlayMediaMargin
        ? typeof overlayMediaMargin === "string"
          ? overlayMediaMargin
          : overlayMediaMargin?.large
        : "0"};

      ${breakpoints?.down("lg")} {
        margin: ${overlayMediaMargin
          ? typeof overlayMediaMargin === "string"
            ? overlayMediaMargin
            : overlayMediaMargin?.medium
          : "0"};
      }

      ${breakpoints?.down("md")} {
        margin: ${overlayMediaMargin
          ? typeof overlayMediaMargin === "string"
            ? overlayMediaMargin
            : overlayMediaMargin?.small
          : "0"};
      }

      img,
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    `;
  }}
`;
