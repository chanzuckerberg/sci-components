import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The least a condensed tooltip needs: one line of text on something the pointer
// passes over. Move across the cell to see it follow the cursor, which is the
// behaviour the component locks in and the reason it suits a chart.

import {
  TooltipCondensed,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

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
        <TooltipCondensed title="1,284 cells">
          <Cell>A point in a chart</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};