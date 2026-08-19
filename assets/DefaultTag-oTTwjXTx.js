import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// A label is all a Tag needs. Everything else has a default: the neutral grey
// intent, the small size, and the square shape.
//
// Note that the component defaults to square while the design guidance above
// treats rounded as the shape to reach for, so a tag that should match the rest
// of the system asks for it: sdsStyle="rounded".

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

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

const Group = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      align-items: center;
      display: flex;
      gap: \${spaces?.m}px;
    \`;
  }}
\`;

const Caption = styled.p<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 0;
      min-width: 110px;
    \`;
  }}
\`;

function App() {
  return (
    <div className="app">
      <Stack>
        <Group>
          <Caption>Square</Caption>
          <Tag label="Science Design System" />
        </Group>

        <Group>
          <Caption>Rounded</Caption>
          <Tag label="Science Design System" sdsStyle="rounded" />
        </Group>
      </Stack>
    </div>
  );
}

export default App;
`}))();export{t as default};