import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The four text slots, in the order they are rendered

import { ContentCard, ContentCardBody } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        overlineText="Overline"
        titleText="Content Card title"
        subtitleText="Subtitle"
        metadataText="Metadata, such as a date or an author"
      >
        <ContentCardBody>
          Anything passed as children renders below the text slots. Wrap plain
          copy in ContentCardBody so it picks up the card's body styling.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
`}))();export{t as default};