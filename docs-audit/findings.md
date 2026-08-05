# Findings from the documentation audit

Bugs and wrong behavior noticed while checking each component's documentation
against its source. Nothing here is fixed as part of the documentation work
unless the note says so: the point is to collect them, decide together what is
worth changing, and do that separately.

`report.md` beside this file is the machine-generated drift report, rebuilt with
`yarn docs:audit`. This file is the hand-written half.

## Cross-cutting

### The published props data had drifted from the source

Severity: medium. Status: fixed by regenerating.

`packages/mcp/data/` is generated but committed, and it had fallen behind the
code. Regenerating with no other change rewrote descriptions for `Hero`,
`Button`, `Banner`, `ButtonDropdown`, `ButtonToggle`, `ContentCard`, `Dialog`,
`Icon`, `IntentMessage` and `InputRadio`: the JSDoc in those components had been
edited without rerunning `yarn mcp:generate`, so the MCP server was describing
props in words their authors had already replaced.

Worth a CI check that regenerating produces no diff, in the same spirit as the
drift guard added under `docs-kit/__tests__`.

### Stories invent controls that ship as real props

Severity: medium. Status: filtered in the generator; individual stories still to
review.

`generate-component-props.ts` treats a story's `argTypes` as the list of props
to publish. Stories add controls for things that are not props at all - text to
drop into a slot, a canned set of options, a toggle that swaps in longer content

- and each one was published as part of the component's API. Fourteen of them
  across `Banner`, `ButtonDropdown`, `ComplexFilter`, `ContentCard`, `Dialog`,
  `DropdownMenu`, `Tabs` and `HeatmapChart`.

The generator now skips an `argType` that matches neither a prop in the source
nor a row in the page's props table, and the audit reports them as
`phantom-arg-type`. Some of the fourteen are real props the parser cannot see
through MUI's generics rather than story inventions; those are handled as each
component is worked through, by documenting the prop, which brings it back.

### Props the page documented never reached the props data

Severity: medium. Status: fixed in the generator.

The generator walked a story's `argTypes` and nothing else, so a prop with no
Storybook control was published nowhere, however well the page documented it.
That is most of what a reader needs for the harder components: `DropdownMenu`
lost `anchorEl`, `onClose`, `onClickAway`, `PopperBaseProps` and nine more,
publishing eleven props where the component has twenty-seven. Controls only
make sense for things worth fiddling with, so element and handler props were
missing across the board.

It now publishes the union of the story's `argTypes` and the page's props
table.

### The parser attributes a prop to any declaration of that name it has seen

Severity: medium, tooling only. Status: worked around in the audit script.

`react-docgen-typescript` parses the whole batch as one program, and a prop's
`declarations` then list every declaration of that name anywhere in the run. In
a batch of twelve components, `title` came back declared in a popper's
`style.ts` for all twelve, which made the audit read it as an SDS prop each
component was failing to document. The audit now counts a declaration only if it
sits in the component's own directory.

The same is worth knowing for the generator, which uses the parser the same way:
a prop's reported origin cannot be trusted at face value.

### What now keeps the two in step

Severity: none. Status: added.

`docs-kit/__tests__/props-tables.test.ts`, run by `yarn test:docs`, asserts that
every prop in `packages/mcp/data/component-props/<Name>.json` has a row in that
component's props table. It needs no parser and takes milliseconds, so it can
run on every change, and it is what stops the thirty-seven gaps this audit
closed from reopening. It cannot see the other direction - a prop the source has
and neither the story nor the table mentions - which is what `yarn docs:audit`
is for, on demand.

## Banner

### `children` was required but undocumented

Severity: low. Status: documented.

`BannerProps` declares `children: React.ReactNode` as required and the props
table had no row for it. The parser cannot see `children` on any component, so
nothing flagged it.

### Passing `dismissed` at all disables the Banner's own dismissal

Severity: low, by design but undocumented. Status: documented, with an example
and tests.

`handleClose` only sets internal state when `dismissed === undefined`, so a
Banner rendered with `dismissed={false}` never closes when its close button is
clicked; the caller has to react to `onClose`. The page described `dismissed`
as optional state without saying that supplying it hands over the whole
behavior. The Storybook `Default` story passes `dismissed: false`, which is why
its close button appears to do nothing.

### Dead `textChild` guards in `style.ts`

Severity: trivial. Status: left alone.

`doNotForwardProps` and `doNotForwardPropsButtonIcon` in
`packages/components/src/core/Banner/style.ts` both filter `textChild`, a name
that only ever came from the story's control. The story now uses `children`, so
the two entries guard against nothing. `index.figma.tsx` still maps a Figma
layer of that name, which is unrelated to the runtime props.

