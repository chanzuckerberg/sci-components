import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PluginReactContext } from "molstar/lib/mol-plugin-ui/base";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { BehaviorSubject } from "rxjs";
import { createViewportView } from "../components/Viewport";
import type { MolstarViewSettings } from "../utils/theme";

/**
 * Mol*'s own viewport and toasts need a live canvas. The capture button beside
 * them does not, so they are stood in for and the button is driven directly.
 */
vi.mock("molstar/lib/mol-plugin-ui/viewport", () => ({ Viewport: () => null }));
vi.mock("molstar/lib/mol-plugin-ui/toast", () => ({ Toasts: () => null }));

const CAPTURE = "Download image of the structure";

/**
 * Enough of a plugin for the viewport view to mount: no canvas yet, so the
 * camera tracking waits for one, and a screenshot helper to capture with.
 */
function stubPlugin() {
  return {
    behaviors: { canvas3d: { initialized: new BehaviorSubject(false) } },
    canvas3d: undefined,
    helpers: {
      viewportScreenshot: {
        behaviors: { values: new BehaviorSubject({}) },
        download: vi.fn(),
        getFilename: (extension: string) => `1CRN${extension}`,
        getImageDataUri: async () => "data:image/png;base64,iVBORw0KGgo=",
      },
    },
  };
}

function renderViewport(settings: Omit<MolstarViewSettings, "mode">) {
  const View = createViewportView(
    new BehaviorSubject<MolstarViewSettings>({ mode: "light", ...settings })
  );

  render(
    <PluginReactContext.Provider
      value={stubPlugin() as unknown as PluginUIContext}
    >
      <View />
    </PluginReactContext.Provider>
  );
}

describe("the capture button", () => {
  afterEach(() => vi.restoreAllMocks());

  it("delivers the image to deliver", async () => {
    const deliver = vi.fn();
    renderViewport({ download: { deliver } });

    fireEvent.click(screen.getByRole("button", { name: CAPTURE }));

    await waitFor(() =>
      expect(deliver).toHaveBeenCalledWith(expect.any(Blob), "1CRN.png")
    );
  });

  it("reports a failed capture to onError", async () => {
    const failure = new Error("The host declined the file");
    const onError = vi.fn();
    renderViewport({
      download: {
        deliver: async () => {
          throw failure;
        },
      },
      onError,
    });

    fireEvent.click(screen.getByRole("button", { name: CAPTURE }));

    await waitFor(() =>
      expect(onError).toHaveBeenCalledWith(failure, "capture")
    );
  });

  it("logs a failed capture when nobody is listening for it", async () => {
    const failure = new Error("The host declined the file");
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    renderViewport({
      download: {
        deliver: async () => {
          throw failure;
        },
      },
    });

    fireEvent.click(screen.getByRole("button", { name: CAPTURE }));

    await waitFor(() =>
      expect(log).toHaveBeenCalledWith(
        "Failed to download the structure image:",
        failure
      )
    );
  });
});
