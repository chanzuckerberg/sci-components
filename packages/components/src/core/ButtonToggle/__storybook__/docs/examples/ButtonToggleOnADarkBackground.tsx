// backgroundAppearance tells the toggle which surface it is on so it can pick
// colors with enough contrast, in both stages. It paints no background of its
// own, so the dark panel below is the page's to supply.

import {
  ButtonToggle,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";
import { ListIcon } from "@phosphor-icons/react";

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
          gap: spaces?.l,
          padding: spaces?.xl,
        }}
      >
        <ButtonToggle
          backgroundAppearance="dark"
          sdsStage="off"
          sdsStyle="outline"
          sdsType="primary"
          startIcon={<ListIcon weight="bold" />}
        >
          Off
        </ButtonToggle>

        <ButtonToggle
          backgroundAppearance="dark"
          sdsStage="on"
          sdsStyle="outline"
          sdsType="primary"
          startIcon={<ListIcon weight="bold" />}
        >
          On
        </ButtonToggle>

        <ButtonToggle
          backgroundAppearance="dark"
          sdsStage="on"
          sdsStyle="minimal"
          sdsType="primary"
          startIcon={<ListIcon weight="bold" />}
        >
          Minimal on
        </ButtonToggle>
      </div>
    </div>
  );
}

export default App;
