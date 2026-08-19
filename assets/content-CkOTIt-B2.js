import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>HeatmapChart</h1>
<p>
  A grid of cells coloured by value, for matrices too large to read as a table.
</p>
<div
  class="sds-doc-callout sds-doc-callout-background-3 sds-doc-callout-full-width"
>
  <p>
    <strong>Ships separately:</strong>
    HeatmapChart comes from <code>@czi-sds/data-viz</code>, not
    <code>@czi-sds/components</code>, and it needs ECharts alongside it. See the
    <a href="./?path=/docs/data-viz-overview--docs" target="_top">
      Data Viz overview
    </a>
    for installation and peer dependencies.
  </p>
</div>
<h2>Source Code</h2>
<p>
  The component's source code in the SDS codebase can be found
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/data-viz/src/core/HeatmapChart/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { HeatmapChart } from "@czi-sds/data-viz";</code></pre>
  </figure>
</div>
<h2>Code examples</h2>
<h3><strong>Default HeatmapChart</strong></h3>
<p>
  The smallest complete heatmap: cells, two axes, a size, and an
  <code>itemStyle</code> that turns each value into a color.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/HeatmapChart/DefaultHeatmapChart"
></div>
<h3>Dot plot</h3>
<p>
  Circles sized by one measurement and coloured by another, which is the form
  this chart is most often used in: expression by cell type, with the diameter
  carrying the share of cells expressing the gene.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/HeatmapChart/HeatmapChartDotPlot"
></div>
<h3>Axis labels and a tooltip</h3>
<p>
  Labels turned back on through <code>options</code>, with the grid inset to
  make room for them, and an ECharts tooltip naming the cell under the pointer.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/HeatmapChart/HeatmapChartWithAxesAndTooltip"
></div>
<h3>Large grids and the camera</h3>
<p>
  A 4,800-cell grid rendered 240 cells at a time. Drag to move the window, or
  use the wheel to travel down it.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/HeatmapChart/HeatmapChartWithCamera"
></div>
<h3>Downloading</h3>
<p>
  A download button that exports the chart itself, and a renderer switch to show
  the format following it: SVG out of the SVG renderer, PNG out of the canvas
  one.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/HeatmapChart/DownloadHeatmapChart"
></div>
<h3>Events</h3>
<p>
  A click handler through <code>onEvents</code>, reading the cell back out of
  the ECharts event.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/HeatmapChart/HeatmapChartWithEvents"
></div>
<h2>How it is built</h2>
<p>
  HeatmapChart is a thin React wrapper around an
  <a href="https://echarts.apache.org/en/index.html">Apache ECharts</a>
  instance. It is not ECharts' heatmap series: it is a scatter series drawn on
  two category axes, one symbol per cell. That is what lets a cell be a square,
  a rounded square, or a circle whose diameter carries a second measurement, as
  a dot plot.
</p>
<p>Three consequences of that design are worth knowing before you start:</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <strong>The props are ECharts' vocabulary, not the SDS one.</strong>
      <code>itemStyle</code>, <code>emphasis</code>, <code>symbolSize</code>,
      <code>grid</code>, and <code>axisPointer</code> are passed through to the
      underlying option object, and the ECharts documentation is the reference
      for each of them. The chart takes nothing from the SDS theme: color scales
      are yours to supply.
    </p>
  </li>
  <li>
    <p>
      <strong>It renders to SVG by default.</strong>
      That keeps text crisp and elements inspectable, and is the right choice up
      to a few thousand cells. Beyond that, switch
      <code>echartsRendererMode</code> to <code>"canvas"</code>, and reach for
      the camera below.
    </p>
  </li>
  <li>
    <p>
      <strong>Animation is off and updates are throttled to 100ms.</strong>
      The component is memoised and resizes the chart before each update, so
      passing new data on every frame is safe; it will coalesce.
    </p>
  </li>
</ul>
<h2>Sizing</h2>
<p>
  <code>width</code> and <code>height</code> are required, in pixels, and the
  component throws if either is missing or zero: ECharts cannot initialise into
  a box with no area. The chart does not measure its container, so a responsive
  heatmap means measuring the container yourself and passing the result down.
</p>
<p>
  The grid fills those dimensions exactly, which makes cell size a matter of
  arithmetic: pick the pixel size a cell should be and multiply by the number of
  categories on each axis. Sizing the container to anything else stretches the
  cells rather than clipping them.
