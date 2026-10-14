import { PluginCommands } from "molstar/lib/mol-plugin/commands";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePlugin } from "../../../hooks/usePlugin";
import { RESET_DURATION_MS } from "../constants";
import { isZoomedOffDefault } from "../utils/camera";

export interface CameraReset {
  /** True when the camera sits somewhere other than the default view. */
  cameraChanged: boolean;
  resetCamera: () => Promise<void>;
}

/**
 * Tracks whether the camera has moved off the default view, and puts it back.
 *
 * The default view is the auto-fit to the structure's bounding sphere, so
 * "moved" means either the zoom/center has drifted off that fit or a manual
 * drag has rotated it - rotation has to be tracked separately, since it leaves
 * the zoom and center at the default and the bounding-sphere check cannot see
 * it.
 */
export function useCameraReset(): CameraReset {
  const plugin = usePlugin();
  const [cameraChanged, setCameraChanged] = useState(false);

  /**
   * Mirrors the state above so the per-frame handler below can skip redundant
   * updates without re-reading state through a stale closure.
   */
  const cameraChangedRef = useRef(false);

  const updateCameraChanged = useCallback((changed: boolean) => {
    if (changed === cameraChangedRef.current) return;
    cameraChangedRef.current = changed;
    setCameraChanged(changed);
  }, []);

  /**
   * A manual gesture (rotate via drag) moves the camera off the default view.
   * Tracked separately from zoom because rotation leaves the zoom/center at
   * the default fit, so the bounding-sphere check cannot detect it.
   */
  const gesturedRef = useRef(false);

  /**
   * A (re)loaded structure auto-fits to the default view. Ignore camera
   * changes until that fit transition settles so the button does not flash
   * during load.
   */
  const awaitingFitRef = useRef(true);

  const fitStartedRef = useRef(false);

  /**
   * Reconciles the button visibility with the current camera. The button
   * shows when the camera differs from the default view: either the
   * zoom/center has moved off the bounding-sphere fit, or a manual gesture
   * rotated the view.
   */
  const syncCameraChanged = useCallback(() => {
    const canvas3d = plugin.canvas3d;
    if (!canvas3d) return;

    const inTransition = canvas3d.camera.transition.inTransition;

    // Hold off until the post-load auto-fit has run and settled, so mid-fit
    // frames do not briefly show the button on every structure load.
    if (awaitingFitRef.current) {
      if (inTransition) {
        fitStartedRef.current = true;
        return;
      }
      // Settled frame. Clear once the fit transition we saw has finished. If
      // we never saw a transition, the fit may have been instant (Mol* forces
      // duration 0 when the pre-commit scene was empty), in which case the
      // camera is already at the default view - treat that as fit-complete
      // too. Only keep waiting when the camera is still off-default with no
      // fit yet observed (the pre-fit frame), so an instant fit cannot stick
      // the button.
      if (!fitStartedRef.current && isZoomedOffDefault(canvas3d)) return;
      awaitingFitRef.current = false;
    }

    // Only judge the settled camera; ignore intermediate transition frames.
    if (inTransition) return;

    updateCameraChanged(gesturedRef.current || isZoomedOffDefault(canvas3d));
  }, [plugin, updateCameraChanged]);

  useEffect(() => {
    const subscriptions: { unsubscribe: () => void }[] = [];
    let cameraBound = false;

    const bindCamera = () => {
      const canvas3d = plugin.canvas3d;
      if (!canvas3d || cameraBound) return;
      cameraBound = true;

      const setGestured = () => {
        gesturedRef.current = true;
        syncCameraChanged();
      };

      subscriptions.push(
        // Manual gestures (rotate/pan via drag, zoom via wheel) move the
        // camera off the default view.
        canvas3d.input.drag.subscribe(setGestured),
        canvas3d.input.wheel.subscribe(setGestured),

        // A new structure loads with an auto-fit to the default view, so reset
        // the tracking whenever a structure object is (re)created.
        plugin.state.data.events.object.created.subscribe(() => {
          gesturedRef.current = false;
          awaitingFitRef.current = true;
          fitStartedRef.current = false;
          updateCameraChanged(false);
        }),

        // Re-evaluate after each rendered frame. camera.stateChanged only
        // fires once when a move is *initiated* (already mid-transition),
        // never at the settled end, so it misses programmatic zooms like
        // focusing a clicked residue. didDraw fires every frame, including the
        // final settled one, so the button reflects the resting zoom.
        canvas3d.didDraw.subscribe(syncCameraChanged)
      );
    };

    // canvas3d is created by the child <Viewport />, so it may not exist yet
    // at mount.
    subscriptions.push(
      plugin.behaviors.canvas3d.initialized.subscribe(bindCamera)
    );
    bindCamera();

    return () => subscriptions.forEach((s) => s.unsubscribe());
  }, [plugin, syncCameraChanged, updateCameraChanged]);

  const resetCamera = useCallback(async () => {
    await PluginCommands.Camera.Reset(plugin, {
      durationMs: RESET_DURATION_MS,
    });
    await new Promise((resolve) => setTimeout(resolve, RESET_DURATION_MS));
    await PluginCommands.Camera.ResetAxes(plugin, {
      durationMs: RESET_DURATION_MS,
    });
    await new Promise((resolve) => setTimeout(resolve, RESET_DURATION_MS));

    // The camera is back at the default view; clear tracking and hide the
    // button.
    gesturedRef.current = false;
    updateCameraChanged(false);
  }, [plugin, updateCameraChanged]);

  return { cameraChanged, resetCamera };
}
