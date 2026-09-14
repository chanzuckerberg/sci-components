import { Button } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { Toasts } from "molstar/lib/mol-plugin-ui/toast";
import { Viewport } from "molstar/lib/mol-plugin-ui/viewport";
import { useMolstarTheme } from "../../hooks/useMolstarTheme";
import { useViewSetting } from "../../hooks/useViewSetting";
import { MolstarViewSettingsSubject } from "../../utils/theme";
import { useCameraReset } from "./hooks/useCameraReset";
import { ResetCameraSlot } from "./style";

/**
 * Builds the Mol* viewport view.
 *
 * Mol* instantiates view components inside its own React root, so they render
 * outside the consumer's provider tree and cannot read the theme from context.
 * `viewSettings` carries the mode in instead, and is watched rather than read
 * once so that a theme change after the plugin was created still lands here;
 * the mode is re-supplied via a local `ThemeProvider` so the Emotion styles
 * below resolve SDS tokens correctly.
 */
export function createViewportView(
  viewSettings: MolstarViewSettingsSubject
): () => JSX.Element {
  return function ViewportWithReset() {
    const { theme } = useMolstarTheme(viewSettings);
    const { cameraChanged, resetCamera } = useCameraReset();
    // This view stands in for Mol*'s own whether or not the axes are on, so
    // whether to offer the reset button is a question it has to ask rather
    // than something its presence answers.
    const showAxes = useViewSetting(viewSettings, (s) => s.showAxes ?? true);

    return (
      <>
        <Viewport />
        <div className="msp-highlight-toast-wrapper">
          <Toasts />
        </div>
        <ThemeProvider theme={theme}>
          <ResetCameraSlot hidden={!showAxes || !cameraChanged}>
            <Button
              aria-label="Reset camera"
              onClick={resetCamera}
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
  };
}
