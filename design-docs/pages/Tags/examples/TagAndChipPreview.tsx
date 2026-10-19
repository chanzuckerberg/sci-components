// A Tag labels the element it sits beside. A Chip, TagFilter in code, shows a
// condition the user has applied and comes off when it is clicked.

import {
  Tag,
  TagFilter,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SparkleIcon } from "@phosphor-icons/react";
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

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.s}px;
      min-height: 24px;
    `;
  }}
`;

const Caption = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.xxs}px;
    `;
  }}
`;

const FILTERS = ["Homo sapiens", "Lung"];

function App() {
  const [filters, setFilters] = useState(FILTERS);

  return (
    <div className="app">
      <Stack>
        <div>
          <Caption>Tag</Caption>
          <Row>
            <Tag color="positive" label="Published" />
            <Tag color="info" label="In review" sdsStyle="outline" />
            <Tag color="accent" icon={<SparkleIcon />} label="Generated" />
          </Row>
        </div>

        <div>
          <Caption>Chip</Caption>
          <Row aria-label="Applied filters" role="group">
            {filters.map((filter) => (
              <TagFilter
                key={filter}
                label={filter}
                onDelete={() =>
                  setFilters((current) =>
                    current.filter((item) => item !== filter)
                  )
                }
              />
            ))}
          </Row>
        </div>
      </Stack>
    </div>
  );
}

export default App;
