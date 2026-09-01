import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { Loci } from "molstar/lib/mol-model/loci";
import { StructureElement } from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";

/**
 * Margin (angstroms) added around a residue's bounding sphere when focusing,
 * matching Mol*'s default `FocusLoci` extra radius. Used both for the framing
 * radius that sets the zoom-in distance (floored at `FOCUS_MIN_RADIUS`) and for
 * the depth-clip anchor, so the focus crop matches Mol*'s default depth slab.
 */
const FOCUS_MIN_RADIUS = 8;
const FOCUS_EXTRA_RADIUS = 4;

/**
 * Never let the clip window collapse below this, so the focused residue and its
 * immediate neighborhood stay visible even at extreme zoom-in.
 */
const MIN_CLIP_RADIUS = 4;

/** Camera transition length (ms) when zooming in on a residue. */
const FOCUS_DURATION_MS = 250;

/** Clip radius has to drift this far before it is worth redrawing. */
const CLIP_EPSILON = 0.5;

/**
 * Depth-clip radius at a given camera distance. The clip scales linearly with
 * distance, `ratio` being the clip radius per unit distance (fixed at focus so
 * the clip hugs the residue there), clamped to the scene. This keeps clipping
 * tied to the zoom:
 *  - at the focus zoom the clip hugs the residue, peeling the structure so the
 *    selected residue reads clearly;
 *  - zooming in shrinks the clip further, peeling deeper toward the residue;
 *  - zooming out grows the clip, revealing more of the structure, up to the
 *    whole scene (`radiusMax`) - the point at which nothing is cropped.
 */
export function clipRadiusForDistance(
  distance: number,
  ratio: number,
  radiusMax: number
): number {
  return Math.max(MIN_CLIP_RADIUS, Math.min(ratio * distance, radiusMax));
}

/**
 * Zooms the camera in on a residue. Uses Mol*'s focus framing for the camera
 * *position* (so the zoom level matches the built-in focus) but anchors the
 * clip tightly on the residue itself, and returns the clip-radius-per-distance
 * ratio used to keep clipping in sync with the zoom afterwards.
 */
export function focusResidue(
  plugin: PluginUIContext,
  loci: StructureElement.Loci
): number | null {
  const camera = plugin.canvas3d?.camera;
  if (!camera) return null;

  const sphere = Loci.getBoundingSphere(loci);
  if (!sphere) return null;

  const framingRadius = Math.max(
    sphere.radius + FOCUS_EXTRA_RADIUS,
    FOCUS_MIN_RADIUS
  );
  const snapshot = camera.getFocus(sphere.center, framingRadius);

  // Distance the camera will sit from the residue - the reference for clipping.
  const focusDistance = camera.getTargetDistance(framingRadius);

  // Clip hugs the residue's bounding sphere by the same margin as the framing,
  // but without the FOCUS_MIN_RADIUS floor, so small residues crop tighter.
  const clipRatio = (sphere.radius + FOCUS_EXTRA_RADIUS) / focusDistance;
  const radius = clipRadiusForDistance(
    focusDistance,
    clipRatio,
    camera.state.radiusMax
  );

  camera.setState({ ...snapshot, radius }, FOCUS_DURATION_MS);

  return clipRatio;
}

/**
 * Keeps the depth clip in sync with the zoom while a residue is focused.
 *
 * Mol*'s trackball zoom moves the camera without touching the clip radius, so
 * this recomputes it after each draw: zooming in tightens the clip (peeling
 * toward the residue), zooming out widens it toward the whole structure. It is
 * a no-op when `getClipRatio` returns null (nothing focused) and while the
 * camera is mid-transition, so it does not fight the focus animation.
 */
export function syncClipToZoom(
  plugin: PluginUIContext,
  getClipRatio: () => number | null
): void {
  const camera = plugin.canvas3d?.camera;
  const clipRatio = getClipRatio();
  if (!camera || clipRatio === null || camera.transition.inTransition) return;

  const distance = Vec3.distance(camera.state.position, camera.state.target);
  const radius = clipRadiusForDistance(
    distance,
    clipRatio,
    camera.state.radiusMax
  );

  if (Math.abs(camera.state.radius - radius) > CLIP_EPSILON) {
    camera.setState({ radius });
    plugin.canvas3d?.requestDraw();
  }
}