## CellHeader

### `width` was published but undocumented

Severity: low. Status: documented.

The story exposes `width` and the props data published it, while the page said
nothing about it - the same gap as `InputDropdown`. It is the plain HTML
`width` attribute passed through to the rendered cell.

## DropdownMenu

### The page claimed a 225px minimum width; the code says 160px

Severity: low. Status: documented correctly, with tests.

`MINIMUM_DROPDOWN_MENU_POPPER_WIDTH` is 160 and is applied as the popper's
`min-width`. Where 225px came from is anyone's guess. The page also did not
mention that a menu whose options are laid out in columns ignores `width`
entirely and sizes itself to its content.

### Fifteen props were missing from the page and five rows named nothing

Severity: medium. Status: rewritten.

The props table documented twelve props of a component that has around
twenty-seven, missing `anchorEl` - which is required, and without which the
menu renders an empty container - along with every lifecycle handler,
`PaperComponent`, `PopperPlacement`, `title`'s companion `subTitle`, and
`width`. One row, `clickAwayListenerProps`, was simply the wrong case for
`ClickAwayListenerProps`.

### `subTitle` renders only alongside `title`

Severity: low, by design but undocumented. Status: documented, with a test.

`{title && subTitle && ...}` in the header means a subtitle on its own is
silently dropped.

### `StyleProps` puts three props on the public type that the code ignores

Severity: low. Status: not fixed.

`DropdownMenuProps` extends `StyleProps` from
`packages/components/src/core/DropdownMenu/style.ts`, which declares `count`,
`icon` and `isMultiColumn`. None of the three is read by the component or by
any styled component in that file - `isMultiColumn` is computed from `options`
instead - so all three are offered by the types and quietly ignored. They are
listed in `NOT_REALLY_PROPS` in the audit script so it stops asking for them to
be documented. Removing them from `StyleProps` would be the real fix.

## InputDropdown

### The component cannot take a `ref`

Severity: medium. Status: fixed.

`InputDropdown` was a plain function component, so it dropped any `ref` passed
to it. That broke the pattern its own documentation recommends, where the input
is the anchor a `DropdownMenu` is positioned against, and it was why
`design-docs/pages/Overview/examples/DropdownMenuCard.tsx` failed
`npx tsc --noEmit -p tsconfig.docs-check.json` with "Property 'ref' does not
exist".

It is now wrapped in `forwardRef` and hands the ref to the button, with a test
and an "Anchoring a menu" example on the page. Two things came with it: the
`Button as React.ComponentType<InputDropdownProps>` cast in `style.ts` had to
admit `RefAttributes`, or the styled component would still refuse a ref; and
`Dropdown` was spreading its whole rest of props, Autocomplete's loosely typed
`ref` among them, onto the trigger, which now has a ref type of its own. That
`ref` belongs to the menu, so it is held back from the trigger's spread.

## Autocomplete

### `renderInput` works, and the page said it did not

Severity: low. Status: fixed in the page.

`AutocompleteBase` renders `renderInput={defaultRenderInput}` before spreading
the caller's props over it, so a `renderInput` of your own does take effect -
the opposite of what this entry first recorded and of what the page implied by
sending readers to `InputBaseProps` "rather than `renderInput`". A test now
pins it. The advice is still right, since replacing the input takes the search
and clear buttons with it, but the prop is real and now has a row saying so.
The one place it is inert is the multi-column trigger, which is an InputSearch
the component builds directly; `renderInput` reaches the hidden per-column
inputs instead.

### `count` and `icon` are option fields, not props

Severity: low. Status: not fixed.

`ExtraAutocompleteProps extends Omit<StyleProps, "groupBy">`, and that
`StyleProps` carries `count` and `icon` for the styled list. Both names really
belong to an individual option, where the page documents them. On the component
they do nothing.

## ComplexFilter

### `InputDropdownProps` replaces its default rather than merging

Severity: low, by design but easy to trip over. Status: documented.

The default is `{ sdsStyle: "minimal" }`, so a caller who passes
`InputDropdownProps` to set anything at all silently loses the minimal style
unless they pass `sdsStyle` again.

### The page documented six props and the component has fifteen

Severity: medium. Status: documented.

Everything ComplexFilter does not redeclare arrives through `DropdownProps`, and
the parser cannot follow that through the generic, so the gap went unnoticed:
`options` and `value` were both missing, along with `buttons`, `buttonPosition`
and the two props the prose above the table already told readers to use,
`DropdownMenuProps` and `InputDropdownProps`.

