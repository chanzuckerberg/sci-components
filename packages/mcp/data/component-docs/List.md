# List

A list is three components: **List** for the _ul_ or _ol_ element, **ListItem** for each entry, and **ListSubheader** for the optional heading above them. All three wrap their MUI counterparts, so any MUI prop passes straight through.

## How the pieces fit together

- **ordered** belongs on both the List and every ListItem. On the List it swaps the element to _ol_ and starts the counter; on each item it increments the counter and draws the number. An _ol_ whose items are missing the prop still renders bullets.

- Markers are drawn by the item's _::before_ pseudo-element rather than the browser's own list marker, and are always semibold. Bullets sit 8px from the text, numbers 6px.

- Numbers come from a CSS counter, so a list nested inside an ordered item numbers itself 1.1., 1.2., and so on, to any depth.

- Nested lists have to sit inside a single wrapper element together with the parent item's text. A ListItem is a flex row, so a bare _text plus List_ pair would lay the two out side by side.

- Items align their marker to the top of the text, so wrapped copy keeps the bullet or number on the first line.

- The List carries no padding of its own, so items line up flush with the surrounding text instead of the browser's default indent.

- A subheader renders as an _li_ without a marker, in fontHeaderM, 16px above the first item. That gap is effectively fixed; see **marginBottom** in the List table below.

- Sizing and spacing live on ListItem, not on List, so nothing is inherited down. A list of six items at **fontSize** m needs the prop on all six.

- Because the markers are CSS content and the browser's own list style is turned off, Safari and VoiceOver stop treating the element as a list. Add _role="list"_ to the List when that matters.

## Sizes and spacing

