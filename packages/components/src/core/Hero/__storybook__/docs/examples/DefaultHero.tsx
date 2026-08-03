// headerText and captionText are the only content props. Without heroHeight the
// section is as tall as its content plus the responsive padding.
//
// The fill comes from the theme rather than being written in as a hex, because
// the header and caption take their color from the theme too: a fixed light
// background keeps its own color in dark mode while the text over it turns
// light, and the two disappear into each other.

import { Hero, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  return (
    <div className="app">
      <Hero
        headerText="Explore the Cell Atlas"
        captionText="Browse millions of annotated cells across tissues, species, and disease states."
        backgroundFill={semanticColors?.accent?.surfaceSecondary}
      />
    </div>
  );
}

export default App;
