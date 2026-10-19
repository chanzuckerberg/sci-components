import { CardMedia } from "@mui/material";
import Icon from "@components/src/core/Icon";
import Button from "@components/src/core/Button";

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

export const CONTENT_CARD_BUTTONS_LABELS = {
  primary: "Primary",
  secondary: "Secondary",
  minimal: "Minimal",
  minimalWithIcon: "Minimal with Icon",
};

export const CONTENT_CARD_BUTTONS_OPTIONS = {
  primary: (
    <Button
      size="large"
      sdsStyle="solid"
      sdsType="primary"
      key="square-primary"
    >
      Primary Button
    </Button>
  ),
  secondary: (
    <Button
      size="large"
      sdsStyle="solid"
      sdsType="secondary"
      key="square-secondary"
    >
      Secondary Button
    </Button>
  ),
  minimal: (
    <Button size="large" sdsStyle="minimal" sdsType="primary" key="minimal">
      Minimal Button
    </Button>
  ),
  minimalWithIcon: (
    <Button
      size="large"
      sdsStyle="minimal"
      sdsType="primary"
      key="minimal-with-icon"
      endIcon={<Icon sdsIcon="ChevronRight" sdsSize="xs" />}
    >
      Minimal Button
    </Button>
  ),
};

// Images

export const CONTENT_CARD_IMAGE_LABELS = {
  none: "None",
  placeholderContentCard: "Placeholder ContentCard",
  imageContentCard: "Image ContentCard",
  placeholderImage: "Placeholder Image",
  image: "Image",
};

export const CONTENT_CARD_IMAGE_OPTIONS = {
  none: null,
  placeholderContentCard: (
    <CardMedia
      component="img"
      key="image"
      image="https://placehold.co/300?text=Content Card Media"
      alt="Placeholder Image"
    />
  ),
  imageContentCard: (
    <CardMedia
      component="img"
      key="image"
      image="https://fastly.picsum.photos/id/397/1000/1000.jpg?hmac=30YOGXbGugCMTve9gtVIFYFCQWN6j8Z0YZqmzwriiow"
      alt="Placeholder Image"
    />
  ),
  placeholderImage: "https://placehold.co/300?text=Placeholder Image",
  image:
    "https://fastly.picsum.photos/id/623/1000/1000.jpg?hmac=Spxiw6vTHdgANWOoWrsiFqmLk7DftbJvzyaSr-pgpT4",
};

// Icons

export const CONTENT_CARD_ICON_LABELS = {
  none: "None",
  compass: "Compass Icon",
  speechBubbles: "Speech Bubbles Icon",
};

export const CONTENT_CARD_ICON_OPTIONS = {
  none: null,
  compass: <Icon sdsIcon="Compass" sdsSize="xl" key="icon" />,
  speechBubbles: <Icon sdsIcon="SpeechBubbles" sdsSize="xl" key="icon" />,
};
