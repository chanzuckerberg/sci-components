import { CardProps } from "@mui/material";
import { SdsMinimalButtonProps } from "../Button";
import { ReactNode } from "react";

export interface BaseContentCardProps extends CardProps {
  sdsType?: "wide" | "narrow";
  overlineText?: string | ReactNode;
  titleText?: string | ReactNode;
  subtitleText?: string | ReactNode;
  metadataText?: string | ReactNode;
  boundingBox?: boolean;
  decorativeBorder?: boolean;
  children?: ReactNode;
  clickableCard?: boolean;
  clickableCardProps?: Partial<SdsMinimalButtonProps>;
  buttonsPosition?: "left" | "right";
  classes?: {
    cardPaper?: string;
    cardContent?: string;
    cardHeader?: string;
    cardMedia?: string;
    cardOverline?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardMetadata?: string;
    cardActions?: string;
    clickableCardButton?: string;
  };
}

export interface ImageContentCardProps extends BaseContentCardProps {
  visualElementType: "image";
  image?: ReactNode;
  imagePosition?: "left" | "right";
  imagePadding?: boolean;
  imageSize?: number;
  icon?: never;
}

export interface IconContentCardProps extends BaseContentCardProps {
  visualElementType: "icon";
  icon?: ReactNode;
  image?: never;
  imageSize?: never;
  imagePosition?: never;
  imagePadding?: never;
}

export interface NoneContentCardProps extends BaseContentCardProps {
  visualElementType: "none";
  icon?: never;
  image?: never;
  imagePosition?: never;
  imagePadding?: never;
  imageSize?: never;
}

export type ContentCardProps =
  | ImageContentCardProps
  | IconContentCardProps
  | NoneContentCardProps;

export const CONTENT_CARD_DEFAULT_IMAGE_MEDIA_SIZE = 300;
export const CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_LOW_BOUNDARY = 595;
export const CONTENT_CARD_WIDE_TYPE_MIN_WIDTH_HIGH_BOUNDARY = 605;
