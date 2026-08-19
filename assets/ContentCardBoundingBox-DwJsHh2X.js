import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import { ContentCard, ContentCardBody } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <ContentCard
        visualElementType="none"
        decorativeBorder
        titleText="Decorative border"
        subtitleText="An accent bar on the leading edge"
      >
        <ContentCardBody>
          decorativeBorder draws an accent bar down the left edge of a wide card
          and across the top of a narrow one. It needs boundingBox to be on.
        </ContentCardBody>
      </ContentCard>

      <ContentCard
        visualElementType="none"
        boundingBox={false}
        titleText="No bounding box"
        subtitleText="The card sits directly on the page"
      >
        <ContentCardBody>
          Turning boundingBox off removes the border, background, and padding,
          which suits cards that are already inside a bounded surface.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
`}))();export{t as default};