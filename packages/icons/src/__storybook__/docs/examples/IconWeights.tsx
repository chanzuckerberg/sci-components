// Phosphor's icons carry six drawings and switch between them on `weight`. SDS
// icons are drawn once, so they accept `weight` and ignore it. The top row is
// Phosphor, the bottom row is SDS.

import { SdsSparkleIcon } from "@czi-sds/icons";
import { StarIcon, type IconWeight } from "@phosphor-icons/react";

const WEIGHTS: IconWeight[] = [
  "thin",
  "light",
  "regular",
  "bold",
  "fill",
  "duotone",
];

function App() {
  return (
    <div className="app" style={{ display: "grid", gap: "16px" }}>
      {[StarIcon, SdsSparkleIcon].map((IconComponent, row) => (
        <div key={row} style={{ display: "flex", gap: "24px" }}>
          {WEIGHTS.map((weight) => (
            <div
              key={weight}
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <IconComponent size={32} weight={weight} />
              <span style={{ fontSize: "11px" }}>{weight}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
