// color carries the tag's intent. Seven are available, and neutral is what a tag
// falls back to when the prop is left out.
//
// sdsStyle picks how that intent is drawn: solid fills the tag with the intent
// color and sets the label white, outline tints the fill and draws the label,
// the icons and a 1px border in the intent color.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SdsTagIntent,
  type SdsTagStyle,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const INTENTS: SdsTagIntent[] = [
  "accent",
  "beta",
  "info",
  "negative",
  "neutral",
  "notice",
  "positive",
];

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
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.s}px;
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
        {STYLES.map((sdsStyle) => (
          <div key={sdsStyle}>
            <Caption>{sdsStyle}</Caption>
            <Row>
              {INTENTS.map((intent) => (
                <Tag
                  color={intent}
                  key={intent}
                  label={intent}
                  sdsStyle={sdsStyle}
                />
              ))}
            </Row>
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default App;
