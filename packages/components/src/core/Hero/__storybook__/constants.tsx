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
