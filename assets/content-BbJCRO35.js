import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>InputSlider</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputSlider/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { InputSlider } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3><strong>Default InputSlider</strong></h3>
<p>This example has the minimum props needed for the InputSlider component.</p>
<div
  class="sds-doc-example"
  data-example="core/InputSlider/DefaultInputSlider"
></div>
<h3>InputSlider with custom Marks</h3>
<p>
  This example shows an InputSlider component that features custom marks
  precisely positioned at 0%, 50%, and 100% of the slider's value.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputSlider/InputSliderWithCustomMarks"
></div>
<h3>Range InputSlider</h3>
<p>Passing an array of two numbers renders a range with a thumb at each end.</p>
<div
  class="sds-doc-example"
  data-example="core/InputSlider/RangeInputSlider"
></div>
<h3>Disabled InputSlider</h3>
<p>
  A disabled slider dims the track, thumb, marks, and value label, and ignores
  pointer and keyboard input.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputSlider/DisabledInputSlider"
></div>
<h2>SDS vs MUI</h2>
<p>
  The following props and options differ in how they function across MUI's
  Slider component versus SDS's InputSlider component:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>orientation</code>: Has no effect in SDS. The component always
      renders horizontally, and overrides anything you pass.
    </p>
  </li>
  <li>
    <p>
      <code>size</code> and <code>color</code>: Have no effect in SDS. The rail,
      track, and thumb are styled from the theme.
    </p>
  </li>
  <li>
    <p>
      <code>aria-label</code> and <code>getAriaLabel</code>: SDS labels the
      thumbs for you. A range slider gets <code>"Minimum value"</code> and
      <code>"Maximum value"</code>; a single-thumb slider uses your
      <code>aria-label</code>, falling back to <code>"Slider value"</code>. Pass
      <code>getAriaLabel</code> to take over completely.
    </p>
  </li>
</ul>
<p>
  These are some of the common props that can be used for both the MUI Slider
  component and the SDS InputSlider component:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>value</code> and <code>defaultValue</code>: A number renders one
      thumb. An array of two numbers renders a range with two thumbs, as in the
      "Range InputSlider" example below.
    </p>
  </li>
  <li>
    <p>
      <code>step</code>: Sets the step distance between selectable stops (and
      relatedly, if this prop is left out, the slider is continuous, rather than
      discrete)
    </p>
  </li>
  <li>
    <p>
      <code>marks</code>: When present and set to <code>true</code>, invokes the
      default marks style. When passed a rich array (of objects containing the
      value and the custom label to show at that value), sets marks and labels
      only at the positions specified by the array. See the "InputSlider with
      custom Marks" example below.
    </p>
  </li>
  <li>
    <p>
      <code>valueLabelDisplay</code>: This prop determines whether and when the
      value label is displayed, and takes the following props:
      <code>"auto"</code> (the value label will display when the thumb is
      hovered or focused), <code>"on"</code> (labels display persistently), or
      <code>"off"</code> (default; labels are never displayed).
    </p>
  </li>
</ul>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI component can be found
  <a href="https://mui.com/material-ui/react-slider/">here</a>
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
      <p><code>defaultValue</code></p>
    </td>
    <td>
      <p><code>Array&lt;number&gt; |&nbsp;number</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The default value. Use when the component is not controlled. An array of
        two numbers renders a range slider.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>value</code></p>
    </td>
    <td>
      <p><code>Array&lt;number&gt; |&nbsp;number</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The value of the slider. Use with&nbsp;<code>onChange</code>&nbsp;to
        control the component.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onChange</code></p>
    </td>
    <td>
      <p><code>(event, value, activeThumb) =&gt; void</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Called as the user drags a thumb.</p></td>
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
      <p><code>marks</code></p>
    </td>
    <td>
      <p><code>bool |&nbsp;Array&lt;{ value, label }&gt;</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        Marks indicate predetermined values to which the user can move the
        slider. If&nbsp;<code>true</code>&nbsp;the marks are spaced according
        the value of the&nbsp;<code>step</code>&nbsp;prop. If an array, it
        should contain objects with&nbsp;<code>value</code>&nbsp;and an
        optional&nbsp;<code>label</code>&nbsp;keys.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>max</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td>
      <p><code>100</code></p>
    </td>
    <td>
      <p>
        The maximum allowed value of the slider. Should not be equal to
        <code>min</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>min</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td>
      <p><code>0</code></p>
    </td>
    <td>
      <p>
        The minimum allowed value of the slider. Should not be equal to
        <code>max</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>orientation</code></p>
    </td>
    <td>
      <p><code>"horizontal"</code></p>
    </td>
    <td>
      <p><code>"horizontal"</code></p>
    </td>
    <td>
      <p>
        Fixed by SDS. The component sets this itself, so a vertical slider is
        not available.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>step</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td>
      <p><code>1</code></p>
    </td>
    <td>
      <p>
        The granularity with which the slider can step through values. (A
        "discrete" slider.) The&nbsp;<code>min</code>&nbsp;prop serves as the
        origin for the valid values. We recommend <code>(max - min)</code> to be
        evenly divisible by the <code>step</code>.
      </p>
      <p>
        When <code>step</code> is&nbsp;<code>null</code>, the thumb can only be
        slid onto marks provided with the&nbsp;<code>marks</code>&nbsp;prop.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>valueLabelDisplay</code></p>
    </td>
    <td>
      <p><code>"auto"</code> |</p>
      <p><code>"off"</code> |</p>
      <p><code>"on"</code></p>
    </td>
    <td>
      <p><code>"off"</code></p>
    </td>
    <td>
      <p>Controls when the value label is displayed:</p>
      <ul class="sds-doc-bullet-list">
        <li>
          <p>
            <code>"auto"</code>&nbsp;the value label will display when the thumb
            is hovered or focused.
          </p>
        </li>
        <li>
          <p><code>"on"</code>&nbsp;will display persistently.</p>
        </li>
        <li>
          <p><code>"off"</code>&nbsp;will never display.</p>
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>aria-label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td>
      <p><code>"Slider value"</code></p>
    </td>
    <td>
      <p>
        Labels the thumb of a single-value slider. Range sliders label their two
        thumbs <code>"Minimum value"</code> and
        <code>"Maximum value"</code> instead.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};