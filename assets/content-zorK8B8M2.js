import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Intent</h1>
<p>
  Intent components provide additional context to users communicating as to why
  a negative, notice, or positive intent may have been triggered.
</p>
<h2>Overview</h2>
<ul class="sds-doc-status">
  <li data-status="ready">In Figma</li>
  <li data-status="ready">Meets Accessibility</li>
  <li data-status="in-progress">In Code</li>
</ul>
<p>
  Intent Messages can be paired with any Input component (
  <a
    href="./?path=/docs/design-documentation-genes-control-inputs--docs"
    target="_top"
  >
    Checkbox
  </a>
  ,
  <a
    href="./?path=/docs/design-documentation-genes-control-inputs--docs"
    target="_top"
  >
    Radio
  </a>
  ,
  <a
    href="./?path=/docs/design-documentation-genes-field-inputs--docs"
    target="_top"
  >
    Text Input
  </a>
  ,
  <a
    href="./?path=/docs/design-documentation-genes-field-inputs--docs"
    target="_top"
  >
    Search Input
  </a>
  ,
  <a
    href="./?path=/docs/design-documentation-genes-dropdown-input--docs"
    target="_top"
    >Dropdown Input</a
  >
  ) to communicate statuses or issues with user-supplied responses. There are
  three intents that Intent Message can display: negative, notice, and positive.
  Each Intent type has a default icon that accompanies it, though these defaults
  can be swapped out for any icon desired.
</p>
<p>
  Intent messages can be stacked, e.g., different message types can be combined
  meaning, for example, a user’s response to an input could theoretically have
  both negative and notice messages accompanying it.
</p>
<p>
  Input Message is not a standalone component within Figma, but is instead built
  into each Input component individually. Each Input component has a show
  <code>intentMessage</code> prop that toggles visibility of the message(s) on
  or off.
</p>
<p>
  Optionally, an Intent Indicator can be displayed to the left of an Input. When
  enabled, a colored border will appear to help increase visibility of Intent
  Messages within that group, making it easier for users to see when a response
  requires their attention. This is especially useful in long forms where users
  might have to skim through many pages to find the responses they need to
  update or fix.
</p>
<p>
  The Intent Indicator is a standalone component within Figma. It has an empty
  slot within it that is meant to be filled with the Input component designers
  want the Intent Indicator displayed alongside (or group of components in the
  case of Checkboxes or Radios where multiple are likely combined under one
  field label to present a range of options for responses to users).
</p>
<h4>Intent Message</h4>
<p>
  As mentioned above, Intent Message is not a standalone component within Figma,
  but is instead built into each Input component individually. If needed
  multiple Intent Message types can be stacked to communicate more than one
  intent per Input.
</p>
<p>
  The example below shows Intent Message displayed in conjunction with
  <a
    href="./?path=/docs/design-documentation-genes-field-inputs--docs"
    target="_top"
  >
    Text Input
  </a>
  for reference. See the documentation for each Input component for examples
  specific to that Input type.
</p>
<table class="sds-doc-table">
  <tr>
    <td><p>Negative</p></td>
    <td><p>Negative + Notice</p></td>
    <td><p>Notice</p></td>
    <td><p>Notice + Positive</p></td>
    <td><p>Positive</p></td>
  </tr>
</table>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentMessage_Example_Negative</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/2429834fc30d5835.png"
        alt="IntentMessage_Example_Negative"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption>
      <strong>IntentMessage_Example_Negative + Notice</strong>
    </figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/46078b299cc3916f.png"
        alt="IntentMessage_Example_Negative + Notice"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentMessage_Example_Notice</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/aadd1c26f780c247.png"
        alt="IntentMessage_Example_Notice"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption>
      <strong>IntentMessage_Example_Notice + Positive</strong>
    </figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/5bece330fee27886.png"
        alt="IntentMessage_Example_Notice + Positive"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentMessage_Example_Positive</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/3c7b384f9226ba44.png"
        alt="IntentMessage_Example_Positive"
      />
    </figure>
  </figure>
</div>
<h4>Intent Indicator</h4>
<p>
  The example below shows Intent Indicator displayed in conjunction with a range
  of Input types for reference. See the documentation for each Input component
  for examples specific to that Input type.
</p>
<table class="sds-doc-table">
  <tr>
    <td><p>Empty (Negative)</p></td>
    <td><p>Negative</p></td>
    <td><p>Notice</p></td>
    <td><p>Positive</p></td>
  </tr>
</table>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentIndicator_Example_Empty</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/9eca24977cc2acba.png"
        alt="IntentIndicator_Example_Empty"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentIndicator_Example_Negative</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/6a23e9ca16465884.png"
        alt="IntentIndicator_Example_Negative"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentIndicator_Example_Notice</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/01495a31e70da6b7.png"
        alt="IntentIndicator_Example_Notice"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>IntentIndicator_Example_Positive</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/d2217d05020819d5.png"
        alt="IntentIndicator_Example_Positive"
      />
    </figure>
  </figure>
</div>
<hr />
<h3>Intent Spacing</h3>
<p>
  These rules establish how much margin should exist between and around
  elements.
</p>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Intent spacing</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img src="design-assets/543c65e94f847049.png" alt="Intent spacing" />
    </figure>
  </figure>
</div>
`}));export{n,t};