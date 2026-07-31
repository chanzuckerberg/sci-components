// An icon goes on the leading edge of a tag, and the large size requires one —
// TypeScript rejects sdsSize="l" without it.
//
// The tag draws whatever icon it is given at a fixed size: 12px in a small tag,
// 24px in a large one. Match the Icon's own sdsSize to that so the artwork is
// drawn at the size it was made for — s or xs for a small tag, l for a large one.
// Not every icon exists at both sizes: Virus below is large-only, so asking for it
// at a small size renders nothing and logs an error.

import { Icon, Tag } from "@czi-sds/components";
import styled from "@emotion/styled";
import {
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.m}px;
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
      <Caption>
        A large tag with a large icon, and a small tag with a small one
      </Caption>
      <Row>
        <Tag
          color="negative"
          icon={<Icon sdsIcon="Virus" sdsSize="l" />}
          label="Virus"
          sdsSize="l"
          sdsStyle="rounded"
        />

        <Tag
          color="negative"
          icon={<Icon sdsIcon="Bacteria" sdsSize="s" />}
          label="Bacteria"
          sdsStyle="rounded"
        />
      </Row>
    </div>
  );
}

export default App;
