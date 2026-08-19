import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Colors</h1>
<p>
  The palette in two layers: raw primitives, and semantic colors that name a
  role and follow the light or dark theme. Prefer the semantic layer.
</p>
<h2>Source Code</h2>
<p>
  The tokens behind these colors can be found in
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/common/styles-dictionary/design-tokens/colors.json"
  >
    colors.json
  </a>
  .
</p>
<h2>Usage</h2>
<p>
  <code>getSemanticColors</code> and <code>getColors</code> read the two layers
  off the theme. Every token is also published as a CSS and SCSS variable, which
  is what to use in an app that does not style with Emotion.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import styled from "@emotion/styled";
import { getSemanticColors, type CommonThemeProps } from "@czi-sds/components";

export const Card = styled.div&lt;CommonThemeProps&gt;\`
  \${(props) =&gt; {
    const semanticColors = getSemanticColors(props);

    return \`
      background-color: \${semanticColors?.base?.backgroundPrimary};
      color: \${semanticColors?.base?.textPrimary};
    \`;
  }}
\`;</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>CSS</figcaption>
    <pre><code class="sds-doc-codeblock-content language-css">.card {
  background-color: var(--sds-color-semantic-base-background-primary);
  color: var(--sds-color-semantic-base-text-primary);
}</code></pre>
  </figure>
</div>
<h2>Primitive colors</h2>
<p>Click a variable name to copy it.</p>
<div class="sds-doc-slot" data-slot="primitive"></div>
<h2>Semantic colors</h2>
<p>
  Each swatch names the primitive it resolves to. Click a variable name to copy
  it.
</p>
<div class="sds-doc-slot" data-slot="semantic"></div>
<h2>Design documentation</h2>
<p>
  For which color to use where, see the
  <a href="./?path=/docs/design-documentation-bases-colors--docs" target="_top"
    >Colors</a
  >
  design documentation.
</p>
`}));export{n,t};