## Dropdown

### The page documented a `PopperComponent` prop that does not exist

Severity: low. Status: corrected.

The row described "the component used to render the wrapper of the inner
DropdownMenu", defaulting to `Paper`. `DropdownProps` has no such prop: the
menu's popper is reached through `DropdownMenuProps`, which the page now says.
`isSearchAutoFocus`, `onInputChange` and `title` were missing outright.

## InputSearch

### `customTheme` is declared and never read

Severity: low. Status: not fixed, left undocumented.

`AccessibleInputSearchProps.customTheme` is typed `"light" | "dark" | "auto"`
and appears only in `doNotForwardProps`, which keeps it off the DOM. Nothing
reads it. `ButtonLegacy` and `ButtonIcon` filter the same name without declaring
it, so this looks like the remains of a theming approach that was removed.

### `label` is narrowed to a string by intersection

Severity: trivial. Status: documented as `string`.

`InputSearchProps` intersects MUI's `label?: ReactNode` with its own
`label: string`, so only a string compiles. The parser reports the wider half,
which is why the audit needs `VERIFIED_TABLE_TYPES` to leave the row alone.

## InputToggle

### `onChange` drops MUI's second argument

Severity: low, by design but undocumented. Status: documented in the source.

`InputToggleExtraProps` narrows `onChange` to `(e: React.ChangeEvent) => void`
and the handler calls `onChange?.(e)`, so the `checked` boolean MUI passes never
arrives. Callers have to read it off the event target.

## CellBasic

### `isRowHovered` and `component` are on the type and do nothing

Severity: low. Status: the `component` control is gone; the types are unchanged.

`isRowHovered` is read from `RowHoverContext` and merged in as
`{ ...props, isRowHovered }`, so whatever a caller passes is overwritten before
it reaches the styled component. `component` comes from the same `StyleProps`
but the root is `styled.div`, which takes `as` - the prop the page documents -
and not MUI's `component`. The story offered `component` as a select whose
description promised a default of `td`, so the controls panel invited readers to
use a prop that does nothing; that argType has been removed. Dropping the two
names from `StyleProps` is the real fix.

### `width` was published but undocumented

Severity: low. Status: documented.

The same gap as `CellHeader`, on both `CellBasic` and `CellComponent`: the story
exposes `width`, the props data publishes it, and neither page mentioned it.

## Pagination

### `disabled` and `selected` belong to the page buttons, not the component

Severity: low. Status: not fixed, left undocumented.

`PaginationProps` includes `PaginationExtraProps`, which declares both for the
styled `Page` and chevron buttons the component renders and sets itself. Passed
to `<Pagination>` they reach the wrapper, where nothing reads them.

## PreComposedTable

### The parser reads nothing from it, so the page was checked by hand

Severity: none, tooling. Status: verified.

A generic component wrapped in `forwardRef` defeats
`react-docgen-typescript` completely: it reports no props at all, so the audit
cannot say anything about the page. Checked by hand instead, and the seventeen
props and six `ColumnMeta` entries in the table match
`PreComposedTableProps<TData>` and the `@tanstack/react-table` augmentation
exactly, types and defaults included. The audit now reports this as
`unreadable-source` rather than as twenty-three rows describing props that do
not exist.

## TooltipCondensed

### The parser reads nothing from it, so the page was checked by hand

Severity: none, tooling. Status: verified.

`forwardRef` again, over an intersection of `TooltipProps` and the style props.
Checked by hand: `indicator` and `indicatorColor` match
`TooltipCondensedExtraProps` and the CSS that reads them, `hasInvertedStyle`
defaults to `true` in Tooltip as the row says, and `title` and `componentSlot`
are Tooltip's. The five props the component pins after the spread -
`followCursor`, `placement`, `arrow`, `enterDelay`, `leaveDelay` - are described
in the prose above the table rather than as rows, since a caller cannot set
them.

## ButtonGroup

### The JSDoc for `size` promised a default the component does not use

Severity: low. Status: fixed in the source comment.

`ButtonGroupProps.size` was annotated `@default "medium"` while `index.tsx`
destructures `size = "large"`. The page had the right value. The JSDoc now says
`"large"`, and it also records that the group clones its children to inject
`size` into each one, so a `size` set on an individual Button is overwritten.

### `size` reaches Button children only

Severity: medium. Status: fixed.

`cloneChildrenWithSize` cloned a child only when `element.type === Button`, so a
ButtonToggle in the group - which the page and the prose both invite - kept
whatever `size` it was given and came out a different height from its
neighbours. The check now covers both components the group is made of, and a
ButtonToggle passes `size` on to the Button underneath it, so a mixed group
stays at one height. Anything else in the group is still left alone. Tests
cover all three cases.

