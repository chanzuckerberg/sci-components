import { useState } from "react";
import type {
  MolstarViewSettings,
  MolstarViewSettingsSubject,
} from "../utils/theme";
import { useSubscribe } from "./useSubscribe";

/**
 * One field of the settings Mol*'s own React root cannot read from context.
 *
 * The subject emits a whole new settings object on every push, so each field is
 * selected out separately: React's equality bailout then absorbs the pushes
 * that left this particular value alone, and a component only re-renders for
 * the settings it actually reads.
 */
export function useViewSetting<T>(
  settings: MolstarViewSettingsSubject,
  select: (settings: MolstarViewSettings) => T
): T {
  const [value, setValue] = useState(() => select(settings.value));

  // A BehaviorSubject replays its current value on subscribe, so the value is
  // still correct if the settings changed between the first render and this
  // effect. `useSubscribe` reads the handler through a ref, so the fresh
  // selector closure on each render does not rebuild the subscription.
  //
  // Stored through an updater rather than passed directly, because a setting
  // can be a callback: React reads a function handed to a setter as an updater
  // and calls it with the previous value. Passing the selected value straight
  // in would therefore invoke the setting instead of storing it. Returning it
  // from an updater stores it whatever its type, and the equality bailout
  // still applies.
  useSubscribe(settings, (next) => setValue(() => select(next)));

  return value;
}
