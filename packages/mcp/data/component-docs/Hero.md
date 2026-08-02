# Hero

## Source Code

The Hero component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Hero/index.tsx).

## Anatomy

Hero is not built on a MUI component. It renders a single `<section>` with the layers stacked inside it, so there is no MUI API underneath and no subcomponents to import:

- The background, from `backgroundFill`. A string is applied as a background color; a node is rendered into a full-bleed container where any img or video is stretched to cover the section.

- The darkening mask, from `darkeningMask`, which sits above the background and below everything else.

- The overlay media layer, from `overlayMedia`, positioned on its own so it does not follow the text.

- The content block, made of the `headerText` heading, the `captionText` paragraph, and a slot holding `children`.

- The vignette, from `darkeningVignette`, drawn on top of everything along the top edge.

`headerText` renders as an `h1`, so use one Hero per page and keep the rest of the page's headings below it.

## Layout notes

- The side padding is driven by the viewport, not by the width of the Hero: 24px below 512px, 40px from 512px, and 120px from 1024px, which are the SDS sm, md, and lg breakpoints. The top and bottom padding is always 40px. In these previews the Hero is narrower than the viewport, so you are seeing the large breakpoint padding inside a small box.

- There is no built-in maximum width on the content area. Use `overlayContentWidth` when the text should not span the full section.

- `heroHeight` is ignored below 512px, where the section always falls back to `fit-content`.

- `darkeningMask` on its own changes nothing, because `darkeningMaskOpacity` defaults to `0`. Set both.

- `hasInvertTextColor` only applies to the header and the caption. Content passed as children keeps its own colors.

## Props

Hero owns all of these props. Anything else, such as `className` or event handlers, is spread onto the section element.

### Content

| Name                 | Type                    | Default | Description                                                                                    |
| -------------------- | ----------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `headerText`         | `string`                | -       | The headline. Rendered as an `h1` and omitted entirely when not provided.                      |
| `headerFontSize`     | `"s"` \| `"m"` \| `"l"` | `"m"`   | The type scale of the headline.                                                                |
| `captionText`        | `string`                | -       | Supporting copy rendered below the headline.                                                   |
| `children`           | `ReactNode`             | -       | Rendered in a full-width slot below the caption. Use it for buttons, links, or a search field. |
| `hasInvertTextColor` | `bool`                  | `false` | Switches the headline and caption to the inverse text color for use on dark backgrounds.       |

### Layout

| Name                        | Type                                                                                                                 | Default                   | Description                                                                                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `heroHeight`                | `string`                                                                                                             | `"fit-content"`           | Any CSS height. Below a 512px viewport it is ignored and the section falls back to `fit-content`.                                                                                                                                          |
| `overlayContentPosition`    | `"top-left" \| "top" \| "top-right" \| "left" \| "center" \| "right" \| "bottom-left" \| "bottom" \| "bottom-right"` | `"center"`                | Where the content block sits inside the section. Only visible when the section is taller or wider than the content.                                                                                                                        |
| `overlayContentWidth`       | `string`                                                                                                             | `"100%"`                  | Any CSS width for the content block, for example `"60%"` or `"640px"`.                                                                                                                                                                     |
| `textAlignment`             | `"left" \| "center" \| "right"`                                                                                      | -                         | Aligns the text within the content block, which starts at the leading edge when the prop is unset. This is separate from `overlayContentPosition`, which moves the block itself.                                                           |
| `overlayContainerMinMargin` | `{ small: number; medium: number; large: number }`                                                                   | `24px` / `40px` / `120px` | Overrides the side padding at each breakpoint. The value is written straight into CSS, so it needs a unit. The `number` type in the signature is wrong: a plain number produces an invalid declaration and the side padding drops to zero. |

### Background and media

