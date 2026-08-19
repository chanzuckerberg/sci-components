import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>NavigationJumpTo</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/NavigationJumpTo/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { NavigationJumpTo } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default NavigationJumpTo</h3>
<p>
  Three items, with the two sub-sections of Methods indented under it. The
  highlight starts on the first item and moves with a click. No refs are
  attached to sections here, so nothing scrolls: this is the list's default
  state and nothing more.
</p>
<div
  class="sds-doc-example"
  data-example="core/NavigationJumpTo/DefaultNavigationJumpTo"
></div>
<h3>Sections in a scrolling panel</h3>
<p>
  Three sections with refs wired to the items. Clicking scrolls the panel, and
  scrolling the panel moves the highlight. Bringing a section into view scrolls
  every scroll container around it, so this example holds the docs page still
  while the panel moves; a page that scrolls its own sections wants the
  opposite.
</p>
<div
  class="sds-doc-example"
  data-example="core/NavigationJumpTo/JumpToSections"
></div>
<h3>Sub-items and onChange</h3>
<p>
  Sub-items render indented under their parent, and the readout shows the index
  that <code>onChange</code> reports along with what triggered it. Click an
  item, then scroll the panel by hand to see the other kind of change arrive.
  The sub-sections are siblings of Methods rather than children, because a
  parent section wrapping them would keep the highlight for itself.
</p>
<div
  class="sds-doc-example"
  data-example="core/NavigationJumpTo/JumpToSubItems"
></div>
<h2>SDS vs MUI</h2>
<p>
  NavigationJumpTo is built on MUI's
  <a href="https://mui.com/material-ui/react-tabs/">Tabs</a>
  , but it is not a tab strip: the tabs are page sections, and which one is
  highlighted follows the scroll position rather than a value you hold. It
  differs from Tabs in these ways:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>value</code>: the component owns it. An IntersectionObserver watches
      the sections and highlights the first one in view, so there is no
      <code>value</code> prop to set.
    </p>
  </li>
  <li>
    <p>
      <code>onChange</code>: MUI's signature is replaced. It reports the index
      that became active, the event, and whether a click or a scroll caused it,
      and it fires once per change rather than on every scroll frame.
    </p>
  </li>
  <li>
    <p>
      <code>orientation</code>: <code>"vertical"</code> is set for you, and the
      design only covers vertical. Passing <code>"horizontal"</code> is
      possible, since your props are applied last, but nothing is styled for it.
    </p>
  </li>
  <li>
    <p>
      <strong>Colors are fixed.</strong>
      The indicator is a 2px rule in the accent active color and the label
      colors come from the theme. There is no <code>indicatorColor</code> or
      <code>textColor</code> to set.
    </p>
  </li>
  <li>
    <p>
      <strong>No icons.</strong>
      Items are a title and a ref; there is nowhere to put one.
    </p>
  </li>
  <li>
    <p>
      <strong>Layout is baked in.</strong>
      The component is sticky 24px from the top of its scroll container, draws a
      1px rule down its left edge, and reserves 16px below and 12px to its
      right. Width is the only dimension exposed.
    </p>
  </li>
</ul>
<h2>Behavior notes</h2>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      Each item carries a ref to its section, and the highlight follows the
      first section in view, in the order the items are listed. An earlier
      section still showing by a few pixels therefore keeps the highlight, which
      is the problem <code>offsetTop</code> solves. While a click's smooth
      scroll is running the scroll-driven update is suspended, so the indicator
      does not race through the sections on the way.
    </p>
  </li>
  <li>
    <p>
      Clicking an item scrolls its section into view. With
      <code>offsetTop</code> left at <code>0</code> that is a plain
      <code>scrollIntoView</code>, which works inside a scrolling container as
      well as on the page. Note that it scrolls every container around the
      section, so a section in a panel moves the panel and the page holding it.
    </p>
  </li>
  <li>
    <p>
      Setting <code>offsetTop</code> changes the mechanism: the component
      scrolls the window and finds the section by id. Sections therefore need
      <code>id</code> attributes, and a section without one simply will not
      scroll. It also assumes the page itself scrolls, so pair it with
      page-level scrolling rather than a scrolling panel.
    </p>
  </li>
  <li>
    <p>
      Sub-items nest exactly one level through <code>subItems</code> and render
      indented under their parent. They are ordinary items as far as indexing
      goes: a parent with two sub-items occupies indices 0, 1, and 2.
    </p>
  </li>
  <li>
    <p>
      Each tab points <code>aria-controls</code> at its section's id, falling
      back to a generated <code>navigation-panel-N</code> when the section has
      no id. Give your sections ids so the reference resolves, or the tabs point
      at elements that do not exist.
    </p>
  </li>
  <li>
    <p>
      The strip labels itself <code>navigation-jump-to</code>. Pass an
      <code>aria-label</code> of your own when a page has more than one.
    </p>
  </li>
</ul>
<h2>Props</h2>
<p>
  Everything below is SDS's own. Other
  <a href="https://mui.com/material-ui/api/tabs/">Tabs props</a>
  pass through to the underlying element, and because they are applied after the
  component's own, they can override them.
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
      <p><code>items</code></p>
    </td>
    <td>
      <p><code>Item[]</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>The sections to list. See the shape below.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>offsetTop</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td>
      <p><code>0</code></p>
    </td>
    <td>
      <p>
        How many pixels above a section the highlight should switch to it, which
        is what you want when a sticky header covers the top of the page. Any
        non-zero value also switches clicks to window scrolling by element id.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onChange</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <code
          >(value: number, event?: React.SyntheticEvent, type?: "click" |
          "scroll") =&gt; void</code
        >. Called when the highlighted item changes, with its index and what
        caused the change. For a scroll the event is synthesized, not a real DOM
        event.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>width</code></p>
    </td>
    <td>
      <p><code>CSSProperties["width"]</code></p>
    </td>
    <td>
      <p><code>"100%"</code></p>
    </td>
    <td>
      <p>
        The width of the strip and of every item in it. Long titles wrap rather
        than truncate.
      </p>
    </td>
  </tr>
</table>
<h2>Item</h2>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>title</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The item's label. It is also kebab-cased into the tab's id, so keep
        titles distinct.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>elementRef</code></p>
    </td>
    <td>
      <p><code>MutableRefObject&lt;HTMLElement | null&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        A ref on the section this item points at. The component observes and
        scrolls whatever the ref holds.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>subItems</code></p>
    </td>
    <td>
      <p><code>{ title, elementRef }[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Indented children, one level only. Sub-items cannot nest sub-items of
        their own.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};