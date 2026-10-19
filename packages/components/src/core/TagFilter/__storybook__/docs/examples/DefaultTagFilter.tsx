// TagFilter is the chip that comes off: onDelete is required, and removing the
// chip from your own state is what makes it disappear. The whole chip is the
// remove control, so a click anywhere on it, Enter or Space, and Backspace or
// Delete all call onDelete.
//
// Each chip is one tab stop, named "Remove" followed by its label. sdsStyle picks
// between the solid accent fill and the outlined one.

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
      min-height: 24px;
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

  const remove = (filter: string) =>
    setFilters((current) => current.filter((item) => item !== filter));

  return (
    <div className="app">
      <Row aria-label="Applied filters" role="group">
        {filters.map((filter, index) => (
          <TagFilter
            key={filter}
            label={filter}
            onDelete={() => remove(filter)}
            sdsStyle={index % 2 === 0 ? "solid" : "outline"}
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
