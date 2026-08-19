import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Testing with the Inspector</h1>
<p>
  The
  <a
    href="https://github.com/modelcontextprotocol/inspector"
    target="_blank"
    rel="noreferrer"
    >MCP Inspector</a
  >
  is the official debugging client for MCP servers. It connects to the server
  the same way an editor would and lets you call tools by hand, which makes it
  the fastest way to see exactly what an agent receives, without an agent in the
  way deciding what to call and paraphrasing the result.
</p>
<p>
  It has two modes. The <strong>UI</strong> is for exploring, and the
  <strong>CLI</strong> is for checking one specific thing or scripting a
  regression check.
</p>

<h2>The UI</h2>
<p>Two scripts run it, from the repository root:</p>
<table class="sds-doc-table">
  <tr>
    <td><p>Command</p></td>
    <td><p>Runs against</p></td>
  </tr>
  <tr>
    <td>
      <p><code>yarn mcp:inspect:dev</code></p>
    </td>
    <td>
      <p>
        The TypeScript sources through <code>tsx</code>, with no build step. Use
        this while editing <code>src/</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>yarn mcp:inspect</code></p>
    </td>
    <td>
      <p>
        The bundle in <code>dist/</code>. This is what gets published, so use it
        to confirm a change survives the build.
      </p>
    </td>
  </tr>
</table>
<p>
  The difference matters more than it looks. <code>dist/</code> is only as fresh
  as your last <code>yarn mcp:build</code>, and because that build regenerates
  everything under <code>data/</code>, it is also the only one of the two that
  reflects component changes made outside the MCP package.
</p>
<p>Either command opens a browser tab. From there:</p>
<ol class="sds-doc-ordered-list">
  <li>
    <p>Press <strong>Connect</strong> in the left sidebar.</p>
  </li>
  <li>
    <p>
      Open the <strong>Tools</strong> tab and press <strong>List Tools</strong>.
      All four should appear; if one is missing it was never registered in
      <code>src/tools/index.ts</code>.
    </p>
  </li>
  <li>
    <p>
      Pick a tool, fill in its parameters, and press <strong>Run Tool</strong>.
    </p>
  </li>
  <li>
    <p>
      Read the raw response. Check the shape and not just the content: a tool
      that returns an error message inside a successful response still looks
      like a success to the client.
    </p>
  </li>
</ol>
<p>
  The <strong>Resources</strong> tab works the same way for the three rules
  documents, and the <strong>Notifications</strong> pane at the bottom carries
  anything the server logged, which is where startup failures surface.
</p>

<h2>The CLI</h2>
<p>
  The same inspector runs headless with <code>--cli</code>, printing JSON to
  standard output. This is the mode to use for a quick check or a script.
</p>
<p>
  Each command below runs from <code>packages/mcp</code> and points at the built
  server.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>List the tools</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">npx -y @modelcontextprotocol/inspector@latest --cli node dist/stdio.js \\
  --method tools/list</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>Call a tool</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">npx -y @modelcontextprotocol/inspector@latest --cli node dist/stdio.js \\
  --method tools/call --tool-name get_component_props \\
  --tool-arg component=Accordion</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>List the resources</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">npx -y @modelcontextprotocol/inspector@latest --cli node dist/stdio.js \\
  --method resources/list</code></pre>
  </figure>
</div>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>Read a resource</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">npx -y @modelcontextprotocol/inspector@latest --cli node dist/stdio.js \\
  --method resources/read --uri sds://rules/components</code></pre>
  </figure>
</div>
<p>
  Pass <code>--tool-arg</code> once per argument. Because the output is JSON, it
  pipes into <code>jq</code> or <code>node</code> for assertions, which is
  useful for confirming that a change to the generation scripts did what you
  expected:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>Shell</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">npx -y @modelcontextprotocol/inspector@latest --cli node dist/stdio.js \\
  --method tools/call --tool-name get_component_props \\
  --tool-arg component=Accordion \\
  | jq -r '.content[0].text' | jq '.Accordion.props.togglePosition'</code></pre>
  </figure>
</div>
<p>
  The double <code>jq</code> is not a mistake. A tool's payload is a string
  inside the MCP envelope, so the first call pulls the string out and the second
  parses it.
</p>

<h2>Against the published package</h2>
<p>
  To check what a user actually gets, point the inspector at the npm package
  rather than your working tree:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>Shell</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">npx -y @modelcontextprotocol/inspector@latest --cli npx @czi-sds/mcp \\
  --method tools/list</code></pre>
  </figure>
</div>
<p>
  The inner <code>npx</code> deliberately has no <code>-y</code>: the inspector
  claims every flag it recognises before the command, so it would be read as the
  inspector's own. Run <code>npx -y @czi-sds/mcp</code> once beforehand to get
  the package cached.
</p>

<h2>Common problems</h2>
<h3>"PORT IS IN USE"</h3>
<p>
  An earlier inspector is still running, usually because a previous session was
  closed by shutting the browser tab rather than stopping the process. Find and
  stop it:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>Shell</figcaption>
    <pre><code class="sds-doc-codeblock-content language-sh">pkill -f "modelcontextprotocol/inspector"</code></pre>
  </figure>
</div>

<h3>A tool is missing from the list</h3>
<p>
  Tools are only registered if they appear in the <code>tools</code> array in
  <code>src/tools/index.ts</code>. If it is there and still missing, check
  whether the tool's <code>disabled()</code> hook is returning true, and whether
  its <code>ctx()</code> threw during startup: a throw there fails registration,
  and the reason will be in the Notifications pane.
</p>

<h3>A tool reports that data files are not found</h3>
<p>
  The <code>data/</code> directory has not been generated. Run
  <code>yarn mcp:generate</code>, or <code>yarn mcp:build</code>, which does it
  first.
</p>

<h3>The CLI reports a connection timeout</h3>
<p>
  Something the server printed to standard output was not valid protocol
  traffic. STDIO carries the protocol itself, so a stray
  <code>console.log</code> in server code corrupts the stream. Log to
  <code>console.error</code> instead, which goes to standard error and is left
  alone.
</p>

<h3>Changes are not showing up</h3>
<p>
  If you are running <code>yarn mcp:inspect</code>, you are testing the last
  build. Rebuild with <code>yarn mcp:build</code>, or switch to
  <code>yarn mcp:inspect:dev</code>, which reads the sources directly.
</p>
`}));export{n,t};