// The four SDS icon sizes. `size` takes any number or CSS length, so these are
// the token values rather than a fixed set the component enforces.

import { SdsAtlasIcon } from "@czi-sds/icons";

const SIZES = [10, 12, 16, 24, 32];

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
          <SdsAtlasIcon size={size} />
          <span style={{ fontSize: "12px" }}>{size}px</span>
        </div>
      ))}
    </div>
  );
}

export default App;
