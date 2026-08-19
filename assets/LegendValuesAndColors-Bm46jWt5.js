import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Two ways to color a legend, and what showValues does to it.
//
// The colors prop is a palette for the set as a whole, applied by index. It is
// what generateDiscreteColors produces, and it has to be regenerated when the
// theme changes, since the generator reverses its ramp for dark mode. A color on
// the item itself is the opposite case: a category that has to look the same
// everywhere it appears.
//
// Values are formatted for you when they are numbers, and printed as given when
// they are strings, which is how a percentage or a unit gets in. The last item
// on the right is disabled: it is drawn like the others but takes no hover, no
// click, and does not dim when its neighbours are selected, which is what a
// catch-all category usually wants.

import {
  Legend,
  fontBodyXs,
  generateDiscreteColors,
  getMode,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SDSTheme,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

const COUNTS = [
  { name: "H. sapiens", value: 3212 },
  { name: "M. musculus", value: 130 },
  { name: "C. jacchus", value: 89 },
  { name: "D. rerio", value: 65 },
  { name: "M. mulatta", value: 45 },
];

const SHARES = [
  { color: "#0B6CCC", name: "Passed", value: "68%" },
  { color: "#F5C700", name: "Flagged", value: "19%" },
  { color: "#C41E3A", name: "Failed", value: "8%" },
  { disabled: true, name: "Not run", value: "5%" },
];

const Row = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-wrap: wrap;
      gap: \${spaces?.xxl}px;
    \`;
  }}
\`;

const Caption = styled.p<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 0 0 \${spaces?.s}px;
    \`;
  }}
\`;

function App() {
  const theme = useTheme() as SDSTheme;
  const colors = generateDiscreteColors(COUNTS.length, {
    isDarkMode: getMode({ theme }) === "dark",
  });

  return (
    <div className="app">
      <Row>
        <div style={{ maxWidth: "320px" }}>
          <Caption>A generated palette, with counts</Caption>
          <Legend colors={colors} items={COUNTS} showValues />
        </div>

        <div style={{ maxWidth: "320px" }}>
          <Caption>A color on each item, with shares</Caption>
          <Legend items={SHARES} showValues />
        </div>
      </Row>
    </div>
  );
}

export default App;
`}))();export{t as default};