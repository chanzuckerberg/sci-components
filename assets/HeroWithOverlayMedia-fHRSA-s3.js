import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// overlayMedia is a second layer of content, positioned independently of the
// text. Despite their names, overlayMediaMaxWidth and overlayMediaMaxHeight set
// the width and the height of that layer outright.

import { Hero, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";

// Inline placeholder so the example does not depend on a remote image
const MEDIA =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='400' height='200' rx='8' fill='rgb(126,86,194)'/><circle cx='300' cy='60' r='40' fill='rgb(207,212,220)'/></svg>";

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  return (
    <div className="app">
      <Hero
        heroHeight="320px"
        backgroundFill={semanticColors?.accent?.surfaceSecondary}
        overlayContentWidth="50%"
        overlayContentPosition="left"
        headerText="Media alongside the copy"
        captionText="The text block is held to half the width so the two layers do not collide."
        overlayMedia={<img src={MEDIA} alt="" />}
        overlayMediaPosition="right"
        overlayMediaMaxWidth="240px"
        overlayMediaMaxHeight="120px"
        overlayMediaMargin="0 24px 0 0"
      />
    </div>
  );
}

export default App;
`}))();export{t as default};