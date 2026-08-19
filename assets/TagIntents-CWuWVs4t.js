import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// color carries the tag's intent. Six names are available, and neutral is what a
// tag falls back to when the prop is left out.
//
// sdsType picks how that intent is drawn: primary fills the tag with the intent
// color and sets the label white, secondary tints the fill and keeps the label in
// the intent color behind a matching border.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SdsTagColorType,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const INTENTS: Extract<SdsTagColorType, string>[] = [
  "info",
  "positive",
  "notice",
  "negative",
  "neutral",
  "beta",
];

const Stack = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-direction: column;
      gap: \${spaces?.l}px;
    \`;
  }}
\`;

const Row = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-wrap: wrap;
      gap: \${spaces?.s}px;
    \`;
  }}
\`;

const Caption = styled.p<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 0 0 \${spaces?.xxs}px;
    \`;
  }}
\`;

function App() {
  return (
    <div className="app">
      <Stack>
        <div>
          <Caption>Primary</Caption>
          <Row>
            {INTENTS.map((intent) => (
              <Tag
                color={intent}
                key={intent}
                label={intent}
                sdsStyle="rounded"
              />
            ))}
          </Row>
        </div>

        <div>
          <Caption>Secondary</Caption>
          <Row>
            {INTENTS.map((intent) => (
              <Tag
                color={intent}
                key={intent}
                label={intent}
                sdsStyle="rounded"
                sdsType="secondary"
              />
            ))}
          </Row>
        </div>
      </Stack>
    </div>
  );
}

export default App;
`}))();export{t as default};