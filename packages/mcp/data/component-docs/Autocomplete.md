# Autocomplete

The searchable list of options behind every SDS dropdown: a MUI Autocomplete rendered as SDS MenuItems, in one column or several.

> **Most applications want DropdownMenu instead.** Autocomplete is the list itself, with no popper of its own and no trigger. DropdownMenu wraps it in a popper anchored to an element you choose, and Dropdown adds the click target too. Use Autocomplete directly when the list belongs somewhere a popper cannot go: inside a panel, a dialog body, or a layout you are placing yourself. The Dropdowns overview sets out the whole family.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Autocomplete/index.tsx).

## Import

**React TypeScript**

```tsx
import { Autocomplete } from "@czi-sds/components";
```

## Code examples

### Default

A single list with a search field. Click the field to open it; options here carry nothing but a name.

**Example: DefaultAutocomplete**

```tsx
// An option needs nothing but a name: it is the label, the key, and what
// equality is judged on. Everything else an option can carry is optional.
//
// search gives the component its visible text field. Without it the input is
// hidden and the list has to be opened by a parent, which is how DropdownMenu
// drives it.
//
// The component fills its container, so the width comes from the wrapper.

import {
  Autocomplete,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte" },
  { name: "B cell" },
  { name: "Endothelial cell" },
  { name: "Fibroblast" },
  { name: "Macrophage" },
  { name: "Neuron" },
  { name: "T cell" },
];

function App() {
  return (
    <div className="app">
      <Autocomplete label="Search cell types" options={OPTIONS} search />
    </div>
  );
}

export default App;
```

### Multi-select

Selecting several options, with the selection read back out above the list. The component will not show it in the field.

**Example: AutocompleteMultiSelect**

```tsx
// multiple keeps the list open after each pick and marks the chosen options
// with a checkmark. It does not show them in the input: the field always shows
// its label, because that is the parent's job in SDS: a DropdownMenu sits
// under an InputDropdown that reports the selection.
//
// Making it controlled is the way to read the selection out. The handler is
// given the whole value, not the option that changed, so it can be stored as
// is; details.option holds the one that was just added or removed.
//
// keepSearchOnSelect leaves the typed text in place after a pick, so several
// matches for the same search can be selected without retyping it.

import { useState } from "react";
import {
  Autocomplete,
  type AutocompleteSingleColumnOnChange,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte" },
  { name: "B cell" },
  { name: "Endothelial cell" },
  { name: "Fibroblast" },
  { name: "Macrophage" },
  { name: "Neuron" },
  { name: "T cell" },
];

function App() {
  const [selected, setSelected] = useState<DefaultAutocompleteOption[]>([]);

  // Pinning the generics is what makes the handler's value typed: multiple,
  // not clearable-disabled, not freeSolo, so the value is an array of options.
  const handleChange: AutocompleteSingleColumnOnChange<
    DefaultAutocompleteOption,
    true,
    false,
    false
  > = (_event, value) => setSelected(value);

  return (
    <div className="app">
      <Autocomplete<DefaultAutocompleteOption, true, false, false>
        keepSearchOnSelect
        label="Search cell types"
        multiple
        options={OPTIONS}
        search
        value={selected}
        onChange={handleChange}
        InputBaseProps={{
          style: {
            width: "280px",
          },
        }}
      />
    </div>
  );
}

export default App;
```

### Grouped sections

`groupBy` splits the same list into labelled sections.

**Example: AutocompleteGroupedSections**

```tsx
// groupBy sorts the list into labelled sections. It reads whatever the callback
// returns, so section is only a convention: any field, or a value computed on
// the spot, will do.
//
// The list is not reordered for you: options are grouped in the order they
// arrive, so an option that repeats a section already passed starts a second
// section with the same heading. Sort the options the way the sections should
// read before handing them over.

import {
  Autocomplete,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { name: "Astrocyte", section: "Nervous" },
  { name: "Neuron", section: "Nervous" },
  { name: "Oligodendrocyte", section: "Nervous" },
  { name: "B cell", section: "Immune" },
  { name: "Macrophage", section: "Immune" },
  { name: "T cell", section: "Immune" },
  { name: "Endothelial cell", section: "Structural" },
  { name: "Fibroblast", section: "Structural" },
];

function App() {
  return (
    <div className="app">
      <Autocomplete
        groupBy={(option) => option.section as string}
        label="Search cell types"
        multiple
        options={OPTIONS}
        search
        InputBaseProps={{
          style: {
            width: "280px",
          },
        }}
      />
    </div>
  );
}

export default App;
```

