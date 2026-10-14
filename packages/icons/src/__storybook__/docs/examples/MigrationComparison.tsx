// The same icon before and after. `sdsIcon` picks the drawing by name, so the
// name becomes the component; `sdsSize` names a size, so it becomes pixels; and
// `color` plus `shade` picked a hue from the theme, so they become a CSS color.

import { Icon } from "@czi-sds/components";
import { InfoIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "grid", gap: "16px" }}>
      <div style={{ alignItems: "center", display: "flex", gap: "12px" }}>
        <Icon sdsIcon="InfoCircle" sdsSize="l" color="blue" shade={400} />
        <code style={{ fontSize: "12px" }}>
          {`<Icon sdsIcon="InfoCircle" sdsSize="l" color="blue" shade={400} />`}
        </code>
      </div>
      <div style={{ alignItems: "center", display: "flex", gap: "12px" }}>
        <InfoIcon size={24} color="#3867fa" />
        <code style={{ fontSize: "12px" }}>
          {`<InfoIcon size={24} color="#3867fa" />`}
        </code>
      </div>
    </div>
  );
}

export default App;
