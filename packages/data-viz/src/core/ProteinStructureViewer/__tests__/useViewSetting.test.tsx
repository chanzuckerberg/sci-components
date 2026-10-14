import { act, render } from "@testing-library/react";
import { BehaviorSubject } from "rxjs";
import { useViewSetting } from "../hooks/useViewSetting";
import type {
  MolstarViewSettings,
  MolstarViewSettingsSubject,
} from "../utils/theme";

/**
 * The bridge carrying settings into the React root Mol* owns. Some of those
 * settings are callbacks, which is the case worth pinning: React reads a
 * function handed to a state setter as an updater and calls it with the
 * previous value. Stored naively, `onChainSelect` was invoked on every settings
 * push - with the previous state standing in for the chain id - which fired a
 * selection nobody asked for and wiped whatever was selected.
 */
function subject(
  settings: Partial<MolstarViewSettings> = {}
): MolstarViewSettingsSubject {
  return new BehaviorSubject<MolstarViewSettings>({
    mode: "light",
    ...settings,
  });
}

/** Records every value the hook returned, latest last. */
function track<T>(
  settings: MolstarViewSettingsSubject,
  select: (s: MolstarViewSettings) => T
) {
  const seen: T[] = [];

  function Probe(): null {
    seen.push(useViewSetting(settings, select));
    return null;
  }

  const result = render(<Probe />);

  return {
    ...result,
    latest: () => seen[seen.length - 1],
    renders: () => seen.length,
  };
}

describe("useViewSetting", () => {
  it("reads a plain setting and follows it", () => {
    const settings = subject({ sequenceViewerBackgroundColor: "#111111" });
    const probe = track(settings, (s) => s.sequenceViewerBackgroundColor);

    expect(probe.latest()).toBe("#111111");

    act(() => {
      settings.next({ mode: "light", sequenceViewerBackgroundColor: "#222" });
    });

    expect(probe.latest()).toBe("#222");
  });

  it("stores a callback setting instead of calling it", () => {
    const onChainSelect = vi.fn();
    const settings = subject({ onChainSelect });
    const probe = track(settings, (s) => s.onChainSelect);

    expect(probe.latest()).toBe(onChainSelect);
    expect(onChainSelect).not.toHaveBeenCalled();
  });

  it("does not call a callback setting when the settings are pushed again", () => {
    const first = vi.fn();
    const second = vi.fn();
    const settings = subject({ onChainSelect: first });
    const probe = track(settings, (s) => s.onChainSelect);

    act(() => settings.next({ mode: "light", onChainSelect: second }));

    expect(probe.latest()).toBe(second);
    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
  });

  it("keeps the equality bailout, so an unchanged value does not re-render", () => {
    const settings = subject({ sequenceViewerBackgroundColor: "#111111" });
    const probe = track(settings, (s) => s.sequenceViewerBackgroundColor);
    const before = probe.renders();

    // A push that leaves this field alone; the component reads nothing else.
    act(() => {
      settings.next({ mode: "dark", sequenceViewerBackgroundColor: "#111111" });
    });

    expect(probe.renders()).toBe(before);
  });
});
