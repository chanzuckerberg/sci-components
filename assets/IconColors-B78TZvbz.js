import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`color\` takes any CSS color. It defaults to \`currentColor\`, so an icon with no
// color of its own inherits the text color around it.

import { SparklesIcon } from "@czi-sds/icons";

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
        <SparklesIcon key={color} size={32} color={color} />
      ))}
    </div>
  );
}

export default App;
`}))();export{t as default};