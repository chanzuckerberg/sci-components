import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>TagFilter</h1>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/TagFilter/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { TagFilter } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3>Default TagFilter</h3>
<p>
  A row of applied filters, each removing itself from the page's state through
  <code>onDelete</code>. The row is a named group, which gives the identical
  "Delete Tag" buttons some context.
</p>
<div
  class="sds-doc-example"
  data-example="core/TagFilter/DefaultTagFilter"
></div>
<h2>SDS vs MUI</h2>
<p>
  TagFilter is built on the SDS Tag, and so on MUI's Chip, but it exists for one
  job: showing which
  <a href="./?path=/docs/design-documentation-dna-filters--docs" target="_top"
    >Filters</a
  >
  are applied and letting them be taken off again. It has one appearance and no
  style props:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <strong>onDelete is required.</strong>
      MUI treats it as the switch that decides whether a chip can be deleted;
      here the delete control is always there, so the handler has to be.
      Removing the tag from your own state is what makes it disappear.
    </p>
  </li>
  <li>
    <p>
      <strong>The look is fixed:</strong>
      the accent fill, the square shape, the small semibold label and the 12px
      X. Tag's <code>sdsStyle</code>, <code>sdsType</code>,
      <code>sdsSize</code> and <code>color</code> are not part of the type, and
      MUI's <code>variant</code> is not either.
    </p>
  </li>
  <li>
    <p>
      <strong>The X cannot be swapped:</strong>
      SDS applies its own <code>deleteIcon</code> (an SDS Button holding the
      XMark icon) after your props, so a <code>deleteIcon</code> of your own is
      ignored without a warning.
    </p>
  </li>
</ul>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI component can be found
  <a href="https://mui.com/material-ui/react-chip/">here</a>
  .
</p>
<h2>Behavior and accessibility</h2>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      There are two ways to remove a filter, and both are reachable from the
      keyboard: the X is a button that answers Enter, and the tag itself answers
      Backspace and Delete. That also means each filter tag is two tab stops.
    </p>
  </li>
  <li>
    <p>
      The X button is named "Delete Tag" on every filter tag, and the name
      cannot be changed. The label beside it is read as plain text rather than
      as part of the button, so a row of filters is worth wrapping in a group
      with a name of its own, to say what the buttons are removing. The example
      below uses <code>role="group"</code> with an <code>aria-label</code>.
    </p>
  </li>
  <li>
    <p>
      The tag carries <code>role="none presentation"</code>, so it contributes
      no semantics of its own. Adding an <code>onClick</code> does not change
      that: the tag becomes clickable to the pointer while still announcing
      nothing, so leave the clicking to the X.
    </p>
  </li>
  <li>
    <p>
      Like a Tag, a filter tag does not wrap: a long filter value is cut off
      with an ellipsis. Keep the values short, or shorten them yourself so the
      part that survives is the part that matters.
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
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        The filter's text. Cut off with an ellipsis when there is not room for
        it.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onDelete</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        Runs when the X is clicked or activated, and when Backspace or Delete is
        pressed on the tag. Drop the filter from your state here; the component
        does not remove itself.
      </p>
      <p>
        <strong>Signature:</strong>
        <code>function(event: SyntheticEvent) =&gt; void</code>
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};