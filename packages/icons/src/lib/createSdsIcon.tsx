import type { Icon, IconWeight } from "@phosphor-icons/react";
/*
 * `IconBase` is imported from its own module rather than from the package root
 * for two reasons. The root is a barrel of ~1,500 icons, and pulling it in here
 * would put all of them in the module graph of every consumer that imports one
 * SDS icon. And the entry Phosphor documents for this, `@phosphor-icons/react/lib`,
 * is broken in the published package: its `exports` map points at
 * `dist/lib/index.es.js`, which is not shipped. Only the `.d.ts` is, so
 * TypeScript accepts the import and the failure surfaces at bundle time.
 *
 * `iconBaseIsResolvable` in `__tests__/createSdsIcon.test.tsx` fails loudly if
 * this path ever moves.
 */
import IconBase from "@phosphor-icons/react/dist/lib/IconBase";
import { forwardRef, type ReactElement } from "react";

const WEIGHTS: IconWeight[] = [
  "thin",
  "light",
  "regular",
  "bold",
  "fill",
  "duotone",
];

/**
 * Build an SDS icon from a single drawing.
 *
 * Phosphor's icons carry six drawings, one per weight, and pick between them
 * from the `weight` prop. SDS icons are drawn once, so the same artwork is
 * registered under every weight: `weight` stays part of the API, and an icon set
 * by an ancestor `IconContext` or by a caller passing `weight` renders rather
 * than disappearing, it just does not change appearance.
 *
 * @param displayName The component name React DevTools shows.
 * @param art The contents of the icon's SVG, without its wrapping `<svg>`, drawn
 * on the 256x256 grid `IconBase` renders. A single `path` or, for artwork with
 * several, a `Fragment` of them; see `src/defs`.
 */
export function createSdsIcon(displayName: string, art: ReactElement): Icon {
  const weights = new Map<IconWeight, ReactElement>(
    WEIGHTS.map((weight) => [weight, art])
  );

  const SdsIcon: Icon = forwardRef((props, ref) => (
    <IconBase ref={ref} {...props} weights={weights} />
  ));

  SdsIcon.displayName = displayName;

  return SdsIcon;
}
