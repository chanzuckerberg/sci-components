# @czi-sds/icons

The Science Design System's custom icons, built on [Phosphor Icons](https://phosphoricons.com).

SDS uses Phosphor for its icon set. This package adds a small set of its own on
top, kept here for one of two reasons: either Phosphor has no equivalent, such as
brand marks and the concepts specific to the science these products do, or Phosphor
has something close and SDS wants its own version of it.

They are built on Phosphor's own `IconBase`, so they take the same props, read the
same `IconContext`, and forward refs the same way. The only difference between an
SDS icon and a Phosphor icon is where you import it from.

## Installation

```bash
npm install @czi-sds/icons @phosphor-icons/react
```

`@phosphor-icons/react` is a peer dependency rather than a bundled one. That is
what keeps a single copy of Phosphor in your app, which is what lets an
`IconContext.Provider` you render style the icons from both packages.

## Usage

```tsx
import { HeartIcon } from "@phosphor-icons/react";
import { SdsAtlasIcon } from "@czi-sds/icons";

function App() {
  return (
    <div>
      <HeartIcon size={24} weight="bold" />
      <SdsAtlasIcon size={24} color="#3867fa" />
    </div>
  );
}
```

### Props

Icons accept every prop a `<svg>` element does, plus:

| Prop       | Type                                                              | Default          | Description                       |
| ---------- | ----------------------------------------------------------------- | ---------------- | --------------------------------- |
| `size`     | `number \| string`                                                | `"1em"`          | Width and height.                 |
| `color`    | `string`                                                          | `"currentColor"` | Any CSS color.                    |
| `weight`   | `"thin" \| "light" \| "regular" \| "bold" \| "fill" \| "duotone"` | `"regular"`      | Accepted, but see the note below. |
| `mirrored` | `boolean`                                                         | `false`          | Flips the icon horizontally.      |
| `alt`      | `string`                                                          | none             | Renders an SVG `<title>`.         |

Each SDS icon ships a single drawing, so `weight` is accepted for API parity but
does not change how the icon looks. Phosphor's own icons do vary by weight.

### Shared defaults

`IconContext` comes from Phosphor and covers both packages:

```tsx
import { IconContext } from "@phosphor-icons/react";
import { SdsSparkleIcon } from "@czi-sds/icons";

<IconContext.Provider value={{ color: "#767676", size: 20 }}>
  <SdsSparkleIcon /> {/* 20px and grey */}
</IconContext.Provider>;
```

## Sizes

SDS icon sizes are 12, 16, 24, and 32 pixels. Pass them to `size` directly, or
read them from the design tokens in `@czi-sds/components` (`getIconSizes()`, or
the `--sds-icon-size-*` CSS variables).

## Documentation

Full documentation, including the gallery of every icon in this package and a
migration guide from the deprecated `Icon` component in `@czi-sds/components`,
is in the [SDS Storybook](https://chanzuckerberg.github.io/sci-components) under
Icons.

## Adding an icon

This follows the shape Phosphor
[documents for custom icons](https://github.com/phosphor-icons/react#custom-icons),
with one simplification: their icons map each of the six weights to its own
drawing, and an SDS icon registers the one drawing under all six.

1. Export the artwork as an SVG, flattened to `path` elements, with `fill` and
   `stroke` attributes stripped. Both are inherited from the wrapper `IconBase`
   renders, so a stroke-drawn icon needs its strokes outlined into fills first.
2. Put it on a 256x256 grid, which is the `viewBox` `IconBase` renders. Design
   draws at 16, 24 or 32, so scale the coordinates by 16, 10.667 or 8 on the way
   in.
3. Add the paths to `src/defs/<Name>.tsx` as the contents of the SVG rather than
   the SVG itself: one `path`, or a `Fragment` of them where there are several.
4. Add the component to `src/icons/<Name>.tsx` via `createSdsIcon`.
5. Export it from `src/index.ts`.
