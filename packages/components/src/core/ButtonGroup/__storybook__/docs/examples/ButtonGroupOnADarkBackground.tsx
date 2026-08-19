// backgroundAppearance tells the group which surface it is on so it can pick
// borders and text with enough contrast. It paints no background of its own, so
// the dark panel below is the page's to supply.

import {
  Button,
  ButtonGroup,
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
          backgroundColor: semanticColors?.base?.backgroundPrimaryDark,
          borderRadius: corners?.m,
          display: "flex",
          gap: spaces?.xl,
          padding: spaces?.xl,
        }}
      >
        <ButtonGroup backgroundAppearance="dark" sdsType="primary">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>

        <ButtonGroup backgroundAppearance="dark" sdsType="secondary">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default App;
