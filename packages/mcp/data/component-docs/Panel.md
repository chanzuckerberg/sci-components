# Panel

## Source Code

The component's source code in the SDS codebase can be found here.

## Import

**React TypeScript**

```tsx
import { Panel } from "@czi-sds/components";
```

## Code examples

> **Note:** A panel fixes itself to an edge of the viewport, which on this page means an edge of the docs rather than of the example. Each example below therefore holds its panel inside its own frame, with a wrapper that fixed positioning resolves against and, for the overlay panels, a container for the portal and another for the transition, so the panel slides the width of the frame rather than of the window. None of that belongs in an application.

### Basic panel

A persistent panel on the left, with the page's content shifted by the same width so the two do not overlap.

**Example: BasicPanel**

```tsx
// sdsType="basic" is a persistent drawer: it sits in the page rather than over
// it, and nothing closes it but your own control. It does not move the page's
// content, so shift that yourself by the same width you gave the panel.
//
// Panel fixes itself to the edge of the viewport, which on this page is the edge
// of the docs rather than of the example. Stage carries a transform, which makes
// it the box that fixed positioning resolves against, so the panel stays in the
// frame, flush against its edge as it would be against the window's. A real page
// wants the viewport and needs none of this, and the padding below stands in for
// whatever spacing the page's own content already has.

import {
  Button,
  Icon,
  Panel,
  fontBodyS,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const PANEL_WIDTH = 280;

const Stage = styled.div`
  height: 320px;
  overflow: clip;
  transform: translateZ(0);
`;

const Content = styled.div<CommonThemeProps & { shifted: boolean }>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      margin-left: ${props.shifted ? `${PANEL_WIDTH}px` : "0"};
      padding: 50px;
      transition: margin-left 225ms ease-out;
    `;
  }}
`;

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app">
      <Stage>
        <Panel open={open} sdsType="basic" width={PANEL_WIDTH}>
          Filters, dataset pickers, and anything else that changes what the page
          shows.
        </Panel>

        <Content shifted={open}>
          <Button
            onClick={() => setOpen((prev) => !prev)}
            sdsStyle="solid"
            sdsType="primary"
            startIcon={<Icon sdsIcon="Filter" sdsSize="s" />}
          >
            {open ? "Hide filters" : "Show filters"}
          </Button>

          <p>
            The page's own content moves aside for a basic panel, so the two
            never overlap.
          </p>
        </Content>
      </Stage>
    </div>
  );
}

export default App;
```

### Overlay panel

An overlay panel on the right with a header, the default close button, and `isBackdropClickEnabled` so a click outside closes it through `onClose`.

**Example: OverlayPanel**

```tsx
// sdsType="overlay" is a temporary drawer: it floats over the page and always
// draws a close button, so give it closeButtonOnClick. isBackdropClickEnabled
// adds a click-outside target, which reports through onClose rather than through
// closeButtonOnClick, so both have to set the state.
//
// Panel fixes itself to the edge of the viewport, which on this page is the edge
// of the docs rather than of the example. ModalProps.container renders it inside
// Stage instead, which is why the panel waits for that node to exist, and
// Stage's transform makes it the box that fixed positioning resolves against.
// The transition needs the same node, or it measures its slide against the
// window and spends most of the animation outside the frame. Stage clips with
// overflow: clip rather than hidden, because a hidden box is one the browser can
// scroll: it would scroll the frame to reveal the panel as the panel takes focus
// on its way in, dragging the example's own content sideways. A real page wants
// the viewport and needs none of this; the padding on Stage just stands in for
// the spacing a page's own content would have.

import {
  Button,
  Icon,
  Panel,
  fontBodyS,
  fontHeaderM,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stage = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      height: 340px;
      overflow: clip;
      padding: 50px;
      transform: translateZ(0);
    `;
  }}
`;

const Header = styled.h3<CommonThemeProps>`
  ${fontHeaderM}
  margin: 0;
`;

function App() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div className="app">
      <Stage ref={setStage}>
        <Button
          onClick={() => setOpen(true)}
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="InfoCircle" sdsSize="s" />}
        >
          Show details
        </Button>

        <p>
          An overlay panel reads a piece of the page rather than changing it, so
          the content underneath stays where it is.
        </p>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            HeaderComponent={<Header>Sample details</Header>}
            isBackdropClickEnabled
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="right"
            sdsType="overlay"
            slotProps={{ transition: { container: stage } }}
          >
            Collection date, tissue, and the rest of the record for whichever
            row the page has selected.
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
```

