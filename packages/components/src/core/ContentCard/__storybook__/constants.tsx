import { CardMedia } from "@mui/material";
import Icon from "src/core/Icon";
import Button from "src/core/Button";

export const CONTENT_CARD_EXCLUDED_CONTROLS = [
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
  "imagePadding",
  "imagePosition",
  "clickableCardProps",
  "classes",
];

// Buttons

export const CONTENT_CARD_BUTTONS_LABELS = [
  "Primary",
  "Secondary",
  "Minimal",
  "Minimal with Icon",
];

export const CONTENT_CARD_BUTTONS_OPTIONS = [
  // Primary
  <Button size="large" sdsStyle="solid" sdsType="primary" key="square-primary">
    Primary Button
  </Button>,
  // Secondary
  <Button
    size="large"
    sdsStyle="solid"
    sdsType="secondary"
    key="square-secondary"
  >
    Secondary Button
  </Button>,
  // Minimal
  <Button size="large" sdsStyle="minimal" sdsType="primary" key="minimal">
    Minimal Button
  </Button>,
  // Minimal with Icon
  <Button
    size="large"
    sdsStyle="minimal"
    sdsType="primary"
    key="minimal-with-icon"
    endIcon={<Icon sdsIcon="ChevronRight" sdsSize="xs" />}
  >
    Minimal Button
  </Button>,
];

// Images

export const CONTENT_CARD_IMAGE_LABELS = [
  "None",
  "Placeholder ContentCard",
  "Image ContentCard",
  "Placeholder Image",
  "Image",
];

export const CONTENT_CARD_IMAGE_OPTIONS = [
  null,
  <CardMedia
    component="img"
    key="image"
    image="https://placehold.co/300?text=Content Card Media"
    alt="Placeholder Image"
  />,
  <CardMedia
    component="img"
    key="image"
    image="https://fastly.picsum.photos/id/397/1000/1000.jpg?hmac=30YOGXbGugCMTve9gtVIFYFCQWN6j8Z0YZqmzwriiow"
    alt="Placeholder Image"
  />,
  "https://placehold.co/300?text=Placeholder Image",
  "https://fastly.picsum.photos/id/623/1000/1000.jpg?hmac=Spxiw6vTHdgANWOoWrsiFqmLk7DftbJvzyaSr-pgpT4",
];

// Icons

export const CONTENT_CARD_ICON_LABELS = [
  "None",
  "Compass Icon",
  "Speech Bubbles Icon",
];

export const CONTENT_CARD_ICON_OPTIONS = [
  null,
  <Icon sdsIcon="Compass" sdsSize="xl" key="icon" />,
  <Icon sdsIcon="SpeechBubbles" sdsSize="xl" key="icon" />,
];
