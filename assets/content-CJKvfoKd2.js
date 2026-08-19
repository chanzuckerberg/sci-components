import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>MenuItem</h1>
<div
  class="sds-doc-callout sds-doc-callout-background-3 sds-doc-callout-full-width"
>
  <p>
    <strong>MenuItem is one row of a dropdown.</strong>
    You write these yourself to fill a
    <a
      href="./?path=/docs/components-dropdowns-menu--documentation"
      target="_top"
      >Menu</a
    >; everywhere else in the family the row is drawn for you, from the options
    you pass, and you only reach for this component to replace it. The
    <a href="./?path=/docs/components-dropdowns-overview--docs" target="_top"
      >Dropdowns overview</a
    >
    covers which component draws which part.
  </p>
</div>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/MenuItem/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { MenuItem } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code Examples</h2>
<h3><strong>Default MenuItem</strong></h3>
<p>This example shows the minimum props needed for rendering a MenuItem.</p>
<div class="sds-doc-example" data-example="core/MenuItem/DefaultMenuItem"></div>
<h3><strong>Multi-Select MenuItem with Icon</strong></h3>
<p>
  This example showcases a multi-select MenuItem component featuring an SDS Icon
  and a distinct column value.
</p>
<div
  class="sds-doc-callout sds-doc-callout-background-1 sds-doc-callout-full-width"
>
  <p>
    <strong>SDS Tip:</strong>
    MenuItem exclusively accepts SDS Icons in xs and s sizes. To explore a
    comprehensive list of SDS icons and their available sizes, refer to the
    <a
      href="https://chanzuckerberg.github.io/sci-components/?path=/story/components-icon--icon-bank"
    >
      IconBank page
    </a>
    within Storybook.
  </p>
</div>
<div
  class="sds-doc-example"
  data-example="core/MenuItem/MultiSelectMenuItemWithIcon"
></div>
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
      <p><code>column</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The <code>column</code> prop determines the content displayed in the
        right column of the menu item. This content can be customized to provide
        additional information or context for the menu item.
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
    <td><p>Main content of the MenuItem.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>disabled</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        When set to <code>true</code>, the <code>disabled</code> prop indicates
        that the menu item is disabled and not interactable.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>isMultiSelect</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        When <code>true</code>, designates that the menu item supports
        multi-select functionality.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>icon</code></p>
    </td>
    <td>
      <p><code>IconName</code> |</p>
      <p><code>ReactElement</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The icon shown at the start of the item, either the name of an SDS icon
        or an element of your own. Only icons that come in a small size can be
        named here.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsIcon</code></p>
    </td>
    <td>
      <p><code>IconName</code> |</p>
      <p><code>ReactElement</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <strong>Deprecated.</strong>
        Use <code>icon</code> instead. It is the former name of that prop, kept
        until the next major version, and <code>icon</code> wins where both are
        given.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsIconProps</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Enables you to pass additional props to customize the SDS icon within
        the menu item.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStyle</code></p>
    </td>
    <td>
      <p><code>"determinate"</code> |</p>
      <p><code>"indeterminate"</code></p>
    </td>
    <td>
      <p><code>"determinate"</code></p>
    </td>
    <td>
      <p>
        Determines the style of the menu item, whether it is determinate or
        indeterminate.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"default"</code> |</p>
      <p><code>"action"</code></p>
    </td>
    <td>
      <p><code>"default"</code></p>
    </td>
    <td>
      <p>
        An <code>"action"</code> item leaves out the selection mark at its
        start, for a menu whose items run a command rather than choose a value.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>selected</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        When set to <code>true</code>, the <code>selected</code> prop signifies
        that the menu item is currently selected.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};