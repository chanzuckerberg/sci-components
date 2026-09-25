import type { ElementIndex } from "molstar/lib/mol-model/structure";
import {
  QueryContext,
  Structure,
  StructureElement,
  StructureProperties,
  StructureSelection,
} from "molstar/lib/mol-model/structure";
import type { StructureRepresentationBuiltInProps } from "molstar/lib/mol-plugin-state/helpers/structure-representation-params";
import type { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import type { PluginContext } from "molstar/lib/mol-plugin/context";
import { setSubtreeVisibility } from "molstar/lib/mol-plugin/behavior/static/state";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import { compile } from "molstar/lib/mol-script/runtime/query/compiler";
import type { StateObjectSelector } from "molstar/lib/mol-state";
import { chainLigandExpression, chainPolymerExpression } from "../utils/chains";

export type StructureSelector =
  StateObjectSelector<PluginStateObject.Molecule.Structure>;

/**
 * The parts the viewer draws a structure in. Each names the components built
 * for it and tags the representations drawn over them, and it is those names
 * and tags the rest of the viewer reads back: to tell its own components from
 * a consumer's, to keep ligands on element colors, and to hide or dim a chain.
 */
export const POLYMER_PART = "polymer";
export const LIGAND_PART = "ligand";
export const HIGHLIGHT_PART = "highlight";
export const SURFACE_PART = "surface";

/**
 * How heteroatoms are colored: the theme Mol* puts on a ball-and-stick when
 * left to itself, with the parameters it chooses too.
 *
 * Named rather than left blank only so that it survives `applyColorTheme`,
 * which would otherwise repaint the ligands along with everything else. The
 * structure-wide theme is the wrong answer for them twice over: a heme reads
 * as a heme because its iron is orange and its nitrogens are blue, which one
 * flat color throws away, and pLDDT and residue overlays have no value for a
 * HETATM to be colored by at all.
 */
export const ELEMENT_THEME = "element-symbol";

/** Grid spacing and probe of the molecular surface, in angstroms. */
const SURFACE_RESOLUTION = 0.6;
const SURFACE_PROBE_RADIUS = 1.4;

/**
 * The most grid cells a molecular surface may take. The surface is computed
 * on a grid over the bounding box of what it covers, so a large complex at a
 * fine spacing asks for more memory than a browser tab will give it; past this
 * the cartoon stays instead.
 */
export const MAX_SURFACE_GRID_CELLS = 4_000_000;

/**
 * The representation parameters Mol*'s own presets compute, read from the same
 * manager state they read. Ported rather than hardcoded so a chain drawn here
 * looks exactly like the one the preset used to draw. Mol* hands the same set
 * to its cartoons and its ball-and-sticks, and so does this.
 */
export function representationTypeParams(plugin: PluginContext) {
  const { hydrogens, ignoreLight, visualQuality } =
    plugin.managers.structure.component.state.options;

  return {
    ignoreHydrogens: hydrogens !== "all",
    ignoreHydrogensVariant: (hydrogens === "only-polar"
      ? "non-polar"
      : "all") as "all" | "non-polar",
    ignoreLight,
    quality: visualQuality,
  };
}

type TypeParams = ReturnType<typeof representationTypeParams>;

/**
 * True for the representation drawing a chain's heteroatoms.
 *
 * Read off the tag put on the representation when it was built, rather than
 * off the component's key. Mol* does not store the key as it was given: it
 * files components under `structure-component-<key>`, so a test against the
 * key as written here silently matches nothing, and every ligand quietly takes
 * the structure-wide theme instead. The tag survives untouched.
 */
export function isLigandRepresentation(representation: {
  cell: { transform: { tags?: readonly string[] } };
}): boolean {
  return representation.cell.transform.tags?.includes(LIGAND_PART) === true;
}

const VIEWER_COMPONENT =
  /structure-component-(?:(?:polymer|ligand|highlight)-[^,]+|surface(?:,|$))/;

/**
 * True for a component the viewer built, as opposed to one a consumer added
 * through `onReady`. Only the viewer's own are recolored, hidden or replaced.
 */
export function isViewerComponent(component: {
  key?: string;
  cell: { transform: { ref: string } };
}): boolean {
  return VIEWER_COMPONENT.test(component.key ?? component.cell.transform.ref);
}

/**
 * Builds one component and draws it, handing back its ref - or nothing, when
 * the expression selects no atoms, which is what a chain with no ligands or
 * no polymer looks like.
 *
 * Mol* files components by key, and updates the one it finds under a key
 * rather than adding a second. So a component built again under its old key
 * comes back under its old ref, with the representation drawn over it still
 * in place and recomputing against the new selection by itself; drawing it
 * again would put a second one on top. `previous` is that old ref, which is
 * how the two cases are told apart.
 */
async function drawComponent(
  plugin: PluginContext,
  structure: StructureSelector,
  key: string,
  label: string,
  expression: Expression,
  props: StructureRepresentationBuiltInProps,
  tag: string,
  previous?: string
): Promise<string | undefined> {
  const builders = plugin.builders.structure;
  const component = await builders.tryCreateComponentFromExpression(
    structure,
    expression,
    key,
    { label }
  );
  if (!component) return undefined;

  if (component.ref !== previous) {
    await builders.representation.addRepresentation(component, props, { tag });
  }
  return component.ref;
}

/**
 * Each chain's polymer as a cartoon, by `chainId`.
 *
 * One component per chain rather than Mol*'s `default` preset, which groups
 * every polymer chain into one: a component is the unit Mol* can hide, so a
 * component per chain is what makes a chain individually hideable.
 *
 * Every chain the file names, not just the ones the legend lists; a chain
 * with no polymer simply gets no cartoon.
 */
export async function buildCartoonLayer(
  plugin: PluginContext,
  structure: StructureSelector,
  chainLabels: ReadonlyMap<string, string>,
  typeParams: TypeParams,
  colorTheme: string,
  previous: ReadonlyMap<string, string> = new Map()
): Promise<Map<string, string>> {
  const refs = new Map<string, string>();

  for (const [chainId, label] of chainLabels) {
    const ref = await drawComponent(
      plugin,
      structure,
      `${POLYMER_PART}-${chainId}`,
      label,
      chainPolymerExpression(chainId),
      { color: colorTheme as never, type: "cartoon", typeParams },
      POLYMER_PART,
      previous.get(chainId)
    );
    if (ref) refs.set(chainId, ref);
  }

  return refs;
}

/**
 * Each chain's ligands and ions as ball-and-stick in element colors, by
 * `chainId`. A cartoon has no backbone to trace through a heme, so these are
 * drawn beside it; grouping them under their chain is what makes hiding a
 * chain take its ligands with it.
 */
export async function buildLigandLayer(
  plugin: PluginContext,
  structure: StructureSelector,
  chainLabels: ReadonlyMap<string, string>,
  typeParams: TypeParams
): Promise<Map<string, string>> {
  const refs = new Map<string, string>();

  for (const [chainId, label] of chainLabels) {
    const ref = await drawComponent(
      plugin,
      structure,
      `${LIGAND_PART}-${chainId}`,
      label,
      chainLigandExpression(chainId),
      { color: ELEMENT_THEME, type: "ball-and-stick", typeParams },
      LIGAND_PART
    );
    if (ref) refs.set(chainId, ref);
  }

  return refs;
}

/**
 * The highlighted residues on each chain as ball-and-stick, by `chainId`,
 * painted by the structure-wide theme - which gives them their highlight
 * colors.
 *
 * Matched by residue index rather than by number and insertion code: the index
 * is what the highlights were resolved to, and it names one residue however
 * the file spells its numbering.
 */
export async function buildHighlightLayer(
  plugin: PluginContext,
  structure: StructureSelector,
  byChain: ReadonlyMap<string, number[]>,
  typeParams: TypeParams,
  colorTheme: string,
  previous: ReadonlyMap<string, string> = new Map()
): Promise<Map<string, string>> {
  const refs = new Map<string, string>();

  for (const [chainId, residues] of byChain) {
    if (residues.length === 0) continue;

    const ref = await drawComponent(
      plugin,
      structure,
      `${HIGHLIGHT_PART}-${chainId}`,
      `Highlights on ${chainId}`,
      MS.struct.generator.atomGroups({
        "residue-test": MS.core.set.has([
          MS.set(...residues),
          MS.ammp("residueKey"),
        ]),
      }),
      { color: colorTheme as never, type: "ball-and-stick", typeParams },
      HIGHLIGHT_PART,
      previous.get(chainId)
    );
    if (ref) refs.set(chainId, ref);
  }

  return refs;
}

/** The polymer of the named chains, together. */
function polymerOfChainsExpression(chainIds: readonly string[]): Expression {
  return MS.struct.generator.atomGroups({
    "chain-test": MS.core.set.has([
      MS.set(...chainIds),
      MS.ammp("auth_asym_id"),
    ]),
    "entity-test": MS.core.rel.eq([MS.ammp("entityType"), "polymer"]),
  });
}

/**
 * Throws when a molecular surface over the structure would take more grid
 * cells than `MAX_SURFACE_GRID_CELLS`.
 *
 * Estimated the way the surface is computed: a grid at the surface's spacing
 * over the bounding box, padded on every side by the largest atom and the
 * probe rolled over it.
 */
export function assertSurfaceBudget(structure: Structure): void {
  let maxRadius = 0;
  const location = StructureElement.Location.create(structure);

  for (const unit of structure.units) {
    location.unit = unit;
    for (let i = 0; i < unit.elements.length; i++) {
      location.element = unit.elements[i] as ElementIndex;
      maxRadius = Math.max(
        maxRadius,
        StructureProperties.atom.vdw_radius(location)
      );
    }
  }

  const { max, min } = structure.boundary.box;
  const padding = maxRadius + SURFACE_PROBE_RADIUS;
  let cells = 1;
  for (let axis = 0; axis < 3; axis++) {
    const extent = (max[axis] as number) - (min[axis] as number);
    cells *= Math.ceil((extent + 2 * padding) / SURFACE_RESOLUTION);
  }

  if (!Number.isFinite(cells) || cells > MAX_SURFACE_GRID_CELLS) {
    throw new Error(
      "The molecular surface of the visible chains is too large to compute."
    );
  }
}

/** What an expression selects in a structure, as a structure of its own. */
function selectStructure(
  structure: Structure,
  expression: Expression
): Structure {
  const selection = compile<StructureSelection>(expression)(
    new QueryContext(structure)
  );
  return StructureSelection.unionStructure(selection);
}

/**
 * One molecular surface over the polymers of the visible chains, or nothing
 * when no chain is visible.
 *
 * One surface rather than one per chain: where two chains meet, a surface of
 * each would wrap the interface twice over, and a surface of the pair buries
 * it - so hiding the partner is what exposes the face it was bound to.
 *
 * Built again under the same key when the visible chains change, which
 * updates the surface in place rather than replacing it. Throws, before
 * anything is built or updated, when the surface would outgrow its grid.
 */
export async function buildSurfaceLayer(
  plugin: PluginContext,
  structure: StructureSelector,
  visibleChainIds: readonly string[],
  typeParams: TypeParams,
  colorTheme: string,
  previous?: string
): Promise<string | undefined> {
  if (visibleChainIds.length === 0) return undefined;

  const expression = polymerOfChainsExpression(visibleChainIds);
  if (structure.data) {
    assertSurfaceBudget(selectStructure(structure.data, expression));
  }

  return drawComponent(
    plugin,
    structure,
    SURFACE_PART,
    "Surface",
    expression,
    {
      color: colorTheme as never,
      type: "molecular-surface",
      typeParams: {
        ...typeParams,
        probeRadius: SURFACE_PROBE_RADIUS,
        quality: "custom",
        resolution: SURFACE_RESOLUTION,
        visuals: ["structure-molecular-surface-mesh"],
      },
    },
    SURFACE_PART,
    previous
  );
}

/** Deletes components, and everything drawn over them, in one commit. */
export async function removeComponents(
  plugin: PluginContext,
  refs: readonly string[]
): Promise<void> {
  if (refs.length === 0) return;

  const update = plugin.state.data.build();
  for (const ref of refs) update.delete(ref);
  await update.commit();
}

/**
 * Shows or hides everything each chain is drawn with. The whole subtree of
 * each component, since visibility is per-cell and it is the representation
 * underneath that actually draws.
 *
 * Set outright rather than through the component manager's `toggleVisibility`,
 * which flips whatever it finds: the hidden set is derived from props on every
 * pass, so it has to be applied as a statement of what should be true and not
 * as a change to what already is.
 */
export function applyChainVisibility(
  plugin: PluginContext,
  refsByChain: ReadonlyMap<string, readonly string[]>,
  hidden: ReadonlySet<string>
): void {
  for (const [chainId, refs] of refsByChain) {
    for (const ref of refs) {
      setSubtreeVisibility(plugin.state.data, ref, hidden.has(chainId));
    }
  }
}

/**
 * Recolors the viewer's own representations with the named theme, leaving the
 * heteroatoms on `ELEMENT_THEME` and a consumer's representations as they
 * were made.
 *
 * The per-representation form of `updateRepresentationsTheme`, so the two can
 * be told apart in one pass; handing it a filtered list instead would leave
 * the ligands on whichever theme happened to be current when they were built.
 */
export async function applyColorTheme(
  plugin: PluginContext,
  colorTheme: string
): Promise<void> {
  await plugin.dataTransaction(async () => {
    for (const s of plugin.managers.structure.hierarchy.current.structures) {
      const own = s.components.filter(isViewerComponent);
      if (own.length === 0) continue;

      await plugin.managers.structure.component.updateRepresentationsTheme(
        own,
        (_component, representation) => ({
          // `colorTheme` is not one of Mol*'s built-in names, which is what the
          // cast is for; Mol* resolves any registered name at runtime.
          color: (isLigandRepresentation(representation)
            ? ELEMENT_THEME
            : colorTheme) as never,
        })
      );
    }
  });
}

/** A set of chain ids as one comparable string. */
export function chainSetKey(chains: ReadonlySet<string>): string {
  return [...chains].sort().join("\u0000");
}
