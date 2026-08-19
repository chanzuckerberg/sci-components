import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Spaces</h1>
<p>
  The one scale every gap, padding and margin in SDS is measured on, running
  from 2px to 40px.
</p>
<h2>Source Code</h2>
<p>
  The tokens behind these values can be found in
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/common/styles-dictionary/design-tokens/spaces.json"
  >
    spaces.json
  </a>
  .
</p>
<h2>Usage</h2>
<p>
  <code>getSpaces</code> reads the scale off the theme and returns numbers, so
  add the unit yourself. Every step is also published as a CSS and SCSS
  variable, already in pixels.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import styled from "@emotion/styled";
import { getSpaces, type CommonThemeProps } from "@czi-sds/components";

export const Row = styled.div&lt;CommonThemeProps&gt;\`
  \${(props) =&gt; {
    const spaces = getSpaces(props);

    return \`
      gap: \${spaces?.s}px;
      padding: \${spaces?.m}px;
    \`;
  }}
\`;</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>CSS</figcaption>
    <pre><code class="sds-doc-codeblock-content language-css">.row {
  gap: var(--sds-space-s);
  padding: var(--sds-space-m);
}</code></pre>
  </figure>
</div>
<h2>All spaces</h2>
<p>Click a variable name to copy it.</p>
<div class="sds-doc-slot" data-slot="spaces"></div>
<h2>Design documentation</h2>
<p>
  For which step to use where, see the
  <a href="./?path=/docs/design-documentation-bases-spacing--docs" target="_top"
    >Spacing</a
  >
  design documentation.
</p>
`}));export{n,t};