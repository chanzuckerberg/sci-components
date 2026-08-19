import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>NavigationFooter</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/NavigationFooter"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { NavigationFooter } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default footer</h3>
<p>
  A footer with all four content areas filled: logo with title and tag, the
  prominent nav items, the bottom row of links, and an image beside them.
</p>
<div
  class="sds-doc-example"
  data-example="core/NavigationFooter/NavigationFooterDefault"
  data-example-padding="none"
></div>
<h3>Dark footer</h3>
<p>
  The same structure on a dark surface, with the text and dividers inverted.
</p>
<div
  class="sds-doc-example"
  data-example="core/NavigationFooter/NavigationFooterDark"
  data-example-padding="none"
></div>
<h2>Behavior notes</h2>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      The footer is two rows. The top row is the logo, title, and tag on one
      side with <code>navItems</code> beside them; below a divider, the bottom
      row is <code>navLinks</code> on one side and <code>images</code> on the
      other.
    </p>
  </li>
  <li>
    <p>
      The two link lists are styled differently on purpose.
      <code>navItems</code> are the prominent destinations; the
      <code>navLinks</code> run in a single line with dividers drawn between
      them, which is where policy and contact links belong.
    </p>
  </li>
  <li>
    <p>
      Like the header, the footer decides on its own when to go narrow, below
      512px or whenever its content no longer fits. In the narrow layout the
      links wrap into rows and the component drops the divider at the end of
      each row.
    </p>
  </li>
  <li>
    <p>
      There is no <code>hasInvertedStyle</code> prop here either;
      <code>backgroundAppearance</code> is the one to reach for, and it only
      changes anything in light mode.
    </p>
  </li>
  <li>
    <p>
      The props are the whole surface: <code>NavigationFooterProps</code> does
      not extend the DOM attributes, so there is no <code>className</code>,
      <code>style</code>, or <code>ref</code> to pass.
    </p>
  </li>
</ul>
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
        <code>"dark"</code> puts the footer on a dark surface and inverts its
        text and dividers, in light mode only.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>images</code></p>
    </td>
    <td>
      <p><code>FooterImage[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        An array of images displayed in the footer. Each item includes an image,
        optional link URL, and component.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>logo</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The logo displayed in the footer. Can be any valid React node such as an
        image, icon, or SVG.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>logoUrl</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>If provided, clicking the logo will navigate to this URL.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>logoComponent</code></p>
    </td>
    <td>
      <p><code>ElementType</code></p>
    </td>
    <td>
      <p><code>"a"</code></p>
    </td>
    <td>
      <p>
        Specifies the component to use for the logo link. Defaults to an anchor
        tag.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>logoLinkProps</code></p>
    </td>
    <td>
      <p><code>Record&lt;string, unknown&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Additional props passed to the logo link component.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>navItems</code></p>
    </td>
    <td>
      <p><code>NavigationFooterNavItem[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The prominent links on the top row, next to the logo. They are headings,
        not body text, and get no dividers.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>navLinks</code></p>
    </td>
    <td>
      <p><code>NavigationFooterNavItem[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The smaller links on the bottom row, drawn in one line with dividers
        between them.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>tag</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>A small label displayed next to the title.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>tagColor</code></p>
    </td>
    <td>
      <p><code>"info" | "positive"</code> |</p>
      <p><code>"notice" | "negative"</code> |</p>
      <p><code>"neutral" | "beta"</code> |</p>
      <p><code>[string, string]</code> |</p>
      <p><code>[string, string, string]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The Tag's color. A tuple sets the label, background, and icon colors by
        hand.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>title</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>The main title displayed in the footer.</p></td>
  </tr>
</table>
<h2>FooterImage</h2>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>image</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The image element to be displayed. Can be an icon, image, SVG, or any
        <code>ReactNode</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>url</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Optional URL to navigate to when the image is clicked.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>component</code></p>
    </td>
    <td>
      <p><code>ElementType</code></p>
    </td>
    <td>
      <p><code>"a"</code></p>
    </td>
    <td>
      <p>Custom link component to use for navigation (e.g., a router link).</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>linkProps</code></p>
    </td>
    <td>
      <p><code>Record&lt;string, unknown&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Additional props passed to the link component.</p></td>
  </tr>
</table>
<h2>NavigationFooterNavItem</h2>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>The text label displayed for the navigation item.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>url</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Optional URL the item links to.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>component</code></p>
    </td>
    <td>
      <p><code>ElementType</code></p>
    </td>
    <td>
      <p><code>"a"</code></p>
    </td>
    <td><p>Custom component to render the link (e.g., Next.js Link).</p></td>
  </tr>
  <tr>
    <td>
      <p><code>linkProps</code></p>
    </td>
    <td>
      <p><code>Record&lt;string, unknown&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Props forwarded to the link component.</p></td>
  </tr>
</table>
`}));export{n,t};