| Name                    | Type                                                                                                                 | Default     | Description                                                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `backgroundFill`        | `string \| ReactNode`                                                                                                | -           | A string becomes the background color, so any CSS color or gradient works. A node is rendered full-bleed behind the content, and an img or video inside it is scaled to cover the section. |
| `darkeningMask`         | `bool`                                                                                                               | `false`     | Adds a solid layer over the background. Pair it with `darkeningMaskOpacity`, which is `0` by default.                                                                                      |
| `darkeningMaskColor`    | `string`                                                                                                             | `"#000000"` | The color of that layer.                                                                                                                                                                   |
| `darkeningMaskOpacity`  | `number`                                                                                                             | `0`         | The opacity of that layer, from 0 to 1.                                                                                                                                                    |
| `darkeningVignette`     | `bool`                                                                                                               | `false`     | Draws a 40px gradient along the top edge, above the content, so a transparent header navigation stays legible.                                                                             |
| `overlayMedia`          | `ReactNode`                                                                                                          | -           | A media layer above the background and independent of the text block. An img or video inside it is scaled to cover the layer.                                                              |
| `overlayMediaPosition`  | `"top-left" \| "top" \| "top-right" \| "left" \| "center" \| "right" \| "bottom-left" \| "bottom" \| "bottom-right"` | `"center"`  | Where that layer sits inside the section.                                                                                                                                                  |
| `overlayMediaMaxWidth`  | `string`                                                                                                             | -           | Sets the width of the media layer outright rather than a maximum, despite the name. Without it the layer has no width.                                                                     |
| `overlayMediaMaxHeight` | `string`                                                                                                             | -           | Sets the height of the media layer, with the same caveat.                                                                                                                                  |
| `overlayMediaMargin`    | `string \| { small: string; medium: string; large: string }`                                                         | `"0"`       | A margin shorthand for the media layer. Pass the object form to vary it by breakpoint: `small` below md, `medium` below lg, `large` above.                                                 |

## Code examples

### Default Hero

A headline, a caption, and a background color. With no `heroHeight` the section is as tall as its content plus the 40px of top and bottom padding.

**Example: DefaultHero**

```tsx
// headerText and captionText are the only content props. Without heroHeight the
// section is as tall as its content plus the responsive padding.

import { Hero } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Hero
        headerText="Explore the Cell Atlas"
        captionText="Browse millions of annotated cells across tissues, species, and disease states."
        backgroundFill="#EFF2FC"
      />
    </div>
  );
}

export default App;
```

### Header Sizes

`headerFontSize` picks the type scale for the headline. The caption is fixed and does not change with it.

**Example: HeroHeaderSizes**

```tsx
// headerFontSize maps to the SDS header type scale: s, m (the default), and l.

import { Hero } from "@czi-sds/components";

const SIZES = ["s", "m", "l"] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {SIZES.map((size) => (
        <Hero
          key={size}
          headerFontSize={size}
          headerText={`headerFontSize "${size}"`}
          captionText="The caption always uses the same type style."
          backgroundFill="#EFF2FC"
        />
      ))}
    </div>
  );
}

export default App;
```

### Hero with a Background Image

Passing a node to `backgroundFill` renders it full-bleed behind the content. The darkening mask keeps the text readable, and it needs both `darkeningMask` and a `darkeningMaskOpacity` above zero.

**Example: HeroWithBackgroundImage**

```tsx
// backgroundFill also takes a node, which is stretched to cover the section.
// The darkening mask needs both darkeningMask and a darkeningMaskOpacity above
// zero, and hasInvertTextColor flips the title and caption to the light color.

import { Hero } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const BACKGROUND =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='rgb(58,74,148)'/><stop offset='100%' stop-color='rgb(126,86,194)'/></linearGradient></defs><rect width='1200' height='600' fill='url(%23g)'/></svg>";

function App() {
  return (
    <div className="app">
      <Hero
        heroHeight="320px"
        backgroundFill={<img src={BACKGROUND} alt="" />}
        darkeningMask
        darkeningMaskOpacity={0.4}
        hasInvertTextColor
        headerText="Single-cell data, ready to explore"
        captionText="The mask sits between the background and the content, so the text stays legible over busy imagery."
      />
    </div>
  );
}

export default App;
```

