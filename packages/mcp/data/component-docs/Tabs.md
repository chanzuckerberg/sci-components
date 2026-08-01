# Tabs

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Tabs/index.tsx).

## SDS vs MUI

SDS Tabs wraps MUI's Tabs, and SDS Tab wraps MUI's Tab. Both are exported from the library and are used together — a Tab has to be a direct child of a Tabs group. The differences from MUI are these:

- **sdsSize:** takes large (default) or small, and sets both the size of the label text on every tab in the group — 14px for large, 13px for small — and the spacing around the group: 16px above and 24px below at the large size, 12px on both sides at the small size. It reaches the tabs through context, so it belongs on the group; a Tab cannot ask for a size of its own.

- **underlined:** runs a divider under the full width of the group when true, separating the tabs from the content below them. Without it only the selected tab is underlined, in the accent color.

- **count on a Tab:** a value drawn after the label, saying how many items wait on that tab's screen. It is a prop on each Tab, not on the group, and it takes any node — a number, a string, or a component such as a Tag. A count of 0 is drawn rather than dropped.

- **The label is rendered twice:** each tab carries a second, hidden copy of its label set in semibold, which holds the width the label will need once the tab is selected and its text turns semibold. It is why selecting a tab does not shift the strip. The copy is hidden from assistive technology, but it is in the DOM, so a test looking for a tab's text by content finds two nodes.

- **The indicator is fixed:** SDS styles the selected tab's underline itself — 2px, in the accent color — so MUI's _indicatorColor_ and _textColor_ have no visible effect. That styling arrives through _slotProps.indicator_, so passing your own _slotProps_ replaces it and leaves the indicator with MUI's default appearance.

- **Only a horizontal, full-width strip is supported:** SDS turns off the clipping that MUI's scroller relies on, so _variant="scrollable"_ neither clips nor scrolls: too many tabs spill out of a narrow container rather than scrolling inside it. Setting _orientation="vertical"_ stacks the tabs but leaves the indicator drawn as a horizontal underline. Keep the group horizontal and keep the number of tabs to what fits.

- **Icons are not part of the design:** MUI's _icon_ and _iconPosition_ props still render, but SDS does not style them, so an SDS tab is a label and an optional count.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-tabs/).

## Behavior and accessibility

- The group is controlled. It draws the tab whose value matches **value**, so the selection has to live in your state and **onChange** has to write it back; without that, clicking a tab changes nothing. A value that matches no tab leaves the group with nothing selected and logs a warning listing the values it accepts. Passing _value={false}_ selects nothing on purpose, without the warning.

- Tabs are numbered by position unless a Tab is given a **value** of its own, which is worth doing when the strip can change, so the selection does not follow whichever tab happens to sit in that position.

- A Tab has to be a direct child of a Tabs group: rendered on its own it throws, and wrapped in an element it renders but never selects, since the group passes its state to its immediate children. Mapping over an array is fine.

- The group renders _role="tablist"_ with a _role="tab"_ button per tab, and keeps a single tab stop: Tab enters the strip on the selected tab, the arrow keys move between tabs and wrap around, Home and End jump to the ends, and Space or Enter selects the focused tab. Selecting on focus alone is available through MUI's _selectionFollowsFocus_, which suits a strip whose panels are already loaded.

- Nothing connects a tab to the content it reveals until you do it. Give each Tab an **id** and an **aria-controls** pointing at its panel, and give the panel _role="tabpanel"_ and an _aria-labelledby_ pointing back at the tab. The panels example below shows the wiring.

- **aria-label** on the group lands on the tablist and names the set of tabs. Worth setting, since a screen reader otherwise announces an unnamed tab list.

- A tab's accessible name is its label followed by whatever **count** renders, so a count of 0 is announced as part of the name — "Contributors 0". Keep a count short enough to read that way.

- A **disabled** tab keeps its place in the strip but cannot be clicked, and the arrow keys skip past it. It says that a section exists but is not ready; a section that does not apply at all is better left out of the group.

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                  | Type                        | Default      | Description                                                                                                                  |
| --------------------- | --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| children              | React.ReactNode             | - (required) | The tabs in the group, as direct Tab children in the order they appear.                                                      |
| value                 | any                         | - (required) | The selected tab's value: its position in the group, or the value set on the Tab itself. Pass false to select nothing.       |
| onChange              | (event, value: any) => void | -            | Runs when a tab is selected, with that tab's value. Write it back to value, or the group will keep showing the same tab.     |
| sdsSize               | "small" \| "large"          | "large"      | The size of the label text on every tab in the group, and the spacing around the group.                                      |
| underlined            | boolean                     | false        | Draws a divider along the full width of the group, below the tabs; the selected tab's indicator sits on top of it.           |
| aria-label            | string                      | -            | Names the tablist. Say what the tabs switch between, and use aria-labelledby instead when a visible heading already says it. |
| selectionFollowsFocus | boolean                     | false        | MUI's prop for selecting a tab as soon as the arrow keys reach it, instead of waiting for Space or Enter.                    |

