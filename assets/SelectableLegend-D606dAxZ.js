import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Selection is controlled: the legend draws whatever selectedIndices holds and
// asks the parent to change it through onSelectionChange, which is called with
// the clicked index toggled in or out. Because the state lives in the parent,
// the same selection can drive something else on the page. Here, that is the
// list of datasets beside it.
//
// Selected items keep a filled background and their swatch at full opacity,
// while everything unselected fades. Hovering wins over that for as long as the
// pointer is on the row.
//
// Clicking an item is pointer-only: items are buttons and take focus, but they
// do not respond to Enter or Space. The buttons below are what let a keyboard
// change the selection at all.

import { useState } from "react";
import {
  Button,
  Legend,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const ITEMS = [
  { color: "#0B6CCC", name: "Transcriptomic", value: 117 },
  { color: "#3E8F3E", name: "Prosthetics", value: 130 },
  { color: "#9A54C1", name: "Epigenomics", value: 100 },
  { color: "#C9721A", name: "Imaging", value: 61 },
];

const Stack = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-direction: column;
      gap: \${spaces?.l}px;
      max-width: 420px;
    \`;
  }}
\`;

const Controls = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      gap: \${spaces?.s}px;
    \`;
  }}
\`;

const Caption = styled.p<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 0;
    \`;
  }}
\`;

function App() {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([1]);

  const summary = selectedIndices.length
    ? selectedIndices.map((index) => ITEMS[index].name).join(", ")
    : "Nothing selected: showing all modalities.";

  return (
    <div className="app">
      <Stack>
        <Legend
          items={ITEMS}
          onSelectionChange={setSelectedIndices}
          selectedIndices={selectedIndices}
          showValues
        />

        <Controls>
          <Button
            onClick={() => setSelectedIndices(ITEMS.map((_, index) => index))}
            sdsStyle="outline"
            sdsType="primary"
          >
            Select all
          </Button>
          <Button
            disabled={selectedIndices.length === 0}
            onClick={() => setSelectedIndices([])}
            sdsStyle="minimal"
            sdsType="secondary"
          >
            Clear
          </Button>
        </Controls>

        <Caption>{summary}</Caption>
      </Stack>
    </div>
  );
}

export default App;
`}))();export{t as default};