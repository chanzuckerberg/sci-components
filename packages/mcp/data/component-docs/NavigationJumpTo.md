# NavigationJumpTo

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/NavigationJumpTo/index.tsx).

## Import

**React TypeScript**

```tsx
import { NavigationJumpTo } from "@czi-sds/components";
```

## Code examples

### Default NavigationJumpTo

Three items, with the two sub-sections of Methods indented under it. The highlight starts on the first item and moves with a click. No refs are attached to sections here, so nothing scrolls: this is the list's default state and nothing more.

**Example: DefaultNavigationJumpTo**

```tsx
// The list on its own: items in the order they are given, sub-items indented
// one level under the item they belong to, and the highlight starting on the
// first item.
//
// The refs are held but never handed to an element, which keeps this to the
// shape of the component. Nothing scrolls, and the highlight moves only when an
// item is clicked. The examples below point the refs at sections, which is what
// puts the highlight under the reader's own scrolling.

import { NavigationJumpTo } from "@czi-sds/components";
import { useRef } from "react";

function App() {
  const overviewRef = useRef<HTMLElement | null>(null);
  const methodsRef = useRef<HTMLElement | null>(null);
  const samplePrepRef = useRef<HTMLElement | null>(null);
  const sequencingRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  return (
    <div className="app">
      <NavigationJumpTo
        items={[
          { elementRef: overviewRef, title: "Overview" },
          {
            elementRef: methodsRef,
            subItems: [
              { elementRef: samplePrepRef, title: "Sample prep" },
              { elementRef: sequencingRef, title: "Sequencing" },
            ],
            title: "Methods",
          },
          { elementRef: resultsRef, title: "Results" },
        ]}
        width="200px"
      />
    </div>
  );
}

export default App;
```

### Sections in a scrolling panel

Three sections with refs wired to the items. Clicking scrolls the panel, and scrolling the panel moves the highlight. Bringing a section into view scrolls every scroll container around it, so this example holds the docs page still while the panel moves; a page that scrolls its own sections wants the opposite.

**Example: JumpToSections**

```tsx
// Each item points at a section through a ref, and the component keeps the
// highlight on whichever section is showing. Clicking an item scrolls its
// section into view, which here means scrolling the panel on the right.
//
// Give the sections ids: the tabs point their aria-controls at them, and
// without ids they reference elements that do not exist.
//
// "Into view" means every scroll container around the section, so this page
// scrolls along with the panel. holdPageStill pins it for the length of the
// animation, which a page that scrolls its own sections would not want.

import {
  NavigationJumpTo,
  fontBodyS,
  fontHeaderM,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useRef } from "react";

const Layout = styled.div`
  display: flex;
  gap: 16px;
`;

const ScrollArea = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      flex: 1;
      height: 280px;
      overflow-y: auto;
      padding: 16px;
    `;
  }}
`;

const Section = styled.section<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      min-height: 320px;

      h3 {
        ${fontHeaderM(props)}
        margin: 0 0 8px 0;
      }
    `;
  }}
`;

function holdPageStill() {
  const { scrollX, scrollY } = window;
  const until = performance.now() + 500;

  const pin = () => {
    window.scrollTo({ behavior: "instant", left: scrollX, top: scrollY });
    if (performance.now() < until) requestAnimationFrame(pin);
  };

  requestAnimationFrame(pin);
}

function App() {
  const overviewRef = useRef<HTMLElement | null>(null);
  const methodsRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  return (
    <div className="app">
      <Layout>
        <NavigationJumpTo
          items={[
            { elementRef: overviewRef, title: "Overview" },
            { elementRef: methodsRef, title: "Methods" },
            { elementRef: resultsRef, title: "Results" },
          ]}
          onChange={(_value, _event, type) => {
            if (type === "click") holdPageStill();
          }}
          width="160px"
        />

        <ScrollArea>
          <Section id="overview" ref={overviewRef}>
            <h3>Overview</h3>
            <p>What the study set out to measure and why.</p>
          </Section>
          <Section id="methods" ref={methodsRef}>
            <h3>Methods</h3>
            <p>How the samples were collected and processed.</p>
          </Section>
          <Section id="results" ref={resultsRef}>
            <h3>Results</h3>
            <p>What came out of the analysis.</p>
          </Section>
        </ScrollArea>
      </Layout>
    </div>
  );
}

export default App;
```

