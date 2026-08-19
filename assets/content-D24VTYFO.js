import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Panel</h1>
<h2>Source Code</h2>
<p>The component's source code in the SDS codebase can be found here.</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { Panel } from "@czi-sds/components";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<div
  class="sds-doc-callout sds-doc-callout-background-3 sds-doc-callout-full-width"
>
  <p>
    <strong>Note:</strong>
    A panel fixes itself to an edge of the viewport, which on this page means an
    edge of the docs rather than of the example. Each example below therefore
    holds its panel inside its own frame, with a wrapper that fixed positioning
    resolves against and, for the overlay panels, a container for the portal and
    another for the transition, so the panel slides the width of the frame
    rather than of the window. None of that belongs in an application.
  </p>
</div>
<h3>Basic panel</h3>
<p>
  A persistent panel on the left, with the page's content shifted by the same
  width so the two do not overlap.
</p>
<div
  class="sds-doc-example"
  data-example="core/Panel/BasicPanel"
  data-example-padding="none"
></div>
<h3>Overlay panel</h3>
<p>
  An overlay panel on the right with a header, the default close button, and
  <code>isBackdropClickEnabled</code> so a click outside closes it through
  <code>onClose</code>.
</p>
<div
  class="sds-doc-example"
  data-example="core/Panel/OverlayPanel"
  data-example-padding="none"
></div>
<h3>Overlay panel along the bottom</h3>
<p>
  The bottom position spans the full width, and the <code>width</code> prop
  becomes the panel's height. This one has no backdrop, so clicks outside it
  land on the page underneath.
</p>
<div
  class="sds-doc-example"
  data-example="core/Panel/OverlayPanelBottom"
  data-example-padding="none"
></div>
<h3>Overlay panel with a custom close control</h3>
<p>
  <code>CloseButtonComponent</code> replaces the X with anything you like, and
  the header holds more than a title.
</p>
<div
  class="sds-doc-example"
  data-example="core/Panel/OverlayPanelCustomClose"
  data-example-padding="none"
></div>
<h3>Changing the animation speed</h3>
<p>
  <code>transitionDuration</code> times the slide. Each button below reopens the
  same panel at a different setting, from the 225ms default to none at all, and
  the example holds the setting while the panel closes so the way out matches
  the way in.
</p>
<div
  class="sds-doc-example"
  data-example="core/Panel/OverlayPanelTransition"
  data-example-padding="none"
></div>
<h2>SDS vs MUI</h2>
<p>The SDS Panel wraps the MUI Drawer, with these differences:</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <strong>sdsType instead of variant:</strong>
      MUI picks the kind of drawer with <code>variant</code>; SDS picks it with
      <code>sdsType</code>, which takes two of the three MUI variants.
    </p>
    <ul class="sds-doc-bullet-list">
      <li>
        <p><code>"basic"</code> is MUI's persistent drawer.</p>
      </li>
      <li>
        <p><code>"overlay"</code> is MUI's temporary drawer.</p>
      </li>
    </ul>
  </li>
  <li>
    <p>
      <strong>position instead of anchor:</strong>
      MUI's <code>anchor</code> takes four edges. SDS narrows it to
      <code>position</code>: <code>"left"</code> or <code>"right"</code> for a
      basic panel, plus <code>"bottom"</code> for an overlay. A basic panel
      asked for <code>"bottom"</code> is anchored left instead, and TypeScript
      rejects the combination up front.
    </p>
  </li>
  <li>
    <p>
      <code>width</code>: MUI leaves the drawer's size to your own styles. SDS
      takes a <code>width</code> and defaults it to 240px for a basic panel and
      320px for an overlay. Along the bottom edge it sets the height instead,
      since the panel spans the screen. Either way the panel will not go below
      its type's default in either direction, so smaller values have no effect.
    </p>
  </li>
  <li>
    <p>
      <strong>A header row on the overlay:</strong>
      an overlay panel always draws a close button, and
      <code>HeaderComponent</code> fills the space beside it. Both live in a bar
      that sticks to the top of the panel while its content scrolls under a
      short gradient. A basic panel has no such bar and no close control of its
      own.
    </p>
  </li>
  <li>
    <p>
      <strong>A backdrop you opt into:</strong>
      MUI's temporary drawer always lays a visible backdrop over the page. SDS
      hides it, so the page behind an overlay panel stays legible and clickable.
      <code>isBackdropClickEnabled</code> brings back an invisible one, which
      gives you a click-outside target without dimming anything.
    </p>
  </li>
  <li>
    <p>
      <strong>Motion the SDS theme does not shorten:</strong>
      every MUI transition reads its length from the theme, and SDS sets those
      lengths short (20ms in, 10ms out) for the small elements that make up most
      of the system. A panel is far too large to cross the screen in a frame, so
      it keeps MUI's own drawer timings of 225ms in and 195ms out.
      <code>transitionDuration</code> overrides either direction.
    </p>
  </li>
  <li>
    <p>
      <strong>Focus and scrolling stay with the page:</strong>
      SDS forces <code>disableEnforceFocus</code> and
      <code>disableScrollLock</code> on the underlying Modal, so an open panel
      neither traps the keyboard nor freezes the page's scrollbar. Anything else
      you pass through <code>ModalProps</code> is kept. The paper also gets a
      default <code>aria-label</code> of <code>"Panel"</code>, which
      <code>slotProps.paper</code> can replace.
    </p>
  </li>
