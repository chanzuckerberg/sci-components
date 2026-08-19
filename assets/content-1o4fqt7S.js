import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Banner</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Banner/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { Banner } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default Banner</h3>
<p>This example has the minimum props needed for the Banner component.</p>
<div class="sds-doc-example" data-example="core/Banner/DefaultBanner"></div>
<h3>Persistent Banner</h3>
<p>
  This example showcases a Banner component that cannot be closed or dismissed.
</p>
<div class="sds-doc-example" data-example="core/Banner/PersistentBanner"></div>
<h3>Controlling when the Banner closes</h3>
<p>
  Left alone, the Banner keeps track of being dismissed and closes itself. The
  moment you pass <code>dismissed</code>, that becomes your job: the close
  button fires <code>onClose</code> and nothing else, so a Banner rendered with
  <code>dismissed={false}</code> will not close until you say so.
</p>
<div
  class="sds-doc-example"
  data-example="core/Banner/ControllingDismissal"
></div>
<h3>Secondary Banner</h3>
<p>
  This example pairs a primary Banner with the secondary variant that follows
  it.
</p>
<div class="sds-doc-example" data-example="core/Banner/SecondaryBanner"></div>
<h3>Banner intents</h3>
<p>
  This example shows every intent the Banner supports, each with the icon it
  picks by default.
</p>
<div class="sds-doc-example" data-example="core/Banner/BannerIntents"></div>
<h3>Banner with a custom icon</h3>
<p>
  This example replaces the icon chosen by the intent with a named SDS icon.
</p>
<div
  class="sds-doc-example"
  data-example="core/Banner/BannerWithACustomIcon"
></div>
<h3>Banner with a custom background color</h3>
<p>
  This example shows how to implement a Banner component with a custom
  background color.&nbsp;
</p>
<div
  class="sds-doc-example"
  data-example="core/Banner/BannerWithACustomBackgroundColor"
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
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"primary"</code> |</p>
      <p><code>"secondary"</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Required. The primary variant fills the Banner with the intent's primary
        surface color and uses the on-fill text color.
      </p>
      <p>
        The secondary variant uses the intent's secondary surface color with the
        standard primary text color.
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
        Required. The content of the Banner, laid out beside the icon and
        centered in the space left by the close button.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>intent</code></p>
    </td>
    <td>
      <p><code>"accent"</code> |</p>
      <p><code>"info"</code> |</p>
      <p><code>"negative"</code> |</p>
      <p><code>"notice"</code> |</p>
      <p><code>"positive"</code></p>
    </td>
    <td>
      <p><code>"info"</code></p>
    </td>
    <td>
      <p>
        The intent color of the Banner component, which also selects the default
        icon.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>dismissible</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>
        If&nbsp;<code>true</code>, the banner can be dismissed by the user. This
        is what controls whether the close button is rendered.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>dismissed</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        If&nbsp;<code>true</code>, the banner has been dismissed and renders
        nothing.
      </p>
      <p>
        Leave this unset to let the Banner keep track of its own dismissed
        state. Passing any value, <code>false</code> included, takes that over:
        the close button then only fires <code>onClose</code>, and the Banner
        closes when you set <code>dismissed</code> to <code>true</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onClose</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>Callback fired when the user clicks the close button.</p>
      <p>
        <strong>Signature:</strong>
        <code>function(event: React.MouseEvent) =&gt; void</code>
      </p>
      <ul class="sds-doc-bullet-list">
        <li>
          <p><code>event</code> The event source of the callback.</p>
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>icon</code></p>
    </td>
    <td>
      <p><code>keyof IconNameToSizes</code> |</p>
      <p><code>ReactElement&lt;CustomSVGProps&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The name of an SDS icon, or a custom SVG element, shown in place of the
        icon the intent would pick.
      </p>
      <p>
        Without it, <code>"positive"</code> shows <code>"CheckCircle"</code>,
        <code>"negative"</code> and <code>"notice"</code> show
        <code>"ExclamationMarkCircle"</code>, and every other intent shows
        <code>"InfoCircle"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsIconProps</code></p>
    </td>
    <td>
      <p><code>Partial&lt;IconProps&lt;keyof IconNameToSizes&gt;&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Additional props to be passed to the icon component.</p></td>
  </tr>
</table>
`}));export{n,t};