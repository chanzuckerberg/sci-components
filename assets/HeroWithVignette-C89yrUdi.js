import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// darkeningVignette draws a 40px gradient across the top edge. It exists so a
// transparent header navigation stays legible where it meets the Hero.

import { Hero } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const BACKGROUND =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='1200' height='600' fill='rgb(108,166,255)'/><circle cx='200' cy='120' r='160' fill='rgb(178,150,242)'/></svg>";

function App() {
  return (
    <div className="app">
      <Hero
        heroHeight="280px"
        backgroundFill={<img src={BACKGROUND} alt="" />}
        darkeningVignette
        hasInvertTextColor
        headerText="Blending into the navigation"
        captionText="The gradient only covers the top 40px of the section."
      />
    </div>
  );
}

export default App;
`}))();export{t as default};