</ul>
<h2>Behavior notes</h2>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      Nothing about a basic panel is automatic: it does not close itself, and it
      does not move the page's content. Put a control on the page to toggle
      <code>open</code>, and shift your content by the same width you gave the
      panel so the two do not overlap.
    </p>
  </li>
  <li>
    <p>
      An overlay panel closes through two separate props.
      <code>closeButtonOnClick</code> fires from the header's close button;
      <code>onClose</code> fires on Escape, and on a click outside the panel
      when <code>isBackdropClickEnabled</code> is set. Set both to the same
      handler, or the panel will only close one way.
    </p>
  </li>
  <li>
    <p>
      The close button is drawn whether or not you handle it, so an overlay
      panel without <code>closeButtonOnClick</code> offers a control that does
      nothing.
    </p>
  </li>
  <li>
    <p>
      <code>closeButtonOnClick</code> is attached to the wrapper around the
      close button rather than to the button itself, so a
      <code>CloseButtonComponent</code> needs no click handler of its own. That
      wrapper also sizes any icon inside a button to 24px, which overrides
      <code>sdsSize</code> on the icon.
    </p>
  </li>
  <li>
    <p>
      Two basic panels can be open at once, one on each side, because each is
      part of the page's layout. Overlay panels are not, so a second one opens
      over the first rather than beside it; the guidance above asks for one at a
      time.
    </p>
  </li>
  <li>
    <p>
      An overlay panel takes focus when it opens but does not keep it, so Escape
      only reaches the panel while focus is still inside. Once the reader clicks
      or tabs back into the page, the close button and the backdrop are the only
      ways out.
    </p>
  </li>
  <li>
    <p>
      Because an overlay panel deliberately does not trap focus, MUI's
      <code>aria-hidden-focus</code> rule reports a violation against it. SDS
      suppresses that rule for the Panel's stories while waiting on a fix
      upstream.
    </p>
  </li>
  <li>
    <p>
      The panel slides from the edge it is anchored to over 225ms, and back out
      over 195ms. <code>transitionDuration</code> changes both, or either one on
      its own with <code>{ enter, exit }</code>. These are MUI's own drawer
      timings rather than the SDS theme's, which are set short for smaller
      elements and leave a panel looking like it jumps into place. Note that SDS
      leaves MUI's <code>motion.reducedMotion</code> setting at
      <code>"never"</code>, so the animation plays regardless of the reader's
      reduced-motion preference; an application that wants to honour it can set
      that theme option to <code>"system"</code>.
    </p>
  </li>
