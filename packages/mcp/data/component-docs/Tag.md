# Tag

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tag/index.tsx).

## Import

**React TypeScript**

```tsx
import { Tag } from "@czi-sds/components";
```

> **Coming from the Tag before SDS 25?** Its API changed: `sdsStyle` is now `"solid"` or `"outline"`, sizes are `"small"` and `"medium"`, and `sdsType` and `hover` are gone. The previous component still ships as TagLegacy, and the table under "Migrating from TagLegacy" maps each old prop to its new one.

## Code examples

### **Default Tag**

A tag with nothing but a label: neutral, solid and medium.

**Example: DefaultTag**

```tsx
// A label is all a Tag needs. Everything else has a default: the neutral intent,
// the solid style and the medium size. A tag is pill-shaped; only an icon-only
// tag is square.

import { Tag } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tag label="Science Design System" />
    </div>
  );
}

export default App;
```

### Styles and intents

The seven intents, drawn solid and then outlined. A tag left without a color is neutral.

**Example: TagStylesAndIntents**

```tsx
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
```

### Sizes

The medium and small sizes, each with a label, a label and an icon, and the icon alone.

**Example: TagSizes**

```tsx
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
```

### Tag + Icon

A leading icon from Phosphor or from `@czi-sds/icons`, and an icon-only tag inside the Tooltip that shows its label.

**Example: TagIcons**

```tsx
// An icon goes on the leading edge of a tag. The tag draws it at its own size,
// 12px in a medium tag and 10px in a small one, and in its own color, so pass a
// bare icon: one from Phosphor, or one from @czi-sds/icons for the icons SDS
// draws itself.
//
// iconOnly hides the label and squares the tag off. The label still names the
// tag for screen readers, but sighted users only see the icon, so an icon-only
// tag belongs in a Tooltip that shows the label.

import {
  Tag,
  Tooltip,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { SparklesIcon } from "@czi-sds/icons";
import { CheckCircleIcon } from "@phosphor-icons/react";
import styled from "@emotion/styled";

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

function App() {
  return (
    <div className="app">
      <Row>
        <Tag color="accent" icon={<SparklesIcon />} label="Generated" />

        <Tag
          color="positive"
          icon={<CheckCircleIcon />}
          label="Verified"
          sdsStyle="outline"
        />

        <Tooltip placement="top" title="Generated">
          <Tag
            color="accent"
            icon={<SparklesIcon />}
            iconOnly
            label="Generated"
          />
        </Tooltip>
      </Row>
    </div>
  );
}

export default App;
```

### Tag as a link

A tag with an `href` is a link. The arrow that says so is optional.

**Example: TagAsLink**

```tsx
// href turns a tag into a link: it renders as an <a>, takes a tab stop, and
// follows its href on click and on Enter. showLinkIcon adds an arrow after the
// label to say the tag leads somewhere. The arrow is optional; a tag with an
// href is a link either way.
//
// target="_blank" also sets rel="noopener noreferrer". For client-side routing,
// pass your router's link component as component and the tag renders that
// instead of a plain anchor.

import { Tag, getSpaces, type CommonThemeProps } from "@czi-sds/components";
import styled from "@emotion/styled";

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

function App() {
  return (
    <div className="app">
      <Row>
        <Tag
          color="info"
          href="https://sds.czi.design"
          label="SDS website"
          showLinkIcon
          target="_blank"
        />

        <Tag
          color="info"
          href="https://sds.czi.design"
          label="SDS website"
          sdsStyle="outline"
          showLinkIcon
          target="_blank"
        />

        <Tag
          color="info"
          href="https://sds.czi.design"
          label="Without the arrow"
          target="_blank"
        />
      </Row>
    </div>
  );
}

export default App;
```

### Clickable, static and disabled tags

A tag with an `onClick` behaves as a button for both the pointer and the keyboard. A tag without one stays a static label, and `disabled` turns a clickable tag off.

**Example: InteractiveTag**

