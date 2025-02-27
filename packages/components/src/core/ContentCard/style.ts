import styled from "@emotion/styled";
import { Card, CardActionArea, CardContent } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyS,
  getSemanticColors,
  getSpaces,
} from "../styles";
import { css } from "@emotion/react";
import { ContentCardProps } from "./index";

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
    } = props;

    const semanticColors = getSemanticColors(props);

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
      display: flex;
      background-color: ${semanticColors?.base?.backgroundPrimary};
      flex-direction: ${flexDirection};
      box-shadow: none;

      .MuiCardActionArea-focusHighlight {
        background: transparent;
      }

      ${boundingBox &&
      css`
        border: 1px solid ${semanticColors?.base?.borderSecondary};
      `}

      ${sdsType === "wide" &&
      showDecorativeBorder &&
      css`
        border-left: 4px solid ${semanticColors?.accent?.border};
      `}

      ${sdsType === "narrow" &&
      showDecorativeBorder &&
      css`
        border-top: 4px solid ${semanticColors?.accent?.border};
      `}
    `;
  }}
`;

type CardActionAreaExtraProps = {
  imagePosition?: ContentCardProps["imagePosition"];
  sdsType?: ContentCardProps["sdsType"];
  visualElementType?: ContentCardProps["visualElementType"];
} & CommonThemeProps;

export const StyledCardActionArea = styled(CardActionArea, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CardActionAreaExtraProps) => {
    const {
      imagePosition = "left",
      sdsType = "wide",
      visualElementType,
    } = props;

    const semanticColors = getSemanticColors(props);

    const flexDirection =
      sdsType === "wide"
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

      background-color: ${semanticColors?.base?.backgroundPrimary};

      &:hover,
      &:active {
        background-color: ${semanticColors?.base?.backgroundSecondary};
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
    const { boundingBox = true, clickableCard = false } = props;

    const spaces = getSpaces(props);

    return css`
      display: flex;
      flex-direction: column;
      height: ${clickableCard ? "100%" : "auto"};
      min-width: 100px;
      width: 100%;

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
