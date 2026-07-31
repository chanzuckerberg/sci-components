// overlayContentPosition places the content block inside the section, while
// textAlignment aligns the text within that block. overlayContentWidth keeps
// the block from spanning the full width.

import { Hero } from "@czi-sds/components";

const POSITIONS = [
  { position: "top-left", textAlignment: "left" },
  { position: "center", textAlignment: "center" },
  { position: "bottom-right", textAlignment: "right" },
] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {POSITIONS.map(({ position, textAlignment }) => (
        <Hero
          key={position}
          heroHeight="280px"
          backgroundFill="#EFF2FC"
          overlayContentPosition={position}
          overlayContentWidth="60%"
          textAlignment={textAlignment}
          headerText={position}
          captionText={`overlayContentPosition "${position}" with textAlignment "${textAlignment}".`}
        />
      ))}
    </div>
  );
}

export default App;
