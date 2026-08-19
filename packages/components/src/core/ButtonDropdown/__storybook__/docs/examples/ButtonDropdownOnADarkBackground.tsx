// backgroundAppearance tells the button which surface it is on so it can pick
// colors with enough contrast. It paints no background of its own, so the dark
// panel below is the page's to supply.

import {
  ButtonDropdown,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  const corners = getCorners({ theme });
  const semanticColors = getSemanticColors({ theme });
  const spaces = getSpaces({ theme });

  return (
    <div className="app">
      <div
        style={{
          alignItems: "center",
          backgroundColor: semanticColors?.base?.backgroundPrimaryDark,
          borderRadius: corners?.m,
          display: "flex",
          gap: spaces?.xl,
          padding: spaces?.xl,
        }}
      >
        <ButtonDropdown backgroundAppearance="dark" sdsStyle="solid">
          Solid
        </ButtonDropdown>

        <ButtonDropdown backgroundAppearance="dark" sdsStyle="outline">
          Outline
        </ButtonDropdown>

        <ButtonDropdown backgroundAppearance="dark" sdsStyle="minimal">
          Minimal
        </ButtonDropdown>
      </div>
    </div>
  );
}

export default App;