```tsx
// A tag with an onClick becomes a button: it takes a tab stop, answers Enter and
// Space, reports its label as its name, and darkens under the pointer. A tag with
// neither an onClick nor an href is static: no role, no tab stop and no hover
// state, so it reads as a label rather than a control.
//
// disabled greys a clickable tag out and takes it out of the tab order.

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
          />
        </Group>

        <Group>
          <Caption>Static</Caption>
          <Tag label="Read-only label" />
        </Group>

        <Group>
          <Caption>Disabled</Caption>
          <Tag
            color="info"
            disabled
            label="Filter by tissue"
            onClick={() => setClicks((count) => count + 1)}
          />
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

### Tag with custom colors

Colors given as a tuple, for a tag the intents do not cover.

**Example: TagWithCustomColors**

```tsx
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
```

### A label with no room

What a long label does in a narrow container, and the Tooltip that keeps the truncated text reachable.

**Example: TagWithLongLabel**

```tsx
// A tag never wraps: it stretches to its label and then, in a container too
// narrow for it, cuts the label off with an ellipsis. The text that is cut is not
// available anywhere else, so a tag that can hold a long value belongs in a
// Tooltip that carries the whole thing.

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
    const spaces = getSpaces(props);

    return `
      border: 1px dashed ${semanticColors?.base?.divider};
      padding: ${spaces?.xxs}px;
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
          <Tag label={LABEL} />
        </div>

        <div>
          <Caption>
            Cut off in a 160px column, with the full text on hover
          </Caption>
          <NarrowColumn>
            <Tooltip placement="top" title={LABEL}>
              <Tag label={LABEL} />
            </Tooltip>
          </NarrowColumn>
        </div>
      </Stack>
    </div>
  );
}

export default App;
```

## SDS vs MUI

SDS Tag wraps MUI's Chip and replaces its palette, sizing and shape with SDS ones. SDS also splits the Chip's two jobs in two: Tag labels something, and Chip is the one that can be removed. The differences from MUI are these:

- `sdsStyle`: `"solid"` (default) fills the tag with the intent color and sets the label white; `"outline"` tints the fill and draws the label, the icons and a 1px border in the intent color. It replaces MUI's `variant`, which Tag does not take.

- `size`: MUI's own prop, but with SDS measurements. `"medium"` (default) is 24px tall with a 13px label and 12px icons, `"small"` is 20px tall with a 10px label and 10px icons.

- `color`: an SDS intent rather than one of MUI's palette names. Seven intents are available, `"accent"` among them, and a tag without the prop is neutral. It also takes a tuple of CSS colors for cases the intents do not cover.

- **The shape follows the content:** a tag with a label is pill-shaped, and an icon-only tag (`iconOnly`) is square with 4px corners. There is no prop for it.

- **Links:** `href` renders the tag as an `<a>`, which MUI's Chip only does when it is also handed `component="a"` and `clickable`. Passing `component` still works, so a router's link component can take the anchor's place. `showLinkIcon` adds Phosphor's ArrowUpRight after the label.

- **Interactive styling follows behavior:** the hover and pressed states, the pointer cursor and the focus ring appear only on a tag with an `onClick` or an `href`, or one set `clickable`. A tag that only labels something has none of them.

- **onDelete works, but Chip is the removable tag:** a Tag given `onDelete` becomes deletable and draws MUI's Cancel icon at the tag's icon size. Reach for Chip when a tag needs to come off.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-chip/).

## Behavior and accessibility

- A plain tag is a div holding its label, with no role and no tab stop, and is read as the text it shows. Giving it an `onClick` turns it into a button: it takes a tab stop, answers Enter and Space, and takes its accessible name from the label. Giving it an `href` turns it into a link instead.

- `disabled` greys a tag out. On a clickable tag or a link it also sets `aria-disabled` and takes the tag out of the tab order; on a static tag it changes nothing but the colors, so say in the label why the thing it describes is unavailable.

- Nothing about the intent reaches assistive technology: `color` is color only, so a negative tag needs a label that says what is wrong rather than relying on red.

- An icon-only tag keeps its label as its accessible name, hidden from view but read by screen readers. Sighted users see only the icon, so wrap the tag in a Tooltip that shows the label.

- The link arrow is decorative and hidden from screen readers. A link that opens in a new tab with `target="_blank"` should say so in its label or in text beside it.

