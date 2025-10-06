export const HERO_EXCLUDED_CONTROLS = [
  "theme",
  "headerText",
  "captionText",
  "children",
];

export const HERO_OVERLAY_MEDIA_LABELS = ["None", "Image", "Video"];

export const HERO_OVERLAY_MEDIA_OPTIONS = [
  null,
  <img src="https://picsum.photos/1000" alt="Hero Overlay Media" key="image" />,
  <video
    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    key="video"
    autoPlay
    muted
    loop
    playsInline
  />,
];

export const HERO_BACKGROUND_FILL_LABELS = [
  "None",
  "#6ca6ff (Hex Color)",
  "rgb(178, 150, 242) (RGB Color)",
  "Image",
  "Video",
];

export const HERO_BACKGROUND_FILL_OPTIONS = [
  null,
  "#6ca6ff",
  "rgb(178, 150, 242)",
  <img
    src="https://picsum.photos/2000"
    alt="Hero Background Fill"
    key="image"
  />,
  <video
    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    key="video"
    autoPlay
    muted
    loop
    playsInline
  />,
];
