// A tag with an onClick becomes a button: it takes a tab stop, answers Enter and
// Space, reports its label as its name, and darkens under the pointer. A tag with
// neither an onClick nor an href is static: no role, no tab stop and no hover
// state, so it reads as a label rather than a control.
//
// disabled greys a clickable tag out and takes it out of the tab order.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stack = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.l}px;
    `;
  }}
`;

const Group = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      gap: ${spaces?.m}px;
    `;
  }}
`;

const Caption = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
      min-width: 150px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
    `;
  }}
`;

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
          />
        </Group>

        <Group>
          <Caption>Static</Caption>
          <Tag label="Read-only label" />
        </Group>

        <Group>
          <Caption>Disabled</Caption>
          <Tag
            color="info"
            disabled
            label="Filter by tissue"
            onClick={() => setClicks((count) => count + 1)}
          />
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
