// The Chip comes in the same two styles as the Tag, always in the accent intent.
// Hover over a Chip and press it to see its states; clicking it removes it.

import {
  Chip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.m}px;
      min-height: 24px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.m}px 0 0;
    `;
  }}
`;

function App() {
  const [removed, setRemoved] = useState(0);

  return (
    <div className="app">
      <Row aria-label="Chip styles" role="group">
        <Chip label="Solid" onDelete={() => setRemoved((count) => count + 1)} />
        <Chip
          label="Outline"
          onDelete={() => setRemoved((count) => count + 1)}
          sdsStyle="outline"
        />
      </Row>
      <Readout>
        Chips removed: {removed}. These two stay so the styles remain visible.
      </Readout>
    </div>
  );
}

export default App;
