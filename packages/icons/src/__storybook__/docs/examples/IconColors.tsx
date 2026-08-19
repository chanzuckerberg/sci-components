// `color` takes any CSS color. It defaults to `currentColor`, so an icon with no
// color of its own inherits the text color around it.

import { SdsSparklesIcon } from "@czi-sds/icons";

const COLORS = [
  "currentColor",
  "#1a6cef",
  "#6e4ff9",
  "#238444",
  "#db2131",
  "#da9900",
];

function App() {
  return (
    <div
      className="app"
      style={{ color: "#000000", display: "flex", gap: "16px" }}
    >
      {COLORS.map((color) => (
        <SdsSparklesIcon key={color} size={32} color={color} />
      ))}
    </div>
  );
}

export default App;
