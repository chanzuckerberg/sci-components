// TooltipCondensed is the label-sized tooltip for dense surfaces: charts, table
// cells, anywhere a full sentence would be too much. It follows the cursor instead
// of anchoring to the element, and it locks that down — followCursor, placement,
// arrow, and the enter and leave delays are all applied after your props, so passing
// placement or arrow here changes nothing.
//
// indicator draws a 12px dot before the text, coloured by indicatorColor, for tying
// the tooltip to a series in a chart. indicatorColor takes a raw CSS colour rather
// than an SDS name, so read the one you want off the theme. Without it the dot is
// still laid out, just invisible.
//
// The second tooltip below asks for hasInvertedStyle={false}, the lighter scheme the
// design offers for dark backgrounds.

import {
  TooltipCondensed,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      gap: ${spaces?.xxl}px;
      justify-content: center;
      padding: ${spaces?.xl}px 0;
    `;
  }}
`;

const Cell = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      cursor: default;
      display: flex;
      gap: ${spaces?.xs}px;
      padding: ${spaces?.s}px ${spaces?.m}px;
    `;
  }}
`;

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  return (
    <div className="app">
      <Stage>
        <TooltipCondensed
          indicator
          indicatorColor={semanticColors?.info?.fillPrimary}
          title="1,284 cells"
        >
          <Cell>Hover a data point</Cell>
        </TooltipCondensed>

        <TooltipCondensed
          hasInvertedStyle={false}
          indicator
          indicatorColor={semanticColors?.negative?.fillPrimary}
          title="12 failed QC"
        >
          <Cell>Hover a point on a dark background</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
