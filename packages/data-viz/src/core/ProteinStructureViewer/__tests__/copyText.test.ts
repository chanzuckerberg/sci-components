import { copyText } from "../components/SequenceView/utils/copyText";

describe("copyText", () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
    Reflect.deleteProperty(document, "execCommand");
    document.body.replaceChildren();
  });

  function stubClipboard(writeText: Clipboard["writeText"] | undefined): void {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: writeText ? { writeText } : undefined,
    });
  }

  /**
   * jsdom does not implement `document.execCommand`, so the spy has to be
   * installed as a real property rather than patched onto an existing one.
   */
  function stubExecCommand(
    impl: (commandId: string) => boolean
  ): ReturnType<typeof vi.fn> {
    const execCommand = vi.fn(impl);
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommand,
    });
    return execCommand;
  }

  it("uses the Clipboard API when it is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    const execCommand = stubExecCommand(() => true);

    await copyText("MKTV");

    expect(writeText).toHaveBeenCalledWith("MKTV");
    expect(execCommand).not.toHaveBeenCalled();
  });

  it("falls back to a selection copy when the Clipboard API is refused", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("NotAllowedError")));
    const execCommand = stubExecCommand(() => {
      const area = document.querySelector("textarea");
      expect(area).toBeTruthy();
      expect((area as HTMLTextAreaElement).value).toBe("MKTV");
      return true;
    });

    await copyText("MKTV");

    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("falls back when the Clipboard API is missing", async () => {
    stubClipboard(undefined);
    const execCommand = stubExecCommand(() => true);

    await expect(copyText("MKTV")).resolves.toBeUndefined();
    expect(execCommand).toHaveBeenCalledWith("copy");
  });

  it("rejects when both paths fail", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("blocked")));
    stubExecCommand(() => false);

    await expect(copyText("MKTV")).rejects.toThrow(
      "The host blocked clipboard access."
    );
  });
});
