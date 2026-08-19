import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Gear only ships the small artwork, so xxs, xs, and s are its only sizes.
// Rocket only ships the large artwork, so it starts at l. Passing Gear an "l"
// would be a TypeScript error and would render nothing.

import { Icon } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
        <Icon sdsIcon="Gear" sdsSize="xxs" />
        <Icon sdsIcon="Gear" sdsSize="xs" />
        <Icon sdsIcon="Gear" sdsSize="s" />
        <span style={{ fontSize: "12px" }}>Gear: xxs, xs, s</span>
      </div>

      <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
        <Icon sdsIcon="Rocket" sdsSize="l" />
        <Icon sdsIcon="Rocket" sdsSize="xl" />
        <span style={{ fontSize: "12px" }}>Rocket: l, xl</span>
      </div>
    </div>
  );
}

export default App;
`}))();export{t as default};