- A tag never wraps. It stretches to fit its label and then, in a container too narrow, cuts the label off with an ellipsis, leaving the rest of the text nowhere else to be read. A tag that can hold a long value belongs in a Tooltip carrying the whole string.

- Icons are drawn at the tag's icon size (12px in a medium tag, 10px in a small one) and in its icon color, whatever the icon itself asks for, so pass a bare Phosphor or `@czi-sds/icons` icon. The deprecated SDS Icon still works, as long as the icon exists at a small size.

- Contrast is yours to check when you pass custom colors. SDS only guarantees it for its own intents.

## Migrating from TagLegacy

The Tag before SDS 25 is still exported as `TagLegacy`, so an app can switch its imports first and migrate each usage later. Its props map to the new Tag like this:

| Old prop                           | Replace with                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| `sdsType="primary"`                | `sdsStyle="solid"`, the default                                                   |
| `sdsType="secondary"`              | `sdsStyle="outline"`                                                              |
| `sdsStyle="rounded"` or `"square"` | Nothing: a tag with a label is always pill-shaped, and an icon-only tag is square |
| `sdsSize="s"`                      | `size="small"`                                                                    |
| `sdsSize="l"`                      | `size="medium"`, the default, which no longer needs an icon                       |
| `hover={false}`                    | Nothing: a tag without an `onClick` or an `href` is static                        |
| `tagColor`                         | `color`                                                                           |
| `color={[label, background]}`      | Unchanged, though the icon now takes the label color rather than staying white    |

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name           | Type                                                                                                                                                | Default      | Description                                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`        | `string`                                                                                                                                            | - (required) | The tag's text, and its accessible name. It is cut off with an ellipsis rather than wrapped, so keep it to a word or two. An icon-only tag still needs it: the text is hidden from view but read by screen readers. |
| `sdsStyle`     | `"solid"` \| `"outline"`                                                                                                                            | `"solid"`    | `solid` fills the tag with the intent color. `outline` tints the fill and draws the label, the icons and a 1px border in the intent color.                                                                          |
| `size`         | `"small"` \| `"medium"`                                                                                                                             | `"medium"`   | `medium` is 24px tall with a 13px label and 12px icons, `small` is 20px tall with a 10px label and 10px icons.                                                                                                      |
| `color`        | `"accent"` \| `"beta"` \| `"info"` \| `"negative"` \| `"neutral"` \| `"notice"` \| `"positive"` \| `[string, string]` \| `[string, string, string]` | `"neutral"`  | One of the seven intents, or CSS colors for a tag the intents do not cover: `[label, background]` or `[label, background, icon]`. The icon takes the label color when the third value is left out.                  |
| `icon`         | `ReactElement`                                                                                                                                      | -            | An icon on the leading edge, usually a Phosphor or `@czi-sds/icons` icon. The tag draws it at its own icon size and color.                                                                                          |
| `iconOnly`     | `boolean`                                                                                                                                           | `false`      | Draws only the icon, in a square tag. The label is hidden from view but stays the tag's accessible name. Has no effect without an icon.                                                                             |
| `showLinkIcon` | `boolean`                                                                                                                                           | `false`      | Adds an arrow after the label to say the tag leads somewhere. Usually paired with `href`, though a tag can be a link without it.                                                                                    |
| `href`         | `string`                                                                                                                                            | -            | Turns the tag into a link. It renders as an `<a>` unless `component` says otherwise, as with a router's link component.                                                                                             |
| `target`       | `string`                                                                                                                                            | -            | Where the link opens. `_blank` also sets `rel="noopener noreferrer"`.                                                                                                                                               |
| `rel`          | `string`                                                                                                                                            | -            | The link's relationship to the current page.                                                                                                                                                                        |
| `disabled`     | `boolean`                                                                                                                                           | `false`      | Greys the tag out. On a clickable tag or a link it also takes the tag out of the tab order.                                                                                                                         |
| `onClick`      | `(event) => void`                                                                                                                                   | -            | MUI's prop. Makes the tag a button: a tab stop that answers Enter and Space, with hover and pressed states.                                                                                                         |
| `onDelete`     | `(event) => void`                                                                                                                                   | -            | MUI's prop. Adds a delete control, drawn with MUI's Cancel icon. Use Chip for a removable tag instead.                                                                                                              |
