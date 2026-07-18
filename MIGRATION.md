# Migration Guide: SDS 24.0.0 (Material UI v9)

This guide is for upgrading **older versions of SDS** to **`@czi-sds/components@24.0.0`** (and the matching `@czi-sds/data-viz` release). That major moves the MUI peer dependency from **Material UI v5** to **Material UI v9**. This is a **breaking release**.

> The SDS components themselves have been fully migrated internally. Most of the work in this guide is about (1) your project's dependencies and (2) any MUI props or types you pass _through_ SDS components or import directly from MUI.

---

## Table of contents

1. [For AI coding agents — read first](#for-ai-coding-agents--read-first)
2. [At a glance](#at-a-glance)
3. [Step 0 — Detect the project setup](#step-0--detect-the-project-setup)
4. [Step 1 — Update dependencies](#step-1--update-dependencies)
5. [Step 2 — React 18+ and the `react-is` pin](#step-2--react-18-and-the-react-is-pin)
6. [Step 3 — Update MUI imports (`@mui/base` removed; `Alert` left `@mui/lab`)](#step-3--update-mui-imports-muibase-removed-alert-left-muilab)
7. [Step 4 — Update MUI prop APIs (the `slots` / `slotProps` consolidation)](#step-4--update-mui-prop-apis-the-slots--slotprops-consolidation)
8. [Step 5 — SDS component-specific changes](#step-5--sds-component-specific-changes)
9. [Step 6 — `@mui/icons-material` icon renames](#step-6--muiicons-material-icon-renames)
10. [Step 7 — `MenuItem` now requires a `Menu`/`MenuList` context](#step-7--menuitem-now-requires-a-menumenulist-context)
11. [Step 8 — `ButtonGroup` class-name changes](#step-8--buttongroup-class-name-changes)
12. [Step 9 — Build & test tooling (Vite / Vitest / bundlers)](#step-9--build--test-tooling-vite--vitest--bundlers)
13. [Search patterns to locate every affected call site](#search-patterns-to-locate-every-affected-call-site)
14. [Verification checklist / definition of done](#verification-checklist--definition-of-done)
15. [Reference: full prop-rename table](#reference-full-prop-rename-table)

---

## For AI coding agents — read first

You are upgrading a **consumer project** that depends on `@czi-sds/components` (and possibly `@czi-sds/data-viz`) from an older SDS version to **`@czi-sds/components@24.0.0`**, which moves the MUI peer dependency from **v5 to v9**. Follow this playbook top to bottom. Do not stop at the first error — collect and fix all categories below, then verify.

### Objective

Make the consumer project install **SDS 24.0.0** + MUI v9 peer deps and compile, build, and test cleanly, by updating **only the consumer's own code and config** to the new APIs described in this guide.

### Operating rules (guardrails)

1. **Scope:** only edit files in the consumer project. Never edit files inside `node_modules`, and never edit SDS internals. The SDS components are already migrated.
2. **Let the type-checker drive the work.** After updating deps, run the project's type-check; it pinpoints the exact call sites that still need changes. This is the primary and most reliable path. (MUI's codemods handle your _direct_ `@mui/material` usage, but **not** props passed through SDS components — see [Step 4](#step-4--update-mui-prop-apis-the-slots--slotprops-consolidation) for why and when they're relevant.)
3. **Do not blindly regex-replace.** Each rename below is context-specific (e.g. MUI's `input` slot vs `htmlInput` slot map to different old props). Read the surrounding code and apply the correct target. Verify with the type-checker rather than assuming.
4. **Idempotency:** skip call sites that already use `slots`/`slotProps`. Do not double-migrate.
5. **Preserve behavior.** These are mechanical API renames; do not change component logic, styling intent, or business logic.
6. **Ask before scope changes.** If a fix would require a large refactor, a dependency you can't resolve, or touching unrelated code, stop and report instead of guessing.

### Do NOT change (avoid over-migrating)

These are already correct or intentional. Touching them **introduces** bugs — leave them alone:

- ❌ **Don't rename `PopperComponent` on the SDS `Tooltip`.** SDS keeps it on purpose as a back-compat alias and maps it to `slots.popper` internally. Prefer `PopperComponent` over passing `slots` — SDS overwrites consumer `slots` ([Step 5](#step-5--sds-component-specific-changes)). (Raw `@mui/material` `Tooltip` still needs `PopperComponent` → `slots.popper` and `PopperProps` → `slotProps.popper`.)
- ❌ **Don't rename `PopperComponent` / `PaperComponent` on SDS `Dropdown` / `DropdownMenu`.** Those are SDS outer-shell props (the menu popper/paper), not MUI Autocomplete slots. Rewriting them to `slots.popper` / `slots.paper` targets the _inner_ Autocomplete popper and leaves the menu shell unchanged — or breaks it ([Step 5](#step-5--sds-component-specific-changes)).
- ❌ **Don't rename `PaperComponent` on the SDS `Dialog`.** SDS still exposes `PaperComponent` as a first-class prop (and MUI Dialog still types it in v9). Migrate `PaperProps` → `slotProps.paper` and `TransitionComponent` → `slots.transition` when needed, but leave `PaperComponent` alone ([Step 5](#step-5--sds-component-specific-changes)).
- ❌ **Don't touch SDS `Icon` / `sdsIcon` usage.** The v9 `@mui/icons-material` renames ([Step 6](#step-6--muiicons-material-icon-renames)) apply only to your **direct** `@mui/icons-material` imports; SDS's own iconography is unaffected.
- ❌ **Don't run codemods with `--packageName=@czi-sds/components`.** SDS props don't map 1:1 to MUI props, so this produces incorrect transforms ([Step 4](#step-4--update-mui-prop-apis-the-slots--slotprops-consolidation)).
- ❌ **Don't remove `@mui/lab` unless nothing imports from it** after moving `Alert` / `AlertProps` to `@mui/material` ([Step 1](#step-1--update-dependencies)). It still ships in MUI v9 for `Timeline`, `LoadingButton`, etc.
- ❌ **Don't "upgrade" call sites that already use `slots` / `slotProps`.** They're done — re-migrating them double-applies and breaks them.
- ❌ **Don't edit SDS internals or anything in `node_modules`.** The SDS components are already migrated; fix only the consumer's own code and config.

### The workflow (follow in this order)

Work through these once, top to bottom. The order matters: deps must change **before** the type-checker can flag the right call sites, and inventory gives you the full worklist before you start editing.

1. **Detect the setup — [Step 0](#step-0--detect-the-project-setup).** Determine package manager, framework (Next.js?), React version, current SDS/MUI versions, and whether `@mui/base` / `@mui/lab` are used.
2. **Update deps + install — [Step 1](#step-1--update-dependencies) + [Step 2](#step-2--react-18-and-the-react-is-pin).** Bump `package.json`, handle the `@mui/lab` decision and `react-is` pin, then install. (Do this first — the type-check in step 4 is only meaningful against the new deps.)
3. **Inventory — [search patterns](#search-patterns-to-locate-every-affected-call-site).** Run the `rg` patterns to build the full list of affected files up front, so you know the scope before editing.
4. **Fix until the type-checker is clean — [Steps 3](#step-3--update-mui-imports-muibase-removed-alert-left-muilab)–[8](#step-8--buttongroup-class-name-changes).** Run `tsc --noEmit` (or the project's type-check script); it pinpoints the exact call sites. Apply the transforms from those steps (each is shown as a `diff`: match the `-` line, apply the `+` line), re-run, and repeat until it reports no errors. The type-checker — not a blind regex pass — is the source of truth.
5. **Build & test — [Verification](#verification-checklist--definition-of-done).** Run the build and tests. **Only if** they surface the specific ESM errors described in [Step 9](#step-9--build--test-tooling-vite--vitest--bundlers) should you apply those tooling fixes. Iterate until the type-check, build, and tests all pass; treat the [checklist](#verification-checklist--definition-of-done) as the definition of done.

---

## At a glance

| Area                  | Before                        | After (SDS 24.0.0)                                                                                                                                        |
| --------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@czi-sds/components` | `< 24` (MUI v5 peers)         | `24.0.0` (MUI v9 peers)                                                                                                                                   |
| `@mui/material`       | `^5.16.8`                     | `^9.0.0`                                                                                                                                                  |
| `@mui/icons-material` | `^5.16.8`                     | `^9.0.0`                                                                                                                                                  |
| `@mui/base`           | `5.0.0-beta.70`               | **removed** (merged into `@mui/material`)                                                                                                                 |
| `@mui/lab`            | `^5.0.0-alpha.174`            | **keep if still used** — move `Alert` / `AlertProps` to `@mui/material`; other lab APIs (e.g. `Timeline`, `LoadingButton`) remain in `@mui/lab` on MUI v9 |
| `react` / `react-dom` | `>=17.0.1`                    | `>=18.0.0`                                                                                                                                                |
| Component slots       | `*Props` / `*Component` props | `slots` / `slotProps`                                                                                                                                     |

---

## Step 0 — Detect the project setup

Before editing anything, gather these facts about the consumer project; later steps branch on them.

```bash
# Package manager: check which lockfile exists
ls package-lock.json yarn.lock pnpm-lock.yaml 2>/dev/null
# → package-lock.json = npm | yarn.lock = yarn | pnpm-lock.yaml = pnpm

# Current versions of the relevant deps
cat package.json | grep -E '"(@czi-sds/|@mui/|react|react-dom|react-is|next)"'

# Is this a Next.js app? (affects react-is pin, SSR notes, material-nextjs)
cat package.json | grep -E '"next"'

# Does it use @mui/base or @mui/lab anywhere?
rg -n "@mui/(base|lab)" --glob '!**/node_modules/**'
```

Decision rules derived from the above:

- **Package manager** determines install/uninstall commands and the field used to pin `react-is` (`resolutions` for Yarn, `overrides` for npm/pnpm).
- **React major** determines whether the `react-is` pin in [Step 2](#step-2--react-18-and-the-react-is-pin) is needed (only for React ≤ 18).
- **Next.js present** ⇒ also bump `@mui/material-nextjs` ([Step 1](#step-1--update-dependencies)).
- **`@mui/base` imports** ⇒ always migrate off `@mui/base` and uninstall it ([Step 3](#step-3--update-mui-imports-muibase-removed-alert-left-muilab)).
- **`@mui/lab` imports** ⇒ do **not** uninstall yet. After moving `Alert` / `AlertProps` to `@mui/material` ([Step 3](#step-3--update-mui-imports-muibase-removed-alert-left-muilab)), re-check: remove `@mui/lab` only if nothing still imports from it. Keep (and bump to a v9-compatible version) if the app still uses other lab exports (e.g. `Timeline`, `LoadingButton`).
- Record the current SDS version so you can confirm it moved to **`@czi-sds/components@24.0.0`** after install.

---

## Step 1 — Update dependencies

SDS peer dependencies changed. Update your `package.json` to install MUI v9 and **remove `@mui/base`** (its APIs were folded into `@mui/material`). SDS no longer peers on `@mui/lab` either (`Alert` moved to `@mui/material`), but **`@mui/lab` still ships in MUI v9** for other components — do not uninstall it unconditionally.

```bash
# with npm
npm i @czi-sds/components@24.0.0 @emotion/css @emotion/react @emotion/styled @mui/material@^9 @mui/icons-material@^9 react react-dom

# with yarn
yarn add @czi-sds/components@24.0.0 @emotion/css @emotion/react @emotion/styled @mui/material@^9 @mui/icons-material@^9 react react-dom
```

Always remove `@mui/base`:

```bash
# npm
npm uninstall @mui/base
# yarn
yarn remove @mui/base
```

**Decision rule for `@mui/lab`** (same detection spirit as [Step 0](#step-0--detect-the-project-setup)):

1. First migrate `Alert` / `AlertProps` imports from `@mui/lab` → `@mui/material` ([Step 3](#step-3--update-mui-imports-muibase-removed-alert-left-muilab)).
2. Re-scan the consumer codebase:

   ```bash
   rg -n "@mui/lab" --glob '!**/node_modules/**'
   ```

3. **If that search returns no matches** ⇒ uninstall `@mui/lab` (`npm uninstall @mui/lab` / `yarn remove @mui/lab`).
4. **If anything still imports from `@mui/lab`** (e.g. `Timeline`, `LoadingButton`, `Masonry`) ⇒ **keep** `@mui/lab` and bump it to a MUI-v9-compatible version alongside the other `@mui/*` packages. Do not remove it just because SDS no longer lists it as a peer.

> **Next.js apps:** if you use `@mui/material-nextjs` for the App Router / Pages Router integration, bump it to `^9` as well so it stays in lockstep with `@mui/material`:
>
> ```bash
> npm i @mui/material-nextjs@^9   # or: yarn add @mui/material-nextjs@^9
> ```

> **Bump any other `@mui/*` packages you depend on directly** (e.g. `@mui/x-data-grid`, `@mui/system`, and `@mui/lab` when kept) to their MUI-v9-compatible major so the whole `@mui/*` scope resolves to a single, consistent version.

The full set of SDS peer dependencies is now:

```
@emotion/css
@emotion/react
@emotion/styled
@mui/icons-material   (^9)
@mui/material         (^9)
react                 (>=18)
react-dom             (>=18)
```

> If you use `@czi-sds/data-viz`, bump it to the release published with SDS 24.0.0 — it has the same MUI v9 peer-dependency requirements.

---

## Step 2 — React 18+ and the `react-is` pin

SDS now requires **React 18 or newer** (`react` / `react-dom` `>=18.0.0`).

Material UI v9 ships `react-is@19`. If your app is on **React 18 or below**, pin `react-is` to match your React version to avoid runtime errors in prop-type checks. For React 18, add the following to your `package.json` (use `resolutions` for Yarn, `overrides` for npm/pnpm):

```json
{
  "resolutions": {
    "react-is": "^18.3.1"
  }
}
```

```json
{
  "overrides": {
    "react-is": "^18.3.1"
  }
}
```

---

## Step 3 — Update MUI imports (`@mui/base` removed; `Alert` left `@mui/lab`)

Migrate off `@mui/base` entirely. For `@mui/lab`, only move the APIs that left lab for `@mui/material` (notably `Alert` / `AlertProps`); leave other `@mui/lab` imports in place.

**`Alert` / `AlertProps`: `@mui/lab` → `@mui/material`:**

```diff
- import { AlertProps } from "@mui/lab";
+ import { AlertProps } from "@mui/material";
```

After that move, re-run the Step 1 decision rule: uninstall `@mui/lab` only if nothing still imports from it. Keep lab (and bump it for MUI v9) if the app still uses other lab exports.

**`@mui/base` → `@mui/material`.** The Autocomplete-related types now live in `@mui/material/useAutocomplete`:

```diff
- import { AutocompleteValue } from "@mui/base";
+ import { AutocompleteValue } from "@mui/material/useAutocomplete";
```

```diff
- import {
-   AutocompleteChangeDetails,
-   AutocompleteChangeReason,
-   AutocompleteValue,
- } from "@mui/base";
+ import {
+   AutocompleteChangeDetails,
+   AutocompleteChangeReason,
+   AutocompleteValue,
+ } from "@mui/material/useAutocomplete";
```

`TabPanelProps` (formerly from `@mui/base`) no longer exists; use standard DOM attribute types instead:

```diff
- import { TabPanelProps } from "@mui/base";
- interface MyProps extends TabPanelProps { /* ... */ }
+ import { HTMLAttributes } from "react";
+ interface MyProps extends HTMLAttributes<HTMLDivElement> { /* ... */ }
```

---

## Step 4 — Update MUI prop APIs (the `slots` / `slotProps` consolidation)

The biggest behavioral change in MUI v6–v9 is the consolidation of the many per-slot props (`*Component`, `*Props`) into the unified `slots` and `slotProps` props. SDS components pass these through to the underlying MUI components, so **anywhere you pass these MUI props through an SDS component, you must update them.**

### Do you even need the MUI codemods? (usually no)

**If your project only uses SDS components and never imports from `@mui/material` directly, skip the codemods entirely** — they will do nothing for you. Go straight to the type-checker-driven fixes below.

Why: MUI's codemods find their targets by scanning for imports from `@mui/*` (`root.find(j.ImportDeclaration, decl => decl.source.value.includes('@mui'))`). Components that are **re-exported/wrapped under a different package name — like `@czi-sds/components` — are silently skipped.** So any renamed prop you pass _through_ an SDS component (`<Dropdown ListboxProps={…}>`, `<InputText inputProps={…}>`, `<Tooltip PopperProps={…}>`, etc.) is **not** transformed by the codemods. Those are handled by Steps 4–5 below, guided by the type-checker.

> ⚠️ Do **not** run the codemods with `--packageName=@czi-sds/components` to force them onto SDS components. SDS props do not map 1:1 to MUI props (e.g. SDS `Tooltip` / `Dropdown` / `DropdownMenu` / `Dialog` intentionally keep `PopperComponent` / `PaperComponent`; SDS `options`/`renderValue` typing differs), so this produces incorrect transforms.

**Only if your consumer app also uses `@mui/material` components directly** (e.g. a raw `<Dialog>`, `<Modal>`, `<Menu>`, `<Autocomplete>`, `<TextField>` imported from `@mui/material`) are the codemods useful — for those direct-MUI call sites only. Because this is a v5 → **v9** jump, run the whole chain; stopping after v7 misses the v9 removals.

> **Note on `preset-safe`:** the core `@mui/codemod` package only ships a `v5.0.0/preset-safe`. There is **no** `v6.0.0/preset-safe`, `v7.0.0/preset-safe`, or `v9.0.0/preset-safe` (those `preset-safe` presets live in the separate `@mui/x-codemod` package for MUI X, which is not what this covers). The v6 → v9 core breaking changes are delivered as targeted codemods plus the `deprecations/all` bundle:

```bash
# Optional — run ONLY against your own direct @mui/material usage, in this order.

# 1) Apply all deprecation removals (covers the bulk of v6–v9 prop/class renames,
#    e.g. Autocomplete renderTags → renderValue, ButtonGroup classes, Alert slot props):
npx @mui/codemod@latest deprecations/all <path-to-src>

# 2) Move Alert / AlertTitle / etc. component imports from @mui/lab to @mui/material (v7):
npx @mui/codemod@latest v7.0.0/lab-removed-components <path-to-src>

# 3) Move system props (color, spacing, …) on Box/Typography/Stack/… into `sx` (v9):
npx @mui/codemod@latest v9.0.0/system-props <path-to-src>
```

For **direct `@mui/material` call sites**, `deprecations/all` does handle several items this guide also documents manually — including the Autocomplete `renderTags` → `renderValue` rename (`deprecations/autocomplete-props`) and the `ButtonGroup` class changes (`deprecations/button-group-classes`). The `Alert` move out of `@mui/lab` is covered by `v7.0.0/lab-removed-components`, but that codemod moves the **component** import only — it does **not** move the `AlertProps` **type** import, which you must still update by hand ([Step 3](#step-3--update-mui-imports-muibase-removed-alert-left-muilab)).

What the codemods **cannot** do is touch props passed _through_ `@czi-sds/components`: MUI's codemods find their targets by scanning imports from `@mui/*`, and SDS wrappers are re-exported under a different package name, so those call sites are silently skipped. The `@mui/base` import moves and the `MenuItem` context requirement also aren't covered. So Steps 3 and 5–8 still apply to your SDS usage regardless of the codemods. In all cases, **the type-checker is the source of truth** — run it and fix what it flags.

### Slot _components_: `*Component` → `slots.*`

```diff
- <Autocomplete PopperComponent={MyPopper} />
+ <Autocomplete slots={{ popper: MyPopper }} />

- <Dialog TransitionComponent={Fade} />
+ <Dialog slots={{ transition: Fade }} />
```

> ⚠️ **Exceptions — do not migrate these SDS `*Component` props to `slots.*`:** SDS `Dialog` `PaperComponent`, SDS `Dropdown` / `DropdownMenu` `PopperComponent` / `PaperComponent`, and SDS `Tooltip` `PopperComponent`. They are intentional SDS APIs (and MUI Dialog still accepts `PaperComponent` in v9). See [Step 5](#step-5--sds-component-specific-changes) and [Do NOT change](#do-not-change-avoid-over-migrating).

### Slot _props_: `*Props` → `slotProps.*`

```diff
- <TextField InputProps={{ endAdornment: <X /> }} />
+ <TextField slotProps={{ input: { endAdornment: <X /> } }} />

- <TextField inputProps={{ "aria-label": "foo" }} />
+ <TextField slotProps={{ htmlInput: { "aria-label": "foo" } }} />

- <Tooltip PopperProps={{ disablePortal: false }} />
+ <Tooltip slotProps={{ popper: { disablePortal: false } }} />

- <Menu MenuListProps={{ "aria-labelledby": "btn" }} />
+ <Menu slotProps={{ list: { "aria-labelledby": "btn" } }} />

- <Tabs TabIndicatorProps={indicatorProps} />
+ <Tabs slotProps={{ indicator: indicatorProps }} />

- <Drawer SlideProps={{ onMouseEnter, onMouseLeave }} />
+ <Drawer slotProps={{ transition: { onMouseEnter, onMouseLeave } }} />

- <Dialog PaperProps={{ elevation: 0 }} />
+ <Dialog slotProps={{ paper: { elevation: 0 } }} />

- <Autocomplete ListboxProps={{ role: "listbox" }} />
+ <Autocomplete slotProps={{ listbox: { role: "listbox" } }} />
```

> `Dialog`, `Modal`, `Drawer`, `Menu`, and `Popover` all share the same renames: **`PaperProps` → `slotProps.paper`** and **`TransitionComponent` → `slots.transition`**. Real-world upgrades commonly hit these in dialog/modal/drawer call sites (e.g. a `Modal` or a mobile "jump to" drawer). **Do not** confuse `PaperProps` with `PaperComponent` — on SDS `Dialog`, keep `PaperComponent` as-is.

> Note the distinction between **`input`** (the MUI input wrapper component — formerly `InputProps`) and **`htmlInput`** (the underlying `<input>` element — formerly `inputProps`). They map to different slots.

See the [full prop-rename table](#reference-full-prop-rename-table) at the end for the complete list.

### `renderInput` params changed

When you provide a custom `renderInput` to an Autocomplete-based component, the params object changed. The input ref and html input props moved under `slotProps`:

```diff
  renderInput={(params) => (
    <InputText
-     ref={params.InputProps.ref}
-     inputProps={params.inputProps}
+     ref={params.slotProps.input.ref}
+     slotProps={{ htmlInput: params.slotProps.htmlInput }}
    />
  )}
```

---

## Step 5 — SDS component-specific changes

These are the consumer-facing changes for specific SDS components. SDS components forward `...rest` to their underlying MUI component, so MUI's v9 renames apply when you pass those props.

### Autocomplete family (`Autocomplete`, `Dropdown`, `DropdownMenu`, `ComplexFilter`, `MenuSelect`)

- **`renderTags` → `renderValue`.** MUI renamed the prop that controls how selected values are rendered. (MUI's `deprecations/autocomplete-props` codemod renames this on _direct_ `@mui/material` Autocomplete usage, but it won't touch it here because the prop is passed through an SDS wrapper — do it manually.)

  ```diff
  - <Dropdown renderTags={myRenderTags} />
  + <Dropdown renderValue={myRenderValue} />
  ```

- **Leave `PopperComponent` / `PaperComponent` alone on `Dropdown` / `DropdownMenu`.** SDS still exposes these as first-class props for the _outer_ menu popper/paper (`Dropdown` forwards them via `...rest` into `DropdownMenu`). Do **not** rewrite them to `slots.popper` / `slots.paper` — that would hit Autocomplete's inner slots instead of the menu shell. (Raw `@mui/material` `Autocomplete` still uses `slots.popper` / `slots.paper`.)

- **`ListboxProps` → `slotProps.listbox`.**

  ```diff
  - <Dropdown ListboxProps={{ role: "listbox" }} />
  + <Dropdown slotProps={{ listbox: { role: "listbox" } }} />
  ```

- **`getOptionLabel` / `isOptionEqualToValue` signatures.** With `freeSolo`, the value passed to these callbacks may now be a raw `string` in addition to your option object. If you implement these, guard for the string case:

  ```ts
  function isOptionEqualToValue(option, val) {
    return typeof val === "object" && val !== null && "name" in val
      ? option.name === val.name
      : option.name === val;
  }
  ```

  For typing those callbacks, MUI added `AutocompleteValueOrFreeSoloValueMapping<T, FreeSolo>` (`Value | string` when `freeSolo` is true). `AutocompleteFreeSoloValueMapping<FreeSolo>` still exists — it was not renamed or removed.

### `Tooltip`

- **`PopperProps` → `slotProps.popper`** (the underlying MUI prop was removed):

  ```diff
  - <Tooltip PopperProps={{ disablePortal: false, modifiers: [...] }} />
  + <Tooltip slotProps={{ popper: { disablePortal: false, modifiers: [...] } }} />
  ```

- **Leave `PopperComponent` alone — prefer it over `slots.popper`.** SDS keeps `PopperComponent` as a Tooltip prop and maps it to `slots.popper` internally (Native MUI removed the top-level prop). Do **not** rewrite SDS `Tooltip` usage to `slots={{ popper: … }}`: SDS applies `slots={{ popper: PopperComponent }}` _after_ `{...rest}`, so a consumer `slots` prop is overwritten. Use `PopperComponent` instead.

### `Dialog`

- **`PaperProps` → `slotProps.paper`** and **`TransitionComponent` → `slots.transition`** (same as raw MUI Dialog):

  ```diff
  - <Dialog PaperProps={{ elevation: 0 }} TransitionComponent={Fade} />
  + <Dialog slotProps={{ paper: { elevation: 0 } }} slots={{ transition: Fade }} />
  ```

- **Leave `PaperComponent` alone.** SDS `Dialog` still takes `PaperComponent` as a first-class prop (used to inject `sdsSize` into the paper), and MUI Dialog still types `PaperComponent` in v9. Do **not** rewrite it to `slots.paper`.

### `Panel`

- `Panel` now accepts and **merges** consumer `slotProps` with its SDS defaults. You can override the paper/backdrop slots (e.g. to set a custom `aria-label`/`aria-labelledby` on the drawer paper) without losing SDS defaults.
- A default `aria-label="Panel"` is now applied to the drawer paper. From MUI v6+, the temporary Drawer paper renders with `role="dialog"` / `aria-modal="true"` and requires an accessible name. Override it via `slotProps.paper` if you have a more descriptive label.

### Input components (`InputText`, `InputSearch`, `InputToggle`)

- Pass-through input props moved to `slotProps`:

  ```diff
  - <InputText inputProps={{ maxLength: 10 }} />
  + <InputText slotProps={{ htmlInput: { maxLength: 10 } }} />

  - <InputToggle inputProps={{ "aria-label": "Toggle" }} />
  + <InputToggle slotProps={{ input: { "aria-label": "Toggle" } }} />
  ```

- **`InputText` and `InputSearch` set some `slotProps` internally, but they now deep-merge your `slotProps` with those defaults**, so you can pass the migrated `slotProps` directly (as shown above)

### `Menu`

- `MenuListProps` → `slotProps.list`:

  ```diff
  - <Menu MenuListProps={{ "aria-labelledby": "basic-button" }} />
  + <Menu slotProps={{ list: { "aria-labelledby": "basic-button" } }} />
  ```

---

## Step 6 — `@mui/icons-material` icon renames

Several icons in `@mui/icons-material` were renamed in v9. The most common pattern is the `*Outline` → `*Outlined` rename:

```diff
- import { CheckCircleOutline } from "@mui/icons-material";
+ import { CheckCircleOutlined } from "@mui/icons-material";
```

Audit your direct `@mui/icons-material` imports for any icons that fail to resolve after the upgrade and update them to their v9 names. (SDS's own iconography in `Icon` / `sdsIcon` is unaffected.)

---

## Step 7 — `MenuItem` now requires a `Menu`/`MenuList` context

In MUI v9, `MenuItem` expects to be rendered within a `Menu`/`MenuList` context (it reads list context for keyboard navigation, focus management, and roles). If you render SDS `MenuItem`s **outside** of an SDS `Menu`/`DropdownMenu` (e.g. building a custom menu in a plain `<div role="menu">`), wrap them in a MUI `MenuList`:

```diff
+ import { MenuList } from "@mui/material";

- <div role="menu">
-   <MenuItem>Item A</MenuItem>
-   <MenuItem>Item B</MenuItem>
- </div>
+ <MenuList role="menu" component="div" disablePadding>
+   <MenuItem>Item A</MenuItem>
+   <MenuItem>Item B</MenuItem>
+ </MenuList>
```

`MenuList` renders as a `<ul>` by default; pass `component="div"` if you need a different element, and `disablePadding` to remove the default list padding.

> SDS handles this internally for its own components (Autocomplete listboxes, `NavigationHeader`, etc.), so you only need this when composing `MenuItem` directly.

---

## Step 8 — `ButtonGroup` class-name changes

MUI changed the internal class names used by `ButtonGroup`. If you wrote CSS that targeted the old per-orientation grouped classes, update your selectors:

| Old (v5)                                          | New (v9)                                                   |
| ------------------------------------------------- | ---------------------------------------------------------- |
| `.MuiButtonGroup-groupedHorizontal:first-of-type` | `.MuiButtonGroup-horizontal > .MuiButtonGroup-firstButton` |
| `.MuiButtonGroup-groupedHorizontal:last-of-type`  | `.MuiButtonGroup-horizontal > .MuiButtonGroup-lastButton`  |
| `.MuiButtonGroup-groupedVertical:first-of-type`   | `.MuiButtonGroup-vertical > .MuiButtonGroup-firstButton`   |
| `.MuiButtonGroup-groupedVertical:last-of-type`    | `.MuiButtonGroup-vertical > .MuiButtonGroup-lastButton`    |

This only affects you if you override `ButtonGroup` styles by class name.

---

## Step 9 — Build & test tooling (Vite / Vitest / bundlers)

MUI v9's ESM build can trip up some bundlers and test runners. SDS made the following adjustments; apply the equivalent in your app if you hit the same issues.

### Vitest / Jest: "Directory import is not supported"

MUI v9's ESM build does a directory import (`react-transition-group/TransitionGroupContext`) that Node's native ESM resolver rejects. Inline MUI and `react-transition-group` so your test runner's resolver (Vite) handles them:

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/@mui\//, /react-transition-group/],
      },
    },
  },
});
```

For Jest, the equivalent is a `transformIgnorePatterns` exception that lets these packages be transformed.

### Library bundlers: externalize the entire `@mui/*` scope

If you build a library on top of SDS, externalize all of `@mui/*` (not just the top-level packages). From v6 onward, MUI's `.d.ts` files use `export { default } from "..."` re-exports that reference siblings like `@mui/system` and `@mui/utils`, which a declaration bundler cannot inline. Consumers receive them transitively via `@mui/material`:

```js
const external = (id) => id === "@mui" || id.startsWith("@mui/") || /* ...your peer deps... */;
```

---

## Search patterns to locate every affected call site

Run these `ripgrep` commands from the consumer project root to find every call site that may need a change. They intentionally err toward over-matching; confirm each hit against the relevant step before editing. All exclude `node_modules`.

```bash
# Step 3 — @mui/base must go; @mui/lab only for Alert/AlertProps move (+ keep/remove decision)
rg -n "@mui/base" --glob '!**/node_modules/**'
rg -n "@mui/lab" --glob '!**/node_modules/**'   # migrate Alert/AlertProps; keep other lab imports
rg -n "TabPanelProps" --glob '!**/node_modules/**'

# Step 4 — MUI slot props/components that were renamed (pass-through or direct MUI)
# Note: on SDS Tooltip / Dropdown / DropdownMenu / Dialog, leave PopperComponent / PaperComponent alone
# (those are intentional SDS APIs — see Step 5 / "Do NOT change"). PaperProps is different and should migrate.
rg -n "\b(InputProps|inputProps|PaperProps|PaperComponent|PopperProps|PopperComponent|ListboxProps|MenuListProps|TabIndicatorProps|SlideProps|TransitionComponent)\s*=" --glob '!**/node_modules/**'

# Step 4 — custom renderInput reading the old params shape
rg -n "params\.(InputProps|inputProps)" --glob '!**/node_modules/**'

# Step 5 — SDS Autocomplete-family prop rename
rg -n "\brenderTags\b" --glob '!**/node_modules/**'

# Step 6 — icons that were renamed (Outline -> Outlined is the common one)
rg -n "from \"@mui/icons-material\"" --glob '!**/node_modules/**'

# Step 7 — MenuItem used outside an SDS Menu/DropdownMenu (verify each manually)
rg -n "<MenuItem\b" --glob '!**/node_modules/**'

# Step 8 — CSS targeting old ButtonGroup grouped classes
rg -n "MuiButtonGroup-grouped(Horizontal|Vertical)" --glob '!**/node_modules/**'
```

> These patterns catch both MUI-direct usage and props passed through SDS components (SDS forwards them to MUI). The type-checker is the authoritative follow-up: after updating deps, it will flag the exact remaining call sites.

---

## Verification checklist / definition of done

Run the project's own scripts (check `package.json` `scripts` for the exact names; common ones shown). The migration is **done** only when all three of type-check, build, and tests pass.

```bash
# Type-check (authoritative for finding remaining API changes)
npx tsc --noEmit        # or: npm run type-check / yarn type-check

# Build
npm run build           # or: yarn build

# Tests
npm test                # or: yarn test

# Final sanity: @mui/base must be gone; @mui/lab only if still used
rg -n "@mui/base" --glob '!**/node_modules/**'   # expect: no matches
rg -n "@mui/lab" --glob '!**/node_modules/**'    # expect: none, OR only intentional remaining lab usage
```

Then confirm each item:

- [ ] `@czi-sds/components` is on `24.0.0` (or a compatible `^24` release) in `package.json`.
- [ ] `@mui/material` and `@mui/icons-material` are on `^9` in `package.json`.
- [ ] `@mui/base` is removed from `package.json`.
- [ ] `@mui/lab` decision applied: removed if unused after the `Alert` / `AlertProps` move; kept and bumped to a v9-compatible major if anything still imports from it.
- [ ] (Next.js) `@mui/material-nextjs` and any other direct `@mui/*` packages bumped to a v9-compatible major; `@mui/*` resolves to a single version.
- [ ] `react` / `react-dom` are `>=18`.
- [ ] (React 18 or below) `react-is` is pinned via `resolutions`/`overrides`.
- [ ] No remaining imports from `@mui/base`. Any remaining `@mui/lab` imports are intentional (not leftover `Alert` / `AlertProps`).
- [ ] All removable `*Component` / `*Props` slot props passed through SDS components were migrated to `slots` / `slotProps` (see the table below; skip the SDS keep-as-is exceptions).
- [ ] Dialog/Modal/Drawer call sites migrated: `PaperProps` → `slotProps.paper`, `TransitionComponent` → `slots.transition`. SDS `Dialog` `PaperComponent` left unchanged.
- [ ] Autocomplete `ListboxProps` → `slotProps.listbox`.
- [ ] `renderTags` usages renamed to `renderValue`.
- [ ] Custom `renderInput` updated to read `params.slotProps.input.ref` / `params.slotProps.htmlInput`.
- [ ] After passing `slotProps` to `InputText` / `InputSearch`, accessible names and search/clear adornments still render (these components deep-merge consumer `slotProps` with their SDS defaults).
- [ ] Direct `@mui/icons-material` imports resolve (fix `*Outline` → `*Outlined`, etc.).
- [ ] Standalone `MenuItem`s are wrapped in a `MenuList`.
- [ ] Custom `ButtonGroup` class selectors updated.
- [ ] Test runner / bundler config updated if you hit ESM resolution errors.
- [ ] App type-checks, builds, and tests pass.

---

## Reference: full prop-rename table

These are the MUI v5 → v9 prop renames exercised by SDS. They apply when you pass the prop through an SDS component (which forwards to the underlying MUI component) or use MUI directly.

| Component                                          | v5 prop                              | v9 replacement                                                                                       |
| -------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Autocomplete (`Dropdown`, etc.)                    | `renderTags`                         | `renderValue`                                                                                        |
| Autocomplete (`Dropdown`, etc.)                    | `ListboxProps`                       | `slotProps.listbox`                                                                                  |
| `Dropdown` / `DropdownMenu`                        | `PopperComponent` / `PaperComponent` | **keep as-is** (SDS outer-shell props — do not migrate to `slots.*`)                                 |
| Raw `@mui/material` `Autocomplete`                 | `PopperComponent` / `PaperComponent` | `slots.popper` / `slots.paper`                                                                       |
| `Dialog` / `Modal` / `Drawer` / `Menu` / `Popover` | `PaperProps`                         | `slotProps.paper`                                                                                    |
| `Dialog` / `Modal`                                 | `TransitionComponent`                | `slots.transition`                                                                                   |
| SDS `Dialog`                                       | `PaperComponent`                     | **keep as-is** (intentional SDS API; MUI Dialog still types it in v9)                                |
| `TextField` / inputs                               | `InputProps`                         | `slotProps.input`                                                                                    |
| `TextField` / inputs                               | `inputProps`                         | `slotProps.htmlInput`                                                                                |
| `InputToggle` (Checkbox/Switch)                    | `inputProps`                         | `slotProps.input`                                                                                    |
| SDS `Tooltip`                                      | `PopperProps`                        | `slotProps.popper`                                                                                   |
| SDS `Tooltip`                                      | `PopperComponent`                    | **keep as-is** (SDS back-compat alias; prefer over `slots.popper` — consumer `slots` is overwritten) |
| Raw `@mui/material` `Tooltip`                      | `PopperComponent` / `PopperProps`    | `slots.popper` / `slotProps.popper`                                                                  |
| `Menu`                                             | `MenuListProps`                      | `slotProps.list`                                                                                     |
| `Tabs`                                             | `TabIndicatorProps`                  | `slotProps.indicator`                                                                                |
| `Drawer` / transitions                             | `SlideProps`                         | `slotProps.transition`                                                                               |

| Type / import                                                                                           | v5 location                                                 | v9 location                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `AlertProps`                                                                                            | `@mui/lab`                                                  | `@mui/material`                                                                                                              |
| `AutocompleteValue`, `AutocompleteChangeReason`, `AutocompleteChangeDetails`, `AutocompleteCloseReason` | `@mui/base`                                                 | `@mui/material/useAutocomplete`                                                                                              |
| `getOptionLabel` / `isOptionEqualToValue` value typing                                                  | `AutocompleteFreeSoloValueMapping<FreeSolo>` (still exists) | Prefer new `AutocompleteValueOrFreeSoloValueMapping<T, FreeSolo>` for those callbacks (`@mui/material`) — both types coexist |
| `TabPanelProps`                                                                                         | `@mui/base`                                                 | removed — use `HTMLAttributes<HTMLDivElement>`                                                                               |