### What an option can show

Counts, details, icons, a disabled row, and an option that renders a component of its own instead of a label.

**Example: AutocompleteOptionContent**

```tsx
// Beyond its name, an option can carry a count, a line of details, and an icon:
// either an SDS icon name, styled through sdsIconProps, or an element of your
// own. The MenuItem the list renders lays all of that out.
//
// An option can instead carry a component, and then it renders that in place of
// the label. The two are mutually exclusive by type: an option is either a
// described one or a custom one, never both. It still needs a name, which is
// what search matches against and what selection is tracked by.

import {
  Autocomplete,
  Tag,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

const OPTIONS: DefaultAutocompleteOption[] = [
  { count: 128, name: "T cell" },
  {
    details: "Includes both classical and non-classical subsets",
    name: "Monocyte",
  },
  {
    icon: "TreeVertical",
    name: "Neuron",
    sdsIconProps: { color: "blue", shade: 400 },
  },
  {
    count: 12,
    details: "Awaiting curation",
    icon: "List",
    name: "Unannotated",
    sdsIconProps: { color: "gray", shade: 500 },
  },
  { disabled: true, name: "Platelet" },
  {
    component: (
      <div>
        Available labels
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          <Tag
            color="positive"
            hover={false}
            label="curated"
            sdsStyle="square"
            sdsType="secondary"
          />
          <Tag
            color="notice"
            hover={false}
            label="draft"
            sdsStyle="square"
            sdsType="secondary"
          />
        </div>
      </div>
    ),
    name: "Available labels",
  },
];

function App() {
  return (
    <div className="app">
      <Autocomplete
        label="Search cell types"
        multiple
        options={OPTIONS}
        search
        InputBaseProps={{
          style: {
            width: "320px",
          },
        }}
      />
    </div>
  );
}

export default App;
```

### Multiple columns

Two lists side by side under one search field, and the record-shaped value they report.

**Example: AutocompleteMultiColumn**

```tsx
// Passing columns instead of options switches the component to its multi-column
// form: each entry is a named list with its own width, rendered side by side and
// separated by a divider that can carry an icon.
//
// The value changes shape to match. Instead of one selection there is one per
// column, keyed by the column's name, and the handler receives the whole record
// every time any column changes.
//
// One search field sits above all the columns and filters them together.
// groupBy is ignored here: sections and columns do not combine.

import { useState } from "react";
import {
  Autocomplete,
  Icon,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type AutocompleteMultiColumnOnChange,
  type AutocompleteMultiColumnOption,
  type AutocompleteMultiColumnValue,
  type CommonThemeProps,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";
import styled from "@emotion/styled";

type Option = DefaultAutocompleteOption;

const COLUMNS: AutocompleteMultiColumnOption<Option, true, false, false>[] = [
  {
    icon: <Icon sdsIcon="ChevronRight" sdsSize="xs" />,
    name: "Tissue",
    options: [
      { name: "Blood" },
      { name: "Brain" },
      { name: "Kidney" },
      { name: "Lung" },
    ],
  },
  {
    name: "Assay",
    options: [
      { count: 24, name: "10x 3' v3" },
      { name: "Slide-seq" },
      { details: "Sequential FISH", name: "seqFISH" },
      { name: "Smart-seq2" },
    ],
  },
];

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.m}px;
    `;
  }}
