import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>InputDropdown</h1>
<div
  class="sds-doc-callout sds-doc-callout-background-3 sds-doc-callout-full-width"
>
  <p>
    <strong>InputDropdown is the trigger, not the menu.</strong>
    It draws the field a dropdown opens from and reports the selection back, and
    it opens nothing by itself. Most applications want
    <a
      href="./?path=/docs/components-dropdowns-dropdown--documentation"
      target="_top"
      >Dropdown</a
    >, which is this component already paired with a menu; reach for this one to
    anchor a
    <a
      href="./?path=/docs/components-dropdowns-dropdownmenu--documentation"
      target="_top"
      >DropdownMenu</a
    >
    you are driving yourself. It is filed under Inputs, but it belongs to the
    family the
    <a href="./?path=/docs/components-dropdowns-overview--docs" target="_top"
      >Dropdowns overview</a
    >
    describes.
  </p>
</div>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputDropdown/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { InputDropdown } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default</h3>
<p>
  This example has the minimum props needed for the InputDropdown component.
</p>
<div class="sds-doc-example" data-example="core/InputDropdown/Default"></div>
<h3>Controlling the width</h3>
<p>
  Left alone, the input is as wide as the text inside it, which means a row of
  them comes out ragged and the width jumps around as the selection changes.
  <code>width</code> fixes that. A bare number is read as pixels, and any other
  value is used as the CSS width, so <code>"100%"</code> fills the container and
  <code>"20rem"</code> works as written.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputDropdown/ControllingTheWidth"
></div>
<div
  class="sds-doc-callout sds-doc-callout-background-1 sds-doc-callout-full-width"
>
  <p>
    <strong>MUI Tip:</strong>
    MUI's <code>fullWidth</code> prop works here too and does the same thing as
    <code>width="100%"</code>. Pass both and <code>width</code> is the one that
    counts. Either way the input keeps a minimum width of 90px, so a smaller
    value leaves it at 90px rather than shrinking it.
  </p>
</div>
<h3>Anchoring a menu</h3>
<p>
  A DropdownMenu is a popper: it is positioned against an element rather than
  rendered inside one, so it needs the input's DOM node as its
  <code>anchorEl</code>. InputDropdown forwards its <code>ref</code> to the
  button it renders, and a callback ref keeps that node in state so the menu
  re-renders once the anchor exists. Reach for this when the Dropdown component
  below is more than you need, or when the menu has to be driven from state you
  already own.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputDropdown/AnchoringAMenu"
></div>
<h3>Square with multi-select</h3>
<p>
  Below is an example demonstrating the combined utilization of the
  InputDropdown component and a multi-select Dropdown component. The Dropdown
  allows multiple selections, while the InputDropdown features a square variant.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputDropdown/SquareWithMultiSelect"
></div>
<h3>Rounded with single-select</h3>
<p>
  Below is an example demonstrating the combined utilization of the default
  label variant InputDropdown component and a single-select Dropdown component.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputDropdown/RoundedWithSingleSelect"
></div>
<h3>Minimal with single-select</h3>
<p>
  An example of the combined use of the value variation InputDropdown component
  and a single-select Dropdown component is shown below.&nbsp;
</p>
<div
  class="sds-doc-callout sds-doc-callout-background-4 sds-doc-callout-full-width"
>
  <p>
    <strong>Warning:</strong>
    The value variant can not be used in conjunction with the multi-select
    Dropdowns. If you set <code>sdsType="value"</code> and
    <code>multiple="true"</code>, the component will default to showing a label
    and a counter instead.
  </p>
</div>
<div
  class="sds-doc-example"
  data-example="core/InputDropdown/MinimalWithSingleSelect"
></div>
<h2>SDS vs MUI</h2>
<p>
  The SDS's InputDropdown component utilizes MUI's Button component as its
  foundation but introduces some SDS-specific enhancements. Below, the key
  distinctions between the SDS's InputDropdown and MUI's Button are outlined:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <strong>Variation</strong>: MUI's Button offers a
      <code>variant</code> prop to define different visual styles for buttons.
      SDS's InputDropdown, however, uses the <code>sdsStyle</code> prop instead,
      providing the ability to select between three variants:
      <code>"square"</code>, <code>"rounded"</code>, or <code>"minimal"</code>.
    </p>
  </li>
  <li>
    <p>
      <strong>Color</strong>: In MUI's Button, the button's color can be
      modified using the <code>color</code> prop. SDS's InputDropdown deviates
      from this and introduces the <code>intent</code> prop. This prop provides
      the ability to choose between default, warning, and error colors,
      depending on the state of the InputDropdown.
    </p>
  </li>
  <li>
    <p>
      <strong>Size</strong>: While MUI's Button provides a
      <code>size</code> prop for adjusting the button's size, SDS's
      InputDropdown does not offer this capability. The size of the
      InputDropdown component remains fixed and cannot be altered through props.
    </p>
  </li>
  <li>
    <p>
      <strong>Icon</strong>: Unlike MUI's Button, which supports custom icons,
      SDS's InputDropdown does not accept external icon components. Instead,
      SDS's InputDropdown incorporates a built-in Chevron icon, which is an
      integral part of the component and cannot be replaced.
    </p>
  </li>
  <li>
    <p>
      <strong>Ref</strong>: Like MUI's Button, InputDropdown forwards a
      <code>ref</code> to the button it renders. That is how it becomes the
      <code>anchorEl</code> a DropdownMenu is positioned against, as in
      "Anchoring a menu" above.
    </p>
  </li>
