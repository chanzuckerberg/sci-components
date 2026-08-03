# Tooltip

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tooltip/index.tsx).

## Import

**React TypeScript**

```tsx
import { Tooltip } from "@czi-sds/components";
```

## Code examples

### **Default Tooltip**

A title and a trigger, which is all a tooltip needs. The dark scheme, the arrow, and the placement below the trigger are what the component gives you without being asked.

**Example: DefaultTooltip**

```tsx
// The least a tooltip needs: a title, and something to hang it on. The dark
// scheme, the arrow and the placement below the trigger all come as standard, so
// hover or focus the button to see what the component does unasked.
//
// The trigger still says what it is. A tooltip adds to a label; it is not one.

import { Button, Tooltip } from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 120px;
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip title="Recalculated whenever the filters change.">
          <Button sdsStyle="minimal" sdsType="secondary">
            Sequencing depth
          </Button>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
```

### **Tooltip – Dark**

The tooltip the component gives you by default, with a title and a subtitle. The design calls this one the inverted tooltip.

**Example: TooltipDark**

```tsx
// The dark tooltip is what the component gives you without asking: hasInvertedStyle
// defaults to true. Note that the design above calls this one inverted and treats
// the light tooltip as the default, so the two vocabularies are reversed.
//
// subtitle sits under title in smaller, dimmer text, for a detail like how to use
// the thing being pointed at. Both are optional, but a tooltip with neither a
// title, a subtitle, nor a componentSlot renders nothing at all.
//
// The trigger needs its own accessible name. An icon-only button gets one from
// aria-label, and it needs one because the tooltip text is not a substitute.

import { Button, Icon, Tooltip } from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 120px;
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          placement="top"
          subtitle="Values are recalculated whenever the filters change."
          title="Sequencing depth"
        >
          <Button
            aria-label="About sequencing depth"
            sdsStyle="minimal"
            sdsType="secondary"
          >
            <Icon sdsIcon="InfoCircle" sdsSize="s" />
          </Button>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
```

### **Tooltip – Light**

The light tooltip, which has to be asked for with `hasInvertedStyle={false}`, shown at both widths. The wide one holds 550px of left-aligned text.

**Example: TooltipLight**

```tsx
// hasInvertedStyle={false} draws the light tooltip: a white surface with a hairline
// outline and body text rather than semibold. The design treats this one as the
// default, so it is worth asking for deliberately.
//
// width="wide" lifts the cap from 250px to 550px and switches the text to the left,
// which is what longer explanations need. It logs a warning saying wide is for light
// tooltips only. The check is broken and fires whichever style you use, so it can
// be ignored here.

import {
  Button,
  Icon,
  Tooltip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const LONG_TEXT =
  "Reads are aligned to the reference genome with minimap2, then filtered to remove duplicates and anything below the mapping quality threshold set for the project.";

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      gap: ${spaces?.xxl}px;
      justify-content: center;
      min-height: 140px;
    `;
  }}
`;

const Labelled = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xs}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Labelled>
          <Tooltip
            hasInvertedStyle={false}
            placement="top"
            title="Aligned with minimap2"
          >
            <Button
              aria-label="About alignment"
              sdsStyle="minimal"
              sdsType="secondary"
            >
              <Icon sdsIcon="InfoCircle" sdsSize="s" />
            </Button>
          </Tooltip>
          Default width
        </Labelled>

        <Labelled>
          <Tooltip
            hasInvertedStyle={false}
            placement="top"
            title={LONG_TEXT}
            width="wide"
          >
            <Button
              aria-label="About the alignment pipeline"
              sdsStyle="minimal"
              sdsType="secondary"
            >
              <Icon sdsIcon="InfoCircle" sdsSize="s" />
            </Button>
          </Tooltip>
          Wide
        </Labelled>
      </Stage>
    </div>
  );
}

export default App;
```

### **Placement and the arrow**

Four of the twelve placements, and what `arrowOffset` does to the arrow: it sets a position rather than nudging one.

**Example: TooltipPlacement**

