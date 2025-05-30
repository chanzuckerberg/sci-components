import React, { forwardRef } from "react";
import { ContentCardProps } from "../..";
import { StyledImageMediaWrapper } from "./style";
import { CardMedia, CardMediaProps } from "@mui/material";

export interface ContentCardImageMediaProps {
  imagePadding?: ContentCardProps["imagePadding"];
  imagePosition?: ContentCardProps["imagePosition"];
  boundingBox?: ContentCardProps["boundingBox"];
  sdsType: ContentCardProps["sdsType"];
  imageSize: ContentCardProps["imageSize"];
  image?: ContentCardProps["image"];
  className?: string;
}

/**
 * @see https://mui.com/material-ui/api/card-media/
 */
const ContentCardImageMedia = forwardRef<
  HTMLDivElement,
  ContentCardImageMediaProps
>(function ContentCardImageMedia(
  props: ContentCardImageMediaProps,
  ref
): JSX.Element | null {
  const { image, imageSize, sdsType, className } = props;

  /**
   * (masoudmanson): These styles makes the image responsive and
   * ensures the image is the right aspect ratio in different card sizes.
   */
  const imageMediaStyles = {
    height: "100%",
    maxHeight: sdsType === "narrow" ? imageSize : "100%",
    maxWidth: sdsType === "narrow" ? "100%" : imageSize,
    minHeight: imageSize,
    minWidth: sdsType === "narrow" ? "unset" : imageSize,
    width: "100%",
  };

  /**
   * (masoudmanson): We need to make sure the image is wrapped in a CardMedia component.
   * - If it's a string, wrap it in CardMedia with proper styles.
   * - If it's already a CardMedia component, clone it and apply the styles.
   * - If it's a valid element, clone it and apply the styles.
   * - If it's null, return null.
   */
  const imageElement =
    typeof image === "string" ? (
      <CardMedia
        component="img"
        src={image}
        alt="Content Card Media"
        sx={{ ...imageMediaStyles }}
      />
    ) : React.isValidElement(image) && image.type === CardMedia ? (
      React.cloneElement(image as React.ReactElement<CardMediaProps>, {
        component: "img",
        sx: {
          ...(image.props as CardMediaProps).sx,
          ...imageMediaStyles,
        },
      })
    ) : React.isValidElement(image) ? (
      React.cloneElement(image as React.ReactElement, {
        style: {
          ...imageMediaStyles,
          objectFit: "cover",
          objectPosition: "center",
        },
      })
    ) : null;

  return (
    <StyledImageMediaWrapper ref={ref} {...props} className={className}>
      {imageElement}
    </StyledImageMediaWrapper>
  );
});

export default ContentCardImageMedia;
