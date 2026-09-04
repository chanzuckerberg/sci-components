import type { Canvas3D } from "molstar/lib/mol-canvas3d/canvas3d";
import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { DEFAULT_VIEW_TOLERANCE } from "../constants";

/** True when the camera's zoom/center differs from the default fit. */
export function isZoomedOffDefault(canvas3d: Canvas3D): boolean {
  // requestCameraReset focuses on boundingSphereVisible, so at the default
  // view the camera's radius equals that sphere's radius and its target its
  // center.
  const { center, radius } = canvas3d.boundingSphereVisible;
  if (radius <= 0) return false;

  const { state } = canvas3d.camera;
  const tolerance = radius * DEFAULT_VIEW_TOLERANCE;

  return (
    Math.abs(state.radius - radius) > tolerance ||
    Vec3.distance(state.target, center) > tolerance
  );
}
