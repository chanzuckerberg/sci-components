# Building with the Science Design System (SDS)

SDS is a **Material UI v5 + Emotion** component library. It has **no utility-class system** — you
do not style with `className="bg-… p-…"`. You style three ways, in this order of preference:

## 1. Wrap once, at the root

Every component reads its colors, spacing, and typography from React context. Wrap your whole tree
in the SDS provider or components render unthemed (and a few throw):

```jsx
const { SDSPreviewProvider, Button } = window.SDS;
<SDSPreviewProvider>
  {/* your app */}
</SDSPreviewProvider>
```

`SDSPreviewProvider` supplies the light SDS theme. (In shipped app code the equivalent is MUI's
`<ThemeProvider theme={Theme("light")}>` — `Theme` is exported; `SDSPreviewProvider` is the
ready-made wrapper for this environment.)

## 2. Style with `sds*` props — the design language

SDS components take **`sds`-prefixed props** that select on-brand variants. Never re-skin a component
with ad-hoc CSS; pick the variant prop. The vocabulary is per-component (read each
`components/<group>/<Name>/<Name>.prompt.md` for exact unions), but the shape is consistent:

- `sdsStyle` — the visual treatment. Button: `"outline" | "solid" | "minimal"`. Tag: `"rounded" | "square"`. Callout: `"persistent" | "expandable" | "dismissible"`.
- `sdsType` — the visual role, usually `"primary" | "secondary"` (Button adds `"destructive"`).
- `sdsSize` — scale where offered, e.g. Icon `"xxs" | "xs" | "s" | "l" | "xl"`; MUI-derived controls use `size="small" | "medium" | "large"`.
- **intent / semantic color is a separate prop**, not `sdsType`: Callout takes `intent="negative"|"notice"|"positive"|"accent"|"info"`; Tag takes `color="negative"|"notice"|"positive"|"info"|"neutral"|"beta"`; Icon takes `color="blue"|"gray"|"green"|"purple"|"red"|"yellow"|"indigo"`.

Composition props: `startIcon`/`endIcon` take `<Icon sdsIcon="…" />`; `<Icon>` renders by name
(`sdsIcon="CheckCircle" | "Copy" | "Download" | …`, 130+ names — see `Icon.prompt.md`), not by
importing SVGs.

## 3. Custom pieces: theme selectors + font mixins (never hard-coded values)

For your own layout wrappers, read tokens through the exported selectors inside an Emotion
`styled()` — do **not** hardcode hex/px, and there are **no `var(--*)` tokens** (styles are
CSS-in-JS, computed at runtime):

```jsx
const { getColors, getSpaces, getSemanticColors, getCorners, fontHeaderXl, fontBodyM } = window.SDS;
// styled('div')` ${(props) => `color:${getSemanticColors(props)?.base?.textPrimary};
//   padding:${getSpaces(props)?.l}px; ${fontBodyM(props)}` ` — spacing xxxs..xxl, corners none/s/m/l.
```

Selectors: `getColors`, `getSpaces`, `getCorners`, `getSemanticColors`, `getTypography`. Font
mixins: `fontHeaderXxl…fontHeaderXxxs`, `fontBodyL…fontBodyXxxs`, `fontBodySemibold*`, `fontCaps*`,
`fontCode*`, `fontTabular*`. Fonts are **Inter** (body/headers) and **IBM Plex Mono** (code), loaded
by `styles.css`.

## Where the truth lives

Read before composing: `components/<group>/<Name>/<Name>.prompt.md` (usage + real prop types),
`<Name>.d.ts` (full types), `<Name>.html` (rendered variants), and `guidelines/` (the DS's own
usage docs). The component list spans buttons, inputs, dropdowns, table (data tables), and
composite components (Dialog, Panel, Tabs, Tooltip, Callout, Banner, Notification, Hero,
ContentCard, …).

## Idiomatic example

```jsx
const { SDSPreviewProvider, Button, Callout, Tag, Icon } = window.SDS;

function StatusPanel() {
  return (
    <SDSPreviewProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
        <Callout intent="info" title="Analysis complete" body="Your sequence run finished." />
        <Tag label="confirmed" sdsStyle="rounded" sdsType="primary" color="positive" />
        <Button sdsStyle="solid" sdsType="primary" startIcon={<Icon sdsIcon="Download" sdsSize="s" />}>
          Export results
        </Button>
      </div>
    </SDSPreviewProvider>
  );
}
```