</p>
<h2>Data and encoding</h2>
<p>
  <code>data</code> is a flat array of cells, one per position in the grid, and
  each cell is an object of whatever shape suits the data.
  <code>encode</code> names the two fields that place it:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">const data = [
  { geneIndex: 0, cellTypeIndex: 0, percentage: 0.5 },
  { geneIndex: 1, cellTypeIndex: 0, percentage: 0.8 },
];

&lt;HeatmapChart
  data={data}
  encode={{ x: "geneIndex", y: "cellTypeIndex" }}
  xAxisData={genes}
  yAxisData={cellTypes}
  width={genes.length * 20}
  height={cellTypes.length * 20}
/&gt;</code></pre>
  </figure>
</div>
<p>
  <code>xAxisData</code> and <code>yAxisData</code> are the categories
  themselves, as strings, numbers, or objects with a <code>value</code> and a
  <code>textStyle</code>. The values a cell is encoded on are indices into them,
  so the two must line up: a cell whose <code>geneIndex</code> is 4 lands on the
  fifth entry of <code>xAxisData</code>.
</p>
<p>
  Everything else a cell carries (an expression level, a count, a p-value) is
  invisible until something draws it. That is the job of
  <code>itemStyle</code> and <code>symbolSize</code>, both of which accept a
  callback that receives the data item, so the color scale and the size scale
  are yours to define. Without an <code>itemStyle</code> every cell is black,
  and <code>symbolSize</code> defaults to 5 pixels.
</p>
<h2>The camera</h2>
<p>
  A heatmap of any real size cannot be rendered whole. <code>camera</code> turns
  on a window over the grid, given in cells rather than pixels, and only the
  cells inside it are drawn:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">&lt;HeatmapChart
  camera={{ active: true, width: 40, height: 20 }}
  width={40 * CELL_PX}
  height={20 * CELL_PX}
  {...rest}
/&gt;</code></pre>
  </figure>
</div>
<p>
  Underneath it is ECharts' <code>dataZoom</code> with the zoom locked, which is
  why the interactions are the ones <code>dataZoom</code> provides: dragging
  pans the window, and the wheel scrolls it vertically. The window starts at the
  origin of the grid, and defaults to 40 cells wide by 20 tall when the sizes
  are left out. Size the container to the window, not to the data.
</p>
<h2>Escape hatches</h2>
<p>
  The named props cover the common cases; everything else in ECharts is reached
  through <code>options</code>, which is merged into the generated option
  object. Tooltips, visual maps, and axis labels all arrive this way. The merge
  is shallow and treats a few keys specially, which is worth knowing when an
  option appears to be ignored:
</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <code>xAxis</code>, <code>yAxis</code> and <code>series</code> are merged
      one level deep over the chart's defaults, and only the first entry of each
      is read. Passing an object replaces the matching default key outright, so
      <code>axisLabel</code> given to <code>xAxis</code> replaces the whole
      default <code>axisLabel</code> rather than adding to it.
    </p>
  </li>
  <li>
    <p>
      <code>axisPointer</code> and <code>dataZoom</code> accept either a single
      object, applied to both axes, or a two-entry array for the x and y axes
      separately. <code>dataZoom</code> is only applied when the camera is
      active, since otherwise there is no window for it to describe.
    </p>
  </li>
  <li>
    <p>
      <code>grid</code> has a prop of its own, which takes either an option
      object or a function receiving the computed default. That is useful for
      insetting the grid to make room for axis labels while keeping the sizing
      the chart worked out.
    </p>
  </li>
  <li>
    <p>
      Every other key in <code>options</code> is spread over the result
      untouched, and wins.
    </p>
  </li>
</ul>
<div
  class="sds-doc-callout sds-doc-callout-background-1 sds-doc-callout-full-width"
>
  <p>
    <strong>dataZoom and options.dataZoom both work.</strong>
    They are merged in that order over the window's own defaults, so
    <code>options</code> wins where the two overlap. Either way the camera has
    to be active for the merge to reach the chart.
  </p>
</div>
<h2>Downloading the chart</h2>
<p>
  There is no download prop. Exporting is something the ECharts instance does,
  so the work is getting hold of it: the ref the component forwards points at
  the container ECharts was initialised on, and
  <code>getInstanceByDom</code> trades that element for the chart. From there,
  <code>getDataURL</code> returns the picture as a data URL and an anchor turns
  it into a file:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { useRef } from "react";
import { getInstanceByDom } from "echarts";
import { HeatmapChart } from "@czi-sds/data-viz";

const containerRef = useRef&lt;HTMLDivElement&gt;(null);