### Tab

One tab in the group. Beyond the props below it takes MUI's Tab props and the attributes of the button it renders.

| Name          | Type            | Default               | Description                                                                                                                                               |
| ------------- | --------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label         | React.ReactNode | -                     | The tab's text, and its accessible name. Rendered twice, once visibly and once hidden in semibold to hold the width the selected state needs.             |
| count         | React.ReactNode | -                     | A value drawn after the label — a number, a string, or a component. 0 is drawn rather than dropped, and whatever renders joins the tab's accessible name. |
| value         | any             | position in the group | Identifies the tab in the group's value and onChange. Worth setting when the set of tabs can change.                                                      |
| disabled      | boolean         | false                 | Greys the tab out and takes it out of reach of the pointer and the arrow keys, while leaving it in the strip.                                             |
| id            | string          | -                     | The tab's id, for a panel's aria-labelledby to point at. Not generated for you.                                                                           |
| aria-controls | string          | -                     | The id of the panel this tab reveals.                                                                                                                     |
| selected      | boolean         | -                     | Set by the group from its value, and used to draw the label in semibold. Not something to pass yourself.                                                  |

## Code examples

### Tabs – Large

The default size, for the top level of a screen. The selection is held in the page's state and written back from onChange, which is what a Tabs group needs to respond to a click.

**Example: TabsLarge**

```tsx
// Tabs is a controlled component: it draws the tab whose value matches the value
// prop, so the selection has to live in your state and onChange has to write it
// back. Without that, clicking a tab changes nothing.
//
// The large size is the default and belongs at the top level of a screen. The
// component brings its own spacing, 16px above and 24px below, so the group does
// not need margins of its own.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs aria-label="Sample views" onChange={handleChange} value={value}>
        <Tab label="Overview" />
        <Tab label="Samples" />
        <Tab label="Sequencing runs" />
      </Tabs>
    </div>
  );
}

export default App;
```

### Tabs – Small

A group at the small size, which drops the label text to 13px. It is meant for a second layer of tabbing rather than on its own.

**Example: TabsSmall**

```tsx
// The small size drops the label text from 14px to 13px and tightens the spacing
// around the group to 12px. It is meant for a second layer of tabbing underneath a
// large group, not on its own — see the two levels example further down.
//
// sdsSize reaches every Tab through context, so it is set once on the group. A
// Tab cannot ask for a different size than the group it sits in.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs
        aria-label="Sample details"
        onChange={handleChange}
        sdsSize="small"
        value={value}
      >
        <Tab label="Metadata" />
        <Tab label="Quality control" />
        <Tab label="Files" />
      </Tabs>
    </div>
  );
}

export default App;
```

### Tabs with count, text, and component

count takes any node: a number, a count of 0 on an empty tab, and a number paired with a Tag on the last tab. The group is underlined, which separates it from the content below.

**Example: TabsWithCountTextAndComponent**

```tsx
// count sits after a tab's label and says how many items wait on that tab's
// screen. It takes any node, not just a number, so it can carry text or a whole
// component — the last tab below pairs a number with a Tag.
//
// A count of 0 is drawn rather than dropped, which is what makes an empty tab
// read as empty rather than as unknown. Whatever count renders becomes part of
// the tab's accessible name, so it is announced as "Contributors 0".
//
// underlined runs a divider under the full width of the group, separating the
// tabs from the content below them.

import {
  Tab,
  Tabs,
  Tag,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SyntheticEvent, useState } from "react";

const CountWithTag = styled.span<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: inline-flex;
      gap: ${spaces?.s}px;
    `;
  }}
`;

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs
        aria-label="Project contents"
        onChange={handleChange}
        underlined
        value={value}
      >
        <Tab count={4} label="Samples" />
        <Tab count={0} label="Contributors" />
        <Tab
          count={
            <CountWithTag>
              14
              <Tag
                color="beta"
                label="BETA"
                sdsStyle="rounded"
                sdsType="secondary"
              />
            </CountWithTag>
          }
          label="Analyses"
        />
      </Tabs>
    </div>
  );
}

export default App;
```

