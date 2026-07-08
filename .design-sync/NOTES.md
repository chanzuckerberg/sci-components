# design-sync notes — @czi-sds/components

Repo: CZI Science Design System (SDS). Material UI v5 + Emotion (CSS-in-JS).
Synced package: `@czi-sds/components` (window.SDS). Storybook shape.
Node 24 (repo pins Node 22 via `.nvmrc`); yarn 4.1.0 via `node .yarn/releases/yarn-4.1.0.cjs`.
Build: `node .yarn/releases/yarn-4.1.0.cjs build` (lerna: components then data-viz).
Converter: `--node-modules node_modules` (repo root — react is hoisted there, not in the package), `--entry packages/components/dist/index.esm.js` (source repo has no `node_modules/@czi-sds/components`).

## Global fixes ([GENERAL])

- **[GENERAL] Previews rendered "root empty" everywhere (Element type invalid in CssBaseline).**
  Root cause: SDS components read design tokens from MUI's ThemeContext; the storybook
  decorator (`.storybook/preview.jsx` → ThemeProvider + CssBaseline) is bundled as a SEPARATE
  esbuild pass whose MUI ThemeContext instance doesn't match the components in _ds_bundle.js,
  and its CssBaseline resolves `undefined` under esbuild's MUI ESM interop.
  Fix: `.design-sync/preview-provider.jsx` exports `SDSPreviewProvider` (ThemeProvider with
  `Theme("light")`), added via `cfg.extraEntries` so it's bundled INTO _ds_bundle.js (shared
  MUI identity → context reaches components). `cfg.provider` wraps every preview in it.
  NOTE: extraEntries paths resolve relative to the PACKAGE dir (packages/components), hence
  `../../.design-sync/preview-provider.jsx`. CssBaseline intentionally omitted (light bg is fine;
  it's the piece that breaks under esbuild). If dark-mode or background fidelity is ever needed,
  revisit adding CssBaseline or a background wrapper.

- **[GENERAL] Fonts:** styles.css @imports Inter + IBM Plex Mono from Google Fonts (same as the
  repo's storybook). No local font files. Compare captures need network egress to
  fonts.googleapis.com/fonts.gstatic.com — if `[ASSETS_BLOCKED]` fires, re-run compare from a
  shell with egress. Designs will also fetch these fonts at runtime (matches the repo).

- **[GENERAL] Grid overflow → cardMode overrides.** Many components render wider than a grid cell
  or use portals/fixed positioning. Applied in cfg.overrides: `cardMode:"column"` for wide
  (Button, ButtonDropdown, ButtonGroup, ButtonToggle, ContentCard, Hero, IntentMessage, Legend,
  Notification, Tabs, Tag, Autocomplete, MenuItem, CellBasic, CellComponent, PreComposedTable,
  Table); `cardMode:"single", primaryStory:"Default"` for portal/overlay (Dialog, Panel, Tooltip,
  Dropdown, DropdownMenu). Presentation-only — grades carry, targeted rebuild only.

## Fan-out findings ([GENERAL])

- **[GENERAL] Capture-viewport clip on tall "Screenshot Test" matrices.** Preview captures use a
  fixed ~900x700 viewport; the storybook reference captures full element content-height (often
  2000–6400px). Internal "Screenshot Test"/QA-matrix stories (MenuItem, DropdownMenu, Notification,
  Tooltip) render correctly and their visible top slice matches storybook exactly, but 85–90% is
  below the fold in the preview shot → cannot reach a full-frame match. These are internal
  visual-regression fixtures, not design-usage demos. Accepted `close` with rationale (the
  component renders correctly; only the grading screenshot is clipped). Not a component or sync
  defect. Alternative if ever needed: cfg.overrides.<Name>.viewport taller, or skip these stories.

- **[GENERAL] Button-less portal/popper stories → sb-error on the REFERENCE side.** Some stories
  deliberately remove their trigger and render only a Popper into document.body, so storybook's
  #storybook-root is empty and the reference screenshot is blank (sb-error). Affected: DropdownMenu
  (Default, Multi Column, Test, With Header Component) and Dropdown ("Inside Modal"). Failure is on
  the storybook side, not the preview. Fix: cfg.overrides.<Name>.skip those story ids.
  DropdownMenu: since its only inline-rendering story is the (clipped) Screenshot Test, it gets an
  owned preview rendering an open menu — see per-component fixes.

- **[GENERAL] MUI-system theme + MUI group-context don't cross the preview module boundary.**
  SDSPreviewProvider populates emotion's ThemeContext (so `@emotion/styled` SDS components + their
  `getTypography`/`getSemanticColors` selectors work), but a story's story-local `styled()` from
  `@mui/material` reads MUI's *system* ThemeContext, which resolves to a bare default MUI theme in
  the compiled preview (a second MUI instance from source resolution), and MUI group providers
  (RadioGroup / ToggleButtonGroup) don't propagate value/context to SDS components across the
  source-pass module boundary. Symptom: story-local MUI `styled()` renders unthemed; group
  `defaultValue`/`value` selection doesn't apply. Seen once so far — InputRadio (Test) — fixed with
  an owned `.design-sync/previews/InputRadio.tsx` that inlines the SDS font token on the label and
  sets `checked` directly (faithful mirror of the story's rendered state). Only affects stories
  using MUI primitives directly in story code (most stories import the SDS component, which is in
  the bundle and correctly themed). RISK: if a global MUI-dedup fix lands later, delete the owned
  InputRadio preview so it doesn't shadow the regenerated one.

- **[GENERAL] Plain non-SDS HTML scaffolding text renders serif in previews.** Story demo
  scaffolding using raw `<h4>`/`<h2>`/`<p>` (not SDS components) falls back to the browser default
  serif font in the preview, because the preview document has no global `font-family: Inter`
  default (storybook sets one globally). SDS components render Inter correctly. Seen on Tabs "Test"
  and NavigationHeader "Drawer"/"Dropdown". DECISION: accepted `close` for those stories (component
  is correct; only demo scaffolding text differs). NOT fixed globally because the only levers are
  (a) a `cfg.provider` wrapper change → clears ALL grades (re-verify 49), or (b) `cfg.cssEntry` →
  bounded to the package dir (would pollute packages/components/). Neither is worth it for cosmetic
  demo-scaffolding text. If ever fixed, a global Inter body default in the preview env is the fix.

## Config decisions from fan-out (applied)

- **Panel:** `skip` Default + Test (portal sb-error — closed panel renders nothing at storybook
  root), `primaryStory: ScrollBehavior`. Owned preview (`.design-sync/previews/Panel.tsx`) handles
  the MUI-Typography theming; ScrollBehavior matches, CustomHeaderAndCloseButton close (portal
  capture).
- **Dropdown:** `skip` "Inside Modal" (portal sb-error). Other stories match.
- **DropdownMenu:** all four normal stories (Default, Multi Column, Test, With Header Component)
  portal to `document.body` with no trigger, so the storybook REFERENCE renders an empty root
  (sb-error) — there is nothing to grade a preview against, even an owned inline one (tried
  `disablePortal:true`; the reference is still empty, so compare still reports sb-error and can't
  verify it). So all four are `skip`ped. The card is the `ScreenshotTest` story (a menu-states
  matrix that DOES render inline on both sides), set as `primaryStory` — graded `close` (tall
  matrix clipped by the capture viewport). DropdownMenu also ships full `.d.ts` + `.prompt.md`.
  A future improvement would be an owned preview whose reference isn't portal-based, but that needs
  a storybook story change upstream.

## Accepted warnings (triaged — do not chase on re-sync)

- **[RENDER_THIN]** TooltipCondensed, Menu, InputDropdown: their variants render identically
  because these are closed-trigger components (the card shows the trigger; the menu/tooltip opens
  on interaction). Storybook renders the same identical trigger, so this is correct, not thin
  content. Verified match. Legitimately reads as "thin" forever.

## Accepted `close` grades (not blockers)

- ScreenshotTest/QA-matrix stories clipped by capture viewport: MenuItem "Screenshot Test",
  DropdownMenu "Screenshot Test", Notification "Screenshot Test", Tooltip "Screenshot Test".
- InputSlider value-label bubble shows in preview but is cropped by storybook's tight bounds
  (preview renders the correct intended state) — graded match per the "renders more than reference"
  rule.

## Per-component fixes

- **Icon:** owned preview at `.design-sync/previews/Icon.tsx`. The IconBank story imports the raw
  SVG map (`@components/src/core/Icon/map` — svgr `ReactComponent`), which esbuild's dataurl
  loader can't provide, so the whole story module failed to compile (floor card). The owned
  preview renders icons via the public API only (`<Icon sdsIcon="Name" />` against the full map
  compiled into window.SDS). Name→size map mirrored from map.ts's `IconNameToSizes` interface
  (each icon supports only a subset of sizes; rendering an unsupported size throws). Regenerate
  the size map with `.design-sync/.cache/mk-icon-sizes.mjs` if icons change.

- **InputRadio:** owned preview at `.design-sync/previews/InputRadio.tsx` — see the MUI-context
  [GENERAL] above. Mirrors the Test story: SDS font token inlined on the "Ticket Status" label,
  `checked` set directly on the Blocked radio.

- **DropdownMenu:** owned preview (planned in the batched config pass) rendering an open menu; its
  storybook stories are all portal sb-errors except the clipped Screenshot Test.

## Dropped from this sync (not @czi-sds/components components)

- Token/foundation showcase stories: Borders, Breakpoints, Colors, Corners, DropShadows, Spaces,
  Typography (design-token docs, not components — [TITLE_UNMAPPED], correctly dropped).
- **HeatmapChart, StackedBarChart** belong to `@czi-sds/data-viz` — handled in a separate pass
  into the same project (data-viz depends on components; single-package converter runs them
  separately).

## Re-sync risks

- Provider is a hand-authored owned file (`.design-sync/preview-provider.jsx`) importing the built
  dist directly. If the SDS build layout or `Theme()` signature changes, re-verify it still
  bundles and themes previews.
- Icon owned preview's name→size list is a point-in-time mirror of map.ts. New icons won't appear
  in the IconBank preview until regenerated; a renamed/removed icon would throw — re-run
  mk-icon-sizes.mjs after Icon changes.
- Fonts are CDN-fetched (Google Fonts). Offline/sandboxed captures fall back and mislead grading.
