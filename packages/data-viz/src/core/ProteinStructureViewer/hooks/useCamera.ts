import type { Structure } from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect, useRef } from "react";
import type {
  CameraOrientation,
  CameraProjection,
  CameraState,
  ResidueHighlight,
} from "../ProteinStructureViewer.types";
import {
  ORIENT_DURATION_MS,
  camerasEqual,
  orientationSnapshot,
  readCameraState,
  residuesCenter,
} from "../utils/camera";
import { resolveHighlights } from "../utils/highlights";

/**
 * How long the camera has to stay put before it counts as having come to
 * rest, in ms. Mol* draws on demand, so a camera that has stopped stops the
 * draws, and a trackball still coasting after a drag keeps pushing this back.
 */
const CAMERA_SETTLE_MS = 150;

export interface UseCameraOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  isReady: boolean;
  projection?: CameraProjection;
  orientation?: CameraOrientation;
  /** The highlights an orientation turns toward. */
  highlights?: readonly ResidueHighlight[];
  addressIndexRef: RefObject<Map<string, number>>;
  structureDataRef: RefObject<Structure | null>;
  /** The orientation last applied, by a load or by this hook. */
  framedOrientationRef: { current: CameraOrientation | undefined };
  onCameraChange?: (camera: CameraState) => void;
}

/**
 * Keeps the camera in step with the camera props after a structure is up:
 * the projection, the orientation, and reporting where the camera comes to
 * rest. Where the camera starts on a structure is decided by the load, which
 * knows when there is something drawn to place it against.
 */
export function useCamera({
  addressIndexRef,
  framedOrientationRef,
  highlights,
  isReady,
  onCameraChange,
  orientation,
  pluginRef,
  projection,
  structureDataRef,
}: UseCameraOptions): void {
  // Read when an orientation is applied rather than depended on: turning the
  // camera is what a change of orientation asks for, and not what a change of
  // highlights does.
  const highlightsRef = useRef(highlights);
  highlightsRef.current = highlights;
  const onCameraChangeRef = useRef(onCameraChange);
  onCameraChangeRef.current = onCameraChange;

  useEffect(() => {
    const canvas3d = pluginRef.current?.canvas3d;
    if (!canvas3d || !isReady || !projection) return;
    if (canvas3d.props.camera.mode === projection) return;

    canvas3d.setProps({ camera: { mode: projection } });
  }, [isReady, pluginRef, projection]);

  useEffect(() => {
    const canvas3d = pluginRef.current?.canvas3d;
    const structure = structureDataRef.current;
    if (!canvas3d || !isReady || !structure) return;

    // The load applies the orientation it finds, so the first pass after one
    // has nothing to do.
    if (orientation === framedOrientationRef.current) return;
    framedOrientationRef.current = orientation;
    if (!orientation) return;

    const residues = residuesCenter(structure, [
      ...resolveHighlights(
        highlightsRef.current,
        addressIndexRef.current ?? new Map()
      ).colors.keys(),
    ]);

    canvas3d.requestCameraReset({
      durationMs: ORIENT_DURATION_MS,
      snapshot: orientationSnapshot(orientation, residues),
    });
  }, [
    addressIndexRef,
    framedOrientationRef,
    isReady,
    orientation,
    pluginRef,
    structureDataRef,
  ]);

  useEffect(() => {
    const canvas3d = pluginRef.current?.canvas3d;
    if (!canvas3d || !isReady) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let reported: CameraState | null = null;

    const subscription = canvas3d.didDraw.subscribe(() => {
      if (!onCameraChangeRef.current) return;

      clearTimeout(timer);
      timer = setTimeout(() => {
        if (canvas3d.camera.transition.inTransition) return;

        const state = readCameraState(canvas3d);
        // A redraw for something other than the camera - a recolor, a hover -
        // leaves it where it was, which is nothing to report.
        if (reported && camerasEqual(reported, state)) return;

        reported = state;
        onCameraChangeRef.current?.(state);
      }, CAMERA_SETTLE_MS);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [isReady, pluginRef]);
}