### Content Position and Alignment

`overlayContentPosition` moves the whole content block within the section, while `textAlignment` aligns the text inside that block. Both need room to be visible, which comes from `heroHeight` and `overlayContentWidth`.

**Example: HeroContentPosition**

```tsx
// overlayContentPosition places the content block inside the section, while
// textAlignment aligns the text within that block. overlayContentWidth keeps
// the block from spanning the full width.

import { Hero } from "@czi-sds/components";

const POSITIONS = [
  { position: "top-left", textAlignment: "left" },
  { position: "center", textAlignment: "center" },
  { position: "bottom-right", textAlignment: "right" },
] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {POSITIONS.map(({ position, textAlignment }) => (
        <Hero
          key={position}
          heroHeight="280px"
          backgroundFill="#EFF2FC"
          overlayContentPosition={position}
          overlayContentWidth="60%"
          textAlignment={textAlignment}
          headerText={position}
          captionText={`overlayContentPosition "${position}" with textAlignment "${textAlignment}".`}
        />
      ))}
    </div>
  );
}

export default App;
```

### Hero with a Call to Action

Children render in a slot below the caption. That slot keeps its own colors, so `hasInvertTextColor` does not reach the buttons.

**Example: HeroWithCallToAction**

```tsx
// Children render in a content slot below the caption. Anything can go there;
// buttons and links are the common case. The slot does not inherit
// hasInvertTextColor, so style its contents yourself.

import { Button, Hero } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Hero
        heroHeight="320px"
        backgroundFill="#EFF2FC"
        overlayContentWidth="60%"
        headerText="Start a new analysis"
        captionText="Upload your samples and get results in minutes."
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <Button sdsStyle="solid" sdsType="primary">
            Upload samples
          </Button>
          <Button sdsStyle="outline" sdsType="primary">
            View the docs
          </Button>
        </div>
      </Hero>
    </div>
  );
}

export default App;
```

### Hero with Overlay Media

Overlay media is positioned independently of the text, so narrow the content block with `overlayContentWidth` to keep the two from overlapping.

**Example: HeroWithOverlayMedia**

```tsx
// overlayMedia is a second layer of content, positioned independently of the
// text. Despite their names, overlayMediaMaxWidth and overlayMediaMaxHeight set
// the width and the height of that layer outright.

import { Hero } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const MEDIA =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='400' height='200' rx='8' fill='rgb(126,86,194)'/><circle cx='300' cy='60' r='40' fill='rgb(207,212,220)'/></svg>";

function App() {
  return (
    <div className="app">
      <Hero
        heroHeight="320px"
        backgroundFill="#EFF2FC"
        overlayContentWidth="50%"
        overlayContentPosition="left"
        headerText="Media alongside the copy"
        captionText="The text block is held to half the width so the two layers do not collide."
        overlayMedia={<img src={MEDIA} alt="" />}
        overlayMediaPosition="right"
        overlayMediaMaxWidth="240px"
        overlayMediaMaxHeight="120px"
        overlayMediaMargin="0 24px 0 0"
      />
    </div>
  );
}

export default App;
```

### Hero with a Vignette

The vignette is a 40px gradient along the top edge, meant to sit behind a transparent header navigation.

**Example: HeroWithVignette**

```tsx
// darkeningVignette draws a 40px gradient across the top edge. It exists so a
// transparent header navigation stays legible where it meets the Hero.

import { Hero } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const BACKGROUND =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='1200' height='600' fill='rgb(108,166,255)'/><circle cx='200' cy='120' r='160' fill='rgb(178,150,242)'/></svg>";

function App() {
  return (
    <div className="app">
      <Hero
        heroHeight="280px"
        backgroundFill={<img src={BACKGROUND} alt="" />}
        darkeningVignette
        hasInvertTextColor
        headerText="Blending into the navigation"
        captionText="The gradient only covers the top 40px of the section."
      />
    </div>
  );
}

export default App;
```
