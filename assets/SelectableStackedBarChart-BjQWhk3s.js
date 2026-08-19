import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Selection is controlled, so the chart draws whatever selectedIndices holds
// and asks the parent to change it through onSelectionChange. That makes it
// straightforward to point two charts at one selection, which is the clearest
// way to see what selectionBehavior does: dim keeps the shape of the whole and
// fades what is not selected, while hide drops those segments and lets the
// rest grow into the space.
//
// Clicking a segment or a legend item is pointer-only, so the buttons are not
// just a convenience: they are how a keyboard reaches the selection at all.

import { useState } from "react";
import {
  Button,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { StackedBarChart } from "@czi-sds/data-viz";
import styled from "@emotion/styled";

const DATA = [
  { name: "Transcriptomic", value: 117 },
  { name: "Prosthetics", value: 130 },
  { name: "Epigenomics", value: 100 },
  { name: "Imaging", value: 61 },
];

const Stack = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-direction: column;
      gap: \${spaces?.xl}px;
    \`;
  }}
\`;

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
    const spaces = getSpaces(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 0 0 \${spaces?.s}px;
    \`;
  }}
\`;

function App() {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([1]);

  return (
    <div className="app">
      <Stack>
        <Controls>
          <Button
            onClick={() => setSelectedIndices(DATA.map((_, index) => index))}
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

        <Row>
          <div>
            <Caption>selectionBehavior=&quot;dim&quot;</Caption>
            <StackedBarChart
              data={DATA}
              onSelectionChange={setSelectedIndices}
              selectedIndices={selectedIndices}
              title="Modality"
              width="300px"
            />
          </div>

          <div>
            <Caption>selectionBehavior=&quot;hide&quot;</Caption>
            <StackedBarChart
              data={DATA}
              onSelectionChange={setSelectedIndices}
              selectedIndices={selectedIndices}
              selectionBehavior="hide"
              title="Modality"
              width="300px"
            />
          </div>
        </Row>
      </Stack>
    </div>
  );
}

export default App;
`}))();export{t as default};