import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Custom Icons</h1>
<p>
  These are the icons <code>@czi-sds/icons</code> adds to the Phosphor set.
  Everything else comes from
  <a href="https://phosphoricons.com" target="_blank">Phosphor</a>
  directly.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { AtlasIcon } from "@czi-sds/icons";</code></pre>
  </figure>
</div>
<h2>Why these icons live in SDS</h2>
<p>An icon is kept here for one of two reasons.</p>
<p>
  <strong>Phosphor does not have it.</strong> Brand marks are the clearest case,
  since no icon library is going to carry the Biohub mark. The same goes for the
  concepts specific to the science these products do, such as
  <code>AtlasIcon</code> and <code>UmapIcon</code>.
</p>
<p>
  <strong>Phosphor has something close, and SDS wants its own version.</strong>
  Phosphor ships a sparkle, a magic wand, a GitHub mark and a pie chart of its
  own. Where an icon appears in this list anyway, the design team has settled on
  a particular drawing for it, usually because the icon carries a meaning across
  products that a generic one would blur. The generative and predictive
  affordances are the main example.
</p>
<div class="sds-doc-callout sds-doc-callout-background-3">
  <p>
    Either way the rule at the point of use is the same: if an icon is in this
    list, import it from <code>@czi-sds/icons</code> rather than reaching for
    the Phosphor lookalike. Mixing the two reads as an inconsistency, and a
    reader cannot tell from the JSX which one they got.
  </p>
</div>
<h2>The set</h2>
<div class="sds-doc-example" data-example="icons/CustomIconGallery"></div>
<h2>Names</h2>
<p>
  Every export is named <code>&lt;Name&gt;Icon</code>, the same convention
  Phosphor uses, so an icon reads the same whichever package it came from and
  the import line is what says which one that was.
</p>
<p>
  One name appears in both packages: <code>SparkleIcon</code>. Phosphor has a
  sparkle of its own, and SDS keeps a different drawing under the same name. A
  file that needs both has to rename one of them on import.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { SparkleIcon } from "@czi-sds/icons";
import { SparkleIcon as PhosphorSparkleIcon } from "@phosphor-icons/react";</code></pre>
  </figure>
</div>
<p>
  Prefer the SDS one where both would do, for the reason above: it is the
  drawing the design team has settled on.
</p>
<h2>One drawing, every weight</h2>
<p>
  Phosphor's icons are drawn six times, once per weight. These are drawn once,
  and the same drawing is registered under all six weights. That keeps
  <code>weight</code> in the API, so an icon under an
  <code>IconContext</code> that sets <code>weight="bold"</code> renders normally
  rather than disappearing, but the artwork does not change. Reach for a
  Phosphor icon where weight is doing real work, such as a filled star for a
  rating.
</p>
<h2>Adding an icon</h2>
<p>
  An icon belongs here if it meets one of the two bars above: Phosphor has
  nothing for it, or Phosphor has something close and the design team wants a
  drawing of our own. Anything else should come from Phosphor, so agree the
  addition with design before writing it. Every icon added here is one the
  design system then maintains.
</p>
<p>
  Icons live in
  <a
    href="https://github.com/chanzuckerberg/sci-components/tree/main/packages/icons"
    target="_blank"
  >
    packages/icons
  </a>
  as path data rather than SVG files, which is how Phosphor stores its own. To
  add one:
</p>
<ol>
  <li>
    <p>
      Export the artwork as an SVG, flattened so it is only
      <code>path</code> elements, with <code>fill</code> and
      <code>stroke</code> attributes stripped: both are inherited from the
      wrapper <code>IconBase</code> renders. An icon drawn with strokes needs
      them outlined into fills first, or the <code>color</code> prop cannot
      reach it.
    </p>
  </li>
  <li>
    <p>
      Put the artwork on a 256x256 grid, which is the
      <code>viewBox</code>
      <code>IconBase</code> renders. Design draws at 16, 24 or 32, so the
      coordinates are scaled by 16, 10.667 or 8 on the way in. Scaling the path
      data once, when the icon is added, keeps the stored artwork in the same
      coordinate space as Phosphor's own and leaves nothing to transform at
      render time.
    </p>
  </li>
  <li>
    <p>
      Add the paths to <code>src/defs/&lt;Name&gt;.tsx</code> as the contents of
      the SVG rather than the SVG itself, so a single <code>path</code>, or a
      <code>Fragment</code> of them where the artwork has several.
    </p>
  </li>
  <li>
    <p>
      Add the component in <code>src/icons/&lt;Name&gt;.tsx</code> with
      <code>createSdsIcon</code>, and export it from <code>src/index.ts</code>.
    </p>
  </li>
</ol>
<p>
  This is the shape
  <a
    href="https://github.com/phosphor-icons/react#custom-icons"
    target="_blank"
    rel="noreferrer"
    >Phosphor documents for custom icons</a
  >, with one simplification: their icons map each of the six weights to its own
  drawing, and an SDS icon registers the one drawing under all six.
</p>
<h2>Icons of your own</h2>
<p>
  <code>createSdsIcon</code> is exported, so an application can build a one-off
  icon that behaves like the rest, including inheriting from
  <code>IconContext</code>. It takes a display name and the artwork.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { createSdsIcon } from "@czi-sds/icons";

// Path data on a 256x256 grid, as the contents of the SVG rather than the SVG.
export const MyIcon = createSdsIcon("MyIcon", &lt;path d="..." /&gt;);</code></pre>
  </figure>
</div>
`}));export{n,t};