```tsx
// placement is MUI's, and all twelve values work: a side, optionally with -start or
// -end to pin the tooltip to one end of the trigger. A tooltip that would fall off
// the screen flips to the opposite side on its own.
//
// arrowOffset is SDS's, and it is not an offset: the number becomes the arrow's left
// position inside the tooltip, in pixels from its left edge. Small values move the
// arrow near the left corner and values past the tooltip's width push it out of
// sight, so it is only worth reaching for when the arrow has to line up with
// something narrower than the trigger.

import {
  Button,
  Icon,
  Tooltip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type TooltipProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const PLACEMENTS: TooltipProps["placement"][] = [
  "top",
  "right",
  "bottom-start",
  "left-end",
];

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
      justify-content: center;
      padding: ${spaces?.xxl}px 0;
    `;
  }}
`;

const Labelled = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xs}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stage>
        {PLACEMENTS.map((placement) => (
          <Labelled key={placement}>
            <Tooltip placement={placement} title={`Placed ${placement}`}>
              <Button
                aria-label={`Tooltip placed ${placement}`}
                sdsStyle="minimal"
                sdsType="secondary"
              >
                <Icon sdsIcon="InfoCircle" sdsSize="s" />
              </Button>
            </Tooltip>
            {placement}
          </Labelled>
        ))}

        <Labelled>
          <Tooltip
            arrowOffset={12}
            placement="top"
            title="Arrow pinned 12px from the left edge"
          >
            <Button
              aria-label="Tooltip with an offset arrow"
              sdsStyle="minimal"
              sdsType="secondary"
            >
              <Icon sdsIcon="InfoCircle" sdsSize="s" />
            </Button>
          </Tooltip>
          arrowOffset
        </Labelled>
      </Stage>
    </div>
  );
}

export default App;
```

### **Tooltip with a component slot**

Content that is not a string goes in `componentSlot`, under the title. The pointer can travel into the tooltip, which is what makes the link inside it usable.

**Example: TooltipWithComponentSlot**

```tsx
// componentSlot takes anything React can render and puts it under the title and
// subtitle, with 12px between them. It is the way to get something other than text
// into a tooltip (a legend, a thumbnail, a link) because title and subtitle are
// each wrapped in a paragraph, so a table or a div passed to title produces invalid
// HTML.
//
// A tooltip is interactive: the pointer can travel from the trigger, across the gap,
// and onto the tooltip without closing it, which is what makes the link below
// reachable. Content that has to be clicked only works because of that, and it stops
// working the moment disableInteractive is set.

import {
  Button,
  Icon,
  Tooltip,
  focusVisibleA11yStyle,
  fontBodyXs,
  fontLinkXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 140px;
`;

const Legend = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xxs}px;
      text-align: left;
    `;
  }}
`;

const Swatch = styled.span<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      gap: ${spaces?.s}px;

      &::before {
        border-radius: 2px;
        content: "";
        height: 10px;
        width: 10px;
      }
    `;
  }}
`;

const PassingSwatch = styled(Swatch)<CommonThemeProps>`
  ${(props) => `
    &::before {
      background-color: ${getSemanticColors(props)?.positive?.fillPrimary};
    }
  `}
`;

const FailingSwatch = styled(Swatch)<CommonThemeProps>`
  ${(props) => `
    &::before {
      background-color: ${getSemanticColors(props)?.negative?.fillPrimary};
    }
  `}
`;

// The tooltip renders in a portal outside the page's styles, so a link inside one
// carries the SDS link type style itself.
const SlotLink = styled.a<CommonThemeProps>`
  ${fontLinkXs}
  ${focusVisibleA11yStyle}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.accent?.textAction};
      text-underline-offset: 2.5px;

      &:hover {
        color: ${semanticColors?.accent?.textActionHover};
      }
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          componentSlot={
            <Legend>
              <PassingSwatch>Above 30x coverage</PassingSwatch>
              <FailingSwatch>Below the threshold</FailingSwatch>
              <SlotLink href="https://sds.czi.design/009eaf17b">
                Read the full method
              </SlotLink>
            </Legend>
          }
          hasInvertedStyle={false}
          placement="right"
          textAlign="left"
          title="Coverage"
        >
          <Button
            aria-label="Coverage legend"
            sdsStyle="minimal"
            sdsType="secondary"
          >
            <Icon sdsIcon="InfoCircle" sdsSize="s" />
          </Button>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
```

