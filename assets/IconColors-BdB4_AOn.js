import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// color chooses the hue and shade the step within it. Both are SDS palette
// values, so a CSS color is not accepted here.

import { Icon } from "@czi-sds/components";

const COLORS = [
  "blue",
  "gray",
  "green",
  "purple",
  "indigo",
  "red",
  "yellow",
] as const;

const SHADES = [300, 400, 500, 600, 700] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        {COLORS.map((color) => (
          <Icon key={color} sdsIcon="CheckCircle" sdsSize="l" color={color} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {SHADES.map((shade) => (
          <Icon
            key={shade}
            sdsIcon="CheckCircle"
            sdsSize="l"
            color="green"
            shade={shade}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
`}))();export{t as default};