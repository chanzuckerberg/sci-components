import type { PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";

/**
 * The spec's list-valued keys. These are appended rather than merged: Mol*
 * reads them as collections, so a consumer's entries join the viewer's instead
 * of replacing them.
 *
 * `config` is the one where order carries meaning - Mol* folds the list into a
 * Map in order, so a later entry overwrites an earlier one, and appending is
 * what lets a consumer override a setting the viewer chose.
 */
const LIST_KEYS = [
  "actions",
  "animations",
  "behaviors",
  "config",
  "customFormats",
  "customParamEditors",
] as const;

type ListKey = (typeof LIST_KEYS)[number];

type Plain = Record<string, unknown>;

/**
 * Whether a value should be merged into rather than replaced.
 *
 * Only object literals qualify. Arrays are collections, and the spec is full
 * of React components and Mol* class instances, all of which are values in
 * their own right - merging into one would take it apart.
 */
function isPlainObject(value: unknown): value is Plain {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || proto === null;
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) return override;

  const merged: Plain = { ...base };

  for (const [key, value] of Object.entries(override)) {
    merged[key] = key in base ? deepMerge(base[key], value) : value;
  }

  return merged;
}

function withoutLists(spec: Partial<PluginUISpec>): Plain {
  const rest: Plain = { ...(spec as Plain) };

  for (const key of LIST_KEYS) delete rest[key];

  return rest;
}

/**
 * Lays a consumer's Mol* spec over the viewer's own.
 *
 * The viewer builds a spec of its own - the sequence panel and viewport it
 * renders, the controls it hides, the behaviors it drops - and this is how a
 * consumer reaches the rest of Mol* without the viewer having to grow a prop
 * per setting. Anything the consumer names wins, so `canvas3d.renderer` or a
 * `PluginConfig` item can be set to something other than the default the
 * viewer picked.
 *
 * The one thing it cannot do is take something away: `behaviors` is appended
 * to, so a behavior the viewer removed - Mol*'s click-to-zoom camera - stays
 * removed, and one the viewer kept cannot be dropped.
 */
export function mergeMolstarSpec(
  base: PluginUISpec,
  override?: Partial<PluginUISpec>
): PluginUISpec {
  if (!override) return base;

  const merged = deepMerge(withoutLists(base), withoutLists(override)) as Plain;

  for (const key of LIST_KEYS) {
    const ours = (base[key as ListKey] ?? []) as unknown[];
    const theirs = (override[key as ListKey] ?? []) as unknown[];

    if (ours.length > 0 || theirs.length > 0) {
      merged[key] = [...ours, ...theirs];
    }
  }

  return merged as unknown as PluginUISpec;
}