### Tabs with panels

The wiring between a tab and the content it reveals, which the component leaves to you: matching ids on each Tab and its panel, role="tabpanel" on the panel, and only the selected panel rendered.

**Example: TabsWithPanels**

```tsx
// Tabs draws the tab strip; the panel below it is yours to render and to connect.
// The component sets role="tablist" and role="tab" and moves the tab stop between
// the tabs, but it does not know about your content, so nothing links a tab to
// the panel it controls until you pass the ids yourself:
//
//   Tab:   id="…-tab", aria-controls="…-panel"
//   Panel: id="…-panel", role="tabpanel", aria-labelledby="…-tab"
//
// Only the selected panel is rendered here, so the tabs are the only way to reach
// the other content. tabIndex={0} on the panel gives it a tab stop, which lets a
// keyboard user move from the selected tab straight into what it revealed.

import {
  Tab,
  Tabs,
  fontBodyS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SyntheticEvent, useState } from "react";

const VIEWS = [
  {
    body: "12 samples collected between March and June, 3 of them flagged for re-sequencing.",
    id: "samples",
    label: "Samples",
  },
  {
    body: "Two runs on the NovaSeq X, both passing the coverage threshold of 30x.",
    id: "runs",
    label: "Sequencing runs",
  },
  {
    body: "A differential expression analysis finished last week and is ready to download.",
    id: "analyses",
    label: "Analyses",
  },
];

const Panel = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      padding: ${spaces?.l}px;
    `;
  }}
`;

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  const view = VIEWS[value];

  return (
    <div className="app">
      <Tabs
        aria-label="Project sections"
        onChange={handleChange}
        underlined
        value={value}
      >
        {VIEWS.map((item) => (
          <Tab
            aria-controls={`${item.id}-panel`}
            id={`${item.id}-tab`}
            key={item.id}
            label={item.label}
          />
        ))}
      </Tabs>

      <Panel
        aria-labelledby={`${view.id}-tab`}
        id={`${view.id}-panel`}
        role="tabpanel"
        tabIndex={0}
      >
        {view.body}
      </Panel>
    </div>
  );
}

export default App;
```

### A disabled tab

A tab whose content is not ready yet. It stays in the strip, greyed out, and both the pointer and the arrow keys pass over it.

**Example: TabsWithDisabledTab**

```tsx
// disabled comes from MUI and greys a tab out. The tab stays in the strip, so it
// still says that the section exists, but it cannot be clicked and the arrow keys
// skip past it.
//
// A tab is worth disabling when its content is not ready yet rather than not
// available at all — otherwise leave it out of the group.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs aria-label="Analysis steps" onChange={handleChange} value={value}>
        <Tab count={12} label="Samples" />
        <Tab disabled label="Alignment" />
        <Tab count={3} label="Variant calls" />
      </Tabs>
    </div>
  );
}

export default App;
```

### Two levels of tabs

A large group over a small one, which is the pairing the small size exists for. Each level keeps its own state, and the second level resets when the first one changes.

**Example: NestedTabs**

```tsx
// The small size exists for a second layer of tabbing under a large group, which
// is the only place the design guidance puts it. Each level is its own Tabs group
// with its own state, and the second level resets when the first one changes, so a
// section never opens on a sub-tab that was chosen somewhere else.
//
// Each group brings its own spacing — 24px under the large one, 12px over the
// small one — and those margins collapse into a single 24px gap between the two
// strips, so neither level needs margins added or taken away here.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

const SECTIONS = [
  { label: "Samples", subTabs: ["All", "Flagged", "Archived"] },
  { label: "Sequencing runs", subTabs: ["Completed", "In progress"] },
];

function App() {
  const [section, setSection] = useState(0);
  const [subTab, setSubTab] = useState(0);

  const handleSectionChange = (_event: SyntheticEvent, newValue: unknown) => {
    setSection(newValue as number);
    setSubTab(0);
  };

  const handleSubTabChange = (_event: SyntheticEvent, newValue: unknown) => {
    setSubTab(newValue as number);
  };

  return (
    <div className="app">
      <Tabs
        aria-label="Project sections"
        onChange={handleSectionChange}
        underlined
        value={section}
      >
        {SECTIONS.map((item) => (
          <Tab key={item.label} label={item.label} />
        ))}
      </Tabs>

      <Tabs
        aria-label={`${SECTIONS[section].label} views`}
        onChange={handleSubTabChange}
        sdsSize="small"
        value={subTab}
      >
        {SECTIONS[section].subTabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </div>
  );
}

export default App;
```
