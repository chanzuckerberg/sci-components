import { Theme, getSemanticColors } from "@czi-sds/components";
import { BehaviorSubject } from "rxjs";
import type {
  StructureDownload,
  ViewerErrorPhase,
} from "../ProteinStructureViewer.types";

export type ThemeMode = "light" | "dark";

/**
 * The props the components Mol* renders in its own React root need from the
 * viewer. They sit outside the consumer's provider tree, so nothing reaches
 * them through context.
 */
export interface MolstarViewSettings {
  mode: ThemeMode;
  /** Sequence panel background, or undefined for the theme's own surface. */
  sequenceViewerBackgroundColor?: string;
  /**
   * Chains hidden from the 3D view, by `chainId`. The panel dims these rather
   * than dropping them: the sequence is still the sequence, and removing the
   * grid would reflow the panel on every toggle.
   */
  hiddenChains?: Set<string>;
  /**
   * Selects a whole chain, for the caption above each grid. Undefined when the
   * consumer is not listening for selections, which leaves the captions inert.
   */
  onChainSelect?: (chainId: string) => void;
  /** Flips one chain's visibility, for the toggle beside each caption. */
  onChainToggle?: (chainId: string) => void;
  /**
   * Lights the chain up in the 3D view while its caption is pointed at, and
   * takes null when the pointer leaves.
   */
  onChainHover?: (chainId: string | null) => void;
  /**
   * Chains the current selection covers whole. What lets a caption say whether
   * clicking it will select or deselect, rather than claiming one either way.
   */
  selectedChains?: Set<string>;
  /**
   * Whether the orientation axes and the reset-camera button are on.
   *
   * The viewport view is installed whether or not they are - that is what
   * keeps Mol*'s own icon column out of the canvas - so the view reads this to
   * know whether to offer the reset button, rather than its mere presence
   * meaning the axes are on.
   */
  showAxes?: boolean;
  /**
   * What the capture button should produce, or undefined for no button. The
   * button lives in the viewport view, which Mol* renders, so the options
   * reach it the same way the theme does.
   */
  download?: StructureDownload | null;
  /**
   * Where a failed capture is reported: the consumer's `onError` when it has
   * one, the console when it does not.
   */
  onError?: (error: unknown, phase: ViewerErrorPhase) => void;
  /**
   * True while the scene is being loaded or redrawn. A capture taken then
   * would catch it half drawn, so the button waits it out.
   */
  sceneBusy?: boolean;
}

/**
 * Carries the settings above across that boundary. Those components watch it
 * for changes rather than reading it once, so a prop change after the plugin
 * was created still lands.
 */
export type MolstarViewSettingsSubject = BehaviorSubject<MolstarViewSettings>;

type SdsTheme = ReturnType<typeof Theme>;

const themeCache = new Map<ThemeMode, SdsTheme>();

/**
 * The MUI theme for a mode, built at most once. Mol*'s view components rebuild
 * their `ThemeProvider` on every render, and `Theme()` is not cheap.
 */
export function themeForMode(mode: ThemeMode): SdsTheme {
  const cached = themeCache.get(mode);
  if (cached) return cached;

  const theme = Theme(mode);
  themeCache.set(mode, theme);

  return theme;
}

/**
 * Colors applied directly to residue spans in the sequence panel.
 *
 * These cannot go through Emotion: `updateMarker` writes them straight to the
 * DOM on every hover to avoid re-rendering a grid that can hold thousands of
 * nodes. They are resolved from the theme rather than from the
 * `--sds-color-semantic-*` custom properties, because those are published under
 * `@media (prefers-color-scheme)` and so track the operating system rather than
 * the theme the consumer supplied.
 */
export interface ResidueColors {
  /** Hovered, selected, or focused residue. */
  activeText: string;
  activeBackground: string;
  /** Residue with nothing selected anywhere. */
  defaultText: string;
  /** Non-active residue while some other residue is selected. */
  inactiveText: string;
}

const residueColorCache = new Map<ThemeMode, ResidueColors>();

export function residueColorsForMode(mode: ThemeMode): ResidueColors {
  const cached = residueColorCache.get(mode);
  if (cached) return cached;

  const base = getSemanticColors({ theme: themeForMode(mode) })?.base;
  const colors: ResidueColors = {
    activeBackground: base?.fillSecondaryInteraction ?? "transparent",
    activeText: base?.textPrimary ?? "inherit",
    defaultText: base?.textSecondary ?? "inherit",
    inactiveText: base?.textTertiary ?? "inherit",
  };
  residueColorCache.set(mode, colors);

  return colors;
}
