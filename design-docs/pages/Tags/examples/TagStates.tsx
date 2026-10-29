// A tag only has hover and pressed states when it does something: here, the
// clickable tags. Hover over them and press them to see both. The disabled tags
// show the state a clickable tag takes when it is unavailable.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SdsTagStyle,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const STYLES: SdsTagStyle[] = ["solid", "outline"];

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
      gap: ${spaces?.m}px;
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
      min-width: 64px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stack>
        {STYLES.map((sdsStyle) => (
          <Row key={sdsStyle}>
            <Caption>{sdsStyle}</Caption>
            <Tag
              color="accent"
              label="Clickable"
              onClick={() => {}}
              sdsStyle={sdsStyle}
            />
            <Tag
              color="accent"
              disabled
              label="Disabled"
              onClick={() => {}}
              sdsStyle={sdsStyle}
            />
          </Row>
        ))}
      </Stack>
    </div>
  );
}

export default App;
