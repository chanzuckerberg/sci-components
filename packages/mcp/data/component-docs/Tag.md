# Tag

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tag/index.tsx).

## SDS vs MUI

SDS Tag wraps MUI's Chip and replaces its palette, sizing and shape with SDS ones. SDS also splits the Chip's two jobs in two: Tag labels something, and TagFilter is the tag that can be removed. The differences from MUI are these:

- `sdsStyle`: `"square"` or `"rounded"`. The component defaults to `"square"`, while the design guidance above treats rounded as the shape to reach for, so a tag that should match the rest of the system asks for it explicitly.

- `sdsType`: `"primary"` (default) fills the tag with the intent color and sets the label white; `"secondary"` tints the fill, keeps the label in the intent color and draws a 1px border in it.

- `sdsSize`: `"s"` (default) or `"l"`, which is the pair of sizes the design carries rather than MUI's `"small"` and `"medium"`. A large tag must have an icon: TypeScript rejects `sdsSize="l"` without one.

- `color`: an SDS intent rather than one of MUI's palette names, since SDS hands MUI a fixed color of its own and uses this prop for the fill, the label and the icon. Six intents are available and a tag without the prop is neutral. It also takes a tuple of CSS colors for cases the intents do not cover.

- `hover`: on by default, which draws the hover and pressed states and a pointer cursor on every tag, whether or not anything happens when it is clicked. Setting it to `false` removes those states by taking the tag out of pointer events entirely, which also stops a Tooltip wrapped around it from opening.

- **Sizing and variant props do nothing:** MUI's `size` and `variant` set their classes but SDS pins the height, padding, fill and border, so a tag looks the same either way. MUI's `clickable` does have an effect, and not a useful one: it makes the tag a tab stop that does nothing. Pass `onClick` instead.

- **onDelete works, but off-brand:** a Tag given `onDelete` does become deletable, drawing MUI's filled-circle Cancel icon rather than the SDS X. Reach for TagFilter when a tag needs to come off.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-chip/).

## Behavior and accessibility

- A plain tag is a div holding its label, with no role and no tab stop, and is read as the text it shows. Giving it an `onClick` turns it into a button: it takes a tab stop, answers Enter and Space, and takes its accessible name from the label.

- Because `hover` is on by default, a tag that only labels something still darkens under the pointer and shows a pointer cursor, which reads as clickable. `hover={false}` settles that, at the cost of all pointer events, so do not combine it with `onClick`, which would leave the tag reachable by keyboard but dead to the mouse.

- Nothing about the intent reaches assistive technology: `color` is color only, so a negative tag needs a label that says what is wrong rather than relying on red.

- A tag never wraps. It stretches to fit its label and then, in a container too narrow, cuts the label off with an ellipsis, leaving the rest of the text nowhere else to be read. A tag that can hold a long value belongs in a Tooltip carrying the whole string.

- Icons are drawn at a fixed size (12px in a small tag, 24px in a large one) whatever size the Icon itself asks for, so match the Icon's `sdsSize` to the tag: `"s"` or `"xs"` for a small tag, `"l"` for a large one. Some icons exist at only one of those sizes, Star and Virus among them, and asking for one at a size it does not have renders nothing and logs an error.

