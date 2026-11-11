import { ContentCard, ContentCardBody } from "@czi-sds/components";
import { CompassIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="icon"
        icon={<CompassIcon weight="bold" size={32} />}
        titleText="Icon instead of an image"
        subtitleText="The icon sits to the left of the content"
      >
        <ContentCardBody>
          Set visualElementType to icon and pass any icon element. The icon and
          image props are mutually exclusive.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
