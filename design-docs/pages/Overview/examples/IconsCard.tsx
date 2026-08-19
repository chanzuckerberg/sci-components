// The Icons card on the Overview page.
//
// A card is drawn at a little under half size, so the package's own examples do
// not carry over: the sizes example is mostly labels at that scale, and the full
// gallery crops to a few unreadable rows. This shows a handful of the icons at a
// size that survives the reduction, which is what a card is for.

import { AtlasIcon, PredictIcon, SparklesIcon } from "@czi-sds/icons";

const ICONS = [AtlasIcon, PredictIcon, SparklesIcon];

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", gap: "32px", justifyContent: "center" }}
    >
      {ICONS.map((Icon, index) => (
        <Icon color="#6E4FF9" key={index} size={72} />
      ))}
    </div>
  );
}

export default App;
