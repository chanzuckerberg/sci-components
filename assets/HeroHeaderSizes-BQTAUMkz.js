import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// headerFontSize maps to the SDS header type scale: s, m (the default), and l.

import { Hero, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";

const SIZES = ["s", "m", "l"] as const;

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {SIZES.map((size) => (
        <Hero
          key={size}
          headerFontSize={size}
          headerText={\`headerFontSize "\${size}"\`}
          captionText="The caption always uses the same type style."
          backgroundFill={semanticColors?.accent?.surfaceSecondary}
        />
      ))}
    </div>
  );
}

export default App;
`}))();export{t as default};