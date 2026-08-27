import { ThemeProvider } from "@mui/material/styles";
import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { PluginUIComponent } from "molstar/lib/mol-plugin-ui/base";
import { Toasts } from "molstar/lib/mol-plugin-ui/toast";
import { Viewport } from "molstar/lib/mol-plugin-ui/viewport";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";
import { ComponentClass } from "react";
import { distinctUntilChanged, skip } from "rxjs/operators";
import { ThemeModeSubject, themeForMode } from "../../utils/theme";
import { ResetCameraSlot } from "./style";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@czi-sds/components";

interface ViewportWithResetState {
  cameraChanged: boolean;
}

/** Camera reset transition length (ms), run once for position and once for axes. */
const RESET_DURATION_MS = 250;

/**
 * Fraction of the bounding sphere radius within which the camera still counts
 * as sitting at the default view, absorbing easing and float error.
 */
const DEFAULT_VIEW_TOLERANCE = 0.02;

/**
 * Builds the Mol* viewport view class.
 *
 * Mol* instantiates view components inside its own React root, so they render
 * outside the consumer's provider tree and cannot read the theme from context.
 * `themeMode` carries the mode in instead, and is watched rather than read once
 * so that a theme change after the plugin was created still lands here; the
 * mode is re-supplied via a local `ThemeProvider` so the Emotion styles below
 * resolve SDS tokens correctly.
 *
 * The return type is widened to `ComponentClass` both because that is what
 * Mol*'s spec accepts and because an anonymous class expression cannot have its
 * private members described in the emitted declarations.
 */
export function createViewportView(
  themeMode: ThemeModeSubject
): ComponentClass {
  return class ViewportWithReset extends PluginUIComponent<
    Record<string, never>,
    ViewportWithResetState
  > {
    state: ViewportWithResetState = { cameraChanged: false };

    private cameraBound = false;

    /**
     * A manual gesture (rotate via drag) moves the camera off the default view.
     * Tracked separately from zoom because rotation leaves the zoom/center at
     * the default fit, so the bounding-sphere check below cannot detect it.
     */
    private gestured = false;

    /**
     * A (re)loaded structure auto-fits to the default view. Ignore camera
     * changes until that fit transition settles so the button does not flash
     * during load.
     */
    private awaitingFit = true;

    private fitStarted = false;

    componentDidMount() {
      // canvas3d is created by the child <Viewport />, so it may not exist yet
      // at mount.
      this.subscribe(this.plugin.behaviors.canvas3d.initialized, () =>
        this.bindCamera()
      );
      this.bindCamera();

      // `skip(1)` drops the subject's current value, which render() already
      // used. PluginUIComponent unsubscribes on unmount.
      this.subscribe(themeMode.pipe(skip(1), distinctUntilChanged()), () =>
        this.forceUpdate()
      );
    }

    private bindCamera() {
      const canvas3d = this.plugin.canvas3d;
      if (!canvas3d || this.cameraBound) return;
      this.cameraBound = true;

      // Manual gestures (rotate/pan via drag, zoom via wheel) move the camera
      // off the default view.
      this.subscribe(canvas3d.input.drag, () => this.setGestured(true));
      this.subscribe(canvas3d.input.wheel, () => this.setGestured(true));

      // A new structure loads with an auto-fit to the default view, so reset
      // the tracking whenever a structure object is (re)created.
      this.subscribe(this.plugin.state.data.events.object.created, () => {
        this.gestured = false;
        this.awaitingFit = true;
        this.fitStarted = false;
        this.setCameraChanged(false);
      });

      // Re-evaluate after each rendered frame. camera.stateChanged only fires
      // once when a move is *initiated* (already mid-transition), never at the
      // settled end, so it misses programmatic zooms like focusing a clicked
      // residue. didDraw fires every frame, including the final settled one, so
      // the button reflects the resting zoom.
      this.subscribe(canvas3d.didDraw, () => this.syncCameraChanged());
    }

    private setGestured(gestured: boolean) {
      this.gestured = gestured;
      this.syncCameraChanged();
    }

    private setCameraChanged(changed: boolean) {
      if (changed !== this.state.cameraChanged) {
        this.setState({ cameraChanged: changed });
      }
    }

    /**
     * Reconciles the button visibility with the current camera. The button
     * shows when the camera differs from the default view: either the
     * zoom/center has moved off the bounding-sphere fit, or a manual gesture
     * rotated the view.
     */
    private syncCameraChanged() {
      const canvas3d = this.plugin.canvas3d;
      if (!canvas3d) return;

      const inTransition = canvas3d.camera.transition.inTransition;

      // Hold off until the post-load auto-fit has run and settled, so mid-fit
      // frames do not briefly show the button on every structure load.
      if (this.awaitingFit) {
        if (inTransition) {
          this.fitStarted = true;
          return;
        }
        // Settled frame. Clear once the fit transition we saw has finished. If
        // we never saw a transition, the fit may have been instant (Mol* forces
        // duration 0 when the pre-commit scene was empty), in which case the
        // camera is already at the default view - treat that as fit-complete
        // too. Only keep waiting when the camera is still off-default with no
        // fit yet observed (the pre-fit frame), so an instant fit cannot stick
        // the button.
        if (!this.fitStarted && this.isZoomedOffDefault()) return;
        this.awaitingFit = false;
      }

      // Only judge the settled camera; ignore intermediate transition frames.
      if (inTransition) return;

      this.setCameraChanged(this.gestured || this.isZoomedOffDefault());
    }

    /** True when the camera's zoom/center differs from the default fit. */
    private isZoomedOffDefault(): boolean {
      const canvas3d = this.plugin.canvas3d;
      if (!canvas3d) return false;

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

    resetCamera = async () => {
      await PluginCommands.Camera.Reset(this.plugin, {
        durationMs: RESET_DURATION_MS,
      });
      await new Promise((resolve) => setTimeout(resolve, RESET_DURATION_MS));
      await PluginCommands.Camera.ResetAxes(this.plugin, {
        durationMs: RESET_DURATION_MS,
      });
      await new Promise((resolve) => setTimeout(resolve, RESET_DURATION_MS));

      // The camera is back at the default view; clear tracking and hide the
      // button.
      this.gestured = false;
      this.setCameraChanged(false);
    };

    render() {
      return (
        <>
          <Viewport />
          <div className="msp-highlight-toast-wrapper">
            <Toasts />
          </div>
          <ThemeProvider theme={themeForMode(themeMode.value)}>
            <ResetCameraSlot hidden={!this.state.cameraChanged}>
              <Button
                aria-label="Reset camera"
                onClick={this.resetCamera}
                title="Reset camera"
                sdsStyle="minimal"
                sdsType="secondary"
                size="medium"
              >
                <ArrowCounterClockwiseIcon />
              </Button>
            </ResetCameraSlot>
          </ThemeProvider>
        </>
      );
    }
  };
}
