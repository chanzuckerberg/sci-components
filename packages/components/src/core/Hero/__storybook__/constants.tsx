export const HERO_EXCLUDED_CONTROLS = [
  "theme",
  "headerText",
  "captionText",
  "children",
];

export const HERO_OVERLAY_MEDIA_LABELS = {
  none: "None",
  image: "Image",
  video: "Video",
};

export const HERO_OVERLAY_MEDIA_OPTIONS = {
  none: null,
  image: (
    <img
      src="https://fastly.picsum.photos/id/13/1000/1000.jpg?hmac=X6sDrAsvlZCC8l4ULPHQrYuBhUV1uV_OAMLE3OB-txA"
      alt="Decorative overlay"
      key="image"
    />
  ),
  video: (
    <video
      src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      key="video"
      autoPlay
      muted
      loop
      playsInline
      aria-label="Decorative overlay video"
    />
  ),
};

export const HERO_BACKGROUND_FILL_LABELS = {
  none: "None",
  hexColor: "#6ca6ff (Hex Color)",
  rgbColor: "rgb(178, 150, 242) (RGB Color)",
  image: "Image",
  video: "Video",
};

export const HERO_BACKGROUND_FILL_OPTIONS = {
  none: null,
  hexColor: "#6ca6ff",
  rgbColor: "rgb(178, 150, 242)",
  image: (
    <img
      src="https://fastly.picsum.photos/id/989/2000/2000.jpg?hmac=AnkuB5HtnIfgnbJhNbYNbOrBAlRSlniemkWIn6hEO_o"
      alt="Decorative background"
      key="image"
    />
  ),
  video: (
    <video
      src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      key="video"
      autoPlay
      muted
      loop
      playsInline
      aria-label="Decorative background video"
    />
  ),
};
