import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Search is one of the icons that ships both drawings, so it covers all five
// sizes: 10, 12, 16, 24, and 32px.

import { Icon } from "@czi-sds/components";

const SIZES = ["xxs", "xs", "s", "l", "xl"] as const;

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "flex-end", display: "flex", gap: "24px" }}
    >
      {SIZES.map((size) => (
        <div
          key={size}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Icon sdsIcon="Search" sdsSize={size} />
          <span style={{ fontSize: "12px" }}>{size}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
`}))();export{t as default};