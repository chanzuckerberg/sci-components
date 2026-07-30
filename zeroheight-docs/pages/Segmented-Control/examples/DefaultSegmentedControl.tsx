// Segments come from buttonDefinition, one entry per segment in array order;
// SegmentedControl ignores children. Left uncontrolled like this, it selects the
// first segment that is not disabled and tracks clicks itself.
//
// Icons are drawn at the small size, so only icons that have 16px artwork can be
// used here. Nothing else on an icon segment is readable, so its value becomes
// both the tooltip and the accessible name — which is why the values below read
// as words rather than as codes.

import {
  SegmentedControl,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SingleButtonDefinition,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
];

const Hint = styled.p<CommonThemeProps>`
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
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />

      <Hint>Hover or focus a segment to see the tooltip it falls back to.</Hint>
    </div>
  );
}

export default App;