function download() {
  const container = containerRef.current;
  const chart = container &amp;&amp; getInstanceByDom(container);

  if (!chart) return;

  const url = chart.getDataURL({ pixelRatio: 2, type: "png" });

  if (!url) return;

  const link = document.createElement("a");
  link.download = "heatmap.png";
  link.href = url;
  link.click();
}

&lt;HeatmapChart ref={containerRef} {...rest} /&gt;</code></pre>
  </figure>
</div>
<p>
  Look the instance up when the download is triggered rather than caching it.
  Changing <code>echartsRendererMode</code> disposes the chart and builds a new
  one on the same element, and a cached reference would be exporting one that no
  longer exists.
</p>
<p>Three things decide what comes out:</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      <strong>The renderer decides the format, not the type option.</strong>
      An SVG chart can only export SVG, and a canvas chart can only export a
      raster; asking a canvas chart for <code>type: "svg"</code> produces a PNG
      with a misleading name. Derive the file extension from
      <code>echartsRendererMode</code>, as the example below does, or fix the
      renderer and the extension together.
    </p>
  </li>
  <li>
    <p>
      <code>pixelRatio</code> and <code>backgroundColor</code> only apply on the
      canvas path: 2 or 3 for a print-resolution PNG, and a colour if the
      default transparent background will not do. An SVG export ignores both and
      keeps the chart's own background. <code>excludeComponents</code> takes the
      names of components to hide while exporting, such as a toolbox.
    </p>
  </li>
  <li>
    <p>
      <strong>Only what is rendered is exported.</strong>
      With the camera active, the export contains the window, not the whole
      grid. Exporting everything means rendering everything: turn the camera off
      for the export, and expect it to cost what drawing the full grid costs.
    </p>
  </li>
</ul>
<p>
  A heatmap is often assembled from more than one chart: the grid, plus the
  separate charts drawing its axis labels. ECharts can composite them into a
  single image, but only once they are in a connected group:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { connect, getInstanceByDom } from "echarts";

// Once, after every chart has been initialised.
connect([heatmap, xAxisChart, yAxisChart]);

// Lays the group out by where each chart sits on screen.
const url = heatmap.getConnectedDataURL({
  connectedBackgroundColor: "white",
  pixelRatio: 2,
  type: "png",
});</code></pre>
  </figure>
</div>
<p>
  <code>getConnectedDataURL</code> falls back to <code>getDataURL</code> when
  the chart is not in a connected group, so a single chart can call either. That
  is what the
  <a href="./?path=/story/data-viz-heatmapchart--heatmap-demo" target="_top">
    heatmap demo
  </a>
  does: its download button calls <code>getConnectedDataURL</code> on the grid
  alone.
</p>
<h2>Behavior and accessibility</h2>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      The chart is a single SVG or canvas element with no accessible name, no
      roles, and no tab stop. Assistive technology can see nothing in it, and a
      keyboard cannot reach a cell, so a heatmap needs a text equivalent
      alongside it: a summary of what it shows, or the same numbers reachable as
      a table.
    </p>
  </li>
  <li>
    <p>
      Axis labels are drawn at font size 0 by default, and the x axis is rotated
      90 degrees. The charts this was built for pair the grid with their own
      scrollable axis components, which is why the built-in labels start hidden;
      a small heatmap can turn them back on through <code>options</code>, as the
      example below does.
    </p>
  </li>
  <li>
    <p>
      Hover draws a border around the cell under the pointer (white and 4px on a
      square, black and 2px on a circle) and never scales it. Pass
      <code>emphasis</code> to change that.
    </p>
  </li>
  <li>
    <p>
      Tooltips are ECharts' own HTML tooltips, positioned over the chart and
      built from a formatter you write. They are pointer-only, and they are not
      the SDS Tooltip.
    </p>
  </li>
  <li>
    <p>
      Handlers in <code>onEvents</code> are rebound whenever the chart updates,
      and rebinding removes every listener registered for that event name. If
      you also attach listeners to the ECharts instance yourself, expect them to
      be dropped; attach them through <code>onEvents</code> instead.
    </p>
  </li>
  <li>
    <p>
      Color is the whole message in a heatmap. Pick a sequential scale that
      survives being read by someone with a color vision deficiency, keep it
      consistent between charts that will be compared, and make the scale itself
      visible (a legend or a <code>visualMap</code> through
      <code>options</code>), since the component does not draw one.
    </p>
  </li>
