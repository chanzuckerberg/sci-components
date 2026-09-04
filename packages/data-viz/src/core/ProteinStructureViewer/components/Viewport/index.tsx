import { Button } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { Toasts } from "molstar/lib/mol-plugin-ui/toast";
import { Viewport } from "molstar/lib/mol-plugin-ui/viewport";
import { useMolstarTheme } from "../../hooks/useMolstarTheme";
import { ThemeModeSubject } from "../../utils/theme";
import { useCameraReset } from "./hooks/useCameraReset";
import { ResetCameraSlot } from "./style";

/**
 * Builds the Mol* viewport view.
 *
 * Mol* instantiates view components inside its own React root, so they render
 * outside the consumer's provider tree and cannot read the theme from context.
 * `themeMode` carries the mode in instead, and is watched rather than read once
 * so that a theme change after the plugin was created still lands here; the
 * mode is re-supplied via a local `ThemeProvider` so the Emotion styles below
 * resolve SDS tokens correctly.
 */
export function createViewportView(
  themeMode: ThemeModeSubject
): () => JSX.Element {
  return function ViewportWithReset() {
    const { theme } = useMolstarTheme(themeMode);
    const { cameraChanged, resetCamera } = useCameraReset();

    return (
      <>
        <Viewport />
        <div className="msp-highlight-toast-wrapper">
          <Toasts />
        </div>
        <ThemeProvider theme={theme}>
          <ResetCameraSlot hidden={!cameraChanged}>
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
