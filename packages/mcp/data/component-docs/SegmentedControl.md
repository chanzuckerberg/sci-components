# SegmentedControl

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/SegmentedControl/index.tsx).

## SDS vs MUI

The SDS SegmentedControl wraps MUI's ToggleButtonGroup, with these differences:

- **buttonDefinition instead of children:** MUI expects you to write a ToggleButton per segment. SDS builds them from an array instead, one entry per segment in array order, and the segments it builds are the control's only children — anything you nest inside a SegmentedControl is dropped without a warning.

- **Tooltips are built in:** each segment is wrapped in an SDS Tooltip unless you turn it off with **shouldShowTooltip**, which is what carries the meaning of an icon-only segment. In MUI you would add the tooltip yourself.

- **It works uncontrolled:** MUI's ToggleButtonGroup only renders the _value_ you hand it. SDS keeps its own state until you pass **value**, so a control left alone still responds to clicks, starting on the first segment that is not disabled.

- **exclusive is set for you:** the control selects one segment at a time and reports a single string. Multi-select is not available: passing _exclusive={false}_ reaches MUI, which then treats that string as a list and joins the values together, so the control reports something like "ListTable" and shows nothing as selected. Leave it as it is.

- **Sizing and colour props do nothing:** _size_, _color_, _fullWidth_ and _orientation_ all reach MUI and set their classes, but SDS pins the padding, typography, palette, width and direction, so the control looks the same either way. It is always horizontal, always sized to its content, and never fills its container.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-toggle-button/).

## Behavior and accessibility

- A control left uncontrolled opens on the first segment that is not disabled. Pass **value** to control it instead, and write the new value back from **onChange**, or the control will render the same segment no matter what is clicked.

- Clicking the selected segment deselects it. The control reports null and draws nothing as selected, which suits a filter that can be cleared but not a view switcher that must always show something. A controlled handler that ignores null keeps the current selection instead.

- Every segment needs either an **icon** or a **label**. A segment with both draws only the label; a segment with neither draws its value as text. Both cases log a warning.

- A segment's accessible name is its **label**, or its **value** when it carries an icon instead. It is not taken from _tooltipProps.title_, so an icon-only segment with a value like "a" or "1" is announced that way. Give icon-only segments values that read as words.

- Icons are drawn at the small size, so only icons that SDS carries at 16px can be named here. A large-only icon leaves the segment empty and logs an error; pass your own SVG element instead.

- Tooltips appear on hover and on keyboard focus, which is what makes an icon-only control usable from the keyboard. Disabled segments show no tooltip at all.

- The control is sized to its segments and does not wrap or shrink, so a long set of labels overflows a narrow container rather than reflowing. The design guidance above — two to four segments — keeps that from happening.

- Segments are ordinary buttons, so Tab moves through them one at a time rather than treating the group as a single stop, and Space or Enter selects.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name             | Type                                   | Default             | Description                                                                                                                                                                            |
| ---------------- | -------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttonDefinition | SingleButtonDefinition[]               | - (required)        | One entry per segment, in the order they appear. The shape is described in the table below.                                                                                            |
| value            | string \| null                         | -                   | The selected segment's value. Passing it makes the control controlled; leaving it out lets the control track the selection itself, starting on the first segment that is not disabled. |
| onChange         | (event, value: string \| null) => void | -                   | Runs on every click that changes the selection, with the newly selected value, or null when the selected segment was clicked again. Required when value is set.                        |
| disabled         | boolean                                | false               | MUI's group-level prop. Disables every segment at once while leaving the selection visible; per-segment control is on buttonDefinition.                                                |
| aria-label       | string                                 | "Segmented Control" | Names the group. Replace it with something that says what is being switched, since the default describes the widget rather than its purpose.                                           |

### SingleButtonDefinition

The shape of each entry in buttonDefinition.

| Name              | Type                                        | Default      | Description                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value             | string                                      | - (required) | Identifies the segment in value and onChange. On an icon-only segment it is also the accessible name and the tooltip's fallback text, so keep it readable.                                                                                           |
| icon              | keyof IconNameToSizes \| React.ReactElement | -            | An SDS icon name, drawn at the small size, or an SVG element of your own for artwork SDS does not carry. Size an element you pass to 16px and fill it with currentColor so it follows the selection.                                                 |
| label             | string                                      | -            | Text for the segment, used instead of an icon. It becomes the segment's accessible name and the tooltip's fallback text.                                                                                                                             |
| disabled          | boolean                                     | false        | Turns the segment off. Disabled segments show no tooltip and are skipped when an uncontrolled control picks its starting selection.                                                                                                                  |
| shouldShowTooltip | boolean                                     | true         | Whether the segment has a tooltip. Worth turning off for a labelled segment, whose tooltip would only repeat the label.                                                                                                                              |
| tooltipProps      | Partial<Omit<TooltipProps, "children">>     | -            | Passed to the segment's Tooltip, so it takes a title, a subtitle, a placement, and the rest of the Tooltip API. Without a title, the tooltip falls back to the label or the value. Note that the title is not used as the segment's accessible name. |
| tooltipText       | string                                      | -            | Deprecated in favour of tooltipProps, and logs a warning. It sets the tooltip's title, overriding tooltipProps.title when both are given, and it is the one tooltip prop that also sets the segment's accessible name.                               |

## Code examples

### Default SegmentedControl

Three icon segments, left uncontrolled so the control tracks the selection itself. No tooltip text is set, so each segment falls back to its value.

**Example: DefaultSegmentedControl**

