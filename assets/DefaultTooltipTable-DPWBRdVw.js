import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// TooltipTable is not a tooltip. It is the content (a two-column table of labels
// and values, grouped into sections) that goes inside one.
//
// It belongs in componentSlot rather than title, because title wraps whatever it is
// given in a paragraph, and a table inside a paragraph is invalid HTML that React
// complains about. Pair it with TooltipCondensed so the table follows the cursor,
// which is how it is meant to behave over a chart or a table cell.
//
// The table asks for at least 224px and the tooltip caps out at 250px, so the two
// only just fit. Long labels are what break the layout first, so keep them short.

import {
  TooltipCondensed,
  TooltipTable,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const DATA = [
  {
    dataRows: [
      { label: "Cells", value: "1,284" },
      { label: "Median genes", value: "2,105" },
      { label: "Mito. reads", value: "4.2%" },
    ],
    label: "Sample",
  },
  {
    dataRows: [
      { label: "Depth", value: "34x" },
      { label: "Duplicates", value: "8.1%" },
    ],
    label: "Sequencing",
  },
];

const Stage = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      justify-content: center;
      padding: \${spaces?.xl}px 0;
    \`;
  }}
\`;

const Cell = styled.div<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      border: 1px solid \${semanticColors?.base?.divider};
      border-radius: 4px;
      color: \${semanticColors?.base?.textPrimary};
      cursor: default;
      padding: \${spaces?.s}px \${spaces?.m}px;
    \`;
  }}
\`;

function App() {
  return (
    <div className="app">
      <Stage>
        <TooltipCondensed
          componentSlot={<TooltipTable data={DATA} itemAlign="right" />}
          title={null}
        >
          <Cell>Hover for the sample summary</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};