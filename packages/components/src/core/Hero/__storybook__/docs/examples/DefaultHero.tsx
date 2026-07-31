// headerText and captionText are the only content props. Without heroHeight the
// section is as tall as its content plus the responsive padding.

import { Hero } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Hero
        headerText="Explore the Cell Atlas"
        captionText="Browse millions of annotated cells across tissues, species, and disease states."
        backgroundFill="#EFF2FC"
      />
    </div>
  );
}

export default App;
