# Content Card

Content Cards are used throughout the UI to present information in a visually organized format that highlights key information or details in a way that is scannable and easy to digest.

## Guidelines

## Overview

|  | In Figma |   |  | Meets Accessibility |   |  | In Code |
| --- | --- | --- | --- | --- | --- | --- | --- |

### Content Card Variants

Content Cards come in two different variants: Narrow and Wide. When viewed on narrow screens, such as a mobile device, the Narrow variant is automatically displayed. Teams can decide how many cards they wish to arrange horizontally and / or vertically on a page.

Teams can individually control each element on Content Card including having two slots (one next to the Title text and one in the body of the card) that can be filled with whatever content is needed, providing maximum flexibility and serving a wide range of use cases.

---

### Live Instance

Interact with the live instance below and adjust the available props to better conceptualize how it will appear in product:

---

### Content Card – Wide

Content Card – Wide has the text and body content arranged horizontally beside the visual element and is best used by itself or beside one other Content Card; if more than two Content Cards need to be displayed horizontally beside each other, use the Narrow variant. When the width of the container the Content Card is placed within is reduced to less than 600px, the Wide variant will automatically convert to a Narrow variant.

All text elements (overline text, title text, subtitle text, metadata text, body text) are optional and any combination of these elements can be used as teams see necessary.

The visual element on the Content Card can be an image, an icon, or not used at all. When displaying an image, teams set the width of the image in pixels and its height will automatically adjust as needed based on the overall space available to the Content Card on the page. The image can either be displayed with padding around it or extended to the edge of the Content Card's container. The image can be positioned on the left or right side of the Content Card.

Teams can choose whether to display the Content Card with a bounding box, with a decorative border, as well as determine the position of and how many Buttons, if any, are included. For Content Cards with one or zero Buttons, the Content Card itself can function as a Button.

#### Visual Element Options

| Image | Icon | None |
| --- | --- | --- |

#### Image Options

| Image left (padding) | Image left (no padding) | Image right (padding) | Image right (no padding) |
| --- | --- | --- | --- |

#### Content Options

| Text | Slot |
| --- | --- |

#### Additional Options

All of the following options are available regardless of whether the image is positioned on the left or right side of the Content Card

| With decorative border | Without decorative border | With bounding box | Without bounding box |
| --- | --- | --- | --- |

| Left-aligned Buttons | Right-aligned Buttons |
| --- | --- |

#### Interaction States

For Content Cards with one or zero Buttons, the Content Card itself can function as a Button.

The following states are used regardless of whether there is a visual element included on the Content Card and, if the visual element is an image, regardless of whether it is positioned on the left or right side of the Content Card.

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Content Card – Narrow

Content Card – Narrow has the text and body content arranged vertically below the visual element and is best used beside two or more other Content Cards. When viewed on narrow screens, such as a mobile device, any horizontally arranged Content Cards will wrap to stack in a single column.

All text elements (overline text, title text, subtitle text, metadata text, body text) are optional and any combination of these elements can be used as teams see necessary.

The Narrow variant can either use an image as a visual element or not contain a visual element at all. Teams set the height of the image in pixels and its width will automatically adjust as needed based on the overall space available to the Content Card on the page. The image can either be displayed with padding around it or extended to the edge of the Content Card's container.

Teams can choose whether to display the Content Card with a bounding box, with a decorative border, as well as determine the position of and how many Buttons, if any, are included. For Content Cards with one or zero Buttons, the Content Card itself can function as a Button.

#### Visual Element Options

| Image | Icon | None |
| --- | --- | --- |

#### Image Options

| Padding | No Padding |
| --- | --- |

#### Content Options

| Text | Slot |
| --- | --- |

#### Additional Options

| With decorative border | Without decorative border | With bounding box | Without bounding box |
| --- | --- | --- | --- |

| Left-aligned Buttons | Right-aligned Buttons |
| --- | --- |

#### Interaction States

For Content Cards with one or zero Buttons, the Content Card itself can function as a Button.

The following states are used regardless of whether there is a visual element included on the Content Card.

| Default | Hover | Pressed |
| --- | --- | --- |

---

### Content Card Spacing

These rules establish how much margin should exist between and around elements.

## Code

>**Note:** The code examples below must install dependencies before displaying and may take extra time to load

## Content Card

### SDS Source Code

The component's source code in the SDS codebase can be found here.

### MUI Documentation

Documentation for the underlying MUI `Card` component can be found here.

### Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `boundingBox` | `boolean` | `true` | If `true`, wraps content and visuals inside a bounded layout with background and padding. |
| `buttonsPosition` | `"left"` |`"right"` | `"left"` | Determines the alignment of buttons in the ContentCardActions component. |
| `classes` | `object` | `-` | Custom class names for different card sub-sections (e.g., cardPaper, cardTitle, cardActions, etc.). Could be used to style the component with TailwindCss. Full list of available class names are:`cardPaper`, `cardContent`, `cardHeader`, `cardMedia`, `cardOverline`, `cardTitle`, `cardSubtitle`, `cardMetadata`, `cardActions`, `clickableCardButton` |
| `decorativeBorder` | `boolean` | `false` | If `true`, shows a decorative border around the card. |
| `children` | `ReactNode` | `-` | The content to be displayed inside the card body, including custom components and ContentCardActions. |
| `clickableCard` | `boolean` | `false` | If `true`, wraps the card with an action area and makes it clickable. |
| `clickableCardProps` | `Partial<SdsMinimalButtonProps>` | `-` | Props forwarded to the clickable card wrapper when clickableCard is true. |
| `icon` | `ReactNode` | `-` | The icon displayed in the card when `visualElementType` is `icon`. |
| `image` | `ReactNode` | `-` | The image displayed in the card when `visualElementType` is `image`. |
| `imagePadding` | `boolean` | `false` | If `true`, applies padding around the image inside the card. |
| `imagePosition` | `"left"` | `"right"` | `"left"` | Position of the image in the card layout (left or right). |
| `imageSize` | `number` | `300` | Width of the image area in pixels when `visualElementType` is `image`. |
| `metadataText` | `ReactNode` | `-` | Optional metadata text, usually used for extra context like date or author. |
| `overlineText` | `ReactNode` | `-` | A small overline text displayed above the title. |
| `sdsType` | `"wide"` | `"narrow"` | `"wide"` | Determines the card layout style. `wide` shows the image and content side by side, `narrow` stacks them vertically. |
| `subtitleText` | `ReactNode` | `-` | Optional subtitle text displayed below the title. |
| `titleText` | `ReactNode` | `-` | The main title text of the card.  |
| `visualElementType` | `"image"` | `"icon"` | `"none"` | `"none"` | Specifies what type of visual element to render on the card: an image, an icon, or none. |

### Code examples

>**Note:** Due to a bug in Zeroheight we are unable to publish code examples at this time; we will update this section once a fix is released.

