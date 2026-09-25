import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>ProteinStructureViewer</h1>
<p>
  An interactive 3D protein structure viewer built on
  <a href="https://molstar.org/" target="_blank">Mol*</a>, with a sequence
  panel, confidence coloring, per-residue value overlays, and a stats legend.
</p>
<div
  class="sds-doc-callout sds-doc-callout-background-3 sds-doc-callout-full-width"
>
  <p>
    <strong>Ships separately:</strong>
    ProteinStructureViewer comes from <code>@czi-sds/data-viz</code>, not
    <code>@czi-sds/components</code>. It also needs <code>molstar</code> as a
    peer dependency. See the
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
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/data-viz/src/core/ProteinStructureViewer/index.tsx"
  >
    here
  </a>
  .
</p>
<h2>Import</h2>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { ProteinStructureViewer } from "@czi-sds/data-viz";</code></pre>
  </figure>
</div>
<h2>Sizing</h2>
<p>
  The viewer fills its parent. Mol* sizes its canvas from the laid-out
  container, so give the parent a real height - a viewer inside a box with no
  height will wait for one rather than render.
</p>
<h2>Code examples</h2>
<h3><strong>Default ProteinStructureViewer</strong></h3>
<p>
  The structure to render, as raw PDB or mmCIF (PDBx) text, is the only required
  prop. Supplying per-residue
  <code>plddt</code> scores on a 0-1 scale colors the structure by confidence
  and puts the pLDDT key in the legend.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/ProteinStructureViewer/DefaultProteinStructureViewer"
></div>
<h3>PDB and mmCIF</h3>
<p>
  <code>structure</code> is the structure text, not a filename, and it accepts
  both legacy PDB and mmCIF (PDBx). The viewer detects the format from the
  contents: a <code>data_</code> block or an <code>_atom_site.</code> loop is
  treated as mmCIF, everything else as PDB. Binary CIF (<code>.bcif</code>) is
  not accepted.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/ProteinStructureViewer/MmcifProteinStructureViewer"
></div>
<h3>Residue value overlay</h3>
<p>
  A <code>residueOverlay</code> paints arbitrary per-residue values over the
  structure, taking over from pLDDT coloring while it is set. The
  <code>values</code> map is keyed by 0-based residue index, so the first
  residue of the chain is <code>0</code>. Values are normalized into
  <code>min</code>-<code>max</code> and sampled from a color scale; residues at
  or below <code>min</code>, and those missing from the map, render in a neutral
  gray. The legend switches to the overlay's scale and its <code>label</code>,
  and the per-residue readout reports the value under the cursor.
  <code>tooltip</code> is a string on the help icon next to the caption;
  <code>tooltipProps</code> is the SDS Tooltip API, for a subtitle, a custom
  body, or a different placement.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/ProteinStructureViewer/ProteinStructureViewerWithOverlay"
></div>
<h3>Selection and stats</h3>
<p>
  Selection works out of the box: clicking a residue zooms in on it, and
  clicking empty space zooms back out, with no state on your side. Every way of
  making one - clicking a residue, dragging across the sequence, clicking a
  chain's caption - is reported through <code>onSelectionChange</code>, and
  clicking empty space reports <code>null</code>.
</p>
<p>
  Passing <code>selection</code> takes it over, the same way
  <code>hiddenChains</code> takes over visibility. A click then moves the camera
  only once you echo <code>onSelectionChange</code> back through
  <code>selection</code>, and setting <code>null</code> zooms back out. Pass
  <code>null</code> for nothing selected rather than leaving it undefined, which
  hands the selection back to the viewer.
</p>
<p>
  A <code>StructureSelection</code> says what is selected in either of two ways,
  which combine: <code>residues</code> is a list of 0-based indices, and
  <code>chains</code> names whole chains by <code>chainId</code>. A drag across
  the sequence comes back as <code>residues</code>, a chain caption as
  <code>chains</code>, so a whole-chain selection survives the round trip at its
  original size rather than as the hundreds of indices it stands for. The camera
  frames whatever the selection covers, so a range or a chain is fitted to the
  view rather than approached as a point.
</p>
<p>
  The two are shown differently, because they are different sizes of answer.
  Selected residues are drawn in ball-and-stick over the cartoon, with the
  residues around them, which is the point of looking at a site. A selected
  chain is left exactly as it was and the other chains dim around it - the same
  way pointing at a chain's name behaves, and for the same reason: a whole chain
  is already visible, so anything painted over it would only hide it.