- The two-value form of a custom `color` leaves the icon white rather than coloring it with the label, so it vanishes on a light fill; a tag with an icon wants the three-value form. On a secondary tag, custom colors also draw the border in the fill color, which hides it. Contrast is yours to check. SDS only guarantees it for its own intents.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name       | Type                                                                                                                                  | Default      | Description                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`    | `string`                                                                                                                              | - (required) | The tag's text, and its accessible name. It is cut off with an ellipsis rather than wrapped when there is not room for it.                                                                  |
| `color`    | `"info"` \| `"positive"` \| `"notice"` \| `"negative"` \| `"neutral"` \| `"beta"` \| `[string, string]` \| `[string, string, string]` | `"neutral"`  | The tag's intent, given either as one of the six names or as CSS colors: 1. [label color, background color]: the icon stays white 2. [label color, background color, icon color]            |
| `sdsType`  | `"primary"` \| `"secondary"`                                                                                                          | `"primary"`  | primary fills the tag with the intent color and sets the label white. secondary tints the fill and keeps the label and a 1px border in the intent color.                                    |
| `sdsStyle` | `"square"` \| `"rounded"`                                                                                                             | `"square"`   | The shape of the tag. The design guidance treats rounded as the default for the system, so it is usually worth passing.                                                                     |
| `sdsSize`  | `"s" \| "l"`                                                                                                                          | `"s"`        | The size of the tag: an 11px label with a 12px icon, or a 13px label with a 24px icon. A large tag has to have an icon.                                                                     |
| `icon`     | `JSX.Element`                                                                                                                         | -            | An icon on the leading edge, usually an SDS Icon. It is drawn at the tag's icon size whatever size it asks for, so match its `sdsSize` to the tag.                                          |
| `hover`    | `boolean`                                                                                                                             | `true`       | Whether the tag responds to the pointer with a darker fill and a pointer cursor. False removes the tag from pointer events altogether, which also keeps a surrounding Tooltip from opening. |
| `onClick`  | `(event) => void`                                                                                                                     | -            | MUI's prop. Makes the tag a button: a tab stop that answers Enter and Space.                                                                                                                |
| `onDelete` | `(event) => void`                                                                                                                     | -            | MUI's prop. Adds a delete control, drawn with MUI's Cancel icon rather than the SDS X. Use TagFilter for a removable tag instead.                                                           |

## Code examples

### **Default Tag**

A tag with nothing but a label, next to the same tag asking for the rounded shape the design guidance prefers.

**Example: DefaultTag**

```tsx
// A label is all a Tag needs. Everything else has a default: the neutral grey
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
      min-width: 110px;
    `;
  }}
`;

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
```

### Intents

The six intents, drawn as primary and then as secondary. A tag left without a color is neutral.

**Example: TagIntents**

```tsx
// color carries the tag's intent. Six names are available, and neutral is what a
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
```

### Tag + Icon

A large tag, which has to carry an icon, beside a small one. Each uses an Icon whose own size matches the size the tag will draw it at.

**Example: TagIcon**

```tsx
// An icon goes on the leading edge of a tag, and the large size requires one:
// TypeScript rejects sdsSize="l" without it.
//
// The tag draws whatever icon it is given at a fixed size: 12px in a small tag,
// 24px in a large one. Match the Icon's own sdsSize to that so the artwork is
// drawn at the size it was made for: s or xs for a small tag, l for a large one.
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
```

### Tag with custom colors

Colors given as a tuple, for a tag the intents do not cover. The two-value form leaves the icon white, so a tag with an icon wants all three.

**Example: TagWithCustomColors**

```tsx
// color also takes a tuple of CSS colors for a tag the intents do not cover:
// [label, background] or [label, background, icon].
//
// The two-value form does not touch the icon, which stays white and disappears on
// a light background (the first tag below). A tag with an icon wants the
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
```

### Clickable and static tags

A tag with an `onClick` behaves as a button for both the pointer and the keyboard. A tag that only labels something uses `hover={false}` so it stops looking clickable.

**Example: InteractiveTag**

```tsx
// A tag with an onClick becomes a button: it takes a tab stop, answers Enter and
// Space, and reports its label as its name. Use it for a tag that filters or
// navigates, not for one that only labels something.
//
// Every tag darkens under the pointer and shows a pointer cursor by default,
// including one that does nothing. hover={false} turns that off, and with it all
// pointer events, so a static tag stops looking clickable, but it also stops
// answering the mouse and stops triggering a Tooltip wrapped around it.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

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
      min-width: 150px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
    `;
  }}
`;

function App() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="app">
      <Stack>
        <Group>
          <Caption>Clickable</Caption>
          <Tag
            color="info"
            label="Filter by species"
            onClick={() => setClicks((count) => count + 1)}
            sdsStyle="rounded"
          />
        </Group>

        <Group>
          <Caption>Static</Caption>
          <Tag hover={false} label="Read-only label" sdsStyle="rounded" />
        </Group>

        <Readout>
          The clickable tag has been activated {clicks}{" "}
          {clicks === 1 ? "time" : "times"}, by pointer or by keyboard.
        </Readout>
      </Stack>
    </div>
  );
}

export default App;
```

### A label with no room

What a long label does in a narrow container, and the Tooltip that keeps the truncated text reachable.

**Example: TagWithLongLabel**

```tsx
// A tag never wraps: it stretches to its label and then, in a container too narrow
// for it, cuts the label off with an ellipsis. The text that is cut is not
// available anywhere else, so a tag that can hold a long value belongs in a
// Tooltip that carries the whole thing.
//
// The tooltip only works because the tag still receives pointer events. Adding
// hover={false} to quiet the hover styling would silence the tooltip with it.

import {
  Tag,
  Tooltip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const LABEL = "Homo sapiens lung epithelial cell";

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

const NarrowColumn = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px dashed ${semanticColors?.base?.divider};
      padding: 4px;
      width: 160px;
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
        <div>
          <Caption>Room for the whole label</Caption>
          <Tag label={LABEL} sdsStyle="rounded" />
        </div>

        <div>
          <Caption>
            Cut off in a 160px column, with the full text on hover
          </Caption>
          <NarrowColumn>
            <Tooltip placement="top" title={LABEL}>
              <Tag label={LABEL} sdsStyle="rounded" />
            </Tooltip>
          </NarrowColumn>
        </div>
      </Stack>
    </div>
  );
}

export default App;
```