### **Tooltip on a disabled element**

A disabled control reports no hovers, so the tooltip goes on a span around it.

**Note for Tooltips on** **Disabled** **elements**

If the tooltip wraps a disabled component, please make sure to wrap the children in a `<span>` tag. SDS puts `tabIndex={0}` on whatever the tooltip wraps, so that span also becomes a tab stop and the tooltip opens on focus.

[https://mui.com/components/tooltips/#disabled-elements](https://mui.com/components/tooltips/#disabled-elements)

**Example: TooltipOnDisabledElement**

```tsx
// A disabled button fires no pointer events, so a tooltip attached straight to one
// never opens. Wrapping it in a span gives the tooltip an element that still reports
// hovers.
//
// The span works for the keyboard too, without any extra work: SDS puts tabIndex={0}
// on whatever a tooltip wraps, so the span becomes a tab stop of its own and the
// tooltip opens when it takes focus. That is the one route left, since the disabled
// button itself cannot be focused.

import { Button, Tooltip } from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 120px;
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          hasInvertedStyle={false}
          placement="top"
          title="Pick at least one sample before exporting"
        >
          <span>
            <Button disabled sdsStyle="solid" sdsType="primary">
              Export
            </Button>
          </span>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
```

## SDS vs MUI

SDS Tooltip wraps MUI's Tooltip, composes the content out of its own props rather than taking it whole, and pins the parts of MUI's API the design has an opinion about. What it adds and changes:

- `hasInvertedStyle`: `true` by default, which is the dark tooltip: a black surface with white semibold text. Set it to `false` for the light one: a white surface, a hairline outline, and body text. Mind the vocabulary: the design above calls the light tooltip the default and the dark one inverted, while the component ships dark unless asked otherwise.

- `title` and `subtitle`: SDS builds the content itself, wrapping `title` and then `subtitle` in paragraphs of its own, so `title` is not the free-form node MUI's is. `subtitle` is the smaller, dimmer second line and works on either style, despite a leftover warning in the codebase claiming it is dark-only. A tooltip with no `title`, `subtitle` or `componentSlot` renders nothing and leaves its child alone.

- `componentSlot`: anything React can render, placed under the text with 12px above it when there is text to sit under. This is where non-text content goes, since a table or a div handed to `title` lands inside a paragraph and produces invalid HTML.

- `width`: `"default"` caps the tooltip at 250px, `"wide"` at 550px and switches the text to the left. Compare MUI, which has no `width` prop of its own. The design pairs the wide width with the light tooltip; in code it applies to both, and logs a warning about being light-only either way.

- `textAlign`: overrides the alignment each width picks for itself: centred at the default width, left when wide.

- `arrowOffset`: not an offset but a position: the number becomes the arrow's `left` in pixels, measured from the tooltip's left edge, replacing the one the positioning engine worked out. Values past the tooltip's own width put the arrow out of sight.

- **arrow is on:** MUI defaults to no arrow; SDS turns it on for every tooltip. It can still be turned back off with `arrow={false}`, though the design always draws one.

- **sdsStyle and inverted are deprecated.** Both are earlier spellings of `hasInvertedStyle`: `sdsStyle="dark"` matches the default and `sdsStyle="light"` matches `hasInvertedStyle={false}`. Reach for `hasInvertedStyle` and ignore the console: because the component gives `sdsStyle` a default of `"dark"` before checking whether it was passed, both the deprecation warning and the wide-width warning are logged for every tooltip, whatever props you gave it. The same stale default is why the 500ms delay the code has in mind for light tooltips only takes effect if you pass the deprecated `sdsStyle="light"` alongside `hasInvertedStyle={false}`; on its own, a light tooltip closes as promptly as a dark one.

- **The popper is SDS's:** it carries the arrow's shape and its position for all twelve placements, and it arrives through `PopperComponent`, which SDS keeps as a prop name of its own after MUI moved to `slots.popper`. SDS fills in `slots` last, so a `slots` object of your own is dropped; pass `PopperComponent` instead.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tooltip/).

## Behavior and accessibility

- A tooltip opens on hover and on keyboard focus, and closes on Escape. SDS gives the trigger `tabIndex={0}` so that focus can reach it even when the element wrapped is not naturally focusable.

