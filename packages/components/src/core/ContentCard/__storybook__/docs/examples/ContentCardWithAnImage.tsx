import { ContentCard, ContentCardBody } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(207,212,220)'/></svg>";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <ContentCard
        visualElementType="image"
        image={IMAGE}
        imageSize={200}
        titleText="Image on the left"
        subtitleText="The default image position"
      >
        <ContentCardBody>
          Pass image either a URL string or a CardMedia element. imageSize sets
          the width of the image area in pixels.
        </ContentCardBody>
      </ContentCard>

      <ContentCard
        visualElementType="image"
        image={IMAGE}
        imageSize={200}
        imagePosition="right"
        imagePadding
        titleText="Image on the right, with padding"
        subtitleText="imagePosition and imagePadding"
      >
        <ContentCardBody>
          imagePadding insets the image from the edge of the card instead of
          letting it bleed to the border.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
