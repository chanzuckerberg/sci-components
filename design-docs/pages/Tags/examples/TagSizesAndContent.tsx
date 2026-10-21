// Both sizes come with three kinds of content: text, text with an icon, and an
// icon on its own. Tags with text are pill-shaped; an icon-only tag is square.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SdsTagSize,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SparkleIcon } from "@phosphor-icons/react";

const SIZES: SdsTagSize[] = ["medium", "small"];

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
        {SIZES.map((size) => (
          <Row key={size}>
            <Caption>{size}</Caption>
            <Tag color="accent" label="Tag Label" size={size} />
            <Tag
              color="accent"
              icon={<SparkleIcon />}
              label="Tag Label"
              size={size}
            />
            <Tag
              color="accent"
              icon={<SparkleIcon />}
              iconOnly
              label="Tag Label"
              size={size}
            />
          </Row>
        ))}
      </Stack>
    </div>
  );
}

export default App;
