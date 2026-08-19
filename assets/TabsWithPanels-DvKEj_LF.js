import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Tabs draws the tab strip; the panel below it is yours to render and to connect.
// The component sets role="tablist" and role="tab" and moves the tab stop between
// the tabs, but it does not know about your content, so nothing links a tab to
// the panel it controls until you pass the ids yourself:
//
//   Tab:   id="…-tab", aria-controls="…-panel"
//   Panel: id="…-panel", role="tabpanel", aria-labelledby="…-tab"
//
// Only the selected panel is rendered here, so the tabs are the only way to reach
// the other content. tabIndex={0} on the panel gives it a tab stop, which lets a
// keyboard user move from the selected tab straight into what it revealed.

import {
  Tab,
  Tabs,
  fontBodyS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SyntheticEvent, useState } from "react";

const VIEWS = [
  {
    body: "12 samples collected between March and June, 3 of them flagged for re-sequencing.",
    id: "samples",
    label: "Samples",
  },
  {
    body: "Two runs on the NovaSeq X, both passing the coverage threshold of 30x.",
    id: "runs",
    label: "Sequencing runs",
  },
  {
    body: "A differential expression analysis finished last week and is ready to download.",
    id: "analyses",
    label: "Analyses",
  },
];

const Panel = styled.div<CommonThemeProps>\`
  \${fontBodyS}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      border: 1px solid \${semanticColors?.base?.divider};
      border-radius: 4px;
      color: \${semanticColors?.base?.textPrimary};
      padding: \${spaces?.l}px;
    \`;
  }}
\`;

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  const view = VIEWS[value];

  return (
    <div className="app">
      <Tabs
        aria-label="Project sections"
        onChange={handleChange}
        underlined
        value={value}
      >
        {VIEWS.map((item) => (
          <Tab
            aria-controls={\`\${item.id}-panel\`}
            id={\`\${item.id}-tab\`}
            key={item.id}
            label={item.label}
          />
        ))}
      </Tabs>

      <Panel
        aria-labelledby={\`\${view.id}-tab\`}
        id={\`\${view.id}-panel\`}
        role="tabpanel"
        tabIndex={0}
      >
        {view.body}
      </Panel>
    </div>
  );
}

export default App;
`}))();export{t as default};