### Sub-items and onChange

Sub-items render indented under their parent, and the readout shows the index that `onChange` reports along with what triggered it. Click an item, then scroll the panel by hand to see the other kind of change arrive. The sub-sections are siblings of Methods rather than children, because a parent section wrapping them would keep the highlight for itself.

**Example: JumpToSubItems**

```tsx
// subItems nest one level and render indented under their parent. onChange
// reports the index of the highlighted item, counting sub-items in the order
// they render, along with whether a click or a scroll caused the change: click
// an item, then scroll the panel by hand to see the other kind arrive.
//
// The sub-sections are siblings of Methods rather than children of it. Nested
// inside, Methods would be in view whenever they were, and since the highlight
// goes to the first item in view, the sub-items would never take it on scroll.
//
// Bringing a section into view scrolls every container around it, this page
// included, so holdPageStill pins the page while the panel moves. A page that
// scrolls its own sections wants none of that.

import {
  NavigationJumpTo,
  fontBodyS,
  fontBodyXs,
  fontHeaderM,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

const Layout = styled.div`
  display: flex;
  gap: 16px;
`;

const ScrollArea = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      flex: 1;
      height: 280px;
      overflow-y: auto;
      padding: 16px;
    `;
  }}
`;

const Section = styled.section<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      min-height: 320px;

      h3 {
        ${fontHeaderM(props)}
        margin: 0 0 8px 0;
      }

      h4 {
        ${fontHeaderS(props)}
        margin: 0 0 8px 0;
      }
    `;
  }}
`;

const Sidebar = styled.p<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xl}px;
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

function holdPageStill() {
  const { scrollX, scrollY } = window;
  const until = performance.now() + 500;

  const pin = () => {
    window.scrollTo({ behavior: "instant", left: scrollX, top: scrollY });
    if (performance.now() < until) requestAnimationFrame(pin);
  };

  requestAnimationFrame(pin);
}

function App() {
  const [lastChange, setLastChange] = useState("none yet");
  const methodsRef = useRef<HTMLElement | null>(null);
  const samplePrepRef = useRef<HTMLElement | null>(null);
  const sequencingRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);
  const discussionRef = useRef<HTMLElement | null>(null);

  return (
    <div className="app">
      <Layout>
        <Sidebar>
          <NavigationJumpTo
            items={[
              {
                elementRef: methodsRef,
                subItems: [
                  { elementRef: samplePrepRef, title: "Sample prep" },
                  { elementRef: sequencingRef, title: "Sequencing" },
                ],
                title: "Methods",
              },
              { elementRef: resultsRef, title: "Results" },
              { elementRef: discussionRef, title: "Discussion" },
            ]}
            onChange={(value, _event, type) => {
              setLastChange(`index ${value}, from ${type}`);
              if (type === "click") holdPageStill();
            }}
            width="160px"
          />

          <Readout>
            Last change: <br />
            {lastChange}
          </Readout>
        </Sidebar>

        <ScrollArea>
          <Section id="methods" ref={methodsRef}>
            <h3>Methods</h3>
            <p>How the samples were collected and processed.</p>
          </Section>
          <Section id="sample-prep" ref={samplePrepRef}>
            <h4>Sample prep</h4>
            <p>Dissociation, staining, and quality gates.</p>
          </Section>
          <Section id="sequencing" ref={sequencingRef}>
            <h4>Sequencing</h4>
            <p>Library construction and read depth per sample.</p>
          </Section>
          <Section id="results" ref={resultsRef}>
            <h3>Results</h3>
            <p>What came out of the analysis.</p>
          </Section>
          <Section id="discussion" ref={discussionRef}>
            <h3>Discussion</h3>
            <p>What the numbers do and do not support.</p>
          </Section>
        </ScrollArea>
      </Layout>
    </div>
  );
}

export default App;
```