### Overlay panel along the bottom

The bottom position spans the full width, and the `width` prop becomes the panel's height. This one has no backdrop, so clicks outside it land on the page underneath.

**Example: OverlayPanelBottom**

```tsx
// position="bottom" belongs to the overlay type only, and it turns the width
// prop into a height: the panel spans the full width and stands as tall as the
// value you pass. The paper also has a 320px floor in both directions, so a
// smaller number changes nothing.
//
// Panel fixes itself to the edge of the viewport, which on this page is the edge
// of the docs rather than of the example. ModalProps.container renders it inside
// Stage instead, which is why the panel waits for that node to exist, and
// Stage's transform makes it the box that fixed positioning resolves against.
// The transition needs the same node, or it measures its slide against the
// window and spends most of the animation outside the frame, and Stage clips with
// overflow: clip rather than hidden so the browser cannot scroll the frame to
// reveal the panel while it is still on its way in. A real page wants the
// viewport and needs none of this; the padding on Stage just stands in for the
// spacing a page's own content would have.

import {
  Button,
  Icon,
  Panel,
  fontBodyS,
  fontHeaderM,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stage = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      height: 520px;
      overflow: clip;
      padding: 50px;
      transform: translateZ(0);
    `;
  }}
`;

const Header = styled.h3<CommonThemeProps>`
  ${fontHeaderM}
  margin: 0;
`;

const Table = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px dashed ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textSecondary};
      padding: 24px;
    `;
  }}
`;

function App() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div className="app">
      <Stage ref={setStage}>
        <Button
          onClick={() => setOpen(true)}
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Table" sdsSize="s" />}
        >
          Show table
        </Button>

        <p>
          A bottom panel suits content that is wider than it is tall, such as a
          table of the rows behind a chart.
        </p>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            HeaderComponent={<Header>Underlying rows</Header>}
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="bottom"
            sdsType="overlay"
            slotProps={{ transition: { container: stage } }}
            width={360}
          >
            <Table>[Table of rows, 360px of height to work with]</Table>
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
```

### Overlay panel with a custom close control

`CloseButtonComponent` replaces the X with anything you like, and the header holds more than a title.

**Example: OverlayPanelCustomClose**

```tsx
// CloseButtonComponent replaces the default X. The click handler stays on
// closeButtonOnClick, which the panel attaches to the wrapper around whatever
// you pass, so the replacement needs no onClick of its own. The wrapper also
// forces any icon inside a button to 24px, so sdsSize on it has no effect.
//
// Stage, ModalProps.container and the transition's container are here only to
// keep the panel and its slide inside the example frame, as in the examples
// above.

import {
  Button,
  Icon,
  Panel,
  fontBodyS,
  fontHeaderM,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stage = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      height: 340px;
      overflow: clip;
      padding: 50px;
      transform: translateZ(0);
    `;
  }}
`;

const Header = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      h3 {
        ${fontHeaderM(props)}
        margin: 0;
      }

      p {
        ${fontBodyS(props)}
        color: ${semanticColors?.base?.textSecondary};
        margin: 4px 0 0 0;
      }
    `;
  }}
`;

function App() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div className="app">
      <Stage ref={setStage}>
        <Button
          onClick={() => setOpen(true)}
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Gear" sdsSize="s" />}
        >
          Show settings
        </Button>

        <p>The header holds as much as you want to put in it.</p>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            CloseButtonComponent={
              <Button sdsStyle="minimal" sdsType="primary">
                Done
              </Button>
            }
            HeaderComponent={
              <Header>
                <h3>Display settings</h3>
                <p>Applies to this session only</p>
              </Header>
            }
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="right"
            sdsType="overlay"
            slotProps={{ transition: { container: stage } }}
            width={360}
          >
            Colour scale, point size, and the other controls for the plot.
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
```

### Changing the animation speed

`transitionDuration` times the slide. Each button below reopens the same panel at a different setting, from the 225ms default to none at all, and the example holds the setting while the panel closes so the way out matches the way in.

**Example: OverlayPanelTransition**

