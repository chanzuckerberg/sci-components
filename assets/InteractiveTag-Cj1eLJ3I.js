import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// A tag with an onClick becomes a button: it takes a tab stop, answers Enter and
// Space, and reports its label as its name. Use it for a tag that filters or
// navigates, not for one that only labels something.
//
// Every tag darkens under the pointer and shows a pointer cursor by default,
// including one that does nothing. hover={false} turns that off, and with it all
// pointer events, so a static tag stops looking clickable, but it also stops
// answering the mouse and stops triggering a Tooltip wrapped around it.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stack = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-direction: column;
      gap: \${spaces?.l}px;
    \`;
  }}
\`;

const Group = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      align-items: center;
      display: flex;
      gap: \${spaces?.m}px;
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
      min-width: 150px;
    \`;
  }}
\`;

const Readout = styled.p<CommonThemeProps>\`
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
  const [clicks, setClicks] = useState(0);

  return (
    <div className="app">
      <Stack>
        <Group>
          <Caption>Clickable</Caption>
          <Tag
            color="info"
            label="Filter by species"
            onClick={() => setClicks((count) => count + 1)}
            sdsStyle="rounded"
          />
        </Group>

        <Group>
          <Caption>Static</Caption>
          <Tag hover={false} label="Read-only label" sdsStyle="rounded" />
        </Group>

        <Readout>
          The clickable tag has been activated {clicks}{" "}
          {clicks === 1 ? "time" : "times"}, by pointer or by keyboard.
        </Readout>
      </Stack>
    </div>
  );
}

export default App;
`}))();export{t as default};