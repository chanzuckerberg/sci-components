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

    return css`
      display: flex;
      align-items: start;

      img {
        border-radius: ${boundingBox && imagePadding
          ? 0
          : imagePosition === "left"
            ? `calc(${corners?.xl}px - 1px) 0 0 calc(${corners?.xl}px - 1px)`
            : `0 calc(${corners?.xl}px - 1px) calc(${corners?.xl}px - 1px) 0`};
      }

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
        : null}

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
          : null}

        justify-content: center;

        img {
          border-radius: ${boundingBox && imagePadding
            ? 0
            : `calc(${corners?.xl}px - 1px) calc(${corners?.xl}px - 1px) 0 0`};
        }
      `}
    `;
  }}
`;
