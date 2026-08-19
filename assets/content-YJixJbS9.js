import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Breakpoints</h1>
<p>
  The three widths at which SDS layouts and typography change:
  <code>sm</code> at 0px, <code>md</code> at 512px and <code>lg</code> at
  1024px.
</p>
<h2>Source Code</h2>
<p>
  The tokens behind these values can be found in
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/common/styles-dictionary/design-tokens/breakpoints.json"
  >
    breakpoints.json
  </a>
  .
</p>
<h2>Usage</h2>
<p>
  <code>getBreakpoints</code> returns MUI's breakpoints object, so
  <code>up</code>, <code>down</code> and <code>between</code> are all available
  for writing media queries. The raw values are also published as CSS and SCSS
  variables, though only the SCSS ones can stand in a media query, since custom
  properties are not resolved there.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import styled from "@emotion/styled";
import { getBreakpoints, type CommonThemeProps } from "@czi-sds/components";

export const Layout = styled.div&lt;CommonThemeProps&gt;\`
  \${(props) =&gt; \`
    display: grid;
    grid-template-columns: 1fr;

    \${getBreakpoints(props)?.up("md")} {
      grid-template-columns: repeat(2, 1fr);
    }
  \`}
\`;</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>CSS</figcaption>
    <pre><code class="sds-doc-codeblock-content language-css">@import "~@czi-sds/components/dist/variables";

@media (min-width: $sds-breakpoint-md) {
  .layout {
    grid-template-columns: repeat(2, 1fr);
  }
}</code></pre>
  </figure>
</div>
<p>SDS typography switches to its narrow styles below <code>md</code>.</p>
<h2>All breakpoints</h2>
<p>Click a variable name to copy it.</p>
<div class="sds-doc-slot" data-slot="breakpoints"></div>
<h2>Design documentation</h2>
<p>
  For how layouts should behave at each size, see the
  <a
    href="./?path=/docs/design-documentation-bases-responsive-design--docs"
    target="_top"
    >Responsive Design</a
  >
  design documentation.
</p>
`}));export{n,t};