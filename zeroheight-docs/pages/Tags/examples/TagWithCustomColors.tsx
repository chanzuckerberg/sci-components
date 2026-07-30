// color also takes a tuple of CSS colors for a tag the intents do not cover:
// [label, background] or [label, background, icon].
//
// The two-value form does not touch the icon, which stays white and disappears on
// a light background — the first tag below. A tag with an icon wants the
// three-value form, and the contrast of whatever colors you pick is on you, since
// SDS only guarantees it for its own intents.

import { Icon, Tag } from "@czi-sds/components";
import styled from "@emotion/styled";
import {
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";

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
            icon={<Icon sdsIcon="Star" sdsSize="l" />}
            label="Icon left white"
            sdsSize="l"
            sdsStyle="rounded"
          />
        </Group>

        <Group>
          <Caption>[label, background, icon]</Caption>
          <Tag
            color={["#3b2f00", "#ffe6a0", "#b26f00"]}
            icon={<Icon sdsIcon="Star" sdsSize="l" />}
            label="Icon colored too"
            sdsSize="l"
            sdsStyle="rounded"
          />
        </Group>

        <Group>
          <Caption>No icon, two values</Caption>
          <Tag
            color={["#3b2f00", "#ffe6a0"]}
            label="Label and background"
            sdsStyle="rounded"
          />
        </Group>
      </Stack>
    </div>
  );
}

export default App;