</p>
<p>
  <code>onResidueClick</code> and <code>onResidueHover</code> are separate, and
  still report a single <code>ResidueRef</code>: they describe the residue under
  the pointer, which is a different fact from what the selection covers. Use
  them for a readout that follows the cursor, and
  <code>onSelectionChange</code> for what the user has actually chosen.
</p>
<p>
  A <code>ResidueRef</code> carries the residue in each addressing scheme a
  caller might need. <code>index</code> is the viewer's own key, shared with
  <code>plddt</code> and <code>residueOverlay</code>, and counts residues in
  file order straight through a chain break. <code>chainId</code> and
  <code>seqId</code> are what the file says, which is what the sequence panel
  displays and what the system that produced the structure will recognise. On a
  single chain numbered from 1 the two agree; on a complex they do not, so map a
  click back onto your own numbering with <code>chainId</code> and
  <code>seqId</code> rather than arithmetic on <code>index</code>.
</p>
<p>
  <code>stats</code> fills the three legend slots along the bottom. Those slots
  are replaced in place while a residue is hovered or selected - by the residue
  label, its overlay value, and its pLDDT - so the columns never shift. Pass
  <code>null</code> for a slot to reserve its column without rendering anything.
</p>
<div
  class="sds-doc-example"
  data-example="data-viz/ProteinStructureViewer/SelectableProteinStructureViewer"
></div>
<h3>Complexes and chains</h3>
<p>
  A multi-chain structure needs nothing special: pass the whole complex as one
  structure string and the viewer finds the chains itself, reporting them
  through
  <code>onChainsChange</code> as <code>ChainRef</code>s. It draws one cartoon
  per chain, splits the sequence panel into one grid per chain, and - when
  neither <code>plddt</code> nor <code>residueOverlay</code> is coloring the
  structure - paints each chain its own color and shows a chain legend with a
  swatch and a visibility toggle for each.
</p>
<p>
  Visibility works out of the box: the toggles own it unless you pass
  <code>hiddenChains</code>, which takes it over and leaves the toggles
  reporting through <code>onChainVisibilityChange</code>. Hiding a chain removes
  everything it is drawn with, which also takes it out of reach of hover and
  click; its sequence stays in the panel, dimmed, so the panel does not reflow
  on every toggle. <code>chainColors</code> overrides the palette per chain.
</p>
<p>
  Pointing at a chain's name, in the legend or above its grid in the sequence
  panel, dims every other chain in the 3D view so the one under the pointer
  stands out. The hovered chain keeps whatever coloring it already has, rather
  than being washed in a highlight color that would hide it. Keyboard focus does
  the same, and nothing is reported to the consumer - it answers "which one is
  this?" without changing what is selected.
  <code>disableChainHighlightOnHover</code> turns it off.
</p>
<p>
  Residue indices run straight through the chain break: on the pair below,
  barnase occupies 0-109 and barstar 110-198, so <code>plddt</code> is one flat
  array over the whole complex and one <code>residueOverlay</code> map spans
  both chains. Because a file numbers a complex however it likes - barstar here
  starts at residue 111, not 1 - <code>index</code> and <code>seqId</code> part
  company, so map a click back onto your own data with <code>chainId</code> and
  <code>seqId</code> rather than arithmetic on <code>index</code>.
</p>
<div
  class="sds-doc-example"
  data-example-padding="none"
  data-example="data-viz/ProteinStructureViewer/MultiChainProteinStructureViewer"
></div>
<h3>Ligands and ions</h3>
<p>
  Whatever a structure file carries besides its protein - ligands, ions,
  glycans, lipids - is drawn as ball-and-stick alongside the cartoon, with no
  prop to turn on. A cartoon traces a polymer backbone and a heme has none, so
  the two halves of a chain need two representations between them.
</p>
<p>
  The residue holding a ligand is drawn as sticks too, one bond out, which is
  what makes the ligand look bound rather than dropped in. Myoglobin's heme is
  held by His93, and without it the heme floats loose in the middle of a cartoon
  it is visibly bonded to. Covalent and metallic-coordination bonds both count -
  the heme's iron is held by the latter - and only the residue that holds the
  ligand comes, not that residue's own neighbours.
</p>
<p>
  Heteroatoms keep Mol*'s own ball-and-stick coloring whatever the rest of the
  structure is painted with - by element, so orange iron and blue nitrogens.
  That is what makes a heme read as a heme rather than as a shape in one flat
  color, and <code>plddt</code> and <code>residueOverlay</code> have no value
  for a HETATM to be colored by in any case.