## ButtonDropdown

### The parser reads nothing from it, so the page was checked by hand

Severity: none, tooling. Status: verified.

`ButtonDropdownProps extends Omit<ButtonProps, "sdsType">`, and the parser
returns only `ref` and `key` for it, the same silence as `PreComposedTable`.
Checked by hand: every row in the table is a real Button prop, `sdsType` is
narrowed to `"primary" | "secondary"` as the prose says, and the component
returns `null` after a warning if `"destructive"` gets through anyway.

## ButtonToggle

### `children` and `backgroundAppearance` were published but undocumented

Severity: low. Status: documented.

The story exposes both and the props data publishes them, but the page listed
neither. `children` is worth a row of its own: a toggle is normally icon-only,
and leaving it out is what makes the button square.

## SegmentedControl

### The `SingleButtonDefinition` table is not a props table

Severity: none, tooling. Status: fixed in the audit.

The page documents the shape of the entries in `buttonDefinition` under its own
heading. The audit read those five rows as claims about props of the component
and reported all five as describing nothing. It now skips tables headed by a
type the component declares.

## Callout

### `extraContent` is declared and never read

Severity: medium. Status: fixed.

`CalloutProps.extraContent?: React.ReactNode` was not destructured, so it fell
into the rest spread and reached MUI's Alert while the expandable area rendered
`children` instead. Anything passed to it disappeared. It now renders in that
area after `children`, which is the slot its name and the `CalloutExtraContent`
subcomponent both point at, so either prop on its own is enough and neither is
lost when both are given. Three tests cover it, and the page has a row.

## Notification

### `extraContent` exists for the stories only

Severity: low. Status: not fixed, left undocumented.

`NotificationProps.extraContent?: boolean` is a switch the story uses to render
more content of its own. The component deletes it from the props it forwards
(`delete passedProps.extraContent`), which is the giveaway: it belongs in the
story's args, not in the component's public type. Its control has been removed
from the story so the props data no longer publishes it; the screenshot story
still drives its own extra paragraph from an arg of the same name. Removing the
field from `NotificationProps` is the remaining half.

## Callout and Notification

### The tables kept a PropTypes-era `bool`

Severity: low. Status: fixed.

Both `autoDismiss` rows said `bool | number`. The audit now also collapses the
`false | true` the parser prints back to `boolean`, so a table that spells the
type correctly is no longer reported as disagreeing with the source. The
`true` means 8000ms rule both pages state now has a test on Notification.

## Tabs

### The parser reads nothing from `Tabs`, only from `Tab`

Severity: none, tooling. Status: verified.

`forwardRef(function Tabs(...))` defeats the parser the same way
`PreComposedTable` does, but the entry file also exports `Tab`, which it reads
in full, so the component did not look silent and its three own rows -
`sdsSize`, `underlined`, `selectionFollowsFocus` - looked like rows about
nothing. Checked by hand against `TabsProps` in `style.tsx` and MUI's Tabs.

### `items` is a control the story invented

Severity: low. Status: no action.

The argType exists so the story can build tabs from an array; its own
description says so. The generator already drops controls that are neither in
the source nor in the table, so the props data is clean, but the Storybook
controls panel still offers `items` beside the real props.

## NavigationJumpTo

### `isSubItem` is internal padding, not a prop

Severity: low. Status: not fixed, left undocumented.

`NavigationJumpToProps` extends the style props, which carry `isSubItem` so the
component can indent the sub-item tabs it renders itself. It is public by
accident, the same way `CellBasic.isRowHovered` is.

## NavigationHeader

### The table named a type that does not exist

Severity: low. Status: fixed.

`onDrawerStyleNavItemHover` was typed `(item: NavItem) => void`, and there is no
`NavItem`. It now follows the convention the other handler rows use: `function`
in the cell, the real signature at the head of the description.

## Audit tooling, from this batch

Severity: none, tooling. Status: fixed.

Three fixes worth noting because they were hiding real work. A table headed
`<Name> Props` matched the declared `<Name>Props` interface and the whole table
was being skipped as though it described a data shape, which silently excused
every row on those pages; heading matching is now per word. The parser prints
`boolean` as `false | true`, and indexed accesses such as
`CSSProperties["width"]` not at all, so both are now reconciled rather than
reported.

## Accordion

### `chevronSize` offers four sizes where two are read

Severity: low. Status: not fixed, page documents the two that work.

