// A disabled segment cannot be clicked and shows no tooltip, since a control that
// will not respond has nothing to explain. The uncontrolled starting selection
// skips it too, so the first control below opens on Table rather than on List.
//
// The disabled prop on the control itself, rather than on a segment, turns every
// segment off at once while leaving the current selection visible.

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
  { disabled: true, icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
];

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

const Stack = styled.div<CommonThemeProps>`
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

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stack>
        <Row>
          <SegmentedControl buttonDefinition={VIEWS} />
          <Caption>One segment disabled</Caption>
        </Row>

        <Row>
          <SegmentedControl buttonDefinition={VIEWS} disabled />
          <Caption>The whole control disabled</Caption>
        </Row>
      </Stack>
    </div>
  );
}

export default App;