- While a tooltip is open, MUI points the trigger's `aria-labelledby` at it, so the tooltip text becomes the trigger's name for that moment rather than an extra description. The trigger still needs a name of its own for when the tooltip is closed: an icon-only button needs an `aria-label`, and text in a tooltip is never a substitute for it.

- Tooltips are interactive: the pointer can travel from the trigger, across the 14px gap, and onto the tooltip without it closing, which is what makes a link inside one reachable. MUI's `disableInteractive` turns that off, and with it any chance of clicking what the tooltip holds.

- A disabled element fires no pointer events, so a tooltip attached to one never opens. Wrap the child in a `<span>` to give the tooltip something that reports hovers. The span inherits the `tabIndex={0}` SDS adds, so it becomes a tab stop and the tooltip still opens on focus. That is the only route left, given that the disabled control cannot take focus itself.

- The tooltip renders in a portal at the end of the document, so it is not clipped by whatever it sits inside and does not need room reserved for it.

- A tooltip is not a place for anything a person has to have. It cannot be reached on a touch screen without a tap that also does something else, and it is gone the moment the pointer moves.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                 | Type                                                                                                                                                                                       | Default                           | Description                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`              | `ReactNode`                                                                                                                                                                                | -                                 | The tooltip's first line, wrapped in a paragraph by SDS. A tooltip with no `title`, `subtitle` or `componentSlot` does not render.                                        |
| `subtitle`           | `ReactNode`                                                                                                                                                                                | -                                 | A smaller, dimmer second line under the title, for a detail such as how to use what the tooltip points at. Works on both styles.                                          |
| `componentSlot`      | `ReactNode`                                                                                                                                                                                | -                                 | Content below the text, with 12px above it when there is text. The place for anything that is not a string, including TooltipTable.                                       |
| `hasInvertedStyle`   | `boolean`                                                                                                                                                                                  | `true`                            | True is the dark tooltip: a black surface with white semibold text. False is the light one, with a hairline outline and body text.                                        |
| `width`              | `"default" \| "wide"`                                                                                                                                                                      | `"default"`                       | Caps the tooltip at 250px or 550px. Wide also left-aligns the text. It logs a warning about being light-only whichever style it is used with.                             |
| `textAlign`          | `"left" \| "center" \| "right"`                                                                                                                                                            | `"center"`, or `"left"` when wide | Overrides the alignment the width would pick.                                                                                                                             |
| `arrow`              | `boolean`                                                                                                                                                                                  | `true`                            | MUI's prop, which SDS turns on for every tooltip. It can be set back to `false`, though the design always draws an arrow.                                                 |
| `arrowOffset`        | `number`                                                                                                                                                                                   | -                                 | Sets the arrow's left position, in pixels from the tooltip's left edge, instead of letting it be calculated. Values past the tooltip's width move the arrow out of sight. |
| `PopperComponent`    | `ElementType`                                                                                                                                                                              | SDS `StyledPopper`                | The popper the tooltip renders into, carrying the arrow's shape and placement. SDS maps it to MUI's `slots.popper`, and a `slots` object passed directly is ignored.      |
| `sdsStyle`           | `"dark" \| "light"`                                                                                                                                                                        | `"dark"`                          | **Deprecated.** An earlier spelling of `hasInvertedStyle`: dark matches the default, light matches `hasInvertedStyle={false}`.                                            |
| `inverted`           | `boolean`                                                                                                                                                                                  | -                                 | **Deprecated.** The oldest spelling of `hasInvertedStyle`. Use `hasInvertedStyle`.                                                                                        |
| `placement`          | `"bottom-start"` \| `"bottom"` \| `"bottom-end"` \| `"left-start"` \| `"left"` \| `"left-end"` \| `"right-start"` \| `"right"` \| `"right-end"` \| `"top-start"` \| `"top"` \| `"top-end"` | `"bottom"`                        | MUI's prop. All twelve values work, and a tooltip that would fall off the screen flips to the opposite side on its own.                                                   |
| `disableInteractive` | `boolean`                                                                                                                                                                                  | `false`                           | MUI's prop. Stops the tooltip from staying open while the pointer moves onto it, which also puts anything clickable inside it out of reach.                               |