## SDS vs MUI

NavigationJumpTo is built on MUI's [Tabs](https://mui.com/material-ui/react-tabs/), but it is not a tab strip: the tabs are page sections, and which one is highlighted follows the scroll position rather than a value you hold. It differs from Tabs in these ways:

- `value`: the component owns it. An IntersectionObserver watches the sections and highlights the first one in view, so there is no `value` prop to set.

- `onChange`: MUI's signature is replaced. It reports the index that became active, the event, and whether a click or a scroll caused it, and it fires once per change rather than on every scroll frame.

- `orientation`: `"vertical"` is set for you, and the design only covers vertical. Passing `"horizontal"` is possible, since your props are applied last, but nothing is styled for it.

- **Colors are fixed.** The indicator is a 2px rule in the accent active color and the label colors come from the theme. There is no `indicatorColor` or `textColor` to set.

- **No icons.** Items are a title and a ref; there is nowhere to put one.

- **Layout is baked in.** The component is sticky 24px from the top of its scroll container, draws a 1px rule down its left edge, and reserves 16px below and 12px to its right. Width is the only dimension exposed.

## Behavior notes

- Each item carries a ref to its section, and the highlight follows the first section in view, in the order the items are listed. An earlier section still showing by a few pixels therefore keeps the highlight, which is the problem `offsetTop` solves. While a click's smooth scroll is running the scroll-driven update is suspended, so the indicator does not race through the sections on the way.

- Clicking an item scrolls its section into view. With `offsetTop` left at `0` that is a plain `scrollIntoView`, which works inside a scrolling container as well as on the page. Note that it scrolls every container around the section, so a section in a panel moves the panel and the page holding it.

- Setting `offsetTop` changes the mechanism: the component scrolls the window and finds the section by id. Sections therefore need `id` attributes, and a section without one simply will not scroll. It also assumes the page itself scrolls, so pair it with page-level scrolling rather than a scrolling panel.

- Sub-items nest exactly one level through `subItems` and render indented under their parent. They are ordinary items as far as indexing goes: a parent with two sub-items occupies indices 0, 1, and 2.

- Each tab points `aria-controls` at its section's id, falling back to a generated `navigation-panel-N` when the section has no id. Give your sections ids so the reference resolves, or the tabs point at elements that do not exist.

- The strip labels itself `navigation-jump-to`. Pass an `aria-label` of your own when a page has more than one.

## Props

Everything below is SDS's own. Other [Tabs props](https://mui.com/material-ui/api/tabs/) pass through to the underlying element, and because they are applied after the component's own, they can override them.

| Name        | Type                                                                                      | Default      | Description                                                                                                                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`     | `Item[]`                                                                                  | - (required) | The sections to list. See the shape below.                                                                                                                                                                            |
| `offsetTop` | `number`                                                                                  | `0`          | How many pixels above a section the highlight should switch to it, which is what you want when a sticky header covers the top of the page. Any non-zero value also switches clicks to window scrolling by element id. |
| `onChange`  | `(value: number,` `event?: React.SyntheticEvent,` `type?: "click" \| "scroll")` `=> void` | -            | Called when the highlighted item changes, with its index and what caused the change. For a scroll the event is synthesized, not a real DOM event.                                                                     |
| `width`     | `CSSProperties["width"]`                                                                  | `"100%"`     | The width of the strip and of every item in it. Long titles wrap rather than truncate.                                                                                                                                |

## Item

| Name         | Type                                    | Default | Description                                                                                          |
| ------------ | --------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `title`      | `string`                                | -       | The item's label. It is also kebab-cased into the tab's id, so keep titles distinct.                 |
| `elementRef` | `MutableRefObject<HTMLElement \| null>` | -       | A ref on the section this item points at. The component observes and scrolls whatever the ref holds. |
| `subItems`   | `{ title, elementRef }[]`               | -       | Indented children, one level only. Sub-items cannot nest sub-items of their own.                     |
