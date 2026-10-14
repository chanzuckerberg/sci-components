// Children render in a content slot below the caption. Anything can go there;
// buttons and links are the common case. The slot does not inherit
// hasInvertTextColor, so style its contents yourself.

import { Button, Hero, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  return (
    <div className="app">
      <Hero
        heroHeight="320px"
        backgroundFill={semanticColors?.accent?.surfaceSecondary}
        overlayContentWidth="60%"
        headerText="Start a new analysis"
        captionText="Upload your samples and get results in minutes."
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <Button sdsStyle="solid" sdsType="primary">
            Upload samples
          </Button>
          <Button sdsStyle="outline" sdsType="primary">
            View the docs
          </Button>
        </div>
      </Hero>
    </div>
  );
}

export default App;
