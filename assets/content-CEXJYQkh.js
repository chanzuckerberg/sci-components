import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>ButtonToggle</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ButtonToggle"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { ButtonToggle } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3><strong>Default ButtonToggle</strong></h3>
<p>
  This example has the minimum props needed for the ButtonToggle component.
  Because <code>sdsStage</code> is controlled, the on and off stages are driven
  from state.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/DefaultButtonToggle"
></div>
<h3>ButtonToggle styles</h3>
<p>
  This example shows the two styles a toggle is designed around,
  <code>"outline"</code> and <code>"minimal"</code>, in both stages.
  <code>sdsStyle</code> also accepts Button's <code>"solid"</code>, which has no
  toggle treatment of its own, so set one of these two explicitly rather than
  taking the inherited default.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/ButtonToggleStyles"
></div>
<h3>ButtonToggle types</h3>
<p>
  This example shows the two color schemes available through
  <code>sdsType</code>, which is what decides how the on stage reads: primary
  fills with the accent color, secondary stays neutral.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/ButtonToggleTypes"
></div>
<h3>ButtonToggle sizes</h3>
<p>
  This example shows the three sizes available through the <code>size</code>
  prop.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/ButtonToggleSizes"
></div>
<h3>Icon-only ButtonToggle</h3>
<p>
  This example shows the form a toggle usually takes. Leaving
  <code>children</code> out is what makes it square, and since there is then no
  text for a screen reader to announce, each one needs an
  <code>aria-label</code>.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/ButtonToggleIconOnly"
></div>
<h3>ButtonToggle on a dark background</h3>
<p>
  This example shows <code>backgroundAppearance="dark"</code>, which tells the
  toggle it sits on a dark surface so it can pick colors with enough contrast in
  both stages. The toggle paints no background of its own, so the panel is
  supplied alongside the prop.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/ButtonToggleOnADarkBackground"
></div>
<h3>Toggles in a ButtonGroup</h3>
<p>
  This example shows icon-only toggles collected into a ButtonGroup, each
  tracking its own stage.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonToggle/ButtonToggleGroup"
></div>
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
      <p><code>startIcon</code></p>
    </td>
    <td>
      <p><code>ReactElement</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <strong>Required.</strong>
        The icon displayed within the component. Pass the SDS Icon component,
        for example <code>&lt;Icon sdsIcon="Search" sdsSize="s" /&gt;</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStage</code></p>
    </td>
    <td>
      <p><code>"on"</code> |</p>
      <p><code>"off"</code></p>
    </td>
    <td>
      <p><code>"off"</code></p>
    </td>
    <td>
      <p>
        Controls the toggle stage. The component is fully controlled, so keep
        this value in state and update it from <code>onClick</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsStyle</code></p>
    </td>
    <td>
      <p><code>"solid"</code> |</p>
      <p><code>"outline"</code> |</p>
      <p><code>"minimal"</code></p>
    </td>
    <td>
      <p><code>"solid"</code></p>
    </td>
    <td>
      <p>
        Style of the button. ButtonToggle inherits Button's default of
        <code>"solid"</code>, but toggles are designed around
        <code>"outline"</code> and <code>"minimal"</code>, so set one of those
        explicitly.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"primary" | "secondary"</code></p>
    </td>
    <td>
      <p><code>"primary"</code></p>
    </td>
    <td>
      <p>
        Color scheme of the button. Primary uses the accent color in the on
        stage, secondary stays neutral. Set it explicitly: the on stage resolves
        its colors before Button applies this default, so an omitted value draws
        the neutral treatment over a button that is otherwise primary. Button's
        <code>"destructive"</code> is inherited by the type but has no on-stage
        treatment, so it should not be used here.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>size</code></p>
    </td>
    <td>
      <p><code>"small"</code> |</p>
      <p><code>"medium"</code> |</p>
      <p><code>"large"</code></p>
    </td>
    <td>
      <p><code>"large"</code></p>
    </td>
    <td><p>Size of the button.</p></td>
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
      <p>Disables the toggle button when set to <code>true</code>.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>backgroundAppearance</code></p>
    </td>
    <td>
      <p><code>"matchBackground"</code> |</p>
      <p><code>"dark"</code></p>
    </td>
    <td>
      <p><code>"matchBackground"</code></p>
    </td>
    <td>
      <p>
        Button's prop, telling the toggle which surface it sits on so it can
        pick colors with enough contrast.
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
        Text beside the icon. A toggle is normally icon-only, and leaving this
        out is what makes it square.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onClick</code></p>
    </td>
    <td>
      <p><code>(event: React.MouseEvent) =&gt; void</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Callback fired when the button is clicked.</p></td>
  </tr>
</table>
<p>
  ButtonToggle always renders with <code>backgroundOnHover</code> enabled and
  ignores <code>endIcon</code>, which is reserved for the toggle's own styling.
</p>
`}));export{n,t};