`AccordionExtraProps.chevronSize` is `"xs" | "s" | "l" | "xl"`, but the prop is
only ever read by `AccordionHeader`, whose own declaration is `"xs" | "s"`, and
its styles branch on those two. `"l"` and `"xl"` type-check on the Accordion and
do nothing.

## Tag

### `tagColor` is the styled prop behind `color`

Severity: low. Status: not fixed, left undocumented.

`TagProps` includes `ExtraTagProps`, so `tagColor` is public, and because the
component spreads `{...props}` after setting `tagColor={color}`, passing it
directly wins over `color`. Two names for one thing, one of them undocumented.
The custom-color mapping the page describes - `[label, background, icon]` -
now has a test.

## ContentCard

### `buttons` is a control the story invented

Severity: low. Status: no action, same as `Tabs.items`.

## Dialog and HeatmapChart

### Three more controls the stories invented

Severity: low. Status: no action.

`Dialog.longContent` and `Dialog.titleOnClose` switch the story between two
bodies and two title variants, and `HeatmapChart.tooltip` swaps in the story's
own formatter. None is a prop. Like `Tabs.items` and `ContentCard.buttons` they
no longer reach the props data, but they still sit in the controls panel beside
the real props, which is the part worth cleaning up in the stories themselves.

## Legend

### The JSDoc was a summary of the prop names

Severity: low. Status: fixed.

Seven of the nine props carried a JSDoc that restated the prop's name
("Callback when a legend item is clicked"), while the page explained what
actually happens: that the component is controlled and never changes
`selectedIndices` itself, that `colors` wins over an item's own color, that
`hoveredIndex` adds to the legend's hover rather than replacing it. The MCP
data publishes the JSDoc, so readers there got the summary. The JSDoc now
carries the page's wording.

### One row documented two props

Severity: low. Status: fixed.

`onItemMouseEnter` and `onItemMouseLeave` shared a row, which is readable on the
page but leaves both invisible to anything that reads the table by prop name.
They are now a row each.

## Hero

### `className` is declared and unread

Severity: low. Status: documented.

`HeroProps.className` is not destructured; it travels in the rest spread onto
the section element like any other DOM attribute. The prose said as much, but
the props table did not list it, so the props data published a prop the page
never mentioned.

## HeatmapChart

### `dataZoom` never reaches the chart

Severity: medium. Status: fixed.

`CreateChartOptionsProps` declared `dataZoom` and `createChartOptions` read it,
but `index.tsx` neither destructured it nor passed it to `useUpdateChart`, so
whatever a caller passed landed in the rest spread on the container div. It is
now threaded through, which is a three-line change and needed no new merging:
`mergeDataZoom` was already written to take it, under the camera's defaults and
beneath anything in `options.dataZoom`. It still only applies while
`camera.active` is true, since the camera window is what it configures - the
page's warning to avoid the prop is now a note saying which of the two wins.
Tests cover both the merge and the inactive camera.

### The JSDoc was ECharts links, not descriptions

Severity: low. Status: fixed.

Several props documented themselves with a bare
`https://echarts.apache.org/...` link, and the MCP data publishes the JSDoc, so
`grid` reached readers there as a URL and nothing else. Each now opens with the
sentence the page uses and keeps the link and the ECharts examples underneath.

## StackedBarChart

### Twenty JSDoc summaries against a page that explained the behavior

Severity: low. Status: fixed.

The same shape as `Legend`, at four times the size: "Callback when legend
selection changes" against a page that says the chart is controlled and does
nothing without that callback. The JSDoc now carries the page's wording, and
the four hover callbacks, which shared two rows, have a row each.

## Link

### The parser reads nothing from it, so the page was checked by hand

Severity: none, tooling. Status: verified.

A generic wrapped in `forwardRef`, like `PreComposedTable` and `Tabs`. Its three
rows - `sdsStyle`, `sdsSize`, `fontWeight` - match `LinkProps` and the defaults
in `style.ts`, including that `sdsStyle` also decides MUI's `underline`.

## Deprecated components and the data-viz Overview

Severity: none. Status: nothing to audit.

The deprecated components (`ButtonLegacy`, `ButtonDropdownLegacy`,
`ButtonToggleLegacy`, `Chip`, `Alert`, `MenuSelect`, `ButtonIcon`) have stories
but no documentation page, and the data-viz Overview page is an installation
guide with no props table.

## Pre-existing type errors in the docs toolkit

Severity: low. Status: not fixed.

`npx tsc --noEmit -p tsconfig.docs-check.json` reports errors in
`docs-kit/cardPopper.ts` that predate this work: `@mui/material` no longer
exports `Modifier`, and two destructured parameters are implicitly `any`.
