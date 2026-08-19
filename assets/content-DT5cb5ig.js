import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Corners</h1>
<p>
  The border radii SDS rounds its elements with, in six steps from
  <code>none</code> up to the 20px <code>rounded</code> pill.
</p>
<h2>Source Code</h2>
<p>
  The tokens behind these values can be found in
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/common/styles-dictionary/design-tokens/corners.json"
  >
    corners.json
  </a>
  .
</p>
<h2>Usage</h2>
<p>
  <code>getCorners</code> reads the scale off the theme and returns numbers, so
  add the unit yourself. Every step is also published as a CSS and SCSS
  variable, already in pixels.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import styled from "@emotion/styled";
import { getCorners, type CommonThemeProps } from "@czi-sds/components";

export const Card = styled.div&lt;CommonThemeProps&gt;\`
  \${(props) =&gt; \`border-radius: \${getCorners(props)?.m}px;\`}
\`;</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>CSS</figcaption>
    <pre><code class="sds-doc-codeblock-content language-css">.card {
  border-radius: var(--sds-corner-m);
}</code></pre>
  </figure>
</div>
<h2>All corners</h2>
<p>Click a variable name to copy it.</p>
<div class="sds-doc-slot" data-slot="corners"></div>
<h2>Design documentation</h2>
<p>
  For which step to use where, see the
  <a href="./?path=/docs/design-documentation-bases-corners--docs" target="_top"
    >Corners</a
  >
  design documentation.
</p>
`}));export{n,t};