</p>
<p>
  They belong to the chain they sit on, so hiding that chain takes them with it
  and selecting the chain covers them. They are not sequence, though: the
  sequence panel does not caption them, they are absent from the residue counts,
  and <code>ChainRef</code> describes only the chain's polymer. A ligand that a
  file gives a chain of its own is drawn, but reported as no chain at all, since
  there is no sequence to report.
</p>
<p>
  Bulk water is the exception, and is not drawn. A structure's worth of solvent
  rendered as sticks buries the structure it surrounds.
</p>
<h3>Structure only</h3>
<p>
  Three props hide the chrome layered around the 3D view.
  <code>showSequenceViewer</code> drops the sequence panel,
  <code>showLegend</code> drops the stats and the color key, and
  <code>showAxes</code> drops the orientation widget and its reset-camera
  button. Turn off all three when the surrounding page supplies its own
  controls.
</p>
<p>
  Hiding the legend does not disable the coloring. The structure below is still
  colored by pLDDT confidence, only without the key that explains it.
</p>
<div
  class="sds-doc-example"
  data-example-padding="none"
  data-example="data-viz/ProteinStructureViewer/MinimalProteinStructureViewer"
></div>
<h2>Theming</h2>
<p>
  The viewer reads the active SDS theme for its hover and selection colors and
  for the sequence panel, and picks a light or dark canvas background to match.
  Two props override those backgrounds independently:
  <code>backgroundColor</code> for the 3D canvas and
  <code>sequenceViewerBackgroundColor</code> for the sequence panel.
</p>
<p>
  The two accept different formats. Mol* needs the canvas color as a concrete
  <code>#RRGGBB</code> value, so <code>backgroundColor</code> is limited to hex.
  The sequence panel is styled with CSS, so
  <code>sequenceViewerBackgroundColor</code> takes any CSS color. It paints the
  panel, the fades that mask residues scrolling past its top and bottom edges,
  and the "no structure available" state, so the panel stays one color
  throughout.
</p>
<h2>Downloading an image</h2>
<p>
  Passing <code>download</code> adds a capture button beneath the reset-camera
  control, which downloads the structure as it currently stands as a PNG. Omit
  the prop and no button is drawn.
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">&lt;ProteinStructureViewer
 structure={PDB}
 download={{ resolution: "high", filename: "barnase-barstar" }}
/&gt;</code></pre>
  </figure>
</div>
<p>
  The image is rendered in its own pass at the size asked for rather than scaled
  up from the canvas, so it comes out as sharp as the resolution says whatever
  size the viewer happens to be on screen - and a large one costs time rather
  than sharpness, which is why the default sits in the middle.
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
      <p><code>resolution</code></p>
    </td>
    <td>
      <p><code>"low" | "medium" | "high" | "maximum"</code></p>
    </td>
    <td>
      <p><code>"medium"</code></p>
    </td>
    <td>
      <p>
        1280x720, 1920x1080, 3840x2160 and 7680x4320 respectively. Also exported
        as <code>DOWNLOAD_RESOLUTIONS</code>, for labelling a control of your
        own.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>backgroundColor</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td>
      <p>- (transparent)</p>
    </td>
    <td>
      <p>
        Background behind the structure, as <code>#RRGGBB</code>. Omit for a
        transparent one, which is what a figure usually wants. The viewer's own
        canvas color is deliberately not inherited, since an image tends to
        outlive the theme it was captured under.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>showAxes</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        Draw the orientation axes into the image. Independent of the viewer's
        own <code>showAxes</code>: the widget orients a reader who can turn the
        structure, and earns its place less in a still, so it can be on screen
        without being in the capture or the other way about.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>filename</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Name for the file, without an extension. Defaults to the one Mol*
        derives from the loaded structure.
      </p>
    </td>
  </tr>
</table>
<h2>Configuring Mol*</h2>
<p>
  The viewer is built on
  <a href="https://molstar.org/" target="_blank" rel="noreferrer">Mol*</a>, and
  the props above cover the settings a structure view usually needs. Everything
  else Mol* can be told is reachable through <code>molstarSpec</code>, which
  takes a
  <a
    href="https://molstar.org/docs/plugin/spec/"
    target="_blank"
    rel="noreferrer"
    ><code>PluginUISpec</code></a
  >
  and lays it over the one the viewer builds. There is no prop here per Mol*
  setting, and none needs to be added for one.
