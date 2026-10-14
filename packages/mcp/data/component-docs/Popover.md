# Popover

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Popover/index.tsx).

## Import

**React TypeScript**

```tsx
import { Popover } from "@czi-sds/components";
```

## Code examples

### **Default Popover**

The least a popover needs: an anchor kept in state, an `open` derived from it, and an `onClose` that clears it. It opens below the trigger, with the 8px gap the SDS defaults provide.

**Example: DefaultPopover**

```tsx
// The least a popover needs: the trigger records itself as the anchor, `open` is
// derived from whether there is one, and `onClose` clears it. The popover owns no
// open state of its own, so nothing closes it unless you do.
//
// anchorEl has to be state rather than a ref, because the popover measures the
// anchor as it renders and so needs a render to happen once the element is known.
//
// The paper pads itself by 6px and 12px, which is why the text below is written
// straight onto it. onClose fires for a backdrop click and for Escape; the second
// argument says which, and is ignored here because both should close.

import { useState } from "react";
import { Button, Popover } from "@czi-sds/components";

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <div className="app">
      <Button
        aria-describedby={open ? "default-popover" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sdsStyle="outline"
        sdsType="primary"
      >
        Open Popover
      </Button>

      <Popover
        anchorEl={anchorEl}
        id="default-popover"
        onClose={() => setAnchorEl(null)}
        open={open}
      >
        Sequencing finished at 14:02.
      </Popover>
    </div>
  );
}

export default App;
```

### **Positioning**

`anchorOrigin` picks the point on the trigger and `transformOrigin` the point on the popover that meets it. Because SDS's defaults are replaced rather than merged, each of these pairs writes the gap back in as a negative number.

**Example: PopoverPositioning**

```tsx
// anchorOrigin names the point on the trigger, transformOrigin the point on the
// popover that meets it. A string names a corner or an edge; a number is measured
// in pixels and subtracted from the anchor point, which is how a gap is made.
//
// SDS already sets both to open the popover 8px below the left of its trigger. The
// defaults are spread before your props, so each one is replaced whole rather than
// merged: every pair below has to write its own gap back in as a negative number.

import { useState } from "react";
import {
  Button,
  Popover,
  getSpaces,
  type CommonThemeProps,
  type PopoverProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const GAP = 8;

interface Placement {
  anchorOrigin: PopoverProps["anchorOrigin"];
  description: string;
  label: string;
  transformOrigin: PopoverProps["transformOrigin"];
}

const PLACEMENTS: Placement[] = [
  {
    anchorOrigin: { horizontal: "left", vertical: "bottom" },
    description: "Below, left aligned",
    label: "Default",
    transformOrigin: { horizontal: 0, vertical: -GAP },
  },
  {
    anchorOrigin: { horizontal: "right", vertical: "bottom" },
    description: "Below, right aligned",
    label: "Right aligned",
    transformOrigin: { horizontal: "right", vertical: -GAP },
  },
  {
    anchorOrigin: { horizontal: "right", vertical: "top" },
    description: "Beside the trigger",
    label: "To the side",
    transformOrigin: { horizontal: -GAP, vertical: "top" },
  },
];

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.l}px;
    `;
  }}
`;

function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const close = () => {
    setOpenIndex(null);
    setAnchorEl(null);
  };

  return (
    <div className="app">
      <Stage>
        {PLACEMENTS.map((placement, index) => (
          <div key={placement.label}>
            <Button
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setOpenIndex(index);
              }}
              sdsStyle="outline"
              sdsType="primary"
            >
              {placement.label}
            </Button>

            <Popover
              anchorEl={anchorEl}
              anchorOrigin={placement.anchorOrigin}
              onClose={close}
              open={openIndex === index}
              transformOrigin={placement.transformOrigin}
            >
              {placement.description}
            </Popover>
          </div>
        ))}
      </Stage>
    </div>
  );
}

export default App;
```

### **Popover with rich content**

Anything React can render goes on the paper. A popover holding more than a sentence wants a width, which is set through `slotProps.paper`, and a little more room than the paper's 6px and 12px, which the content adds itself.

**Example: PopoverWithRichContent**

```tsx
// A popover is only a surface, so anything React can render can go on it: a
// heading, body copy, and the buttons that act on what it describes.
//
// Two things have to be decided for content this size. The width, because a
// popover is otherwise as wide as its content: slotProps.paper is the way in, and
// sx works there because SDS sets no width of its own. And the room around it,
// which the content adds: the paper's 6px and 12px come from a selector on the
// popover's root that outranks an sx on the paper, so they are there to build on
// rather than to replace.
//
// Focus is trapped while the popover is open, so the two buttons are reachable by
// keyboard and Escape closes the whole thing.

import { useState } from "react";
import {
  Button,
  Popover,
  fontBodyS,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Content = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.s}px;
      padding: ${spaces?.xs}px 0;
    `;
  }}
`;

const Title = styled.p`
  ${fontHeaderS}
  margin: 0;
`;

const Body = styled.p<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => `
    color: ${getSemanticColors(props)?.base?.textSecondary};
    margin: 0;
  `}
`;

