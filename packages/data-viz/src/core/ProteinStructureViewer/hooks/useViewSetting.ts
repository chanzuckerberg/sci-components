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
  useSubscribe(settings, (next) => setValue(select(next)));

  return value;
}