</p>
<p>
  Anything named in it wins, and anything left out keeps the viewer's default.
  So a single nested setting can be changed without disturbing its siblings:
</p>
<div class="sds-doc-code-snippet">
  <figure>
    <figcaption>React TypeScript</figcaption>
    <pre><code class="sds-doc-codeblock-content language-tsx">import { PluginConfig } from "molstar/lib/mol-plugin/config";

&lt;ProteinStructureViewer
  structure={PDB}
  molstarSpec={{
    canvas3d: {
      // Slow the trackball down, leaving the rest of it alone.
      trackball: { rotateSpeed: 2 },
      // Stop tinting geometry on hover; the viewer's marking colors stay.
      renderer: { colorMarker: false },
    },
    // Bring back a control the viewer hides.
    config: [[PluginConfig.Viewport.ShowControls, true]],
  }}
/&gt;</code></pre>
  </figure>
</div>
<p>
  Mol* is a peer dependency, so its types and its <code>PluginConfig</code>
  items are imported from Mol* itself rather than from this package. Note that
  <code>canvas3d</code> is only shallowly partial: its top-level groups may be
  given in part, but a setting Mol* models as a named choice - such as
  <code>postprocessing.occlusion</code> - has to be supplied whole, with both
  its <code>name</code> and its <code>params</code>.
</p>
<p>
  The full set of settings is documented by Mol* rather than here, since it is
  Mol*'s surface and moves with Mol*'s versions:
</p>
<ul>
  <li>
    <a
      href="https://molstar.org/docs/plugin/spec/"
      target="_blank"
      rel="noreferrer"
      >Plugin spec</a
    >
    - <code>behaviors</code>, <code>actions</code>, <code>animations</code>,
    <code>customFormats</code>, <code>layout</code>, and the
    <code>components</code> Mol* renders.
  </li>
  <li>
    <a
      href="https://molstar.org/docs/plugin/canvas3d/"
      target="_blank"
      rel="noreferrer"
      >Canvas3D props</a
    >
    - <code>renderer</code>, <code>camera</code>, <code>postprocessing</code>,
    <code>trackball</code>, <code>marking</code>, and lighting.
  </li>
  <li>
    <a
      href="https://molstar.org/docs/plugin/config/"
      target="_blank"
      rel="noreferrer"
      >Plugin config</a
    >
    - the <code>PluginConfig</code> items the <code>config</code> list takes.
  </li>
</ul>
<p>
  Two things to know about how it is applied. List-valued keys -
  <code>behaviors</code>, <code>config</code>, <code>actions</code>,
  <code>animations</code>, <code>customFormats</code>,
  <code>customParamEditors</code> - are appended to rather than replaced. For
  <code>config</code> that is what makes an override work, since Mol* reads the
  list in order and a later entry wins. It also means a behavior cannot be taken
  away: the viewer removes Mol*'s click-to-zoom camera so that the selection
  alone drives the camera, and that stays removed.
</p>
<p>
  And it is read once, when the plugin is created - except for
  <code>canvas3d</code>, which is re-applied whenever it changes. Creating the
  plugin throws away the camera, so the rest is deliberately not reactive; pass
  a <code>key</code> to remount the viewer if you need to change it.