const Actions = styled.div<CommonThemeProps>`
  ${(props) => `
    display: flex;
    gap: ${getSpaces(props)?.s}px;
  `}
`;

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  return (
    <div className="app">
      <Button
        aria-describedby={open ? "rich-popover" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sdsStyle="outline"
        sdsType="primary"
      >
        Discard run
      </Button>

      <Popover
        anchorEl={anchorEl}
        id="rich-popover"
        onClose={close}
        open={open}
        slotProps={{ paper: { sx: { maxWidth: 320 } } }}
      >
        <Content>
          <Title>Discard this run?</Title>
          <Body>
            The 240 samples queued behind it will be released, and the results
            already written will be kept.
          </Body>
          <Actions>
            <Button onClick={close} sdsStyle="solid" sdsType="destructive">
              Discard
            </Button>
            <Button onClick={close} sdsStyle="minimal" sdsType="secondary">
              Cancel
            </Button>
          </Actions>
        </Content>
      </Popover>
    </div>
  );
}

export default App;
```

### **Opening at the cursor**

With `anchorReference` set to `"anchorPosition"` the popover is placed at a point rather than against an element, which is what a right-click menu needs. The vertical offset in the SDS `transformOrigin` applies here too, so the popover sits 8px below the cursor.

**Example: PopoverAtCursorPosition**

```tsx
// anchorReference="anchorPosition" positions the popover against a point instead
// of an element, which is what a right-click menu needs: there is no anchor to
// measure, only where the pointer was.
//
// anchorPosition is read in viewport coordinates, so clientX and clientY go
// straight in: no scroll offset, and no bounding rect. Everything else works as
// before, including the 8px the SDS transformOrigin subtracts, which is why the
// popover opens just below the cursor rather than under it.
//
// The browser's own context menu has to be prevented, and the surface is given a
// tabIndex and a keyboard route of its own, since a right-click is not something
// every person can perform.

import { useState, type MouseEvent } from "react";
import {
  Popover,
  fontBodyS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

interface Point {
  left: number;
  top: number;
}

const Surface = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      background-color: ${semanticColors?.base?.backgroundSecondary};
      border: 1px dashed ${semanticColors?.base?.divider};
      border-radius: 6px;
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      justify-content: center;
      min-height: 120px;
      padding: ${spaces?.l}px;
      text-align: center;
    `;
  }}
`;

function App() {
  const [point, setPoint] = useState<Point | null>(null);

  const openAt = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPoint({ left: event.clientX, top: event.clientY });
  };

  return (
    <div className="app">
      <Surface
        onContextMenu={openAt}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const box = event.currentTarget.getBoundingClientRect();
            setPoint({ left: box.left + box.width / 2, top: box.top });
          }
        }}
        role="button"
        tabIndex={0}
      >
        Right-click anywhere in here, or focus it and press Enter
      </Surface>

      <Popover
        anchorPosition={point ?? undefined}
        anchorReference="anchorPosition"
        onClose={() => setPoint(null)}
        open={point !== null}
      >
        Opened at the cursor
      </Popover>
    </div>
  );
}

