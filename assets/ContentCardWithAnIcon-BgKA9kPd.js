import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import { ContentCard, ContentCardBody, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="icon"
        icon={<Icon sdsIcon="Compass" sdsSize="xl" />}
        titleText="Icon instead of an image"
        subtitleText="The icon sits to the left of the content"
      >
        <ContentCardBody>
          Set visualElementType to icon and pass any Icon element. The icon and
          image props are mutually exclusive.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
`}))();export{t as default};