`;

type Picked = AutocompleteMultiColumnValue<Option, true, false, false>;

function App() {
  const [picked, setPicked] = useState<Picked>({});

  const handleChange: AutocompleteMultiColumnOnChange<
    Option,
    true,
    false,
    false
  > = (_event, value) => setPicked(value);

  const summary = Object.entries(picked ?? {})
    .filter(([, options]) => options.length)
    .map(([column, options]) => `${column}: ${options.length}`)
    .join(" · ");

  return (
    <div className="app">
      <Readout>{summary || "Nothing selected."}</Readout>

      <Autocomplete<Option, true, false, false>
        label="Search tissues and assays"
        multiple
        options={COLUMNS}
        search
        onChange={handleChange}
        InputBaseProps={{
          style: {
            width: "280px",
          },
        }}
      />
    </div>
  );
}

export default App;
```

## SDS vs MUI

SDS Autocomplete wraps [MUI Autocomplete](https://mui.com/material-ui/react-autocomplete/), so every MUI prop is available and anything not described here behaves as MUI documents it. What SDS adds is a house style and a set of defaults that suit dropdowns rather than form fields:

- **Options render as SDS MenuItems** inside a MenuList, which is where the checkmarks, counts, details, icons, and disabled styling come from. Supplying your own `renderOption` replaces all of it.

- **The selection is never drawn in the input.** MUI shows chips for a multi-select; SDS returns `null` from `renderValue`, so the field keeps showing its label and the checkmarks in the list are the only indication. Reporting the selection belongs to whatever sits above: an InputDropdown, a set of Tags, your own summary.

- **The input is an SDS InputSearch** with a search button and a clear button, built by the component. Reach it through `InputBaseProps`. MUI's `renderInput` still works and replaces that input outright, which also takes the two buttons with it, so it is a last resort rather than the way in.

- **Defaults differ.** `clearOnBlur` is `false` rather than MUI's `true`, so typed text survives a blur; `disableCloseOnSelect` follows `multiple`; and `blurOnSelect` is forced off for a multi-select so the list stays put while several options are picked. Backspace is also stopped from reaching MUI, where it would otherwise remove the last selection.

- **The popper never portals.** `disablePortal` is set, so the list renders in place, inside whatever container the component is in, and inherits its stacking and overflow.

## Options

Every option needs a `name`. It is the label, the search text, the React key, and what selection equality is judged on by default, so names should be unique within a list. Beyond that an option comes in one of two shapes, and the type will not let you mix them:

- A **described option** may add `count`, a number shown at the end of the row; `details`, a second line under the label; `icon`, either an SDS icon name or an element of your own; and `sdsIconProps` to colour and size a named icon.

- A **custom option** carries a `component` instead, rendered in place of the label inside the same MenuItem. It still needs a name for search and selection to work.

Either shape may set `section`, which `groupBy` can read to split the list into labelled groups, and `disabled`, which greys the row out and blocks selection. Options are grouped in the order they arrive rather than being sorted, so a section that reappears later in the array is rendered as a second group under the same heading.

## One column or several

The shape of `options` decides which form you get. A flat array is a single list. An array of objects that each have their own `options` is a multi-column dropdown, with one list per entry, a heading from its `name`, a fixed `width`, and an optional `icon` drawn on the divider that follows it:

**React TypeScript**

```tsx
// One column
options={[{ name: "Brain" }, { name: "Lung" }]}

// Two columns
options={[
  { name: "Tissue", options: [{ name: "Brain" }], width: 180 },
  { name: "Assay", options: [{ name: "Slide-seq" }], width: 220 },
]}
```

The value follows the same split. A single column reports what MUI reports: an option, or an array of them for a multi-select. Multiple columns report a record keyed by column name, with each column's own value inside it, and the handler receives the whole record whenever any column changes.

A columns array of length one collapses back to a single list, so a variable number of columns needs no special casing. `groupBy` is ignored once there is more than one column: sections and columns do not combine.

## Search, and who opens the list

`search` is what gives the component a visible, focusable text field. It is off by default, and when it is off the input is not merely hidden but clipped and disabled, which also means there is nothing left to click, and the list can only be opened by a parent through `open`. That is the arrangement DropdownMenu uses, and the reason a bare Autocomplete with no props appears to do nothing.

So there are two working configurations: give it `search` and let it manage itself, or control `open` from outside and use `onClick` and `onClickAway` to hear when the component would like to open and close. Both are advisory when `open` is controlled. The list stays where your state puts it.

Filtering is MUI's, matching against `getOptionLabel`, which defaults to the option's name; pass `filterOptions` to change how matching works. When nothing matches, `noOptionsText` is shown. For a multi-select, `keepSearchOnSelect` leaves the typed text in place after each pick so several matches for one search can be selected without retyping it.

## Behavior and accessibility

- A single-select closes and blurs on selection. A multi-select stays open, keeps focus, and marks selected rows with a checkmark, shifting the labels right to make room.

- The listbox keeps its scroll position across selections, so picking an option halfway down a long list does not jump back to the top.

- Keyboard support is MUI's: arrows move the highlight, Enter selects, Escape closes, and typing filters. The field takes a focus outline only when it was reached by tabbing, not when it was clicked.

- With `search` off there is no keyboard path into the component at all: the input is disabled and `aria-hidden` along with its two buttons, and the options carry a `tabindex` of `-1`. Anything built on that mode has to provide its own keyboard route to the list.

- The input is labelled by `label`, which is used as both the visible label and the placeholder. It is worth writing as an instruction: "Search cell types" rather than "Search".

- Because the input never shows the selection, a selection that is not reported anywhere else is invisible to someone who cannot see the checkmarks. Pair the list with a summary of what is chosen.

> **count and icon do nothing at the top level.** Both are accepted on the component itself, left over from an earlier version, and neither is rendered. On an option they work as described above; on a column, `icon` draws the divider glyph.

## Typing onChange

The handler is typed as a union of the single-column and multi-column signatures, which is enough to stop TypeScript inferring its parameters. Pin the component's generics and declare the handler with the matching type, and both sides line up:

**React TypeScript**

```tsx
import {
  Autocomplete,
  type AutocompleteSingleColumnOnChange,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";

// <Option, Multiple, DisableClearable, FreeSolo>
const handleChange: AutocompleteSingleColumnOnChange<
  DefaultAutocompleteOption,
  true,
  false,
  false
> = (event, value) => setSelected(value);

<Autocomplete<DefaultAutocompleteOption, true, false, false>
  multiple
  onChange={handleChange}
  options={OPTIONS}
  value={selected}
/>;
```

Use `AutocompleteMultiColumnOnChange` and `AutocompleteMultiColumnValue` for the multi-column form.

## MUI Documentation

Documentation for the underlying MUI Autocomplete component can be found [here](https://mui.com/material-ui/react-autocomplete/).

## Props

The props below are the SDS additions and the MUI props whose behaviour SDS changes. Everything else is passed through to MUI Autocomplete; see the MUI documentation for the rest.

| **Name**                 | **Type**                                                       | **Default**                    | **Description**                                                                                                                                                                                                                                                   |
| ------------------------ | -------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                | `T[]` \| `AutocompleteMultiColumnOption<T>[]`                  | - (required)                   | The options, or an array of named columns each with their own options.                                                                                                                                                                                            |
| `value`                  | `T \| T[]` \| `Record<string, T \| T[]>`                       | -                              | The selection. An array when `multiple`, and a record keyed by column name when there is more than one column.                                                                                                                                                    |
| `onChange`               | `function`                                                     | -                              | Fired on every selection change with the whole value. `details.option` is the one that just changed. **Signature:** `function(event: SyntheticEvent, value: T \| T[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<T>) => void`          |
| `onInputChange`          | `function`                                                     | -                              | Fired as the search text changes, after the component has updated its own input state. **Signature:** `function(event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => void`                                                             |
| `multiple`               | `boolean`                                                      | `false`                        | Allows more than one selection, shows checkmarks, and keeps the list open and focused after each pick.                                                                                                                                                            |
| `search`                 | `boolean`                                                      | `false`                        | Shows the search field. Without it the input is hidden and disabled, and the list must be opened through `open`.                                                                                                                                                  |
| `label`                  | `string`                                                       | `"Label"` `"Search"` (columns) | The search field's label and placeholder.                                                                                                                                                                                                                         |
| `open`                   | `boolean`                                                      | -                              | Controls whether the list is shown. Once set, the component will not open or close itself.                                                                                                                                                                        |
| `onClick`                | `(event) => void`                                              | -                              | Fired when the component would like to open.                                                                                                                                                                                                                      |
| `onClickAway`            | `(event, reason) => void`                                      | -                              | Fired when the component would like to close, including on Escape and on a click outside.                                                                                                                                                                         |
| `keepSearchOnSelect`     | `boolean`                                                      | `false`                        | For a multi-select, leaves the typed text in place after a selection instead of clearing it.                                                                                                                                                                      |
| `groupBy`                | `(option: T) => string`                                        | -                              | Splits the list into labelled sections. Ignored when there is more than one column.                                                                                                                                                                               |
| `intent`                 | `"default" \| "negative"` \| `"notice" \| "positive"`          | `"default"`                    | Validation styling on the search field. Single column only; the multi-column field does not take it.                                                                                                                                                              |
| `InputBaseProps`         | `Partial<InputSearchProps>`                                    | -                              | Props for the search field. This is the way in: SDS supplies `renderInput` itself.                                                                                                                                                                                |
| `renderInput`            | `function`                                                     | an SDS InputSearch             | `(params: AutocompleteRenderInputParams) => ReactNode`. Replaces the whole input, losing the search and clear buttons SDS puts there, so prefer `InputBaseProps`. On a multi-column Autocomplete it reaches the hidden per-column inputs rather than the trigger. |
| `PopperBaseProps`        | `Partial<PopperProps>`                                         | -                              | Props for the popper holding the columns. Multi-column only; a single column uses MUI's own popper.                                                                                                                                                               |
| `PopperComponent`        | `component`                                                    | SDS styled Popper              | Replaces that popper outright. Multi-column only.                                                                                                                                                                                                                 |
| `PopperPlacement`        | `"bottom-start" \| "bottom-end"` \| `"top-start" \| "top-end"` | `"bottom-start"`               | Where the columns are placed. Multi-column only.                                                                                                                                                                                                                  |
| `ClickAwayListenerProps` | `Partial<ClickAwayListenerProps>`                              | -                              | Props for the MUI ClickAwayListener that closes the columns. Multi-column only.                                                                                                                                                                                   |
| `disableCloseOnSelect`   | `boolean`                                                      | `multiple`                     | Keeps the list open after a selection. Follows `multiple` unless you set it.                                                                                                                                                                                      |
| `blurOnSelect`           | `boolean \| "touch" \| "mouse"`                                | `!multiple`                    | Blurs the input after a selection. Forced off when `multiple`.                                                                                                                                                                                                    |
| `clearOnBlur`            | `boolean`                                                      | `false`                        | Clears the typed text when the field loses focus. MUI defaults this to `true`; SDS does not.                                                                                                                                                                      |
| `getOptionLabel`         | `(option: T) => string`                                        | `option.name`                  | The text an option displays and is searched by.                                                                                                                                                                                                                   |
| `isOptionEqualToValue`   | `(option: T, value) => boolean`                                | compares names                 | How an option is matched to the value. Override it when names are not unique or the value is a different object.                                                                                                                                                  |
| `getOptionDisabled`      | `(option: T) => boolean`                                       | -                              | Disables options by rule, as an alternative to the `disabled` flag on an option.                                                                                                                                                                                  |
| `renderOption`           | `(props, option, state) => node`                               | SDS MenuItem                   | Replaces the row entirely, including checkmarks, counts, details, and icons.                                                                                                                                                                                      |
| `noOptionsText`          | `ReactNode`                                                    | `"No options"`                 | Shown when nothing matches the search.                                                                                                                                                                                                                            |
| `loading`                | `boolean`                                                      | `false`                        | Shows `loadingText` in place of the options. Note that `loadingText` defaults to an empty string, so set it.                                                                                                                                                      |
| `disabled`               | `boolean`                                                      | `false`                        | Disables the search field.                                                                                                                                                                                                                                        |
