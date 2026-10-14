import type { Camera } from "molstar/lib/mol-canvas3d/camera";
import type { Canvas3D } from "molstar/lib/mol-canvas3d/canvas3d";
import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { Loci } from "molstar/lib/mol-model/loci";
import type { Structure } from "molstar/lib/mol-model/structure";
import type {
  CameraOrientation,
  CameraProjection,
  CameraState,
} from "../ProteinStructureViewer.types";
import { lociForResidueIndices } from "../utils/residueLoci";

/** How long an orientation change takes to turn the camera, in ms. */
export const ORIENT_DURATION_MS = 250;

/** How far two camera readings may differ and still be the same camera. */
const CAMERA_EPSILON = 1e-4;

const toTuple = (v: Vec3): [number, number, number] => [
  v[0] as number,
  v[1] as number,
  v[2] as number,
];

/** Where the canvas camera is now, in the form `onCameraChange` reports. */
export function readCameraState(canvas3d: Canvas3D): CameraState {
  const { camera } = canvas3d;
  const snapshot = camera.getSnapshot();

  return {
    fov: snapshot.fov,
    position: toTuple(snapshot.position),
    projection: snapshot.mode,
    radius: snapshot.radius,
    radiusMax: snapshot.radiusMax,
    target: toTuple(snapshot.target),
    up: toTuple(snapshot.up),
    viewport: {
      height: camera.viewport.height,
      width: camera.viewport.width,
    },
  };
}

/** A camera state as the Mol* snapshot that puts the camera there. */
export function cameraSnapshot(state: CameraState): Partial<Camera.Snapshot> {
  return {
    fov: state.fov,
    mode: state.projection,
    position: Vec3.create(...state.position),
    radius: state.radius,
    radiusMax: state.radiusMax,
    target: Vec3.create(...state.target),
    up: Vec3.create(...state.up),
  };
}

const near = (a: number, b: number) => Math.abs(a - b) <= CAMERA_EPSILON;
const nearAll = (a: readonly number[], b: readonly number[]) =>
  a.every((value, i) => near(value, b[i] as number));

/** True when two readings place the camera in the same spot. */
export function camerasEqual(a: CameraState, b: CameraState): boolean {
  return (
    a.projection === b.projection &&
    near(a.fov, b.fov) &&
    near(a.radius, b.radius) &&
    nearAll(a.position, b.position) &&
    nearAll(a.target, b.target) &&
    nearAll(a.up, b.up)
  );
}

/**
 * The center of the named residues, or undefined when the structure holds
 * none of them - which is what an orientation relative to highlights falls
 * back to the overview from.
 */
export function residuesCenter(
  structure: Structure,
  residueIndices: readonly number[]
): Vec3 | undefined {
  if (residueIndices.length === 0) return undefined;

  const loci = lociForResidueIndices(structure, residueIndices);
  const sphere = loci && Loci.getBoundingSphere(loci);

  return sphere ? Vec3.clone(sphere.center) : undefined;
}

/**
 * Looks at the scene from one side or another of the named residues.
 *
 * Resolved against the scene as Mol* draws it, when the reset it is handed to
 * comes round, rather than when it is asked for: the visible bounding sphere
 * is only known once what is visible has been drawn, and a structure just
 * loaded has not been yet.
 *
 * `facing` looks at the residues from outside the structure, down the line
 * from its center through theirs; `opposite` looks from the far side; `side`
 * looks across that line. Without residues, `overview` looks down the view's
 * default axis, with up as up.
 */
export function orientationSnapshot(
  orientation: CameraOrientation,
  residues: Vec3 | undefined
): Camera.SnapshotProvider {
  return (scene, camera) => {
    const { center, radius } = scene.boundingSphereVisible;
    const outward = Vec3.create(0, 0, 1);

    if (orientation !== "overview" && residues) {
      Vec3.sub(outward, residues, center);
      if (Vec3.magnitude(outward) < 1e-6) Vec3.set(outward, 0, 0, 1);
      Vec3.normalize(outward, outward);
    }

    // Up is the view's own up where it can be, and falls to the x axis only
    // when the camera would be looking straight along it.
    const reference =
      Math.abs(outward[1] as number) < 0.9
        ? Vec3.create(0, 1, 0)
        : Vec3.create(1, 0, 0);
    const up = Vec3.normalize(
      Vec3(),
      Vec3.sub(
        Vec3(),
        reference,
        Vec3.scale(Vec3(), outward, Vec3.dot(reference, outward))
      )
    );

    let direction = outward;
    if (orientation === "opposite") direction = Vec3.negate(Vec3(), outward);
    if (orientation === "side") {
      direction = Vec3.normalize(Vec3(), Vec3.cross(Vec3(), outward, up));
    }

    return camera.getInvariantFocus(
      center,
      radius,
      up,
      Vec3.negate(Vec3(), direction)
    );
  };
}

/** What decides where the camera starts on a structure. */
export interface CameraFraming {
  initialCamera?: CameraState | null;
  orientation?: CameraOrientation;
  projection?: CameraProjection;
}

/**
 * Places the camera on a structure just loaded: at `initialCamera` when there
 * is one, turned to `orientation` when there is one, and otherwise fitted to
 * the structure when `fit` asks for it.
 *
 * Handed to Mol* as a camera reset, which waits for the scene to be drawn: set
 * directly, the camera would be fitted again by Mol* the first time something
 * is drawn into the empty scene.
 *
 * Returns the orientation now in force, so a change to it can be told from the
 * one the load already applied. `fitDurationMs` is how long a plain fit
 * animates, Mol*'s own default when left out.
 */
export function frameStructure(
  canvas3d: Canvas3D,
  framing: CameraFraming,
  residues: Vec3 | undefined,
  fit: boolean,
  fitDurationMs?: number
): CameraOrientation | undefined {
  const { initialCamera, orientation, projection } = framing;

  if (projection) canvas3d.setProps({ camera: { mode: projection } });

  if (initialCamera) {
    canvas3d.setProps({ camera: { mode: initialCamera.projection } });
    canvas3d.requestCameraReset({
      durationMs: 0,
      snapshot: cameraSnapshot(initialCamera),
    });
  } else if (orientation) {
    canvas3d.requestCameraReset({
      durationMs: 0,
      snapshot: orientationSnapshot(orientation, residues),
    });
  } else if (fit && fitDurationMs === undefined) {
    canvas3d.requestCameraReset();
  } else if (fit) {
    canvas3d.requestCameraReset({ durationMs: fitDurationMs });
  }

  return orientation;
}
