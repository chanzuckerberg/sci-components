// size is medium unless it is set to small. A medium tag is 24px tall with a 13px
// label and 12px icons; a small one is 20px tall with a 10px label and 10px
// icons. Small suits a dense row, like a navigation bar or a tab's label.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SparkleIcon } from "@phosphor-icons/react";

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

const Group = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
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
      min-width: 80px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stack>
        <Group>
          <Caption>medium</Caption>
          <Tag color="accent" label="Annotated" />
          <Tag color="accent" icon={<SparkleIcon />} label="Annotated" />
          <Tag
            color="accent"
            icon={<SparkleIcon />}
            iconOnly
            label="Annotated"
          />
        </Group>

        <Group>
          <Caption>small</Caption>
          <Tag color="accent" label="Annotated" size="small" />
          <Tag
            color="accent"
            icon={<SparkleIcon />}
            label="Annotated"
            size="small"
          />
          <Tag
            color="accent"
            icon={<SparkleIcon />}
            iconOnly
            label="Annotated"
            size="small"
          />
        </Group>
      </Stack>
    </div>
  );
}

export default App;
