import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// A clickable card is a single button, so it holds at most one action button

import {
  Button,
  ContentCard,
  ContentCardActions,
  ContentCardBody,
  Icon,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        clickableCard
        clickableCardProps={{
          href: "https://sds.czi.design",
          target: "_blank",
        }}
        titleText="The whole card is clickable"
        subtitleText="clickableCard also forces boundingBox on"
      >
        <ContentCardBody>
          clickableCardProps is forwarded to the wrapper, so the card can behave
          as a link. Only the first button in ContentCardActions is kept, since
          a button cannot be nested inside another button.
        </ContentCardBody>

        <ContentCardActions>
          <Button
            sdsStyle="minimal"
            sdsType="primary"
            endIcon={<Icon sdsIcon="ChevronRight" sdsSize="xs" />}
          >
            Learn more
          </Button>
        </ContentCardActions>
      </ContentCard>
    </div>
  );
}

export default App;
`}))();export{t as default};