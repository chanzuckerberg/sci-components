import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Banner</h1>
<p>
  Banners are used to communicate product status updates to users, allowing the
  product teams to provide important information to their users.
</p>
<h2>Overview</h2>
<ul class="sds-doc-status">
  <li data-status="ready">In Figma</li>
  <li data-status="ready">Meets Accessibility</li>
  <li data-status="ready">In Code</li>
</ul>
<h3>Banner Variants</h3>
<p>
  Banners communicate product status updates such as system maintenance, new
  features, known product bugs or issues. etc. and should not be used to respond
  to actions the user has taken within the product; use a
  <a href="./?path=/docs/design-documentation-dna-callout--docs" target="_top"
    >Callout</a
  >
  or
  <a href="./?path=/story/components-notification--default" target="_top"
    >Notification</a
  >
  for these purposes.
</p>
<p>
  There are two Banner variants: a primary Banner if only one Banner is needed
  and a secondary Banner if two or more Banners need to be shown at one time.
  This allows multiple Banners to be stacked together while maintaining the
  ability to differentiate between them.
</p>
<p>
  Both Banner variants can optionally be set to be manually dismissible by the
  user, allowing them to hide the Banner from view once it has been read.
</p>
<p>Banners span the full width of the page.</p>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Preview_Guidelines_Banner_Primary</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/120a6f60de2189e1.png"
        alt="Preview_Guidelines_Banner_Primary"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption>
      <strong>Preview_Guidelines_Banner_Secondary</strong>
    </figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/04ee196b79959c49.png"
        alt="Preview_Guidelines_Banner_Secondary"
      />
    </figure>
  </figure>
</div>
<hr />
<h3>Banner – Primary</h3>
<p>
  Use Banner – Primary in instances where only one Banner will be used on the
  page. If using multiple, it should be the first or top Banner used, followed
  by the secondary variant. Continue alternating variants for as many Banners as
  are needed. This ensures the Banners can be differentiated without the need
  for space or divider lines between them.
</p>
<p>
  If additional context or information is needed beyond the space available on
  the Banner, it is recommended that a
  <a href="./?path=/docs/design-documentation-genes-link--docs" target="_top"
    >Link</a
  >
  to an additional page with this information is included on the Banner which
  can be inserted using the optional content slot.
</p>
<p>
  When the information being communicated on the Banner is intended to remain
  persistent on the screen and is not manually dismissible by the user, use a
  persistent Banner. To allow the user to manually dismiss the Banner, use a
  dismissible Banner.
</p>
<table class="sds-doc-table">
  <tr>
    <td><p>Default (Persistent)</p></td>
    <td><p>Default (Dismissible)</p></td>
    <td><p>Hover (Dismissible)</p></td>
  </tr>
</table>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Persistent_Default</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/e5c10bf86f85ed35.png"
        alt="Banner_Primary_Persistent_Default"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Dismissible_Default</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/120a6f60de2189e1.png"
        alt="Banner_Primary_Dismissible_Default"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Dismissible_Hover</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/025923b46ee8593a.png"
        alt="Banner_Primary_Dismissible_Hover"
      />
    </figure>
  </figure>
</div>
<hr />
<h3>Banner – Secondary</h3>
<p>
  Use only when accompanied by the primary variant. If using multiple, Banner –
  Secondary should be the second Banner used, followed by the primary variant.
  Continue alternating variants for as many Banners as are needed. This ensures
  the Banners can be differentiated without the need for space or divider lines
  between them.
</p>
<p>
  If additional context or information is needed beyond the space available on
  the Banner, it is recommended that a
  <a href="./?path=/docs/design-documentation-genes-link--docs" target="_top"
    >Link</a
  >
  to an additional page with this information is included on the Banner which
  can be inserted using the optional content slot.
</p>
<p>
  When the information being communicated on the Banner is intended to remain
  persistent on the screen and is not manually dismissible by the user, use a
  persistent Banner. To allow the user to manually dismiss the Banner, use a
  dismissible Banner.
</p>
<table class="sds-doc-table">
  <tr>
    <td><p>Default (Persistent)</p></td>
    <td><p>Default (Dismissible)</p></td>
    <td><p>Hover (Dismissible)</p></td>
  </tr>
</table>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption>
      <strong>Banner_Secondary_Persistent_Default</strong>
    </figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/33765f318f410ad9.png"
        alt="Banner_Secondary_Persistent_Default"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption>
      <strong>Banner_Secondary_Dismissible_Default</strong>
    </figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/04ee196b79959c49.png"
        alt="Banner_Secondary_Dismissible_Default"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Secondary_Dismissible_Hover</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/03adaa3286ec14c7.png"
        alt="Banner_Secondary_Dismissible_Hover"
      />
    </figure>
  </figure>
</div>
<hr />
<h3>Banner Spacing</h3>
<p>
  These rules establish how much margin should exist between and around
  elements.
</p>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner spacing</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img src="design-assets/2156776c66fade22.png" alt="Banner spacing" />
    </figure>
  </figure>
</div>
<hr />
<h3>Intent Variations</h3>
<p>
  There are four different intents that Banners can communicate: Info, Negative,
  Notice, and Positive. Each intent is communicated using color and iconography.
</p>
<p>
  Each intent is demonstrated below using the Dismissible variant for reference.
  Regardless of variant, the colors and icons used are the same.
</p>
<h4>Primary</h4>
<table class="sds-doc-table">
  <tr>
    <td><p>Info</p></td>
    <td><p>Negative</p></td>
    <td><p>Notice</p></td>
    <td><p>Positive</p></td>
  </tr>
</table>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Intent_Info</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/120a6f60de2189e1.png"
        alt="Banner_Primary_Intent_Info"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Intent_Negative</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/056624901006100a.png"
        alt="Banner_Primary_Intent_Negative"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Intent_Notice</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/43bc94c54494311d.png"
        alt="Banner_Primary_Intent_Notice"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Primary_Intent_Positive</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/796f38a6662f7a70.png"
        alt="Banner_Primary_Intent_Positive"
      />
    </figure>
  </figure>
</div>
<h4>Secondary</h4>
<table class="sds-doc-table">
  <tr>
    <td><p>Info</p></td>
    <td><p>Negative</p></td>
    <td><p>Notice</p></td>
    <td><p>Positive</p></td>
  </tr>
</table>
<div
  class="sds-doc-design-uploads sds-doc-item-layout-column sds-doc-component-alignment-center"
>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Secondary_Intent_Info</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/04ee196b79959c49.png"
        alt="Banner_Secondary_Intent_Info"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Secondary_Intent_Negative</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/8cce5b1b13094f70.png"
        alt="Banner_Secondary_Intent_Negative"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Secondary_Intent_Notice</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/e92533f639e6f3a1.png"
        alt="Banner_Secondary_Intent_Notice"
      />
    </figure>
  </figure>
  <figure class="sds-doc-design-upload" role="group">
    <figcaption><strong>Banner_Secondary_Intent_Positive</strong></figcaption>
    <figure class="sds-doc-design-upload-image">
      <img
        src="design-assets/ce5eee72c562dd2d.png"
        alt="Banner_Secondary_Intent_Positive"
      />
    </figure>
  </figure>
</div>
`}));export{n,t};