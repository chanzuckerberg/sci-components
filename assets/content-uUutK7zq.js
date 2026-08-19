import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Icon</h1>
<div
  class="sds-doc-callout sds-doc-callout-background-4 sds-doc-callout-full-width"
>
  <p>
    <strong>Deprecated:</strong>
    SDS icons come from
    <a href="https://phosphoricons.com" target="_blank">Phosphor</a>
    now, and this component will be removed in a future major version. Import
    the icon you need from <code>@phosphor-icons/react</code>, or from
    <code>@czi-sds/icons</code> for the icons SDS draws itself. Both take the
    same props, so the only difference between them is where you import from.
    <a href="./?path=/docs/icons-migrating-from-icon--docs" target="_top">
      Migrating from Icon
    </a>
    maps each prop on this page to its replacement.
  </p>
</div>
<p>
  The rest of this page documents the component as it still behaves, so existing
  usages can be read and migrated.
</p>
<h2>Source Code</h2>
<p>
  The Icon component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Icon/index.tsx"
  >
    here
  </a>
  . The list of icon names and the sizes each one supports lives in
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Icon/map.ts"
  >
    map.ts
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { Icon } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default Icon</h3>
<p>
  <code>sdsIcon</code> and <code>sdsSize</code> are the only required props.
  With no <code>color</code> set, the icon renders in indigo.
</p>
<div class="sds-doc-example" data-example="core/Icon/DefaultIcon"></div>
<h3>Icon Sizes</h3>
<p>
  The five sizes, shown with an icon that supports all of them. Below
  <code>"s"</code> the 16px artwork is scaled down, and at <code>"l"</code> and
  <code>"xl"</code> a separate, more detailed drawing is used.
</p>
<div class="sds-doc-example" data-example="core/Icon/IconSizes"></div>
<h3>Sizes Are Per Icon</h3>
<p>
  Some icons ship only the small artwork and some only the large. Asking for a
  size an icon does not have fails to compile, and renders nothing at runtime.
</p>
<div class="sds-doc-example" data-example="core/Icon/IconAvailableSizes"></div>
<h3>Icon Colors</h3>
<p>
  <code>color</code> picks the hue and <code>shade</code> picks the step within
  it. Both come from the SDS palette rather than from the surrounding text
  color.
</p>
<div class="sds-doc-example" data-example="core/Icon/IconColors"></div>
<h3>Icons in Components</h3>
<p>
  When an icon is passed to another SDS component, that component controls the
  size and the color, so leave <code>color</code> off and let it inherit the
  component's states.
</p>
<div class="sds-doc-example" data-example="core/Icon/IconsInComponents"></div>
<h3>Accessible Icon-only Controls</h3>
<p>
  The SVG carries no accessible name, so an icon on its own needs a label on the
  control around it. Next to visible text the icon is decorative and needs
  nothing.
</p>
<div class="sds-doc-example" data-example="core/Icon/AccessibleIcons"></div>
<h2>How it works</h2>
<p>
  Icon renders an SVG through MUI's SvgIcon, picking one of two drawings based
  on the size you ask for: <code>"xxs"</code>, <code>"xs"</code>, and
  <code>"s"</code> use the 16px artwork, while <code>"l"</code> and
  <code>"xl"</code> use the 24px artwork. Both are then scaled to the exact
  dimensions of the size. This is why the sizes are not interchangeable across
  icons; an icon that only ships the large artwork cannot be rendered at
  <code>"s"</code>.
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      The types tie the two props together. Passing a size an icon does not
      support is a TypeScript error, and at runtime it logs an error to the
      console and renders nothing at all rather than falling back to another
      size.
    </p>
  </li>
  <li>
    <p>
      The icon is wrapped in a div with <code>display: contents</code>, so it
      does not add a box to the layout and the SVG behaves as a direct child of
      whatever contains it.
    </p>
  </li>
  <li>
    <p>
      The color comes from the SDS palette, not from the surrounding text color,
      and it defaults to indigo. Pair Icon with a component like Button or
      MenuItem when the icon should follow that component's state colors.
    </p>
  </li>
  <li>
    <p>
      The SVG has no title or label of its own. When an icon carries meaning on
      its own, put the label on the interactive element around it, for example
      an <code>aria-label</code> on an icon-only Button.
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
      <p><code>sdsIcon</code></p>
    </td>
    <td>
      <p><code>keyof IconNameToSizes</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Required. The name of the icon, as listed in the Icon Bank. Names are
        case-sensitive, for example <code>"XMark"</code> and
        <code>"LightBulb"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsSize</code></p>
    </td>
    <td>
      <p><code>"xxs"</code> (10px) |</p>
      <p><code>"xs"</code> (12px) |</p>
      <p><code>"s"</code> (16px) |</p>
      <p><code>"l"</code> (24px) |</p>
      <p><code>"xl"</code> (32px)</p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Required. Which sizes are accepted depends on the icon named in
        <code>sdsIcon</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>color</code></p>
    </td>
    <td>
      <p>
        <code
          >"blue" | "gray" | "green" | "purple" | "indigo" | "red" |
          "yellow"</code
        >
      </p>
    </td>
    <td>
      <p><code>"indigo"</code></p>
    </td>
    <td>
      <p>
        A hue from the SDS palette. Note that this is the SDS
        <code>color</code> prop, not the MUI one, and it does not accept a CSS
        color.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>shade</code></p>
    </td>
    <td>
      <p><code>100 | 200 | 300 | 400 | 500 | 600 | 700 | 800</code></p>
    </td>
    <td>
      <p><code>500</code> in light mode, <code>600</code> in dark mode</p>
    </td>
    <td><p>The step within the chosen hue.</p></td>
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
        Applied to the SVG. Useful for overriding the fill from a parent
        component.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};