</ul>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI component can be found
  <a href="https://mui.com/material-ui/react-button/">here</a>
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
      <p><code>classes</code></p>
    </td>
    <td>
      <p><code>object</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        A class name for each part of the input, for styling one of them without
        reaching through the DOM:
        <code>root</code>, <code>label</code>, <code>labelDetailsWrapper</code>,
        <code>contentWrapper</code>, <code>details</code>, <code>counter</code>,
        <code>iconWrapper</code>, <code>chevronIcon</code> and
        <code>minimalDetails</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>className</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Added to the input's root element, alongside anything
        <code>classes.root</code> puts there.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>counter</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        If <code>multiple</code> set to <code>true</code>, this number shows the
        number of selected menu items.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>details</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>A text showing details for the selected menu item.</p></td>
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
    <td><p>If&nbsp;<code>true</code>, the component is disabled.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>intent</code></p>
    </td>
    <td>
      <p><code>"default"</code> |</p>
      <p><code>"negative"</code> |</p>
      <p><code>"notice"</code> |</p>
      <p><code>"positive"</code></p>
    </td>
    <td>
      <p><code>"default"</code></p>
    </td>
    <td><p>The color of the component.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>The label of the Input Button.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>multiple</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        Allows users to select multiple menu items.<code>multiple=true</code>
        cannot be used with the minimum variant.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onClick</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td>
      <p>
        <code>(event: React.MouseEvent&lt;HTMLElement&gt;) =&gt; void</code>
      </p>
    </td>
    <td><p>Sets what happens when a user clicks on the component.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStyle</code></p>
    </td>
    <td>
      <p><code>"minimal"</code> |</p>
      <p><code>"square"</code> |</p>
      <p><code>"rounded"</code></p>
    </td>
    <td>
      <p><code>"square"</code></p>
    </td>
    <td><p>The visual appearance of the component.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"label"</code> |</p>
      <p><code>"value"</code></p>
    </td>
    <td>
      <p><code>"label"</code></p>
    </td>
    <td>
      <p>
        The label variant includes the label within the input field and
        showcases the selected menu item as additional details or sets the
        counter when in multi-select mode.
      </p>
      <p>
        The value variant replaces the label with the selected value directly
        within the input field. The detailed information is then displayed in a
        separate section dedicated to displaying additional details. However,
        it's important to note that the value variant cannot be used in
        conjunction with multi-select mode.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>shouldPutAColonAfterLabel</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>
        If <code>true</code>, a colon (:) will be added after the label or
        value.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>shouldTruncateMinimalDetails</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        If <code>true</code>, the details section of the minimal variant
        displays a truncated one-liner with an ellipsis (...), if
        <code>false</code> the details section expands to multiple lines for a
        comprehensive display.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>startIcon</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        An element placed before the label, passed straight through to the
        underlying MUI Button.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>state</code></p>
    </td>
    <td>
      <p><code>"default"</code> |</p>
      <p><code>"open"</code></p>
    </td>
    <td>
      <p><code>"default"</code></p>
    </td>
    <td>
      <p>
        Draws the input in its open state. The input has no idea whether its
        menu is showing, so set this from whatever holds that state.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>style</code></p>
    </td>
    <td>
      <p><code>CSSProperties</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>Inline styles for the input's root element.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>value</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The value that will be displayed in the component for the value variant.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>width</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td>
      <p><code>"auto"</code></p>
    </td>
    <td>
      <p>
        How wide the input is. A bare number is read as pixels, so
        <code>"240"</code> means 240px, and any other value is used as the CSS
        width, such as <code>"100%"</code> or <code>"20rem"</code>. Values below
        90px are ignored, since the input keeps that as its minimum. Left unset,
        the input is as wide as its content, or as wide as its container if
        MUI's <code>fullWidth</code> is set.
      </p>
    </td>
  </tr>
</table>
<p>
  There are more props that can be used with the InputDropdown component, via
  those available to
  <a href="https://mui.com/material-ui/api/autocomplete/#props"
    >MUI's Button component</a
  >.
</p>
`}));export{n,t};