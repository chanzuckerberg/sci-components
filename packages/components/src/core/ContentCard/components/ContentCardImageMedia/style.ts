import { CommonThemeProps, getSpaces } from "src/core/styles";
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

    return css`
      display: flex;
      align-items: start;

      ${boundingBox
        ? imagePadding
          ? css`
              padding: ${spaces?.xl}px;
              ${imagePosition === "left"
                ? `padding-right: 0;`
                : `padding-left: 0;`}
            `
          : css`
              padding: 0;
            `
        : css`
            ${imagePosition === "left"
              ? `padding-right: ${spaces?.xl}px;`
              : `padding-left: ${spaces?.xl}px;`}
          `}

      ${sdsType === "narrow" &&
      css`
        ${boundingBox
          ? imagePadding
            ? css`
                padding: ${spaces?.xl}px;
                padding-bottom: 0;
              `
            : css`
                padding: 0;
              `
          : css`
              padding-bottom: ${spaces?.xl}px;
            `}

        justify-content: center;
      `}
    `;
  }}
`;
