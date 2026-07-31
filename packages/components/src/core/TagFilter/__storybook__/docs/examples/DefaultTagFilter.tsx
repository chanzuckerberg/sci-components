// TagFilter is the tag that comes off: onDelete is required, and removing the tag
// from your own state is what makes it disappear. Everything about how it looks is
// fixed — the accent fill, the square shape, and the small X — so there are no
// style props to pass.
//
// Both the tag and its X are focusable, so each filter is two tab stops: Backspace
// or Delete on the tag removes it, and so does Enter on the X.

import {
  TagFilter,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const FILTERS = ["Homo sapiens", "Lung", "10x 3' v3", "Healthy"];

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.s}px;
      margin-bottom: ${spaces?.m}px;
      min-height: 28px;
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
  const [filters, setFilters] = useState(FILTERS);

  return (
    <div className="app">
      <Row aria-label="Applied filters" role="group">
        {filters.map((filter) => (
          <TagFilter
            key={filter}
            label={filter}
            onDelete={() =>
              setFilters((current) => current.filter((item) => item !== filter))
            }
          />
        ))}
      </Row>

      <Readout>
        {filters.length > 0
          ? `${filters.length} of ${FILTERS.length} filters applied`
          : "No filters applied"}
      </Readout>
    </div>
  );
}

export default App;
