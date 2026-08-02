# Content Card

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ContentCard).

## Anatomy

A ContentCard takes its text through props rather than through composition: `overlineText`, `titleText`, `subtitleText`, and `metadataText` are rendered in that order, each with its own styling. Children are for everything below that text block.

Alongside the card itself, the package exports the pieces used to fill those children:

- `ContentCardBody`: wraps body copy so it picks up the card's body styling.

- `ContentCardActions`: holds the card's buttons. It accepts SDS Button elements only, and anything else is dropped with a warning. The card injects `buttonsPosition` into it, so alignment is set on the card rather than here.

- `ContentCardMedia`: MUI's CardMedia, re-exported for building an image element by hand instead of passing a URL to the `image` prop.

- `ContentCardOverline`, `ContentCardTitle`, `ContentCardSubtitle`, `ContentCardMetadata`: the styled text elements the card uses internally, exported for reuse in custom layouts. Prefer the matching props for ordinary cards.

## MUI Documentation

Documentation for the underlying MUI Card component can be found [here](https://mui.com/material-ui/react-card/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name                 | Type                                         | Default  | Description                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | -------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visualElementType`  | `"image" \| "icon" \| "none"`                | `"none"` | **Required.** Specifies what type of visual element to render on the card: an image, an icon, or none. It also narrows which visual props are accepted, so image props are only available on an image card and icon on an icon card.                                                                                                                             |
| `boundingBox`        | `boolean`                                    | `true`   | If `true`, wraps content and visuals inside a bounded layout with background and padding. It is forced on when `clickableCard` is `true`.                                                                                                                                                                                                                        |
| `buttonsPosition`    | `"left" \|"right"`                           | `"left"` | Determines the alignment of buttons in the ContentCardActions component.                                                                                                                                                                                                                                                                                         |
| `classes`            | `object`                                     | -        | Custom class names for different card sub-sections (e.g., `cardPaper`, `cardTitle`, `cardActions`, etc.). Could be used to style the component with TailwindCss. Full list of available class names are:`cardPaper`, `cardContent`, `cardHeader`, `cardMedia`, `cardOverline`, `cardTitle`, `cardSubtitle`, `cardMetadata`, `cardActions`, `clickableCardButton` |
| `decorativeBorder`   | `boolean`                                    | `false`  | If `true`, draws an accent bar along the leading edge of the card: down the left side of a wide card, across the top of a narrow one. It requires `boundingBox`, and on an image card it only appears when the image is on the right, or on the left with `imagePadding`.                                                                                        |
| `children`           | `ReactNode`                                  | -        | The content to be displayed inside the card body, including custom components and ContentCardActions.                                                                                                                                                                                                                                                            |
| `clickableCard`      | `boolean`                                    | `false`  | If `true`, wraps the card with an action area and makes it clickable. Because the card then is a button, ContentCardActions keeps only its first button and renders it as a `div`.                                                                                                                                                                               |
| `clickableCardProps` | `Partial<ButtonProps & { target?: string }>` | -        | Props forwarded to the clickable card wrapper when `clickableCard` is `true`, including `href` and `target` to make the whole card a link.                                                                                                                                                                                                                       |
| `icon`               | `ReactNode`                                  | -        | The icon displayed in the card when `visualElementType` is `"icon"`.                                                                                                                                                                                                                                                                                             |
| `image`              | `ReactNode`                                  | -        | The image displayed in the card when `visualElementType` is `"image"`.                                                                                                                                                                                                                                                                                           |
| `imagePadding`       | `boolean`                                    | `false`  | If `true`, applies padding around the image inside the card.                                                                                                                                                                                                                                                                                                     |
| `imagePosition`      | `"left" \| "right"`                          | `"left"` | Position of the image in the card layout (`"left"` or `"right"`).                                                                                                                                                                                                                                                                                                |
| `imageSize`          | `number`                                     | `300`    | Width of the image area in pixels when `visualElementType` is `"image"`.                                                                                                                                                                                                                                                                                         |
| `metadataText`       | `ReactNode`                                  | -        | Optional metadata text, usually used for extra context like date or author.                                                                                                                                                                                                                                                                                      |
| `overlineText`       | `ReactNode`                                  | -        | A small overline text displayed above the title.                                                                                                                                                                                                                                                                                                                 |
| `sdsType`            | `"wide" \| "narrow"`                         | `"wide"` | Determines the card layout style. `"wide"` shows the image and content side by side, `"narrow"` stacks them vertically. The card watches its own width and switches to narrow on its own once it drops below roughly 595px, so this prop sets the layout it uses when there is room.                                                                             |
| `subtitleText`       | `ReactNode`                                  | -        | Optional subtitle text displayed below the title.                                                                                                                                                                                                                                                                                                                |
| `titleText`          | `ReactNode`                                  | -        | The main title text of the card.                                                                                                                                                                                                                                                                                                                                 |

## Code examples

### **Default Content Card**

This example has the minimum props needed for the ContentCard component. `visualElementType` is the only required prop, and it must be set even when the card has no visual.

**Example: DefaultContentCard**

```tsx
// Most minimal ContentCard: visualElementType is the only required prop

import { ContentCard, ContentCardBody } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        titleText="Content Card title"
        subtitleText="A subtitle that sits under the title"
      >
        <ContentCardBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          facilisis tortor et pellentesque pulvinar. Ut at convallis ipsum.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Text slots

This example shows the four text props and the order they render in, with body copy passed as children.

**Example: ContentCardTextSlots**

```tsx
// The four text slots, in the order they are rendered

import { ContentCard, ContentCardBody } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        overlineText="Overline"
        titleText="Content Card title"
        subtitleText="Subtitle"
        metadataText="Metadata, such as a date or an author"
      >
        <ContentCardBody>
          Anything passed as children renders below the text slots. Wrap plain
          copy in ContentCardBody so it picks up the card's body styling.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Content Card with an image

This example shows an image card in both image positions. The `image` prop takes either a URL string or a CardMedia element, `imageSize` sets the width of the image area, and `imagePadding` insets the image instead of letting it meet the card border.

**Example: ContentCardWithAnImage**

```tsx
import { ContentCard, ContentCardBody } from "@czi-sds/components";

// Inline placeholder so the example does not depend on a remote image
const IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(207,212,220)'/></svg>";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <ContentCard
        visualElementType="image"
        image={IMAGE}
        imageSize={200}
        titleText="Image on the left"
        subtitleText="The default image position"
      >
        <ContentCardBody>
          Pass image either a URL string or a CardMedia element. imageSize sets
          the width of the image area in pixels.
        </ContentCardBody>
      </ContentCard>

      <ContentCard
        visualElementType="image"
        image={IMAGE}
        imageSize={200}
        imagePosition="right"
        imagePadding
        titleText="Image on the right, with padding"
        subtitleText="imagePosition and imagePadding"
      >
        <ContentCardBody>
          imagePadding insets the image from the edge of the card instead of
          letting it bleed to the border.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Content Card with an icon

This example swaps the image for an icon. The `image` and `icon` props are mutually exclusive, and which one is available follows `visualElementType`.

**Example: ContentCardWithAnIcon**

```tsx
import { ContentCard, ContentCardBody, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="icon"
        icon={<Icon sdsIcon="Compass" sdsSize="xl" />}
        titleText="Icon instead of an image"
        subtitleText="The icon sits to the left of the content"
      >
        <ContentCardBody>
          Set visualElementType to icon and pass any Icon element. The icon and
          image props are mutually exclusive.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Narrow Content Card

This example shows the narrow layout, which stacks the visual above the content and suits card grids. A wide card also switches to this layout on its own once it is rendered below roughly 595px.

**Example: NarrowContentCard**

```tsx
// Narrow cards stack the visual above the content, which suits card grids

import { ContentCard, ContentCardBody } from "@czi-sds/components";

const IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(207,212,220)'/></svg>";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "32px" }}>
      <ContentCard
        sdsType="narrow"
        visualElementType="image"
        image={IMAGE}
        imageSize={140}
        titleText="First card"
        subtitleText="Subtitle"
        style={{ width: "260px" }}
      >
        <ContentCardBody>
          A card also switches to the narrow layout on its own once it is
          rendered below roughly 595px wide.
        </ContentCardBody>
      </ContentCard>

      <ContentCard
        sdsType="narrow"
        visualElementType="image"
        image={IMAGE}
        imageSize={140}
        titleText="Second card"
        subtitleText="Subtitle"
        style={{ width: "260px" }}
      >
        <ContentCardBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          facilisis tortor et pellentesque pulvinar.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Content Card with actions

This example adds a button row through ContentCardActions, which accepts SDS Button elements only. Alignment comes from `buttonsPosition` on the card.

**Example: ContentCardWithActions**

```tsx
// ContentCardActions only accepts SDS Button elements

import {
  Button,
  ContentCard,
  ContentCardActions,
  ContentCardBody,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        buttonsPosition="right"
        titleText="Card with actions"
        subtitleText="buttonsPosition aligns the button row"
      >
        <ContentCardBody>
          Buttons belong in ContentCardActions, which the card positions for
          you. Anything that is not an SDS Button is dropped with a warning.
        </ContentCardBody>

        <ContentCardActions>
          <Button sdsStyle="minimal" sdsType="primary">
            Secondary action
          </Button>
          <Button sdsStyle="solid" sdsType="primary">
            Primary action
          </Button>
        </ContentCardActions>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Clickable Content Card

This example makes the whole card a single click target. `clickableCardProps` is forwarded to the wrapper, so the card can act as a link, and only the first button in ContentCardActions survives, since a button cannot be nested inside another button.

**Example: ClickableContentCard**

```tsx
// A clickable card is a single button, so it holds at most one action button

import {
  Button,
  ContentCard,
  ContentCardActions,
  ContentCardBody,
  Icon,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ContentCard
        visualElementType="none"
        clickableCard
        clickableCardProps={{
          href: "https://sds.czi.design",
          target: "_blank",
        }}
        titleText="The whole card is clickable"
        subtitleText="clickableCard also forces boundingBox on"
      >
        <ContentCardBody>
          clickableCardProps is forwarded to the wrapper, so the card can behave
          as a link. Only the first button in ContentCardActions is kept, since
          a button cannot be nested inside another button.
        </ContentCardBody>

        <ContentCardActions>
          <Button
            sdsStyle="minimal"
            sdsType="primary"
            endIcon={<Icon sdsIcon="ChevronRight" sdsSize="xs" />}
          >
            Learn more
          </Button>
        </ContentCardActions>
      </ContentCard>
    </div>
  );
}

export default App;
```

### Bounding box and decorative border

This example shows the two framing options: the accent bar added by `decorativeBorder`, and a card with `boundingBox` turned off so it sits directly on the page.

**Example: ContentCardBoundingBox**

```tsx
import { ContentCard, ContentCardBody } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <ContentCard
        visualElementType="none"
        decorativeBorder
        titleText="Decorative border"
        subtitleText="An accent bar on the leading edge"
      >
        <ContentCardBody>
          decorativeBorder draws an accent bar down the left edge of a wide card
          and across the top of a narrow one. It needs boundingBox to be on.
        </ContentCardBody>
      </ContentCard>

      <ContentCard
        visualElementType="none"
        boundingBox={false}
        titleText="No bounding box"
        subtitleText="The card sits directly on the page"
      >
        <ContentCardBody>
          Turning boundingBox off removes the border, background, and padding,
          which suits cards that are already inside a bounded surface.
        </ContentCardBody>
      </ContentCard>
    </div>
  );
}

export default App;
```
