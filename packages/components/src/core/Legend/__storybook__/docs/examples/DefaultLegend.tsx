// A legend on its own is a key: a swatch and a name for each part of whatever it
// sits next to. Items are drawn in the order they are given, and the row wraps
// to as many lines as the container needs, so the container is what decides how
// wide the legend is.
//
// Nothing here is interactive. Items are still buttons for the sake of the
// legends that are, so a click lands on one and does nothing.

import { Legend } from "@czi-sds/components";

const ITEMS = [
  { color: "#0B6CCC", name: "H. sapiens" },
  { color: "#3E8F3E", name: "M. musculus" },
  { color: "#9A54C1", name: "D. rerio" },
  { color: "#C9721A", name: "M. mulatta" },
];

function App() {
  return (
    <div className="app">
      <div style={{ maxWidth: "400px" }}>
        <Legend items={ITEMS} />
      </div>
    </div>
  );
}

export default App;
