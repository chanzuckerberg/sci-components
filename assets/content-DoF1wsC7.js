import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Content Card</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ContentCard"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import {
  ContentCard,
  ContentCardActions,
  ContentCardBody,
} from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3><strong>Default Content Card</strong></h3>
<p>
  This example has the minimum props needed for the ContentCard component.
  <code>visualElementType</code> is the only required prop, and it must be set
  even when the card has no visual.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/DefaultContentCard"
></div>
<h3>Text slots</h3>
<p>
  This example shows the four text props and the order they render in, with body
  copy passed as children.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/ContentCardTextSlots"
></div>
<h3>Content Card with an image</h3>
<p>
  This example shows an image card in both image positions. The
  <code>image</code> prop takes either a URL string or a CardMedia element,
  <code>imageSize</code> sets the width of the image area, and
  <code>imagePadding</code> insets the image instead of letting it meet the card
  border.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/ContentCardWithAnImage"
></div>
<h3>Content Card with an icon</h3>
<p>
  This example swaps the image for an icon. The <code>image</code> and
  <code>icon</code> props are mutually exclusive, and which one is available
  follows <code>visualElementType</code>.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/ContentCardWithAnIcon"
></div>
<h3>Narrow Content Card</h3>
<p>
  This example shows the narrow layout, which stacks the visual above the
  content and suits card grids. A wide card also switches to this layout on its
  own once it is rendered below roughly 595px.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/NarrowContentCard"
></div>
<h3>Content Card with actions</h3>
<p>
  This example adds a button row through ContentCardActions, which accepts SDS
  Button elements only. Alignment comes from <code>buttonsPosition</code> on the
  card.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/ContentCardWithActions"
></div>
<h3>Clickable Content Card</h3>
<p>
  This example makes the whole card a single click target.
  <code>clickableCardProps</code> is forwarded to the wrapper, so the card can
  act as a link, and only the first button in ContentCardActions survives, since
  a button cannot be nested inside another button.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/ClickableContentCard"
></div>
<h3>Bounding box and decorative border</h3>
<p>
  This example shows the two framing options: the accent bar added by
  <code>decorativeBorder</code>, and a card with <code>boundingBox</code> turned
  off so it sits directly on the page.
</p>
<div
  class="sds-doc-example"
  data-example="core/ContentCard/ContentCardBoundingBox"
></div>
<h2>Anatomy</h2>
<p>
  A ContentCard takes its text through props rather than through composition:
  <code>overlineText</code>, <code>titleText</code>, <code>subtitleText</code>,
  and <code>metadataText</code> are rendered in that order, each with its own
  styling. Children are for everything below that text block.
</p>
<p>
  Alongside the card itself, the package exports the pieces used to fill those
  children:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>ContentCardBody</code>: wraps body copy so it picks up the card's
      body styling.
    </p>
  </li>
  <li>
    <p>
      <code>ContentCardActions</code>: holds the card's buttons. It accepts SDS
      Button elements only, and anything else is dropped with a warning. The
      card injects <code>buttonsPosition</code> into it, so alignment is set on
      the card rather than here.
    </p>
  </li>
  <li>
    <p>
      <code>ContentCardMedia</code>: MUI's CardMedia, re-exported for building
      an image element by hand instead of passing a URL to the
      <code>image</code> prop.
    </p>
  </li>
  <li>
    <p>
      <code>ContentCardOverline</code>, <code>ContentCardTitle</code>,
      <code>ContentCardSubtitle</code>, <code>ContentCardMetadata</code>: the
      styled text elements the card uses internally, exported for reuse in
      custom layouts. Prefer the matching props for ordinary cards.
    </p>
  </li>
</ul>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI Card component can be found
  <a href="https://mui.com/material-ui/react-card/">here</a>
  .
</p>
<h2>Props</h2>
<p>
  Any custom SDS props and MUI props required for implementation are found on
  the table below. See the MUI documentation for additional optional props.
</p>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>visualElementType</code></p>
    </td>
    <td>
      <p><code>"image" | "icon" | "none"</code></p>
    </td>
    <td>
      <p><code>"none"</code></p>
    </td>
    <td>
      <p>
        <strong>Required.</strong>
        Specifies what type of visual element to render on the card: an image,
        an icon, or none. It also narrows which visual props are accepted, so
        image props are only available on an image card and icon on an icon
        card.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>boundingBox</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>
        If <code>true</code>, wraps content and visuals inside a bounded layout
        with background and padding. It is forced on when
        <code>clickableCard</code> is <code>true</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>buttonsPosition</code></p>
    </td>
    <td>
      <p><code>"left" |"right"</code></p>
    </td>
    <td>
      <p><code>"left"</code></p>
    </td>
    <td>
      <p>
        Determines the alignment of buttons in the ContentCardActions component.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>classes</code></p>
    </td>
    <td>
      <p><code>object</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Custom class names for different card sub-sections (e.g.,
        <code>cardPaper</code>, <code>cardTitle</code>,
        <code>cardActions</code>, etc.). Could be used to style the component
        with TailwindCss. Full list of available class names
        are:<code>cardPaper</code>, <code>cardContent</code>,
        <code>cardHeader</code>, <code>cardMedia</code>,
        <code>cardOverline</code>, <code>cardTitle</code>,
        <code>cardSubtitle</code>, <code>cardMetadata</code>,
        <code>cardActions</code>,
        <code>clickableCardButton</code>
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>decorativeBorder</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        If <code>true</code>, draws an accent bar along the leading edge of the
        card: down the left side of a wide card, across the top of a narrow one.
        It requires <code>boundingBox</code>, and on an image card it only
        appears when the image is on the right, or on the left with
        <code>imagePadding</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>children</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The content to be displayed inside the card body, including custom
        components and ContentCardActions.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>clickableCard</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        If <code>true</code>, wraps the card with an action area and makes it
        clickable. Because the card then is a button, ContentCardActions keeps
        only its first button and renders it as a <code>div</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>clickableCardProps</code></p>
    </td>
    <td>
      <p><code>Partial&lt;ButtonProps &amp; { target?: string }&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Props forwarded to the clickable card wrapper when
        <code>clickableCard</code> is <code>true</code>, including
        <code>href</code> and <code>target</code> to make the whole card a link.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>icon</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The icon displayed in the card when <code>visualElementType</code> is
        <code>"icon"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>image</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The image displayed in the card when <code>visualElementType</code> is
        <code>"image"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>imagePadding</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        If <code>true</code>, applies padding around the image inside the card.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>imagePosition</code></p>
    </td>
    <td>
      <p><code>"left" | "right"</code></p>
    </td>
    <td>
      <p><code>"left"</code></p>
    </td>
    <td>
      <p>
        Position of the image in the card layout (<code>"left"</code> or
        <code>"right"</code>).
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>imageSize</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td>
      <p><code>300</code></p>
    </td>
    <td>
      <p>
        Width of the image area in pixels when
        <code>visualElementType</code> is <code>"image"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>metadataText</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Optional metadata text, usually used for extra context like date or
        author.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>overlineText</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>A small overline text displayed above the title.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"wide" | "narrow"</code></p>
    </td>
    <td>
      <p><code>"wide"</code></p>
    </td>
    <td>
      <p>
        Determines the card layout style. <code>"wide"</code> shows the image
        and content side by side, <code>"narrow"</code> stacks them vertically.
        The card watches its own width and switches to narrow on its own once it
        drops below roughly 595px, so this prop sets the layout it uses when
        there is room.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>subtitleText</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Optional subtitle text displayed below the title.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>titleText</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>The main title text of the card.</p></td>
  </tr>
</table>
`}));export{n,t};