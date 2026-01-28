/* eslint-disable sonarjs/cognitive-complexity */
import { CommonThemeProps, getCorners, getSpaces } from "src/core/styles";
import { ContentCardProps } from "../..";
import { css, styled } from "@mui/material";

type VisualImageWrapperExtraProps = {
  imagePadding?: ContentCardProps["imagePadding"];
  boundingBox?: ContentCardProps["boundingBox"];
  sdsType?: ContentCardProps["sdsType"];
  imageSize?: ContentCardProps["imageSize"];
  image?: ContentCardProps["image"];
  imagePosition?: ContentCardProps["imagePosition"];
} & CommonThemeProps;

const doNotForwardProps = [
  "imagePadding",
  "boundingBox",
  "sdsType",
  "imageSize",
  "image",
  "imagePosition",
];

export const StyledImageMediaWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: VisualImageWrapperExtraProps) => {
    const {
      imagePadding = false,
      boundingBox = true,
      sdsType = "wide",
      imagePosition = "left",
    } = props;

    const spaces = getSpaces(props);
    const corners = getCorners(props);

    const cornerRadius = corners?.xl ? `calc(${corners.xl}px - 1px)` : "0";

    const getImageBorderRadius = () => {
      if (boundingBox && imagePadding) return 0;
      if (sdsType === "narrow") {
        return `${cornerRadius} ${cornerRadius} 0 0`;
      }
      return imagePosition === "left"
        ? `${cornerRadius} 0 0 ${cornerRadius}`
        : `0 ${cornerRadius} ${cornerRadius} 0`;
    };

    const getPadding = () => {
      if (!boundingBox || !imagePadding) {
        return css`
          padding: 0;
        `;
      }
      if (sdsType === "narrow") {
        return css`
          padding: ${spaces?.xl}px;
          padding-bottom: 0;
        `;
      }
      return css`
        padding: ${spaces?.xl}px;
        ${imagePosition === "left" ? `padding-right: 0;` : `padding-left: 0;`}
      `;
    };

    return css`
      display: flex;
      align-items: start;
      ${sdsType === "narrow" && `justify-content: center;`}

      img {
        border-radius: ${getImageBorderRadius()};
      }

      ${getPadding()}
    `;
  }}
`;
