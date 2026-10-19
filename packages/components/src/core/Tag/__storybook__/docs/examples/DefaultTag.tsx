// A label is all a Tag needs. Everything else has a default: the neutral intent,
// the solid style and the medium size. A tag is pill-shaped; only an icon-only
// tag is square.

import { Tag } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tag label="Science Design System" />
    </div>
  );
}

export default App;
