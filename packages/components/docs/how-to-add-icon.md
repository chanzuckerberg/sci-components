# How to add an icon to SDS

The SDS `Icon` component is deprecated, and new icons are no longer added to it: `src/common/svgs` and `src/core/Icon/map.ts` stay as they are until the component is removed.

## 1. Look in Phosphor first

Search [phosphoricons.com](https://phosphoricons.com). The name shown there plus an `Icon` suffix is the export of `@phosphor-icons/react`, so "Magnifying Glass" is `MagnifyingGlassIcon`. SDS components use the `bold` weight:

```tsx
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

<MagnifyingGlassIcon weight="bold" />;
```

## 2. Then the icons SDS draws itself

The Icons / Custom Icons page in Storybook lists the icons `@czi-sds/icons` ships, either because Phosphor has no equivalent or because the design team wants its own drawing of one it does have. If the icon is on that page, import it from `@czi-sds/icons` rather than using a Phosphor lookalike.

## 3. Neither has it

Agree the icon with the design team in [#sci-design-system-support](https://czi-sci.slack.com/archives/C032S43KKFV) before building it. Then add it to `packages/icons`, following the "Adding an icon" steps on the Custom Icons page:

- Flatten the artwork to `path` elements, with `fill` and `stroke` stripped, on a 256x256 grid.
- Add the paths to `src/defs/<Name>.tsx`.
- Create the component with `createSdsIcon` in `src/icons/<Name>.tsx`, and export it from `src/index.ts`.

Include a screenshot of the icon in the Custom Icons gallery in the PR, and tag the designer to check it.