export default App;
```

## SDS vs MUI

SDS Popover is a thin wrapper around MUI's Popover. `PopoverProps` is MUI's own type re-exported unchanged, so there are no sds-prefixed props and everything in the MUI documentation applies. What SDS contributes is two positioning defaults and the styling of the paper the content sits on:

- `anchorOrigin`: set to `{ vertical: "bottom", horizontal: "left" }`, where MUI's default is `"top"`/`"left"`. An SDS popover therefore opens below its anchor and aligned to its left edge, rather than on top of it.

- `transformOrigin`: set to `{ vertical: -8, horizontal: 0 }`, taken from the `s` space token. A number is subtracted from the anchor point rather than naming a corner, so a negative eight reads as an 8px gap between the anchor and the popover.

- **Both defaults are spread before your props,** which means each one is replaced whole rather than merged. Passing a `transformOrigin` of your own drops the 8px gap unless you write it back in, and the same is true of `anchorOrigin`.

- **The paper is restyled:** the surface colour comes from the theme's `surfacePrimary`, corners are the `l` radius (6px), the shadow is `m`, and there is a hairline in `borderSecondary` at 15% opacity. SDS also sets `background-image: none`, which removes the tint MUI's Paper paints over surfaces in dark mode.

- **The hairline is an outline, not a border.** It is drawn outside the paper's box, so it never adds to the popover's size or shifts the content inside it.

- **elevation has no visible effect.** SDS sets the shadow on the paper with enough specificity to win over MUI's elevation styles, so every popover carries the same one.

- **The paper already has padding** of 6px vertically and 12px horizontally, and it is best treated as fixed: SDS sets it through a descendant selector on the popover's root, which outranks an `sx` on the paper slot. Content that needs more room should add its own padding rather than try to replace what is there.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-popover/), and its full API [here](https://mui.com/material-ui/api/popover/).

## Behavior and accessibility

- A Popover is built on MUI's Modal. It renders in a portal at the end of the document, traps focus while it is open, hides the rest of the page from assistive technology, and locks the page's scroll. It is a modal surface that happens to be anchored, not a floating layer over a page that carries on as normal.

- The backdrop is invisible but present, so a click anywhere outside the popover is caught by it rather than by whatever is underneath. `onClose` is called with the event and a reason: `"backdropClick"` or `"escapeKeyDown"`. Closing is left to you, since the open state is yours.

- **anchorEl has to be state, not a ref.** The popover measures the anchor while rendering, so it needs a render to happen once the element is known. Storing the trigger in a ref leaves the popover with nothing to measure on the first open.

- Nothing at all is rendered while `open` is `false`, so the content is mounted fresh on each open and its state starts over. Pass `keepMounted` to keep it in the document instead, worth it when the content is expensive to build or has to stay findable by an in-page search.

- The position is worked out when the popover opens and again on window resize; it does not follow its anchor. Page scroll is locked while it is open, so this is usually enough, but an anchor inside a box that scrolls on its own can be scrolled away from its popover.

- A popover that would fall off the screen is pulled back inside, leaving `marginThreshold` (16px) between it and the edge. Unlike Tooltip, it does not flip to the other side of its anchor.

- Give the popover an `id` and point the trigger at it with `aria-describedby` while it is open, so the popover is announced as the description of the control that opened it.

- Popover is the plain anchored surface the richer overlays are built from, and it is often not the component to reach for directly. Use Tooltip for a short hint on hover, DropdownMenu or Menu for a list of choices, Dialog for a task that should interrupt the page, and Popover for anchored content that none of those describe.

## Props

Popover takes MUI's props and adds none of its own. The ones needed to get a popover working, and those whose SDS defaults differ from MUI's, are listed below. See the MUI documentation for the rest.

| Name                 | Type                                                                                                           | Default                                      | Description                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`               | `boolean`                                                                                                      | -                                            | Required. Whether the popover is shown. Usually derived from whether an anchor has been recorded.                                                                    |
| `anchorEl`           | `HTMLElement \| (() => HTMLElement) \| null`                                                                   | -                                            | The element the popover is positioned against. Keep it in state so that setting it causes the render the popover needs in order to measure it.                       |
| `onClose`            | `(event, reason) => void`                                                                                      | -                                            | Called on backdrop click and on Escape, with `"backdropClick"` or `"escapeKeyDown"` as the reason. Closing the popover is up to you.                                 |
| `children`           | `ReactNode`                                                                                                    | -                                            | The content, placed straight onto the paper, which has already padded itself by 6px and 12px.                                                                        |
| `anchorOrigin`       | `{ vertical: "top" \| "center" \| "bottom" \| number,` `horizontal: "left" \| "center" \| "right" \| number }` | `{ vertical: "bottom", horizontal: "left" }` | The point on the anchor the popover attaches to. SDS changes MUI's vertical default from `"top"` to `"bottom"`.                                                      |
| `transformOrigin`    | `{ vertical: "top" \| "center" \| "bottom" \| number,` `horizontal: "left" \| "center" \| "right" \| number }` | `{ vertical: -8, horizontal: 0 }`            | The point on the popover that meets the anchor's. The negative eight is what produces the gap; passing your own value replaces it.                                   |
| `anchorReference`    | `"anchorEl" \| "anchorPosition" \| "none"`                                                                     | `"anchorEl"`                                 | Whether to position against an element, a point on the page, or nothing at all. `"anchorPosition"` is how a popover opens at the cursor.                             |
| `anchorPosition`     | `{ top: number, left: number }`                                                                                | -                                            | The point to open at, in viewport coordinates. Read only when `anchorReference` is `"anchorPosition"`.                                                               |
| `slotProps`          | `{ paper, backdrop, root, transition }`                                                                        | -                                            | Props for the parts the popover is made of. `slotProps.paper` is where a width or a max height belongs; the padding there is SDS's and outranks an `sx` on the slot. |
| `marginThreshold`    | `number`                                                                                                       | `16`                                         | How much room is kept between the popover and the edge of the window when it has to be pulled back on screen.                                                        |
| `keepMounted`        | `boolean`                                                                                                      | `false`                                      | Keeps the content in the document while closed, preserving its state at the cost of rendering it up front.                                                           |
| `disableScrollLock`  | `boolean`                                                                                                      | `false`                                      | Lets the page scroll while the popover is open. The popover stays where it was placed, so the anchor scrolls out from under it.                                      |
| `disablePortal`      | `boolean`                                                                                                      | `false`                                      | Renders the popover where it is written rather than at the end of the document, which puts it back within reach of an ancestor's overflow.                           |
| `elevation`          | `number`                                                                                                       | `8`                                          | MUI's prop. It has no visible effect, since SDS sets the paper's shadow itself.                                                                                      |
| `transitionDuration` | `number \| { appear, enter, exit } \| "auto"`                                                                  | `"auto"`                                     | How long the grow transition runs. `"auto"` scales it to the size of the popover.                                                                                    |
