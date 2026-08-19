import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Migrating from Icon</h1>
<p>
  The
  <a href="./?path=/docs/deprecated-icon--documentation" target="_top">Icon</a>
  component in <code>@czi-sds/components</code> is deprecated. It still works
  and will keep working until a future major version, so there is no rush, but
  new work should use Phosphor icons or
  <code>@czi-sds/icons</code>
  instead.
</p>
<h2>What changes</h2>
<p>
  The old component took the icon's name as a prop and looked the drawing up in
  a map. In the new model each icon is its own component, which is what lets a
  bundler drop the icons an app does not use.
</p>
<div class="sds-doc-example" data-example="icons/MigrationComparison"></div>
<h2>Prop by prop</h2>
<table class="sds-doc-table">
  <tr>
    <td>
      <p><strong>Before</strong></p>
    </td>
    <td>
      <p><strong>After</strong></p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsIcon="InfoCircle"</code></p>
    </td>
    <td>
      <p>
        The component itself: <code>&lt;InfoIcon /&gt;</code>. Names differ
        between the two sets, so
        <a href="https://phosphoricons.com" target="_blank"
          >phosphoricons.com</a
        >
        is the place to search for an equivalent.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sdsSize="l"</code></p>
    </td>
    <td>
      <p>
        <code>size={24}</code>. The old names map to pixels as
        <code>xxs</code> 10, <code>xs</code> 12, <code>s</code> 16,
        <code>l</code> 24, <code>xl</code> 32. Any number or CSS length is valid
        now, and one icon covers every size rather than each icon supporting
        only some of them.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>color="blue" shade={400}</code></p>
    </td>
    <td>
      <p>
        <code>color</code> takes a CSS color: <code>color="#3867fa"</code>. To
        stay on the palette, read the value from the theme with
        <code>getColors</code>, or use the <code>--sds-color-*</code> CSS
        variables. Leaving <code>color</code> off inherits the surrounding text
        color, which the old component could not do.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>className</code></p>
    </td>
    <td>
      <p><code>className</code>, unchanged.</p>
    </td>
  </tr>
  <tr>
    <td><p>Nothing equivalent</p></td>
    <td>
      <p>
        <code>weight</code>, <code>mirrored</code> and <code>alt</code> are new,
        as is passing any <code>svg</code> prop straight through.
      </p>
    </td>
  </tr>
</table>
<h2>Defaults worth knowing</h2>
<p>
  The old component defaulted to indigo. Phosphor icons default to
  <code>currentColor</code>, so an icon that used to be indigo everywhere will
  now follow its surrounding text unless you set <code>color</code>. That is
  usually an improvement inside buttons and links, but it does mean a bare
  <code>&lt;InfoIcon /&gt;</code> is not a drop-in match for a bare
  <code>&lt;Icon sdsIcon="InfoCircle" sdsSize="l" /&gt;</code>.
</p>
<p>
  The default size changes too, from a required <code>sdsSize</code> to
  <code>1em</code>. An icon with no <code>size</code> scales with the font
  around it, so pass a size where you want a fixed one.
</p>
<h2>Icons SDS still draws</h2>
<p>
  A small set stayed with SDS, either because Phosphor has no equivalent or
  because Phosphor has something close and we want our own version. They live in
  <code>@czi-sds/icons</code>
  and are listed on the
  <a href="./?path=/docs/icons-custom-icons--docs" target="_top"
    >Custom Icons</a
  >
  page. Check there before searching phosphoricons.com: for the second group a
  Phosphor lookalike does exist, and the SDS drawing is the one to use. If the
  icon you are migrating is on neither list, raise it with the design team
  rather than picking the nearest Phosphor match.
</p>
`}));export{t as n,n as t};