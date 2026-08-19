import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>InputText</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputText/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { InputText } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3><strong>InputText – Text Field</strong></h3>
<p>
  This component represents the text field variant of the InputText component.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputText/InputTextTextField"
></div>
<h3>InputText – Text Area</h3>
<p>
  This component represents the text area variant of the InputText component.
</p>
<div
  class="sds-doc-example"
  data-example="core/InputText/InputTextTextArea"
></div>
<h2>SDS vs MUI</h2>
<p>
  Like SDS's InputSearch (which is also built upon the same MUI component), the
  following props and options do not work the same way (or at all) for SDS's
  InputText component even though they are available to MUI's TextField
  component.
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>variants</code>: SDS's InputText component is not set up to support
      values for this prop (aside from <code>"outlined"</code>, InputText's
      default), and using other values available to MUI (<code>"filled"</code>,
      <code>"standard"</code>) may result in unreliable outputs
    </p>
  </li>
  <li>
    <p>
      <code>size</code>: SDS's InputText component is not set up to support
      values for this prop (aside from <code>"small"</code>, InputText's
      default), and using other values available to MUI (<code>"medium"</code>,
      <code>"large"</code>) may not have reliable outputs
    </p>
  </li>
  <li>
    <p>
      <code>required</code>: SDS's InputText does not render the expected
      asterisk (*) following the label when this prop is <code>true</code>
    </p>
  </li>
  <li>
    <p>
      <code>select</code>: SDS's InputText is not set up to support this boolean
      prop
    </p>
  </li>
</ul>
<p>
  The following functionality is available to both MUI's TextField component and
  SDS's InputText component, but SDS uses different prop names, shown below:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>sdsType</code>: This is the SDS-equivalent of MUI's boolean
      <code>multiline</code> prop, and takes <code>"textField"</code> (default)
      or <code>"textArea"</code> as values
    </p>
  </li>
  <li>
    <p>
      <code>hideLabel</code>: This is the SDS-equivalent of the
      <code>hiddenLabel</code> prop used in MUI; both are boolean with the
      default not including them (value of <code>false</code>)
    </p>
  </li>
  <li>
    <p>
      <code>intent</code>: This prop is the way you can set colors for SDS's
      InputText, based on its error state. It takes default (default, gray),
      error, or warning as values. The related MUI-color-setting prop,
      <code>color</code>, has no effect for InputText in SDS.
    </p>
  </li>
</ul>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI TextFieldcomponent can be found
  <a href="https://mui.com/material-ui/react-text-field/">here</a>
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
    <td>
      <p><code>{}</code></p>
    </td>
    <td>
      <p>
        Class names for the internal elements:&nbsp;<code>root</code>,
        <code>label</code>, and <code>input</code>.
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
        When set to <code>true</code>, the component becomes disabled and cannot
        be interacted with.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>hideLabel</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td><p>If&nbsp;<code>true</code>, the label is hidden.&nbsp;</p></td>
  </tr>
  <tr>
    <td>
      <p><code>id</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Specifies the unique id for the input element, needed for accessibility.
      </p>
    </td>
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
    <td>
      <p>Alters the border color and visual intent of the search input.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>The label for the input element.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>placeholder</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>Sets the placeholder text displayed within the input element.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"textField"</code> |</p>
      <p><code>"textArea"</code></p>
    </td>
    <td>
      <p><code>"textField"</code></p>
    </td>
    <td>
      <p>
        Defines the type of component to render, with options for a text input
        or text area.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};