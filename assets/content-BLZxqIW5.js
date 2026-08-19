import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>ButtonGroup</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/ButtonGroup"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { ButtonGroup } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3><strong>Default ButtonGroup</strong></h3>
<p>
  This example has the minimum props needed for the ButtonGroup component.
  Buttons can mix icon-only, icon plus label, and label-only content.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/DefaultButtonGroup"
></div>
<h3>ButtonGroup types</h3>
<p>
  This example shows the two color schemes available through
  <code>sdsType</code>. The group paints the buttons in it, so an
  <code>sdsType</code> set on an individual button is overridden.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/ButtonGroupTypes"
></div>
<h3>ButtonGroup sizes</h3>
<p>
  This example shows the three sizes available through the <code>size</code>
  prop. The group injects it into every Button and ButtonToggle child, which is
  what keeps a mixed group at one height.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/ButtonGroupSizes"
></div>
<h3>Icon-only ButtonGroup</h3>
<p>
  This example shows an icon-only group in both orientations. Vertical is only
  available because none of the buttons carry a label.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/ButtonGroupIconOnly"
></div>
<h3>ButtonGroup with ButtonToggles</h3>
<p>
  This example shows a group of ButtonToggle components rather than Buttons,
  which turns it from a row of actions into a set of independent switches. Each
  toggle owns its own state through <code>sdsStage</code>.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/ButtonGroupWithButtonToggles"
></div>
<h3>Disabled ButtonGroup</h3>
<p>
  This example shows one disabled button inside an otherwise active group,
  beside a group disabled as a whole. <code>disabled</code> on the group reaches
  every button in it.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/ButtonGroupDisabled"
></div>
<h3>ButtonGroup on a dark background</h3>
<p>
  This example shows <code>backgroundAppearance="dark"</code>, which tells the
  group it sits on a dark surface so it can pick borders and text with enough
  contrast. The group paints no background of its own, so the panel is supplied
  alongside the prop.
</p>
<div
  class="sds-doc-example"
  data-example="core/ButtonGroup/ButtonGroupOnADarkBackground"
></div>
<h2>SDS vs MUI</h2>
<p>
  ButtonGroup collects related Button or ButtonToggle components into a single
  segmented control, joining them with shared borders. It sets MUI's
  <code>variant</code> to <code>"outlined"</code> and injects its own
  <code>size</code> into every button in the group, which is why
  <code>variant</code> and <code>size</code> are removed from the MUI props it
  accepts.
</p>
<p>
  Vertical orientation is only honored when every button in the group is
  icon-only. Requesting it for a group that contains labels logs a warning and
  falls back to horizontal.
</p>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI component can be found
  <a href="https://mui.com/material-ui/react-button-group/">here</a>
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
      <p><code>sdsStyle</code></p>
    </td>
    <td>
      <p><code>"outline"</code></p>
    </td>
    <td>
      <p><code>"outline"</code></p>
    </td>
    <td><p>Style of the button group. Outline is the only value.</p></td>
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
    <td><p>Color scheme applied to every button in the group.</p></td>
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
    <td>
      <p>
        Size of the group. It is injected into each Button and ButtonToggle
        child, so setting <code>size</code> on an individual button has no
        effect and a mixed group stays at one height. Anything else in the group
        keeps its own size.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>orientation</code></p>
    </td>
    <td>
      <p><code>"horizontal" | "vertical"</code></p>
    </td>
    <td>
      <p><code>"horizontal"</code></p>
    </td>
    <td>
      <p>
        Direction the buttons are stacked in. Vertical is only available when
        every button is icon-only.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>backgroundAppearance</code></p>
    </td>
    <td>
      <p><code>"matchBackground" | "dark"</code></p>
    </td>
    <td>
      <p><code>"matchBackground"</code></p>
    </td>
    <td>
      <p>
        Tells the group which surface it sits on so it can pick colors with
        enough contrast.
      </p>
    </td>
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
        MUI's prop, passed down through the group so every button in it is
        disabled at once.
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
    <td><p>The Button or ButtonToggle components to group.</p></td>
  </tr>
</table>
`}));export{n,t};