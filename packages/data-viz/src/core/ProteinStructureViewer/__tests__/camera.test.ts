import { Camera } from "molstar/lib/mol-canvas3d/camera";
import type { Canvas3D } from "molstar/lib/mol-canvas3d/canvas3d";
import type { Scene } from "molstar/lib/mol-gl/scene";
import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import type { CameraState } from "../ProteinStructureViewer.types";
import {
  cameraSnapshot,
  camerasEqual,
  frameStructure,
  orientationSnapshot,
  readCameraState,
} from "../scene/camera";

/**
 * The orientations are geometry, run through Mol*'s own camera: each has to
 * put the camera on the right side of the structure, looking at it, with the
 * whole of it in view.
 */

const CENTER = Vec3.create(0, 0, 0);
const RADIUS = 10;

/** A scene whose visible part is a sphere at the origin. */
const scene = {
  boundingSphereVisible: { center: CENTER, radius: RADIUS },
} as unknown as Scene;

function orient(
  orientation: Parameters<typeof orientationSnapshot>[0],
  residues?: Vec3
) {
  const provider = orientationSnapshot(orientation, residues);
  if (typeof provider !== "function") throw new Error("Expected a provider");

  const snapshot = provider(scene, new Camera());
  return {
    position: snapshot.position as Vec3,
    radius: snapshot.radius as number,
    target: snapshot.target as Vec3,
  };
}

/** Residues sitting out along +x from the center. */
const RESIDUES = Vec3.create(8, 0, 0);

describe("orientations", () => {
  it("looks at the residues from outside the structure", () => {
    const { position, radius, target } = orient("facing", RESIDUES);

    expect(position[0]).toBeGreaterThan(RADIUS);
    expect(Math.abs(position[1] as number)).toBeLessThan(1e-6);
    expect(Math.abs(position[2] as number)).toBeLessThan(1e-6);
    // Framed on the whole structure, not on the residues.
    expect(Vec3.equals(target, CENTER)).toBe(true);
    expect(radius).toBe(RADIUS);
  });

  it("looks from the far side for opposite", () => {
    const { position } = orient("opposite", RESIDUES);

    expect(position[0]).toBeLessThan(-RADIUS);
  });

  it("looks across the line through the residues for side", () => {
    const { position } = orient("side", RESIDUES);

    expect(Math.abs(position[0] as number)).toBeLessThan(1e-6);
    expect(Vec3.magnitude(position)).toBeGreaterThan(RADIUS);
  });

  it("looks down the default axis for the overview", () => {
    const { position } = orient("overview", RESIDUES);

    expect(position[2]).toBeGreaterThan(RADIUS);
    expect(Math.abs(position[0] as number)).toBeLessThan(1e-6);
  });

  it("falls back to the overview with nothing to face", () => {
    expect(orient("facing").position).toEqual(orient("overview").position);
  });
});

const STATE: CameraState = {
  fov: 0.8,
  position: [10, 20, 30],
  projection: "orthographic",
  radius: 12,
  radiusMax: 40,
  target: [1, 2, 3],
  up: [0, 1, 0],
};

describe("camera state", () => {
  it("reads back the state a camera was put in", () => {
    const camera = new Camera();
    camera.setState(cameraSnapshot(STATE));

    const read = readCameraState({ camera } as unknown as Canvas3D);

    expect(camerasEqual(read, STATE)).toBe(true);
    expect(read.viewport).toEqual({
      height: camera.viewport.height,
      width: camera.viewport.width,
    });
  });

  it("tells a moved camera from one left where it was", () => {
    expect(camerasEqual(STATE, { ...STATE })).toBe(true);
    expect(camerasEqual(STATE, { ...STATE, position: [10, 20, 31] })).toBe(
      false
    );
    expect(camerasEqual(STATE, { ...STATE, projection: "perspective" })).toBe(
      false
    );
  });
});

describe("frameStructure", () => {
  function stubCanvas() {
    return {
      requestCameraReset: vi.fn(),
      setProps: vi.fn(),
    };
  }

  const frame = (
    canvas: ReturnType<typeof stubCanvas>,
    framing: Parameters<typeof frameStructure>[1],
    fit = true
  ) => frameStructure(canvas as unknown as Canvas3D, framing, RESIDUES, fit);

  it("starts at initialCamera, whatever else is asked", () => {
    const canvas = stubCanvas();
    frame(canvas, { initialCamera: STATE, orientation: "side" });

    expect(canvas.requestCameraReset).toHaveBeenCalledTimes(1);
    expect(canvas.requestCameraReset).toHaveBeenCalledWith({
      durationMs: 0,
      snapshot: cameraSnapshot(STATE),
    });
    expect(canvas.setProps).toHaveBeenCalledWith({
      camera: { mode: "orthographic" },
    });
  });

  it("turns to the orientation when there is no camera to start at", () => {
    const canvas = stubCanvas();
    const applied = frame(canvas, { orientation: "facing" });

    expect(canvas.requestCameraReset).toHaveBeenCalledWith({
      durationMs: 0,
      snapshot: expect.any(Function),
    });
    expect(applied).toBe("facing");
  });

  it("fits the structure when asked and nothing else says where", () => {
    const canvas = stubCanvas();
    frame(canvas, {});

    expect(canvas.requestCameraReset).toHaveBeenCalledWith();
  });

  it("leaves the camera alone for a consumer drawing the scene", () => {
    const canvas = stubCanvas();
    frame(canvas, {}, false);

    expect(canvas.requestCameraReset).not.toHaveBeenCalled();
  });

  it("sets the projection", () => {
    const canvas = stubCanvas();
    frame(canvas, { projection: "orthographic" });

    expect(canvas.setProps).toHaveBeenCalledWith({
      camera: { mode: "orthographic" },
    });
  });
});
