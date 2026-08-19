import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>TooltipCondensed</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TooltipCondensed/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { TooltipCondensed } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default TooltipCondensed</h3>
<p>
  One line of text on a cell, which is all a condensed tooltip needs. Move
  across the cell to see it follow the cursor, the behaviour the component locks
  in and the reason it suits a chart.
</p>
<div
  class="sds-doc-example"
  data-example="core/TooltipCondensed/DefaultTooltipCondensed"
></div>
<h3>TooltipCondensed with indicator</h3>
<p>
  Two condensed tooltips on a table cell, each with a coloured dot tying it to
  the value it describes. Both follow the pointer as it moves across the cell.
</p>
<div
  class="sds-doc-example"
  data-example="core/TooltipCondensed/TooltipCondensedWithIndicator"
></div>
<h2>SDS vs MUI</h2>
<p>
  TooltipCondensed is the SDS Tooltip with tighter padding and a fixed set of
  behaviors, for labelling something in a dense surface such as a chart or a
  table cell. It takes every Tooltip prop, including <code>subtitle</code> and
  <code>componentSlot</code>, and adds two of its own:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>indicator</code>: draws a 12px round dot before the text, for tying
      the tooltip to a series in a chart or a colour in a legend.
    </p>
  </li>
  <li>
    <p>
      <code>indicatorColor</code>: the dot's colour, given as a CSS colour
      rather than an SDS name, so read the one you want off the theme. With
      <code>indicator</code> but no colour the dot still takes up its space and
      stays invisible.
    </p>
  </li>
</ul>
<p>
  Five props are applied after yours and so cannot be changed:
  <code>followCursor</code>, which is what makes the tooltip track the pointer
  rather than anchor to the element; <code>placement="right-end"</code>;
  <code>arrow={false}</code>; and <code>enterDelay</code> and
  <code>leaveDelay</code> of 50ms each, which keep it from flickering as the
  pointer crosses a dense chart. Passing a placement or an arrow of your own is
  silently ignored.
</p>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI component can be found
  <a href="https://mui.com/material-ui/react-tooltip/">here</a>
  .
</p>
<h2>Behavior and accessibility</h2>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      Because it follows the cursor, this tooltip is a pointer-only affordance.
      It still opens on focus, but it then appears wherever the pointer happens
      to be, so anything it says has to exist elsewhere for a keyboard or screen
      reader user.
    </p>
  </li>
  <li>
    <p>
      Keep the text to a label: a value, a count, a name. Full sentences belong
      in a Tooltip, and rows of numbers belong in a TooltipTable passed through
      <code>componentSlot</code>.
    </p>
  </li>
  <li>
    <p>
      The dot carries no meaning on its own. Whatever it encodes needs to be
      legible from the text beside it too.
    </p>
  </li>
</ul>
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
      <p><code>title</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The label to show. Pass <code>null</code> when the content is coming
        through <code>componentSlot</code> instead.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>indicator</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td><p>Draws a 12px round dot before the text.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>indicatorColor</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        The dot's colour, as a CSS colour. Without it the dot occupies its space
        but cannot be seen.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>componentSlot</code></p>
    </td>
    <td>
      <p><code>ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Inherited from Tooltip, and how a TooltipTable is placed inside a
        condensed tooltip.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};