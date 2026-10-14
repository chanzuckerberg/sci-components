// backgroundFill also takes a node, which is stretched to cover the section.
// The darkening mask needs both darkeningMask and a darkeningMaskOpacity above
// zero, and hasInvertTextColor flips the title and caption to the light color.

import { Hero } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const BACKGROUND =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='rgb(58,74,148)'/><stop offset='100%' stop-color='rgb(126,86,194)'/></linearGradient></defs><rect width='1200' height='600' fill='url(%23g)'/></svg>";

function App() {
  return (
    <div className="app">
      <Hero
        heroHeight="320px"
        backgroundFill={<img src={BACKGROUND} alt="" />}
        darkeningMask
        darkeningMaskOpacity={0.4}
        hasInvertTextColor
        headerText="Single-cell data, ready to explore"
        captionText="The mask sits between the background and the content, so the text stays legible over busy imagery."
      />
    </div>
  );
}

export default App;
