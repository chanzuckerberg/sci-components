// Narrow cards stack the visual above the content, which suits card grids

import { ContentCard, ContentCardBody } from "@czi-sds/components";

const IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(207,212,220)'/></svg>";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ContentCard
        sdsType="narrow"
        visualElementType="image"
        image={IMAGE}
        imageSize={140}
        titleText="First card"
        subtitleText="Subtitle"
        style={{ width: "260px" }}
      >
        <ContentCardBody>
          A card also switches to the narrow layout on its own once it is
          rendered below roughly 595px wide.
        </ContentCardBody>
      </ContentCard>

      <ContentCard
        sdsType="narrow"
        visualElementType="image"
        image={IMAGE}
        imageSize={140}
        titleText="Second card"
        subtitleText="Subtitle"
        style={{ width: "260px" }}
      >
        <ContentCardBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          facilisis tortor et pellentesque pulvinar.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
