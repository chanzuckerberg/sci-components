import { Button, Tooltip } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { ArrowCounterClockwiseIcon, ApertureIcon } from "@phosphor-icons/react";
import { Toasts } from "molstar/lib/mol-plugin-ui/toast";
import { Viewport } from "molstar/lib/mol-plugin-ui/viewport";
import { useCallback, useState } from "react";
import { usePlugin } from "../../hooks/usePlugin";
import { useMolstarTheme } from "../../hooks/useMolstarTheme";
import { useViewSetting } from "../../hooks/useViewSetting";
import { downloadStructureImage } from "../../utils/screenshot";
import { MolstarViewSettingsSubject } from "../../utils/theme";
import { useCameraReset } from "./hooks/useCameraReset";
import { ViewportButtonStack } from "./style";

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
    const plugin = usePlugin();
    const { theme } = useMolstarTheme(viewSettings);
    const { cameraChanged, resetCamera } = useCameraReset();
    // This view stands in for Mol*'s own whether or not the axes are on, so
    // whether to offer the reset button is a question it has to ask rather
    // than something its presence answers.
    const showAxes = useViewSetting(viewSettings, (s) => s.showAxes ?? true);
    const download = useViewSetting(viewSettings, (s) => s.download);

    /**
     * Disabled while a capture is in flight. A high resolution takes long
     * enough to click twice through, and each click renders its own pass.
     */
    const [downloading, setDownloading] = useState(false);

    const captureImage = useCallback(async () => {
      if (!download) return;

      setDownloading(true);
      try {
        await downloadStructureImage(plugin, download);
      } catch (error) {
        console.error("Failed to download the structure image:", error);
      } finally {
        setDownloading(false);
      }
    }, [download, plugin]);

    return (
      <>
        <Viewport />
        <div className="msp-highlight-toast-wrapper">
          <Toasts />
        </div>
        <ThemeProvider theme={theme}>
          <ViewportButtonStack showAxes={showAxes}>
            <div hidden={!cameraChanged}>
              <Tooltip
                arrow
                placement="right"
                title="Reset camera"
                textAlign="left"
              >
                {/*
                  No `title` here: the Tooltip above supplies one, and a second
                  on its child makes MUI warn and the browser draw its own
                  tooltip over the styled one. `aria-label` is what names it.
                */}
                <Button
                  aria-label="Reset camera"
                  onClick={resetCamera}
                  sdsStyle="minimal"
                  sdsType="secondary"
                  size="medium"
                >
                  <ArrowCounterClockwiseIcon />
                </Button>
              </Tooltip>
            </div>
            {download && (
              <Tooltip
                arrow
                placement="right"
                title="Download image"
                textAlign="left"
              >
                <Button
                  aria-label="Download image of the structure"
                  disabled={downloading}
                  onClick={captureImage}
                  sdsStyle="minimal"
                  sdsType="secondary"
                  size="medium"
                >
                  <ApertureIcon />
                </Button>
              </Tooltip>
            )}
          </ViewportButtonStack>
        </ThemeProvider>
      </>
    );
  };
}
