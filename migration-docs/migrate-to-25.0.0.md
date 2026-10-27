# Migration Guide: SDS 25.0.0 (Tag rework)

This guide is for upgrading **`@czi-sds/components@24.x`** to **`@czi-sds/components@25.0.0`**. This is a **breaking release** with four changes:

1. **`Tag` has a new API** that follows the reworked design: `sdsStyle` is `"solid"` or `"outline"`, sizes are `"small"` and `"medium"`, a new `"accent"` intent, a disabled state, icon-only tags, and links with an optional arrow. The previous component still ships as **`TagLegacy`**, deprecated.
2. **The filter chip is now `Chip`.** The reworked design for removable filter chips ships as `Chip`, with `sdsStyle` and the whole chip as the remove control. **`TagFilter` still ships unchanged**, deprecated, so moving to `Chip` can wait.
3. **The old `Chip` is removed.** It had been deprecated for many releases, and its name now belongs to the filter chip.
4. **`@phosphor-icons/react` is a peer dependency** of `@czi-sds/components`.

> If you are still on SDS 23 or older, follow [migrate-to-24.0.0.md](./migrate-to-24.0.0.md) first. This guide assumes Material UI v9.

---

## Table of contents

1. [For AI coding agents — read first](#for-ai-coding-agents--read-first)
2. [At a glance](#at-a-glance)
3. [Step 1 — Update dependencies](#step-1--update-dependencies)
4. [Step 2 — Choose a pace: migrate now, or switch to `TagLegacy` first](#step-2--choose-a-pace-migrate-now-or-switch-to-taglegacy-first)
5. [Step 3 — Migrate `Tag` props](#step-3--migrate-tag-props)
6. [Step 4 — Replace the removed `Chip`](#step-4--replace-the-removed-chip)
7. [Step 5 — Move from `TagFilter` to `Chip` (optional)](#step-5--move-from-tagfilter-to-chip-optional)
8. [Step 6 — Components that render a Tag or a Chip for you](#step-6--components-that-render-a-tag-or-a-chip-for-you)
9. [Search patterns to locate every affected call site](#search-patterns-to-locate-every-affected-call-site)
10. [Verification checklist / definition of done](#verification-checklist--definition-of-done)

---

## For AI coding agents — read first

You are upgrading a **consumer project** that depends on `@czi-sds/components@24.x` to **`@czi-sds/components@25.0.0` or later**. Follow this playbook top to bottom.

### Objective

Make the consumer project install SDS 25 with its peer dependencies and compile, build and test cleanly, by updating **only the consumer's own code and config** to the new `Tag` API and away from the removed `Chip`. Moving `TagFilter` call sites to `Chip` is optional; do it only if the task asks for it.

### Operating rules (guardrails)

1. **Scope:** only edit files in the consumer project. Never edit files inside `node_modules`, and never edit SDS internals.
2. **Let the type-checker drive the work.** The removed `Tag` props (`sdsType`, `sdsSize`, `hover`, `tagColor`) and the removed `sdsStyle` values (`"rounded"`, `"square"`) are all type errors in SDS 25, and so is a call site of the old `Chip` (its `status` and `isRounded` props are gone, and `onDelete` is now required). `tsc --noEmit` lists every one.
3. **Apply the mapping per call site.** The table in [Step 3](#step-3--migrate-tag-props) is mechanical, with one judgement call: the size. See the note under the table.
4. **Preserve behavior.** Do not change what a tag does when clicked, or add or remove click handlers, while migrating its props.
5. **Ask before scope changes.** If a call site styles the tag's internals (MUI class names such as `.MuiChip-label`), report it rather than guessing: the DOM inside the tag changed.

### Do NOT change (avoid over-migrating)

- ❌ **Don't rename `sdsStyle` on other components.** Button, ButtonToggle, Callout and NavigationHeader have their own `sdsStyle` values. Only `Tag`'s changed.
- ❌ **Don't touch `color` on a Tag.** Intents and custom color tuples keep working. `"accent"` is new, nothing was removed.
- ❌ **Don't rename `tagColor` on `NavigationHeader` or `NavigationFooter`.** It is their own prop, unchanged. Only a `tagColor` passed directly to `<Tag>` has to become `color`.
- ❌ **Don't swap `TagLegacy` into code that already uses the new `Tag` API.** `TagLegacy` only accepts the old props.
- ❌ **Don't rename `TagFilter` to `Chip` with a find-and-replace.** `TagFilter` keeps working. The new `Chip` removes itself when clicked anywhere and is one tab stop, so a call site that moves needs the checks in [Step 5](#step-5--move-from-tagfilter-to-chip-optional).

### The workflow (follow in this order)

1. **Update dependencies — [Step 1](#step-1--update-dependencies)**, then install.
2. **Decide the pace — [Step 2](#step-2--choose-a-pace-migrate-now-or-switch-to-taglegacy-first).** Either migrate every Tag call site now, or rename imports to `TagLegacy` to compile immediately and migrate later.
3. **Inventory — [search patterns](#search-patterns-to-locate-every-affected-call-site).**
4. **Fix until the type-checker is clean — [Step 3](#step-3--migrate-tag-props) for Tag and [Step 4](#step-4--replace-the-removed-chip) for the old Chip.**
5. **Optionally, move `TagFilter` to `Chip` — [Step 5](#step-5--move-from-tagfilter-to-chip-optional).**
6. **Build, test, and look at the result — [Verification](#verification-checklist--definition-of-done).** Tags change size and shape, so check the screens that show them.

---

## At a glance

| Area                    | Before (SDS 24)                                   | After (SDS 25)                                                                                               |
| ----------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@phosphor-icons/react` | optional, for icons only                          | **required peer** of `@czi-sds/components` (`^2.1.10`)                                                       |
| `Tag` style             | `sdsType="primary" \| "secondary"`                | `sdsStyle="solid" \| "outline"`                                                                              |
| `Tag` shape             | `sdsStyle="square" \| "rounded"` (square default) | automatic: pill-shaped, square only when `iconOnly`                                                          |
| `Tag` size              | `sdsSize="s" \| "l"` (`"l"` required an icon)     | `size="small" \| "medium"` (medium default, icon optional)                                                   |
| `Tag` intents           | six                                               | seven, adds `"accent"`                                                                                       |
| `Tag` hover             | on for every tag unless `hover={false}`           | only on a tag with `onClick`, `href` or `clickable`                                                          |
| `Tag` links             | not supported                                     | `href`, `target`, `rel`, and `showLinkIcon` for the arrow                                                    |
| `Tag` icon-only         | not supported                                     | `iconOnly`                                                                                                   |
| Old `Tag`               | —                                                 | `TagLegacy`, deprecated                                                                                      |
| `TagFilter`             | the filter chip                                   | unchanged, deprecated in favor of `Chip`                                                                     |
| `Chip`                  | deprecated status chip (`status`, `isRounded`)    | **removed**; the name now belongs to the reworked filter chip (`sdsStyle`, whole-chip removal, one tab stop) |

---

## Step 1 — Update dependencies

Bump SDS and add Phosphor:

```bash
# npm
npm i @czi-sds/components@^25 @phosphor-icons/react@^2.1.10

# yarn
yarn add @czi-sds/components@^25 @phosphor-icons/react@^2.1.10
```

If the project also uses `@czi-sds/data-viz`, update it to a release that accepts `@czi-sds/components@25`.

---

## Step 2 — Choose a pace: migrate now, or switch to `TagLegacy` first

`TagLegacy` is the SDS 24 Tag under a new name, with the same props and the same look. Renaming the import is enough to compile on SDS 25 without touching any props:

```diff
- import { Tag } from "@czi-sds/components";
+ import { TagLegacy as Tag } from "@czi-sds/components";
```

The type names moved with it: `TagProps` became `TagLegacyProps`, `SdsTagProps` became `SdsTagLegacyProps`, and `SdsTagColorType` (the six-intent version) became `SdsTagLegacyColorType`.

`TagLegacy` receives no design updates and will be removed in a future major version, so treat it as a stopgap and migrate to `Tag` ([Step 3](#step-3--migrate-tag-props)) when you can.

---

## Step 3 — Migrate `Tag` props

| Old (SDS 24 / `TagLegacy`)                          | New (SDS 25 `Tag`)                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| `sdsType="primary"`                                 | remove it (`sdsStyle="solid"` is the default)                           |
| `sdsType="secondary"`                               | `sdsStyle="outline"`                                                    |
| `sdsStyle="rounded"`                                | remove it                                                               |
| `sdsStyle="square"`                                 | remove it                                                               |
| `sdsSize="s"`                                       | `size="small"`                                                          |
| `sdsSize="l"`                                       | remove it (`size="medium"` is the default, and no longer needs an icon) |
| `hover={false}`                                     | remove it (a tag without `onClick` or `href` is static)                 |
| `hover` / `hover={true}` on a tag that does nothing | remove it, or give the tag the `onClick` it was meant to have           |
| `tagColor={...}`                                    | `color={...}`                                                           |
| `color={[label, background]}` with an icon          | unchanged; the icon now takes the label color instead of white          |

```diff
- <Tag label="Active" color="positive" sdsStyle="rounded" sdsType="secondary" hover={false} />
+ <Tag label="Active" color="positive" sdsStyle="outline" />
```

**The size is a judgement call.** A tag that used the old default (`"s"`, 20px tall with an 11px label) becomes a medium tag (24px with a 13px label) unless you pass `size="small"` (20px with a 10px label). Keep the new default wherever there is room. Pass `size="small"` where the extra height would break a layout: navigation bars, tab labels, tags set inline in a line of text, and dense table rows.

### Icons

The tag now sizes and colors its icon itself (12px in a medium tag, 10px in a small one), so pass a bare icon. Phosphor and `@czi-sds/icons` icons are the recommended choice. The deprecated SDS `Icon` still works if the icon exists at a small size:

```diff
- <Tag icon={<Icon sdsIcon="Virus" sdsSize="l" />} label="Virus" sdsSize="l" />
+ <Tag icon={<VirusIcon />} label="Virus" />
```

`VirusIcon` above comes from `@phosphor-icons/react`.

### Styling overrides

The markup inside a tag changed: the label text now sits in a `span.SdsTag-labelText` inside MUI's `.MuiChip-label`, and the link arrow uses the class `SdsTag-linkIcon`. If the project overrides those internals with CSS, re-check those overrides.

---

## Step 4 — Replace the removed `Chip`

The `Chip` that SDS 24 still exported, deprecated, with `status` and `isRounded` props, is gone. `import { Chip }` now gives the filter chip, whose props are different, so old call sites fail to type-check. Move each one by what it does:

- **A chip that labels something** becomes a `Tag`. Map `status` to `color`, drop `isRounded` (tags are pill-shaped), and keep `size`:

  | Old `status` | New `color`  |
  | ------------ | ------------ |
  | `"success"`  | `"positive"` |
  | `"error"`    | `"negative"` |
  | `"warning"`  | `"notice"`   |
  | `"info"`     | `"info"`     |
  | `"pending"`  | `"neutral"`  |
  | `"beta"`     | `"beta"`     |

  ```diff
  - <Chip label="Done" status="success" isRounded size="small" />
  + <Tag label="Done" color="positive" size="small" />
  ```

- **A chip that can be removed** (it had an `onDelete`) becomes the new `Chip`, which requires `onDelete` and comes in the accent color only. `status` has no equivalent there.

The `ChipProps` type now describes the new `Chip`.

---

## Step 5 — Move from `TagFilter` to `Chip` (optional)

`TagFilter` keeps the look and behavior it had in SDS 24, so nothing needs to change on upgrade. It is deprecated and will be removed in a future major version, so plan to move each call site to `Chip`. The props are the same, so the move starts with the name:

```diff
- import { TagFilter } from "@czi-sds/components";
- <TagFilter label="Lung" onDelete={handleDelete} />
+ import { Chip } from "@czi-sds/components";
+ <Chip label="Lung" onDelete={handleDelete} />
```

The types follow: `TagFilterProps` becomes `ChipProps` and `SdsTagFilterProps` becomes `SdsChipProps`. Then check each call site for what behaves differently:

- **The whole chip removes the filter.** A click anywhere on it calls `onDelete`, not only a click on the X. A call site that also passed an `onClick` that removed the filter now removes it twice; drop the `onClick` and keep `onDelete`.
- **One tab stop instead of two.** The X is no longer a separate button. The chip is a button named "Remove {label}". Pass `aria-label` to change the wording, for instance to translate it. Tests that looked for a button named "Delete Tag" need to look for the chip instead.
- **New `sdsStyle`.** `"solid"` (default) is the accent fill; `"outline"` is the outlined variant.

```diff
- screen.getByRole("button", { name: "Delete Tag" })
+ screen.getByRole("button", { name: "Remove Lung" })
```

---

## Step 6 — Components that render a Tag or a Chip for you

- **`NavigationHeader` and `NavigationFooter`** draw their title tag (`tag`, `tagColor`) and their nav-item tags with the new Tag, as small solid tags. `tagColor` now also accepts `"accent"`. No changes are needed at the call site.
- **`ComplexFilter`** shows its selected values with the new `Chip`. Removing a selection by clicking its chip works as before.
- **Types:** `NavigationFooter`'s `tagColor` is typed as `SdsTagColorType` rather than `TagProps["tagColor"]`, which no longer exists. Code that reached for `TagProps["tagColor"]` should use `SdsTagColorType`.

---

## Search patterns to locate every affected call site

```bash
# Every Tag call site (the type-checker will flag the ones with removed props)
rg -n "<Tag\b" --glob '!**/node_modules/**'

# Removed props and values on Tag
rg -n "sdsType=|sdsSize=|hover=\{|tagColor=|sdsStyle=\"(rounded|square)\"" --glob '!**/node_modules/**'

# Type names that moved
rg -n "\b(TagProps|SdsTagProps|SdsTagColorType)\b" --glob '!**/node_modules/**'

# Call sites of the old Chip (status and isRounded give them away)
rg -n "<Chip\b|\bChipProps\b|status=\"(success|error|warning|pending)\"|isRounded" --glob '!**/node_modules/**'

# TagFilter call sites, for the optional move to Chip, and tests that look for its X button
rg -n "<TagFilter\b|TagFilterProps|Delete Tag" --glob '!**/node_modules/**'

# CSS that reaches into a tag's internals
rg -n "MuiChip-(label|icon|deleteIcon)" --glob '!**/node_modules/**'
```

---

## Verification checklist / definition of done

- [ ] `@czi-sds/components` resolves to `25.x` and `@phosphor-icons/react` is installed.
- [ ] `tsc --noEmit` (or the project's type-check script) reports no errors.
- [ ] No `<Tag>` call site passes `sdsType`, `sdsSize`, `hover`, `tagColor`, or `sdsStyle="rounded" | "square"`. `TagLegacy` call sites are the only exception.
- [ ] Every call site of the old `Chip` became a `Tag` or the new `Chip`.
- [ ] Tags that should respond to clicks have an `onClick` or an `href`; tags that only label something have neither.
- [ ] Screens that show tags were checked by eye: heights, the pill shape, and any place that now needs `size="small"`.
- [ ] `TagFilter` call sites either stay as they are or moved to `Chip`, with handlers and tests updated for whole-chip removal and the "Remove {label}" name.
- [ ] The build and the test suite pass.