</p>
<h2>Props</h2>
<p>
  The viewer spreads any remaining props onto its root div, so standard HTML
  attributes such as <code>className</code>, <code>id</code>, and
  <code>data-testid</code> work as usual.
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
      <p><code>structure</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>The structure to render, as raw PDB or mmCIF (PDBx) text.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>plddt</code></p>
    </td>
    <td>
      <p><code>number[] | null</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Per-residue pLDDT confidence on a 0-1 scale, in chain order. When
        supplied, the structure is colored by confidence unless
        <code>residueOverlay</code> takes over. Residues past the end of the
        array fall back to mid confidence.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>residueOverlay</code></p>
    </td>
    <td>
      <p><code>ResidueValueOverlay | null</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Per-residue values painted over the structure, replacing pLDDT coloring
        while set. See the table below for its shape.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>selection</code></p>
    </td>
    <td>
      <p><code>StructureSelection | null</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        What is selected. Leave undefined to let the viewer own it, so a click
        zooms in on a residue with no state on your side; passing it takes that
        over, and a click then moves the camera only once
        <code>onSelectionChange</code> is echoed back. Either way the camera
        frames whatever it covers, and clearing it zooms back out. Residues are
        drawn in ball-and-stick; a whole chain dims the chains around it
        instead. See the table below for its shape.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>hiddenChains</code></p>
    </td>
    <td>
      <p><code>string[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Chains hidden from the 3D view, by <code>chainId</code>. Leave undefined
        to let the chain legend's toggles own visibility; passing it takes that
        over, and the toggles then only report through
        <code>onChainVisibilityChange</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>chainColors</code></p>
    </td>
    <td>
      <p><code>Record&lt;string, string&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Color per chain, by <code>chainId</code>, as <code>#RRGGBB</code>.
        Chains left out fall back to the viewer's palette. Only visible while
        chain coloring is what is on screen, which is when neither
        <code>plddt</code> nor <code>residueOverlay</code> is set.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>showChainLegend</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>
        Show the chain legend, which lists each chain with its color and a
        visibility toggle. Ignored on a single-chain structure, where there is
        nothing to tell apart or hide.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>disableChainHighlightOnHover</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>false</code></p>
    </td>
    <td>
      <p>
        Stop other chains from dimming in the 3D view while a chain's name is
        pointed at, in the legend or above its grid in the sequence panel. Turn
        it off where the movement is more distracting than the answer is useful.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>download</code></p>
    </td>
    <td>
      <p><code>StructureDownload | null</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Adds a capture button beneath the reset-camera control, which downloads
        a PNG of the structure. Omit for no button. See
        <em>Downloading an image</em> above.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>molstarSpec</code></p>
    </td>
    <td>
      <p><code>Partial&lt;PluginUISpec&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Mol* plugin spec laid over the viewer's own, which is how the whole of
        Mol*'s configuration is reachable without a prop here for each setting.
        Anything named wins; list-valued keys are appended to. Read once at
        creation, except <code>canvas3d</code>, which is re-applied when it
        changes. See <em>Configuring Mol*</em> above.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>stats</code></p>
    </td>
    <td>
      <p><code>(StructureStat | null)[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Up to three whole-structure stats shown along the bottom. A
        <code>null</code> entry reserves its column without rendering anything,
        so the columns never shift as values come and go.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>backgroundColor</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Canvas background, as <code>#RRGGBB</code>. Defaults to the SDS theme's
        base background, so the canvas follows the surrounding page in both
        modes.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>sequenceViewerBackgroundColor</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Sequence panel background, as any CSS color. Defaults to the SDS theme's
        primary surface, so the panel follows the surrounding page in both
        modes.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>showAxes</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>Show the orientation axes widget and the reset-camera button.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>showSequenceViewer</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>Show the sequence panel pinned along the bottom of the viewer.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>showLegend</code></p>
    </td>
    <td>
      <p><code>boolean</code></p>
    </td>
    <td>
      <p><code>true</code></p>
    </td>
    <td>
      <p>Show the stats and color scale legend overlaid on the viewer.</p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onResidueClick</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <code>(residue: ResidueRef) =&gt; void</code>. Called with the residue
        under the pointer: <code>index</code> (0-based, across the whole
        structure), <code>compId</code>, <code>chainId</code>,
        <code>seqId</code> and <code>insCode</code>. What the click
        <em>selected</em> comes through <code>onSelectionChange</code>, which a
        drag makes a range.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onResidueHover</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <code>(residue: ResidueRef | null) =&gt; void</code>. Called as the
        pointer moves over residues, and with <code>null</code> when it leaves
        the structure.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onSelectionChange</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <code>(selection: StructureSelection | null) =&gt; void</code>. Called
        with the new selection whenever the user makes one - clicking a residue,
        dragging across the sequence, clicking a chain caption - and with
        <code>null</code> when they click empty space to clear it. A whole-chain
        selection arrives as <code>{ chains: [id] }</code> rather than as every
        index on it. Fires whether or not <code>selection</code> is controlled,
        so a consumer can follow the viewer's own selection without owning it.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onChainsChange</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <code>(chains: ChainRef[]) =&gt; void</code>. Called with the chains
        found in the structure, whenever a structure is loaded. Fires with
        <code>[]</code> when the structure holds none.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>onChainVisibilityChange</code></p>
    </td>
    <td>
      <p><code>function</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        <code>(hiddenChains: string[]) =&gt; void</code>. Called with the chains
        now hidden when a visibility toggle is used. Fires whether or not
        <code>hiddenChains</code> is controlled, so a consumer can follow the
        viewer's own state without owning it.
      </p>
    </td>
  </tr>
</table>
<h3>StructureSelection</h3>
<p>
  What is selected, in the two ways a caller might say it. The two combine:
  <code>{ chains: ["A"], residues: [150] }</code> takes all of chain A plus one
  residue elsewhere. Both fields are optional; <code>null</code> in place of the
  whole object selects nothing.
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
      <p><code>residues</code></p>
    </td>
    <td>
      <p><code>number[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        0-based residue indices, counting residues in file order across the
        whole structure - the same index <code>plddt</code> and
        <code>residueOverlay</code> are keyed by.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>chains</code></p>
    </td>
    <td>
      <p><code>string[]</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Whole chains by <code>chainId</code>, each standing for every residue on
        it. Kept as named rather than expanded into indices, so a whole-chain
        selection survives a round trip through a consumer's state at its
        original size.
      </p>
    </td>
  </tr>
</table>
<h3>ChainRef</h3>
<p>
  A chain the viewer found in the structure it loaded, reported through
  <code>onChainsChange</code>. <code>chainId</code> is the file's own name for
  the chain, the same one <code>ResidueRef</code> reports, and the key every
  chain-keyed prop takes. A chain carrying several symmetry operators appears
  once, under the first.
</p>
<p>
  It describes the chain's polymer. The ligands and ions sitting on the chain
  are drawn, and are hidden and selected along with it, but are not counted here
  or spanned by its range - they are no part of the sequence. A chain holding
  nothing but heteroatoms is left out altogether, having no sequence to
  describe, though it is still drawn.
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
      <p><code>chainId</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        Chain as named in the file (<code>auth_asym_id</code>), e.g.
        <code>"A"</code>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>Chain as the sequence panel captions it.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>startIndex</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>Lowest 0-based residue index of the chain's polymer.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>endIndex</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>Highest 0-based residue index of the chain's polymer.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>residueCount</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>Polymer residues the chain holds.</p></td>
  </tr>
</table>
<h3>ResidueValueOverlay</h3>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>values</code></p>
    </td>
    <td>
      <p><code>Map&lt;number, number&gt;</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td>
      <p>
        0-based residue index to value. Residues absent from the map read as
        <code>0</code>, so they render in the neutral gray rather than at the
        bottom of the scale.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>max</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>The value mapped to the top of the color scale.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>min</code></p>
    </td>
    <td>
      <p><code>number</code></p>
    </td>
    <td>
      <p><code>0</code></p>
    </td>
    <td>
      <p>
        Values at or below this render in a neutral gray rather than on the
        scale.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>colorScale</code></p>
    </td>
    <td>
      <p><code>ColorScale</code></p>
    </td>
    <td>
      <p><code>PLASMA_COLOR_SCALE</code></p>
    </td>
    <td><p>Scale used to color residues and to draw the legend.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td><p>Legend caption, for example "Feature activation".</p></td>
  </tr>
  <tr>
    <td>
      <p><code>tooltip</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Help tooltip title on the legend caption. A string is enough for the
        common case; use <code>tooltipProps</code> for a subtitle, a custom
        body, or placement. Overrides <code>tooltipProps.title</code> when both
        are set.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>tooltipProps</code></p>
    </td>
    <td>
      <p><code>Partial&lt;Omit&lt;TooltipProps, "children"&gt;&gt;</code></p>
    </td>
    <td><p>-</p></td>
    <td>
      <p>
        Props forwarded to the SDS Tooltip on the legend caption. The trigger is
        the caption's help icon, so <code>children</code> is omitted.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p><code>readoutLabel</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td>
      <p><code>"Value"</code></p>
    </td>
    <td>
      <p>
        Label for the per-residue readout that replaces a stat slot on hover.
      </p>
    </td>
  </tr>
</table>
<h3>StructureStat</h3>
<table class="sds-doc-table">
  <tr>
    <td><p>Name</p></td>
    <td><p>Type</p></td>
    <td><p>Default</p></td>
    <td><p>Description</p></td>
  </tr>
  <tr>
    <td>
      <p><code>value</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>The stat's value, already formatted for display.</p></td>
  </tr>
  <tr>
    <td>
      <p><code>label</code></p>
    </td>
    <td>
      <p><code>string</code></p>
    </td>
    <td><p>- (required)</p></td>
    <td><p>The caption shown beneath the value.</p></td>
  </tr>
</table>
`}));export{n,t};