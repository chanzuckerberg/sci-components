import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// ContentCardActions only accepts SDS Button elements

import {
  Button,
  ContentCard,
  ContentCardActions,
  ContentCardBody,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        buttonsPosition="right"
        titleText="Card with actions"
        subtitleText="buttonsPosition aligns the button row"
      >
        <ContentCardBody>
          Buttons belong in ContentCardActions, which the card positions for
          you. Anything that is not an SDS Button is dropped with a warning.
        </ContentCardBody>

        <ContentCardActions>
          <Button sdsStyle="minimal" sdsType="primary">
            Secondary action
          </Button>
          <Button sdsStyle="solid" sdsType="primary">
            Primary action
          </Button>
        </ContentCardActions>
      </ContentCard>
    </div>
  );
}

export default App;
`}))();export{t as default};