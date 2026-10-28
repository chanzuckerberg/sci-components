// Tags paired with Chips. The tags a filter applies to move to the start of the
// list, so the user can see what the condition is affecting. Removing a Chip puts
// its tag back in its default place; clicking a tag removes nothing.

import {
  Button,
  Chip,
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const TISSUES = ["Brain", "Heart", "Kidney", "Liver", "Lung"];

const DEFAULT_FILTERS = ["Liver", "Lung"];

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
      min-height: 32px;
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

function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const affected = TISSUES.filter((tissue) => filters.includes(tissue));
  const unaffected = TISSUES.filter((tissue) => !filters.includes(tissue));

  return (
    <div className="app">
      <Stack>
        <div>
          <Caption>Applied filters</Caption>
          <Row aria-label="Applied filters" role="group">
            {filters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onDelete={() =>
                  setFilters((current) =>
                    current.filter((item) => item !== filter)
                  )
                }
              />
            ))}
            {filters.length === 0 && (
              <Button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                sdsStyle="minimal"
                sdsType="secondary"
              >
                Reset filters
              </Button>
            )}
          </Row>
        </div>

        <div>
          <Caption>Tissues in this dataset</Caption>
          <Row>
            {[...affected, ...unaffected].map((tissue) => (
              <Tag key={tissue} label={tissue} sdsStyle="outline" />
            ))}
          </Row>
        </div>
      </Stack>
    </div>
  );
}

export default App;