```tsx
// transitionDuration sets how long the panel takes to travel in and out, in
// milliseconds. A single number times both directions; { enter, exit } times them
// separately, and 0 removes the animation. The Panel defaults to
// { enter: 225, exit: 195 }, which is MUI's drawer timing rather than the SDS
// theme's much shorter one.
//
// The duration stays put while the panel closes so the exit runs at the speed it
// opened with. Swapping it back on close would exit at the new speed instead.
//
// Stage, ModalProps.container and the transition's container are here only to
// keep the panel and its slide inside the example frame, as in the examples
// above.

import {
  Button,
  Panel,
  fontBodyS,
  fontBodyXs,
  fontHeaderM,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type PanelProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const SPEEDS: {
  duration: PanelProps["transitionDuration"];
  label: string;
}[] = [
  { duration: { enter: 225, exit: 195 }, label: "Default" },
  { duration: { enter: 700, exit: 500 }, label: "Slow" },
  { duration: 120, label: "Quick, both ways" },
  { duration: 0, label: "None" },
];

const Stage = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      height: 340px;
      overflow: clip;
      padding: 50px;
      transform: translateZ(0);
    `;
  }}
`;

const Controls = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.s}px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

const Header = styled.h3<CommonThemeProps>`
  ${fontHeaderM}
  margin: 0;
`;

function App() {
  const [open, setOpen] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[0]);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div className="app">
      <Stage ref={setStage}>
        <Controls>
          {SPEEDS.map((option) => (
            <Button
              key={option.label}
              onClick={() => {
                setSpeed(option);
                setOpen(true);
              }}
              sdsStyle="outline"
              sdsType="secondary"
            >
              {option.label}
            </Button>
          ))}
        </Controls>

        <Readout>
          Opening with transitionDuration of {JSON.stringify(speed.duration)}
        </Readout>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            HeaderComponent={<Header>Sample details</Header>}
            isBackdropClickEnabled
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="right"
            sdsType="overlay"
            slotProps={{ transition: { container: stage } }}
            transitionDuration={speed.duration}
          >
            Close this and pick another speed to compare them.
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
```

## SDS vs MUI

The SDS Panel wraps the MUI Drawer, with these differences:

- **sdsType instead of variant:** MUI picks the kind of drawer with `variant`; SDS picks it with `sdsType`, which takes two of the three MUI variants.

- `"basic"` is MUI's persistent drawer.

- `"overlay"` is MUI's temporary drawer.

- **position instead of anchor:** MUI's `anchor` takes four edges. SDS narrows it to `position`: `"left"` or `"right"` for a basic panel, plus `"bottom"` for an overlay. A basic panel asked for `"bottom"` is anchored left instead, and TypeScript rejects the combination up front.

- `width`: MUI leaves the drawer's size to your own styles. SDS takes a `width` and defaults it to 240px for a basic panel and 320px for an overlay. Along the bottom edge it sets the height instead, since the panel spans the screen. Either way the panel will not go below its type's default in either direction, so smaller values have no effect.

- **A header row on the overlay:** an overlay panel always draws a close button, and `HeaderComponent` fills the space beside it. Both live in a bar that sticks to the top of the panel while its content scrolls under a short gradient. A basic panel has no such bar and no close control of its own.

- **A backdrop you opt into:** MUI's temporary drawer always lays a visible backdrop over the page. SDS hides it, so the page behind an overlay panel stays legible and clickable. `isBackdropClickEnabled` brings back an invisible one, which gives you a click-outside target without dimming anything.

- **Motion the SDS theme does not shorten:** every MUI transition reads its length from the theme, and SDS sets those lengths short (20ms in, 10ms out) for the small elements that make up most of the system. A panel is far too large to cross the screen in a frame, so it keeps MUI's own drawer timings of 225ms in and 195ms out. `transitionDuration` overrides either direction.

- **Focus and scrolling stay with the page:** SDS forces `disableEnforceFocus` and `disableScrollLock` on the underlying Modal, so an open panel neither traps the keyboard nor freezes the page's scrollbar. Anything else you pass through `ModalProps` is kept. The paper also gets a default `aria-label` of `"Panel"`, which `slotProps.paper` can replace.

## Behavior notes

- Nothing about a basic panel is automatic: it does not close itself, and it does not move the page's content. Put a control on the page to toggle `open`, and shift your content by the same width you gave the panel so the two do not overlap.

- An overlay panel closes through two separate props. `closeButtonOnClick` fires from the header's close button; `onClose` fires on Escape, and on a click outside the panel when `isBackdropClickEnabled` is set. Set both to the same handler, or the panel will only close one way.

- The close button is drawn whether or not you handle it, so an overlay panel without `closeButtonOnClick` offers a control that does nothing.

- `closeButtonOnClick` is attached to the wrapper around the close button rather than to the button itself, so a `CloseButtonComponent` needs no click handler of its own. That wrapper also sizes any icon inside a button to 24px, which overrides `sdsSize` on the icon.