</ul>
<h2>Props</h2>
<p>
  Any remaining props are spread onto the container div, so
  <code>className</code>, <code>id</code>, and <code>data-testid</code> work as
  usual, and the component forwards its ref to that div. Every option below that
  names an ECharts concept links to the ECharts documentation for the shape it
  takes.
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
      <p><code>data</code></p>
    </td>
    <td>
      <p><code>DatasetComponentOption["source"]</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        The cells, as a flat array of objects whose fields are named by
        <code>encode</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>xAxisData</code></p>
    </td>
    <td>
      <p><code>(string | number | { value, textStyle })[]</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        The categories along the x axis. A cell's encoded x value is an index
        into this array.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>yAxisData</code></p>
    </td>
    <td>
      <p><code>(string | number | { value, textStyle })[]</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>The categories along the y axis.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>width</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        Width of the chart in pixels. Must be greater than zero; the component
        throws otherwise.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>height</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>Height of the chart in pixels, under the same rule.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>encode</code></p>
    </td>
    <td>
      <p><code>{ x: string; y: string }</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Which fields of a data item place it on each axis. Omitting it leaves
        ECharts to guess from the field order.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>symbol</code></p>
    </td>
    <td>
      <p><code>"rect"</code> |</p>
      <p><code>"roundRect"</code> |</p>
      <p><code>"circle"</code></p>
    </td>
    <td>
      <p><code>"rect"</code></p>
    </td>
    <td>
      <p>
        The shape of a cell. Circles turn the grid into a dot plot, where
        diameter can carry a second measurement.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>symbolSize</code></p>
    </td>
    <td>
      <p><code>number</code> |</p>
      <p><code>number[]</code> |</p>
      <p><code>((value, params) =&gt; number | number[])</code></p>
    </td>
    <td>
      <p><code>5</code></p>
    </td>
    <td>
      <p>
        Cell size in pixels: one number, a <code>[width, height]</code> pair, or
        a callback given the data item. Set it to the cell pitch for a solid
        grid.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>itemStyle</code></p>
    </td>
    <td>
      <p><code>ScatterSeriesOption["itemStyle"]</code></p>
    </td>
    <td><p>solid black</p></td>
    <td>
      <p>
        How a cell is painted. Its <code>color</code> accepts a callback
        receiving the data item, which is how a value becomes a color.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>emphasis</code></p>
    </td>
    <td>
      <p><code>ScatterSeriesOption["emphasis"]</code></p>
    </td>
    <td><p>a 2–4px border</p></td>
    <td><p>How a cell is drawn while the pointer is over it.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>camera</code></p>
    </td>
    <td>
      <p><code>{ active: boolean; width: number; height: number }</code></p>
    </td>
    <td><p>40 × 20 when active</p></td>
    <td>
      <p>
        Renders only a window of the grid, measured in cells, and lets the
        pointer pan it. Sizes are ignored unless <code>active</code> is
        <code>true</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>dataZoom</code></p>
    </td>
    <td>
      <p><code>EChartsOption["dataZoom"]</code></p>
    </td>
    <td><p>the camera window</p></td>
    <td>
      <p>
        ECharts' dataZoom configuration for that window, merged over the
        defaults it sets. One object applies to both axes; a two-entry array
        configures them separately. It reaches the chart only while
        <code>camera.active</code> is <code>true</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>axisPointer</code></p>
    </td>
    <td>
      <p><code>EChartsOption["axisPointer"]</code></p>
    </td>
    <td><p>hidden</p></td>
    <td>
      <p>
        The crosshair following the pointer. One object applies to both axes; a
        two-entry array configures them separately.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>grid</code></p>
    </td>
    <td>
      <p><code>EChartsOption["grid"]</code> |</p>
      <p><code>((defaultGrid) =&gt; EChartsOption["grid"])</code></p>
    </td>
    <td><p>fills the container</p></td>
    <td>
      <p>
        Where the plotting area sits inside the container. The function form
        receives the computed default, for insetting it without recomputing the
        size.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>options</code></p>
    </td>
    <td>
      <p><code>EChartsOption</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Anything else ECharts understands, merged over the generated options.
        See the merge rules above.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onEvents</code></p>
    </td>
    <td>
      <p><code>Record&lt;string, (event: unknown,</code></p>
      <p><code>chart: ECharts) =&gt; void&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        ECharts event listeners by name. Each handler gets the raw event, whose
        <code>data</code> property is the cell, and the chart instance.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>echartsRendererMode</code></p>
    </td>
    <td>
      <p><code>"svg"</code> |</p>
      <p><code>"canvas"</code></p>
    </td>
    <td>
      <p><code>"svg"</code></p>
    </td>
    <td>
      <p>
        Which renderer ECharts initialises with. Canvas copes better with very
        large grids. Changing it rebuilds the chart.
      </p>
    </td>
  </tr>
</table>
`}));export{n,t};