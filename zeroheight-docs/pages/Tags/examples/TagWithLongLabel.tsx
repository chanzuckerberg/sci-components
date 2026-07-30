// A tag never wraps: it stretches to its label and then, in a container too narrow
// for it, cuts the label off with an ellipsis. The text that is cut is not
// available anywhere else, so a tag that can hold a long value belongs in a
// Tooltip that carries the whole thing.
//
// The tooltip only works because the tag still receives pointer events. Adding
// hover={false} to quiet the hover styling would silence the tooltip with it.

import {
  Tag,
  Tooltip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const LABEL = "Homo sapiens lung epithelial cell";

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

const NarrowColumn = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px dashed ${semanticColors?.base?.divider};
      padding: 4px;
      width: 160px;
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
  return (
    <div className="app">
      <Stack>
        <div>
          <Caption>Room for the whole label</Caption>
          <Tag label={LABEL} sdsStyle="rounded" />
        </div>

        <div>
          <Caption>
            Cut off in a 160px column, with the full text on hover
          </Caption>
          <NarrowColumn>
            <Tooltip placement="top" title={LABEL}>
              <Tag label={LABEL} sdsStyle="rounded" />
            </Tooltip>
          </NarrowColumn>
        </div>
      </Stack>
    </div>
  );
}

export default App;
