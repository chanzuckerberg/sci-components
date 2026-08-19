// Segments without a color of their own take one from a generated cubehelix
// palette, which is regenerated whenever a new category appears. That is fine
// for a one-off breakdown, but it means a category is not guaranteed the same
// color across two charts or across a change of data.
//
// Where a category has to stay recognisable, give it a color. Where the set as
// a whole just needs to sit better with the page, leave the colors generated
// and move the palette with colorGeneratorOptions.

import {
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { StackedBarChart } from "@czi-sds/data-viz";
import styled from "@emotion/styled";

const NAMED_COLORS = [
  { color: "#0B6CCC", name: "Passed", value: 220 },
  { color: "#F5C700", name: "Flagged", value: 60 },
  { color: "#C41E3A", name: "Failed", value: 35 },
];

const GENERATED = [
  { name: "Transcriptomic", value: 117 },
  { name: "Prosthetics", value: 130 },
  { name: "Epigenomics", value: 100 },
  { name: "Imaging", value: 61 },
];

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
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
      margin: 0 0 ${spaces?.s}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Row>
        <div>
          <Caption>A color on each item</Caption>
          <StackedBarChart
            data={NAMED_COLORS}
            title="QC status"
            width="300px"
          />
        </div>

        <div>
          <Caption>A generated palette, starting from green</Caption>
          <StackedBarChart
            colorGeneratorOptions={{ rotations: 0.5, start: 140 }}
            data={GENERATED}
            title="Modality"
            width="300px"
          />
        </div>
      </Row>
    </div>
  );
}

export default App;
