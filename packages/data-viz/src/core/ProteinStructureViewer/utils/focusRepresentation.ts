import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { StructureFocusRepresentation } from "molstar/lib/mol-plugin/behavior/dynamic/selection/structure-focus-representation";

/**
 * What Mol* draws around a focused selection, as ball-and-stick over the
 * cartoon: the selection itself, the residues near it, and the non-covalent
 * contacts between the two. All three stay on; what changes is how far "near"
 * reaches.
 */
const FOCUS_COMPONENTS = ["target", "surroundings", "interactions"];

/** Mol*'s own default, in angstroms. */
const NEIGHBOUR_RADIUS = 5;

/**
 * Mol* builds the surroundings as `includeSurroundings(target, radius)` with
 * whole residues, so a radius of zero resolves to the residues of the target
 * and nothing else.
 */
const OWN_RESIDUES_ONLY = 0;

/**
 * Chooses how far the focus shell reaches around a selection.
 *
 * A residue, or a short range, is a site: the 5A shell around it is the point
 * of looking at it, and Mol*'s default earns its keep. A whole chain is a
 * structural unit instead, and its neighbours are the chain bound to it - so
 * on a complex the shell reaches straight across the interface and draws the
 * partner's contact face in atoms, which reads as the partner being selected
 * too.
 *
 * Taking the radius to zero confines the shell to the selection rather than
 * turning it off: the surroundings and the interactions are still drawn, over
 * the selected chain's own residues, so a chain shows its own atoms and
 * contacts and no others'.
 */
export async function setFocusNeighbourhood(
  plugin: PluginUIContext,
  includeNeighbours: boolean
): Promise<void> {
  const expandRadius = includeNeighbours ? NEIGHBOUR_RADIUS : OWN_RESIDUES_ONLY;

  await plugin.state.updateBehavior(
    StructureFocusRepresentation,
    (params: { components: string[]; expandRadius: number }) => {
      params.components = FOCUS_COMPONENTS;
      params.expandRadius = expandRadius;
    }
  );
}
