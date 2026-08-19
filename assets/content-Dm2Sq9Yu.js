import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Deprecated: the Link component</h1>
<div
  class="sds-doc-callout sds-doc-callout-background-3 sds-doc-callout-full-width"
>
  <p>
    <strong>Do not use this in new code.</strong>
    The
    <strong>Link</strong>
    component still ships, and its story sits under
    <strong>Deprecated</strong>
    in this Storybook. It is documented here only so that existing usages can be
    migrated.
  </p>
</div>
<p>
  It wrapped MUI's Link, offered two sizes and a bold weight, and underlined
  only on hover in its default style. Its source is
  <a
    href="https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Link"
  >
    here
  </a>
  and the underlying
  <a href="https://mui.com/material-ui/react-link/">MUI documentation</a>
  still applies to the props it passed through.
</p>
<h2>Migrating away from it</h2>
<table class="sds-doc-table">
  <tr>
    <td><p>Old prop</p></td>
    <td><p>Replace with</p></td>
  </tr>
  <tr>
    <td>
      <p><code>sdsSize="s"</code></p>
    </td>
    <td>
      <p><code>fontLinkS</code></p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsSize="xs"</code></p>
    </td>
    <td>
      <p><code>fontLinkXs</code></p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>fontWeight="bold"</code></p>
    </td>
    <td>
      <p>
        The semibold mixin for the size, such as
        <code>fontLinkSemiboldS</code>. The component's <code>"bold"</code> was
        <code>600</code>, which SDS calls semibold.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStyle="default"</code></p>
    </td>
    <td>
      <p>
        The link type style plus the accent text action colors. Note the
        difference: the component only underlined on hover, whereas the type
        style is underlined in every state.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStyle="dashed"</code></p>
    </td>
    <td>
      <p>
        <code>color: inherit</code> with
        <code>text-decoration: underline dashed</code>, going solid on hover, as
        in the last example above.
      </p>
    </td>
  </tr>
</table>
<h2>Props</h2>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStyle</code></p>
    </td>
    <td>
      <p><code>"default"</code> |</p>
      <p><code>"dashed"</code></p>
    </td>
    <td>
      <p><code>"default"</code></p>
    </td>
    <td>
      <p>
        <code>"default"</code> underlines on hover, focus, and press only;
        <code>"dashed"</code> is underlined dashed at rest and solid on
        interaction.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsSize</code></p>
    </td>
    <td>
      <p><code>"xs" | "s"</code></p>
    </td>
    <td>
      <p><code>"s"</code></p>
    </td>
    <td>
      <p>The font size, taken from the body scale rather than the link one.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>fontWeight</code></p>
    </td>
    <td>
      <p><code>"normal"</code> |</p>
      <p><code>"bold"</code></p>
    </td>
    <td>
      <p><code>"normal"</code></p>
    </td>
    <td>
      <p>
        Maps to <code>font-weight</code> <code>400</code> and <code>600</code>.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};