```tsx
// Segments come from buttonDefinition, one entry per segment in array order;
// SegmentedControl ignores children. Left uncontrolled like this, it selects the
// first segment that is not disabled and tracks clicks itself.
//
// Icons are drawn at the small size, so only icons that have 16px artwork can be
// used here. Nothing else on an icon segment is readable, so its value becomes
// both the tooltip and the accessible name — which is why the values below read
// as words rather than as codes.

import {
  SegmentedControl,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SingleButtonDefinition,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
];

const Hint = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.m}px 0 0;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />

      <Hint>Hover or focus a segment to see the tooltip it falls back to.</Hint>
    </div>
  );
}

export default App;
```

### Segments with labels

A label replaces the icon on a segment. These have their tooltips turned off, since the text is already on screen.

**Example: SegmentedControlWithLabels**

```tsx
// A segment shows text instead of an icon when it is given a label. Setting both
// on one segment is a mistake: the label wins, the icon never renders, and the
// console carries a warning.
//
// A labelled segment already says what it is, so the tooltip would only repeat
// it. shouldShowTooltip turns that off. The label is also the accessible name
// here, so the value is free to stay a plain identifier.

import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const VIEWS: SingleButtonDefinition[] = [
  { label: "Explorer", shouldShowTooltip: false, value: "explorer" },
  { label: "All data", shouldShowTooltip: false, value: "all-data" },
  { label: "Summary", shouldShowTooltip: false, value: "summary" },
];

function App() {
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />
    </div>
  );
}

export default App;
```

### Controlled SegmentedControl

The selection is held in the page's state and written back from onChange, which also ignores the null that a click on the selected segment reports, so the control always shows a view.

**Example: ControlledSegmentedControl**

```tsx
// Passing value makes the control controlled: it shows the segment you name and
// stops tracking clicks on its own, so onChange has to write the new value back.
//
// Clicking the selected segment again reports null, which would leave the control
// with nothing selected. A view switcher has to show something, so this handler
// ignores null and keeps the current view.

import {
  SegmentedControl,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SingleButtonDefinition,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
];

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.m}px 0 0;
    `;
  }}
`;

function App() {
  const [view, setView] = useState("Table");

  return (
    <div className="app">
      <SegmentedControl
        buttonDefinition={VIEWS}
        onChange={(_event, newView: string | null) => {
          if (newView !== null) {
            setView(newView);
          }
        }}
        value={view}
      />

      <Readout>Showing the {view.toLowerCase()} view</Readout>
    </div>
  );
}

export default App;
```

### Disabled segments

A single segment turned off, next to a control turned off as a whole. The first control opens on its second segment, because an uncontrolled control skips the disabled one.

**Example: SegmentedControlWithDisabledItems**

```tsx
// A disabled segment cannot be clicked and shows no tooltip, since a control that
// will not respond has nothing to explain. The uncontrolled starting selection
// skips it too, so the first control below opens on Table rather than on List.
//
// The disabled prop on the control itself, rather than on a segment, turns every
// segment off at once while leaving the current selection visible.

import {
  SegmentedControl,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SingleButtonDefinition,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const VIEWS: SingleButtonDefinition[] = [
  { disabled: true, icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: "TreeVertical", value: "Tree" },
];

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

const Stack = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
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
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stack>
        <Row>
          <SegmentedControl buttonDefinition={VIEWS} />
          <Caption>One segment disabled</Caption>
        </Row>

        <Row>
          <SegmentedControl buttonDefinition={VIEWS} disabled />
          <Caption>The whole control disabled</Caption>
        </Row>
      </Stack>
    </div>
  );
}

export default App;
```

### Richer tooltips

tooltipProps reaches the Tooltip behind each segment, for a subtitle under the title or a placement other than above the control.

**Example: SegmentedControlTooltips**

```tsx
// Each segment builds its own tooltip, so tooltipProps is set per segment rather
// than on the control. Anything the SDS Tooltip takes belongs there: a title, a
// subtitle underneath it, a placement other than the default above the control.
//
// Only the tooltip changes. The accessible name still comes from the segment's
// value, not from tooltipProps.title, so the values here stay readable.
//
// tooltipText is the older way to set a bare title. It is deprecated, warns in
// the console, and overrides tooltipProps.title when both are set.

import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const VIEWS: SingleButtonDefinition[] = [
  {
    icon: "List",
    tooltipProps: {
      subtitle: "One row per sample, sorted by collection date",
      title: "List",
    },
    value: "List",
  },
  {
    icon: "Table",
    tooltipProps: {
      subtitle: "Every measured field, side by side",
      title: "Table",
    },
    value: "Table",
  },
  {
    icon: "TreeVertical",
    tooltipProps: { placement: "bottom", title: "Tree, explained below" },
    value: "Tree",
  },
];

function App() {
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />
    </div>
  );
}

export default App;
```

### A segment with its own artwork

icon takes an SVG element as well as an SDS icon name, which covers artwork the SDS set does not carry.

**Example: SegmentedControlCustomIcon**

```tsx
// icon takes an SVG element as well as an SDS icon name, which covers artwork the
// SDS set does not carry and icons it only draws at 24px. The element is rendered
// as it is given, so size it to 16px yourself and fill it with currentColor so it
// picks up the segment's colour as the selection moves.

import {
  SegmentedControl,
  type SingleButtonDefinition,
} from "@czi-sds/components";

const HexagonIcon = (
  <svg fill="currentColor" height={16} viewBox="0 0 16 16" width={16}>
    <path d="M8 1.5l5.5 3.25v6.5L8 14.5 2.5 11.25v-6.5L8 1.5z" />
  </svg>
);

const VIEWS: SingleButtonDefinition[] = [
  { icon: "List", value: "List" },
  { icon: "Table", value: "Table" },
  { icon: HexagonIcon, value: "Cells" },
];

function App() {
  return (
    <div className="app">
      <SegmentedControl buttonDefinition={VIEWS} />
    </div>
  );
}

export default App;
```