The pairing below is the one the designs use, and the one the [Storybook story](https://chanzuckerberg.github.io/sci-components/?path=/story/components-list--default) demonstrates. Set both props on each item.

| fontSize | Type                             | marginBottom | Gap below the item |
| -------- | -------------------------------- | ------------ | ------------------ |
| "l"      | fontBodyL, 18px / 16px narrow    | "s"          | 8px                |
| "m"      | fontBodyM, 16px / 14px narrow    | "s"          | 8px                |
| "s"      | fontBodyS, 14px                  | "xs"         | 6px                |
| "xs"     | fontBodyXs, 13px                 | "xs"         | 6px                |
| "xxs"    | fontBodyXxs, 12px                | "xs"         | 6px                |
| "xxxs"   | fontBodyXxxs, 11px / 12px narrow | "xxs"        | 4px                |

## List

### Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/List/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the [MUI documentation](https://mui.com/material-ui/api/list/) for additional optional props.

| Name           | Type                                         | Default      | Description                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ordered        | boolean                                      | false        | Renders an "ol" element and starts the numbering counter. false renders a "ul". Pass it to each ListItem as well, otherwise the items still draw bullets.                                                                                                                                                                                                      |
| subheader      | ReactNode                                    | undefined    | The heading rendered above the items, normally a ListSubheader. Comes from MUI.                                                                                                                                                                                                                                                                                |
| marginBottom   | "xxxs" \| "xxs" \| "xs" \| "s" \| "m" \| "l" | "s"          | Sets the gap below the subheader, not below the list: 8px for "xxxs", 12px through "xxs" to "s", 16px for "m" and "l". It collides with the 16px margin ListSubheader sets on itself at the same specificity, so the winner comes down to the order the styles were inserted and the prop is not dependable. Space the list itself with its container instead. |
| component      | ElementType                                  | "ul" or "ol" | Overrides the element the list renders as, taking precedence over ordered. Reach for it only when the markup has to differ from the semantics.                                                                                                                                                                                                                 |
| disablePadding | boolean                                      | true         | MUI's vertical padding is off by default. Pass false to bring back its 8px top and bottom padding.                                                                                                                                                                                                                                                             |

## ListItem

### Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/List/components/ListItem/index.tsx).

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the [MUI documentation](https://mui.com/material-ui/api/list-item/) for additional optional props.

| Name         | Type                                         | Default   | Description                                                                                                                                                         |
| ------------ | -------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fontSize     | "xxxs" \| "xxs" \| "xs" \| "s" \| "m" \| "l" | "s"       | The body type scale for this item. Set it on every item; it is not inherited from the List.                                                                         |
| marginBottom | "s" \| "xs" \| "xxs"                         | "xs"      | The gap below this item: "s" is 8px, "xs" is 6px, "xxs" is 4px. It applies to the last item too, so drop the default when the list sits right above something else. |
| ordered      | boolean                                      | false     | Draws a counter-based number instead of a bullet. It has to match the ordered prop on the parent List.                                                              |
| children     | ReactNode                                    | undefined | The item's content. Wrap it in a single element when the item holds more than a string, since the item lays its children out in a row.                              |

### ListItemLabel

ListItemLabel, exported alongside ListItem, is a semibold span for the term at the start of an item. It adds 5px of space after itself, but keep an ordinary space in the copy as well, otherwise a screen reader reads the label and the sentence after it as one word.

## ListSubheader

### Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/List/components/ListSubheader/index.tsx).

### Props

ListSubheader adds no SDS props: it takes fontHeaderM, a 16px bottom margin, and the surrounding text color, then passes everything through to [MUI's ListSubheader](https://mui.com/material-ui/api/list-subheader/). The two props worth knowing are below.

| Name           | Type    | Default | Description                                                                                                                                    |
| -------------- | ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| disableSticky  | boolean | false   | MUI pins the subheader to the top of a scrolling container. Pass it so the heading scrolls away with the list, which is what the designs show. |
| disableGutters | boolean | true    | MUI's horizontal padding is off by default, keeping the heading flush with the items.                                                          |

## Code examples

### Unordered list

An unordered list with a subheader. Neither the List nor the items need any props for this shape.

**Example: UnorderedList**

```tsx
// An unordered list is the default: no props needed on List or ListItem. The
// subheader goes through MUI's subheader prop, with disableSticky so it scrolls
// with the content.

import { List, ListItem, ListSubheader } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List
        subheader={
          <ListSubheader disableSticky>Before you upload</ListSubheader>
        }
      >
        <ListItem>Files must be gzipped FASTQ or BAM.</ListItem>
        <ListItem>Every sample needs a unique identifier.</ListItem>
        <ListItem>
          Reads shorter than 30 bases are dropped during processing, so trim
          them beforehand if you want to keep them.
        </ListItem>
      </List>
    </div>
  );
}

export default App;
```

### Ordered list

The same list numbered, with ordered on the List and on every item.

**Example: OrderedList**

```tsx
// ordered has to go on both the List and every ListItem: the List switches the
// element to ol and starts the counter, and each item increments it and draws
// its own number.

import { List, ListItem, ListSubheader } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List
        ordered
        subheader={
          <ListSubheader disableSticky>Running an analysis</ListSubheader>
        }
      >
        <ListItem ordered>Pick the samples you want to include.</ListItem>
        <ListItem ordered>Choose a reference genome.</ListItem>
        <ListItem ordered>Start the run and wait for the report.</ListItem>
      </List>
    </div>
  );
}

export default App;
```

### Nested ordered list

Nesting a List inside an ordered item numbers the sub-items against their parent, so they read 1.1. and 1.2.

**Example: NestedOrderedList**

```tsx
// Nested numbering comes from a CSS counter, so sub-items read 1.1., 1.2., and
// so on. The nested List has to live inside a single wrapper element, otherwise
// it becomes a sibling of the item's text instead of a child of it.

import { List, ListItem } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List ordered>
        <ListItem ordered marginBottom="s">
          <span>
            Prepare your data
            <List ordered>
              <ListItem ordered>Upload the raw reads.</ListItem>
              <ListItem ordered>Attach the sample metadata.</ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered marginBottom="s">
          <span>
            Configure the pipeline
            <List ordered>
              <ListItem ordered>Choose a reference genome.</ListItem>
              <ListItem ordered>Set the quality thresholds.</ListItem>
            </List>
          </span>
        </ListItem>
        <ListItem ordered>Start the run.</ListItem>
      </List>
    </div>
  );
}

export default App;
```

### Sizes and spacing

The type scale, each size with the item spacing it pairs with. Both props sit on the items, so one list can mix sizes.

**Example: ListSizes**

```tsx
// fontSize sets the body type scale on each item, and marginBottom sets the gap
// below it. Both live on ListItem, not on List, so a list can mix sizes.

import { List, ListItem } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <List>
        <ListItem fontSize="l" marginBottom="s">
          fontSize=&quot;l&quot;, marginBottom=&quot;s&quot;
        </ListItem>
        <ListItem fontSize="m" marginBottom="s">
          fontSize=&quot;m&quot;, marginBottom=&quot;s&quot;
        </ListItem>
        <ListItem fontSize="s" marginBottom="xs">
          fontSize=&quot;s&quot;, marginBottom=&quot;xs&quot; (the defaults)
        </ListItem>
        <ListItem fontSize="xs" marginBottom="xs">
          fontSize=&quot;xs&quot;, marginBottom=&quot;xs&quot;
        </ListItem>
        <ListItem fontSize="xxs" marginBottom="xs">
          fontSize=&quot;xxs&quot;, marginBottom=&quot;xs&quot;
        </ListItem>
        <ListItem fontSize="xxxs" marginBottom="xxs">
          fontSize=&quot;xxxs&quot;, marginBottom=&quot;xxs&quot;
        </ListItem>
      </List>
    </div>
  );
}

export default App;
```

### Items with labels

ListItemLabel makes the leading term semibold, which suits lists that define or name things.

**Example: ListWithLabels**

```tsx
// ListItemLabel is a semibold span for the term at the start of an item, so
// definition-style lists stay readable without hand-rolled font weights.

import { List, ListItem, ListItemLabel } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ maxWidth: "460px" }}>
      <List>
        <ListItem fontSize="s">
          <span>
            <ListItemLabel>Draft</ListItemLabel> Only you can see the dataset.
          </span>
        </ListItem>
        <ListItem fontSize="s">
          <span>
            <ListItemLabel>Private</ListItemLabel> Everyone in your collection
            can see the dataset.
          </span>
        </ListItem>
        <ListItem fontSize="s">
          <span>
            <ListItemLabel>Published</ListItemLabel> The dataset is visible to
            anyone with the link, and the version is frozen.
          </span>
        </ListItem>
      </List>
    </div>
  );
}

export default App;
```
