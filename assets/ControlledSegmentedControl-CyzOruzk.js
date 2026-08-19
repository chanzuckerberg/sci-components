import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Passing value makes the control controlled: it shows the segment you name and
// stops tracking clicks on its own, so onChange has to write the new value back.
//
// Clicking the selected segment again reports null, which would leave the control
// with nothing selected. A view switcher has to show something, so this handler
// ignores null and keeps the current view.

import {
  SegmentedControl,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SingleButtonDefinition,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
];

const Readout = styled.p<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: \${spaces?.m}px 0 0;
    \`;
  }}
\`;

function App() {
  const [view, setView] = useState("Table");

  return (
    <div className="app">
      <SegmentedControl
        buttonDefinition={VIEWS}
        onChange={(_event, newView: string | null) => {
          if (newView !== null) {
            setView(newView);
          }
        }}
        value={view}
      />

      <Readout>Showing the {view.toLowerCase()} view</Readout>
    </div>
  );
}

export default App;
`}))();export{t as default};