import styled from "@emotion/styled";
import { Card, CardContent } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyS,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "../styles";
import { css } from "@emotion/react";
import { ContentCardProps } from "./index";
import Button, { ButtonProps } from "@mui/material/Button";

type CardExtraProps = Partial<ContentCardProps> & CommonThemeProps;

const doNotForwardProps = [
  "visualElement",
  "sdsType",
  "imagePosition",
  "imagePadding",
  "overlineText",
  "titleText",
  "subtitleText",
  "metadataText",
  "contentBlock",
  "decorativeBorder",
  "boundingBox",
  "buttons",
  "visualElementType",
  "image",
  "icon",
  "buttonsPosition",
  "clickableCard",
  "imageSize",
  "clickableCardProps",
  "cardSdsType",
  "classes",
];

const getFlexDirection = (
  sdsType: ContentCardProps["sdsType"],
  visualElementType: ContentCardProps["visualElementType"] | undefined,
  imagePosition: ContentCardProps["imagePosition"]
) => {
  return sdsType === "wide" && visualElementType === "image"
    ? imagePosition === "left"
      ? "row"
      : "row-reverse"
    : visualElementType === "icon"
      ? "row"
      : "column";
};

const getShowDecorativeBorder = (
  visualElementType: ContentCardProps["visualElementType"] | undefined,
  boundingBox: boolean,
  decorativeBorder: boolean,
  imagePadding: boolean,
  imagePosition: ContentCardProps["imagePosition"]
) => {
  return visualElementType === "image"
    ? boundingBox &&
        decorativeBorder &&
        ((imagePadding && imagePosition === "left") ||
          imagePosition === "right")
    : boundingBox && decorativeBorder;
};

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CardExtraProps) => {
    const {
      imagePosition = "left",
      sdsType = "wide",
      boundingBox = true,
      decorativeBorder = false,
      imagePadding = false,
      visualElementType,
      clickableCard = false,
    } = props;

    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spaces = getSpaces(props);

    const flexDirection = getFlexDirection(
      sdsType,
      visualElementType,
      imagePosition
    );

    const showDecorativeBorder = getShowDecorativeBorder(
      visualElementType,
      boundingBox,
      decorativeBorder,
      imagePadding,
      imagePosition
    );

    return css`
      position: relative;
      display: flex;
      background-color: transparent;
      background-image: none;
      flex-direction: ${flexDirection};
      overflow: visible !important;
      box-shadow: none;
      border-radius: ${corners?.xl}px;

      .MuiCardActionArea-focusHighlight {
        background: transparent;
      }

      &:hover,
      &:active {
        box-shadow: ${clickableCard ? shadows?.l : shadows?.none} !important;
      }

      ${boundingBox &&
      css`
        border: 1px solid ${semanticColors?.base?.borderSecondary};
        background-color: ${semanticColors?.base?.backgroundPrimary};
      `}

      ${showDecorativeBorder &&
      css`
        &:before {
          content: "";
          position: absolute;
          background-color: ${semanticColors?.accent?.foreground};
          z-index: 10;

          ${sdsType === "wide" &&
          css`
            top: -1px;
            bottom: -1px;
            left: -1px;
            width: ${spaces?.xs}px;
            border-top-left-radius: ${corners?.xl}px;
            border-bottom-left-radius: ${corners?.xl}px;
          `}

          ${sdsType === "narrow" &&
          css`
            height: ${spaces?.xs}px;
            top: -1px;
            left: -1px;
            right: -1px;
            border-top-left-radius: ${corners?.xl}px;
            border-top-right-radius: ${corners?.xl}px;
          `}
        }
      `}

      ${sdsType === "wide" &&
      showDecorativeBorder &&
      css`
        border-top-left-radius: ${corners?.l}px;
        border-bottom-left-radius: ${corners?.l}px;
      `}

      ${sdsType === "narrow" &&
      showDecorativeBorder &&
      css`
        border-top-left-radius: ${corners?.l}px;
        border-top-right-radius: ${corners?.l}px;
      `}
    `;
  }}
`;

type CardActionAreaExtraProps = {
  imagePosition?: ContentCardProps["imagePosition"];
  cardSdsType?: ContentCardProps["sdsType"];
  visualElementType?: ContentCardProps["visualElementType"];
} & ButtonProps &
  CommonThemeProps;

export const StyledCardActionArea = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CardActionAreaExtraProps) => {
    const {
      imagePosition = "left",
      cardSdsType = "wide",
      visualElementType,
    } = props;

    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const flexDirection = getFlexDirection(
      cardSdsType,
      visualElementType,
      imagePosition
    );

    return `
      display: flex;
      flex-direction: ${flexDirection};
      align-items: unset;
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
      overflow: auto;
      text-align: unset;
      border-radius: ${corners?.xl}px;

      background-color: ${semanticColors?.base?.backgroundPrimary};

      &:hover,
      &:active {
        background-color: ${semanticColors?.base?.surfacePrimary};
      }
    `;
  }}
`;

type VisualIconWrapperExtraProps = {
  boundingBox?: boolean;
  sdsType?: ContentCardProps["sdsType"];
} & CommonThemeProps;

export const StyledIconMediaWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: VisualIconWrapperExtraProps) => {
    const { boundingBox = true } = props;
    const spaces = getSpaces(props);

    return css`
      ${boundingBox
        ? css`
            padding: ${spaces?.xl}px 0 ${spaces?.xl}px ${spaces?.xl}px;
          `
        : css`
            padding-right: ${spaces?.xl}px;
          `}
    `;
  }}
`;

export const StyledCardContent = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CardExtraProps) => {
    const { boundingBox = true, sdsType = "wide", visualElementType } = props;

    const spaces = getSpaces(props);
    const NoBoundingBoxPadding =
      sdsType === "narrow"
        ? visualElementType === "image"
          ? `${spaces?.xl}px 0 0 0`
          : 0
        : `0 0 0 ${spaces?.xl}px`;

    return css`
      display: flex;
      flex-direction: column;
      min-width: 100px;
      width: 100%;
      height: 100%;

      ${boundingBox
        ? css`
            padding: ${spaces?.xl}px;
          `
        : css`
            padding: ${NoBoundingBoxPadding};
          `}
    `;
  }}
`;

export const StyledContentCardBody = styled(CardContent, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyS}
  ${(props: CardExtraProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
      margin: ${spaces?.l}px 0 0;
      padding: 0;
      white-space: pre-wrap;
    `;
  }}
`;

export const StyledCardContentAligner = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