</ul>
<h2>MUI Documentation</h2>
<p>
  Documentation for the underlying MUI component can be found
  <a href="https://mui.com/material-ui/react-drawer/">here</a>
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
      <p><code>sdsType</code></p>
    </td>
    <td>
      <p><code>"basic" | "overlay"</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        <code>"basic"</code> sits in the page and stays until you close it;
        <code>"overlay"</code> floats over the page with a header and close
        button. It also decides which of the props below apply, so TypeScript
        needs it spelled out even though the component falls back to
        <code>"basic"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>open</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        Whether the panel is showing. The panel never changes this itself, so
        hold it in your own state.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>position</code></p>
    </td>
    <td>
      <p><code>"left"</code> | <code>"right"</code> |</p>
      <p><code>"bottom"</code> (overlay only)</p>
    </td>
    <td>
      <p><code>"left"</code></p>
    </td>
    <td>
      <p>
        Which edge the panel is attached to. A basic panel takes
        <code>"left"</code> or <code>"right"</code>; an overlay adds
        <code>"bottom"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>width</code></p>
    </td>
    <td>
      <p><code>number | string</code></p>
    </td>
    <td>
      <p><code>240</code> (basic)</p>
      <p><code>320</code> (overlay)</p>
    </td>
    <td>
      <p>
        How wide the panel is, or how tall it is when positioned along the
        bottom. Numbers are read as pixels. Values below the default are
        ignored, since the panel keeps that as its minimum in both directions.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>HeaderComponent</code></p>
    </td>
    <td>
      <p><code>React.ReactNode</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Overlay only. Fills the header bar beside the close button. Leave it out
        and the bar holds the close button alone.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>closeButtonOnClick</code></p>
    </td>
    <td>
      <p><code>React.MouseEventHandler&lt;HTMLDivElement&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Overlay only. Runs when the header's close control is clicked. Without
        it, the control does nothing.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>CloseButtonComponent</code></p>
    </td>
    <td>
      <p><code>React.ReactNode</code></p>
    </td>
    <td>
      <p><code>&lt;Button</code></p>
      <p><code>sdsStyle="minimal"</code></p>
      <p><code>sdsType="secondary"</code></p>
      <p><code>size="large"</code></p>
      <p><code>backgroundOnHover={false}</code></p>
      <p><code>aria-label="Panel Toggle"&gt;</code></p>
      <p><code>&lt;Icon sdsIcon="XMark" sdsSize="l" /&gt;</code></p>
      <p><code>&lt;/Button&gt;</code></p>
    </td>
    <td>
      <p>
        Overlay only. Replaces the close button. Clicks are handled by the
        wrapper around it, so it needs no handler of its own.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>isBackdropClickEnabled</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        Overlay only in practice. Adds an invisible backdrop so a click outside
        the panel reaches <code>onClose</code>. Left off, clicks pass through to
        the page.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onClose</code></p>
    </td>
    <td>
      <p><code>(event, reason) =&gt; void</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        MUI's Drawer callback, fired on a backdrop click and on Escape while
        focus is inside the panel. It does not fire for the header's close
        button, which reports through <code>closeButtonOnClick</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>transitionDuration</code></p>
    </td>
    <td>
      <p><code>number</code> |</p>
      <p><code>{ appear?: number,</code></p>
      <p><code>enter?: number,</code></p>
      <p><code>exit?: number }</code></p>
    </td>
    <td>
      <p><code>{ enter: 225, exit: 195 }</code></p>
    </td>
    <td>
      <p>
        How long the panel takes to slide in and out, in milliseconds. The Panel
        keeps MUI's drawer timings instead of the much shorter ones in the SDS
        theme, which a surface this large arrives too quickly to read as motion.
        Pass <code>0</code> for no animation.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>ModalProps</code></p>
    </td>
    <td>
      <p><code>ModalProps</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Passed to the Modal behind an overlay panel, except for
        <code>disableEnforceFocus</code> and <code>disableScrollLock</code>,
        which SDS pins to <code>true</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>slotProps</code></p>
    </td>
    <td>
      <p><code>DrawerProps["slotProps"]</code></p>
    </td>
    <td>
      <p><code>{ backdrop: { invisible: true },</code></p>
      <p><code>paper: { aria-label: "Panel" } }</code></p>
    </td>
    <td>
      <p>
        Merged with the SDS defaults slot by slot, so a paper
        <code>aria-label</code> or <code>aria-labelledby</code> of your own
        replaces the default name while the rest of the defaults survive.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};