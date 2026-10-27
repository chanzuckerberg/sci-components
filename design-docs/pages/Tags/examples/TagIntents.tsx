// The seven intents a tag can communicate, in both styles.

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
