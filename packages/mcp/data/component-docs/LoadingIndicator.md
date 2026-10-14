# LoadingIndicator

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/LoadingIndicator/index.tsx).

## Import

**React TypeScript**

```tsx
import { LoadingIndicator } from "@czi-sds/components";
```

## Code examples

### LoadingIndicator – Minimal

Use the minimal variant when part of a page is still filling in, such as the body of an Accordion or the rows of a Table.

**Example: LoadingIndicatorMinimal**

```tsx
// The minimal variant is body-sized text in secondary grey, for a region of a
// page that is still filling in. sdsStyle is required; there is no default.

import { LoadingIndicator } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <LoadingIndicator sdsStyle="minimal" />
    </div>
  );
}

export default App;
```

### LoadingIndicator – Tag

Use the tag variant when a whole page or view has not arrived yet.

**Example: LoadingIndicatorTag**

```tsx
// The tag variant is an accent-colored pill with all-caps text, for a whole
// page or view that has not arrived yet.

import { LoadingIndicator } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <LoadingIndicator sdsStyle="tag" />
    </div>
  );
}

export default App;
```

### Naming what is loading

The two indicators below look identical, but the second announces "Loading cell types" instead of "Loading". Name the thing being loaded whenever more than one wait can be in flight.

**Example: LoadingIndicatorAriaLabel**

```tsx
// aria-label changes only what a screen reader announces. The visible word
// stays "Loading" either way, so use the label to name what is loading.

import { LoadingIndicator } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <LoadingIndicator sdsStyle="minimal" />
      <LoadingIndicator sdsStyle="minimal" aria-label="Loading cell types" />
    </div>
  );
}

export default App;
```

### Loading a region on demand

Swapping the indicator in for the content it is standing in for, which is what gives the status region something to announce, and what gives the wait a visible end.

**Example: LoadingIndicatorInContext**

```tsx
// Mount the indicator when the wait starts and unmount it when the content
// arrives: the status region announces itself on mount. Removing it announces
// nothing, so the content that replaces it carries the news.
//
// The component accepts no className or style, so any layout, centering
// included, belongs on a wrapper around it.

import {
  Button,
  fontBodyS,
  getSemanticColors,
  LoadingIndicator,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const Surface = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      display: flex;
      align-items: center;
      justify-content: center;
      height: 96px;
      margin-bottom: 12px;
      width: 320px;
    `;
  }}
`;

function App() {
  const [loading, setLoading] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeout.current), []);

  const load = () => {
    setLoading(true);
    timeout.current = setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="app">
      <Surface>
        {loading ? (
          <LoadingIndicator sdsStyle="minimal" aria-label="Loading samples" />
        ) : (
          <span>4 samples ready</span>
        )}
      </Surface>

      <Button sdsStyle="outline" sdsType="primary" onClick={load}>
        Reload samples
      </Button>
    </div>
  );
}

export default App;
```

## Behavior notes

- The component reads exactly two props, `sdsStyle` and `aria-label`, and ignores everything else. There is no `className`, `style`, `id`, `children`, or data attribute to pass, and no ref to take, so wrap it in an element of your own for layout, spacing, or centering.

- The visible label is the hard-coded word _Loading_. It cannot be changed or translated, so a wait that needs different copy needs a line of your own text beside the indicator.

- Both variants stand 32px tall and sit `inline-flex`, so they line up with adjacent text rather than filling their container.

- Internally there is 4px of padding and nothing more. The 16px of clearance the spacing guideline above asks for is yours to add on the surrounding element.

- The spinner is animated inside the SVG itself, not with CSS, so it keeps spinning under `prefers-reduced-motion` and there is no prop to stop it.

- The label sits in a `role="status"`, `aria-live="polite"` region, so it announces itself when it mounts. Render it when the wait starts and unmount it when the wait ends: nothing is announced on removal, so the content that replaces it has to carry the result.

## The two variants

| sdsStyle    | Type                       | Color                                                                     | Spinner |
| ----------- | -------------------------- | ------------------------------------------------------------------------- | ------- |
| `"minimal"` | `fontBodyS`, sentence case | Text `base.textSecondary`, spinner `base.ornamentSecondary`, no fill      | 16px    |
| `"tag"`     | `fontCapsXxxxs`, all caps  | Text and spinner `accent.foreground` on an `accent.surfaceSecondary` pill | 24px    |

## Props

The component takes no MUI props. Its full surface is the table below; any other prop is a type error.

| Name         | Type                   | Default      | Description                                                                                                                                                                                           |
| ------------ | ---------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sdsStyle`   | `"minimal"` \| `"tag"` | - (required) | Chooses between the two variants above. It has no default: leaving it out is a type error, and an indicator built without it renders unstyled.                                                        |
| `aria-label` | `string`               | `undefined`  | Replaces what a screen reader announces for the status region, for example "Loading cell types". The visible text still reads "Loading". Without it, assistive technology announces the visible word. |
