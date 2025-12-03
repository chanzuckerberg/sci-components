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
import Button, { SdsMinimalButtonProps } from "../Button";

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

    const flexDirection =
      sdsType === "wide" && visualElementType === "image"
        ? imagePosition === "left"
          ? "row"
          : "row-reverse"
        : visualElementType === "icon"
          ? "row"
          : "column";

    const showDecorativeBorder =
      visualElementType === "image"
        ? boundingBox && decorativeBorder && imagePadding
        : boundingBox && decorativeBorder;

    return css`
      position: relative;
      display: flex;
      background-color: transparent;
      background-image: none;
      flex-direction: ${flexDirection};
      overflow: auto;
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

      ${sdsType === "wide" &&
      showDecorativeBorder &&
      css`
        border-left: none;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: ${spaces?.xs}px;
          height: 100%;
          background-color: ${semanticColors?.accent?.border};
        }
      `}

      ${sdsType === "narrow" &&
      showDecorativeBorder &&
      css`
        border-top: none;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: ${spaces?.xs}px;
          width: 100%;
          background-color: ${semanticColors?.accent?.border};
        }
      `}
    `;
  }}
`;

type CardActionAreaExtraProps = {
  imagePosition?: ContentCardProps["imagePosition"];
  cardSdsType?: ContentCardProps["sdsType"];
  visualElementType?: ContentCardProps["visualElementType"];
} & SdsMinimalButtonProps &
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

    const flexDirection =
      cardSdsType === "wide"
        ? imagePosition === "left"
          ? "row"
          : "row-reverse"
        : visualElementType === "image"
          ? "column"
          : "row";

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

      background-color: ${semanticColors?.base?.backgroundPrimary};

      &:hover,
      &:active {
        background-color: ${semanticColors?.base?.surface};
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
    const { boundingBox = true } = props;

    const spaces = getSpaces(props);

    return css`
      display: flex;
      flex-direction: column;
      min-width: 100px;
      width: 100%;
      height: 100%;

      ${boundingBox &&
      css`
        padding: ${spaces?.xl}px;
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
    `;
  }}
`;

export const StyledCardContentAligner = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
