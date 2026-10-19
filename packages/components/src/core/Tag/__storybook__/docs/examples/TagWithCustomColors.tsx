// color also takes a tuple of CSS colors for a tag the intents do not cover:
// [label, background] or [label, background, icon]. The icon takes the label
// color when the third value is left out, and an outline tag draws its border
// from the label color too.
//
// The contrast of whatever colors you pick is on you, since SDS only guarantees
// it for its own intents.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { StarIcon } from "@phosphor-icons/react";

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
      min-width: 180px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stack>
        <Group>
          <Caption>[label, background]</Caption>
          <Tag
            color={["#3b2f00", "#ffe6a0"]}
            icon={<StarIcon />}
            label="Icon takes the label color"
          />
        </Group>

        <Group>
          <Caption>[label, background, icon]</Caption>
          <Tag
            color={["#3b2f00", "#ffe6a0", "#b26f00"]}
            icon={<StarIcon />}
            label="Icon colored on its own"
          />
        </Group>

        <Group>
          <Caption>Outline</Caption>
          <Tag
            color={["#3b2f00", "#fff8e0"]}
            label="Border from the label"
            sdsStyle="outline"
          />
        </Group>
      </Stack>
    </div>
  );
}

export default App;