- Two basic panels can be open at once, one on each side, because each is part of the page's layout. Overlay panels are not, so a second one opens over the first rather than beside it; the guidance above asks for one at a time.

- An overlay panel takes focus when it opens but does not keep it, so Escape only reaches the panel while focus is still inside. Once the reader clicks or tabs back into the page, the close button and the backdrop are the only ways out.

- Because an overlay panel deliberately does not trap focus, MUI's `aria-hidden-focus` rule reports a violation against it. SDS suppresses that rule for the Panel's stories while waiting on a fix upstream.

- The panel slides from the edge it is anchored to over 225ms, and back out over 195ms. `transitionDuration` changes both, or either one on its own with `{ enter, exit }`. These are MUI's own drawer timings rather than the SDS theme's, which are set short for smaller elements and leave a panel looking like it jumps into place. Note that SDS leaves MUI's `motion.reducedMotion` setting at `"never"`, so the animation plays regardless of the reader's reduced-motion preference; an application that wants to honour it can set that theme option to `"system"`.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-drawer/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                     | Type                                                                 | Default                                                                                                                                                                         | Description                                                                                                                                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sdsType`                | `"basic" \| "overlay"`                                               | - (required)                                                                                                                                                                    | `"basic"` sits in the page and stays until you close it; `"overlay"` floats over the page with a header and close button. It also decides which of the props below apply, so TypeScript needs it spelled out even though the component falls back to `"basic"`. |
| `open`                   | `boolean`                                                            | `false`                                                                                                                                                                         | Whether the panel is showing. The panel never changes this itself, so hold it in your own state.                                                                                                                                                                |
| `position`               | `"left"` \| `"right"` \| `"bottom"` (overlay only)                   | `"left"`                                                                                                                                                                        | Which edge the panel is attached to. A basic panel takes `"left"` or `"right"`; an overlay adds `"bottom"`.                                                                                                                                                     |
| `width`                  | `number \| string`                                                   | `240` (basic) `320` (overlay)                                                                                                                                                   | How wide the panel is, or how tall it is when positioned along the bottom. Numbers are read as pixels. Values below the default are ignored, since the panel keeps that as its minimum in both directions.                                                      |
| `HeaderComponent`        | `React.ReactNode`                                                    | -                                                                                                                                                                               | Overlay only. Fills the header bar beside the close button. Leave it out and the bar holds the close button alone.                                                                                                                                              |
| `closeButtonOnClick`     | `React.MouseEventHandler<HTMLDivElement>`                            | -                                                                                                                                                                               | Overlay only. Runs when the header's close control is clicked. Without it, the control does nothing.                                                                                                                                                            |
| `CloseButtonComponent`   | `React.ReactNode`                                                    | `<Button` `sdsStyle="minimal"` `sdsType="secondary"` `size="large"` `backgroundOnHover={false}` `aria-label="Panel Toggle">` `<Icon sdsIcon="XMark" sdsSize="l" />` `</Button>` | Overlay only. Replaces the close button. Clicks are handled by the wrapper around it, so it needs no handler of its own.                                                                                                                                        |
| `isBackdropClickEnabled` | `boolean`                                                            | `false`                                                                                                                                                                         | Overlay only in practice. Adds an invisible backdrop so a click outside the panel reaches `onClose`. Left off, clicks pass through to the page.                                                                                                                 |
| `onClose`                | `(event, reason) => void`                                            | -                                                                                                                                                                               | MUI's Drawer callback, fired on a backdrop click and on Escape while focus is inside the panel. It does not fire for the header's close button, which reports through `closeButtonOnClick`.                                                                     |
| `transitionDuration`     | `number` \| `{ appear?: number,` `enter?: number,` `exit?: number }` | `{ enter: 225, exit: 195 }`                                                                                                                                                     | How long the panel takes to slide in and out, in milliseconds. The Panel keeps MUI's drawer timings instead of the much shorter ones in the SDS theme, which a surface this large arrives too quickly to read as motion. Pass `0` for no animation.             |
| `ModalProps`             | `ModalProps`                                                         | -                                                                                                                                                                               | Passed to the Modal behind an overlay panel, except for `disableEnforceFocus` and `disableScrollLock`, which SDS pins to `true`.                                                                                                                                |
| `slotProps`              | `DrawerProps["slotProps"]`                                           | `{ backdrop: { invisible: true },` `paper: { aria-label: "Panel" } }`                                                                                                           | Merged with the SDS defaults slot by slot, so a paper `aria-label` or `aria-labelledby` of your own replaces the default name while the rest of the defaults survive.                                                                                           |
