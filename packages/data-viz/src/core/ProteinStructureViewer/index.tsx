import { getMode, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";
import {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PLASMA_COLOR_SCALE } from "../../common/colorScales";
import StructureLegend, {
  StructureLegendProps,
} from "./components/StructureLegend";
import { useMolstarPlugin } from "./hooks/useMolstarPlugin";
import { useResidueFocus } from "./hooks/useResidueFocus";
import { useResidueOverlay } from "./hooks/useResidueOverlay";
import {
  ProteinStructureViewerProps,
  ResidueReadout,
  ResidueValueOverlay,
} from "./ProteinStructureViewer.types";
import { PluginMount, ViewerRoot } from "./style";
import { themeColor } from "./utils/color";
import { PLDDT_COLOR_SCALE, injectPlddtIntoPdb } from "./utils/plddt";
import { lociForResidueIndex, residueCompId } from "./utils/residueLoci";

export * from "./ProteinStructureViewer.types";
export { PLDDT_COLOR_SCALE, injectPlddtIntoPdb } from "./utils/plddt";

/** Fallbacks for theme tokens Mol* needs as concrete hex colors. */
const FALLBACK_EDGE_COLOR = "#6c6c6c";
const FALLBACK_HIGHLIGHT_COLOR = "#1b1b1b";
/**
 * Keyed by mode: unlike the two above, the canvas has to invert with it. Only
 * reached when the viewer renders outside an SDS theme; inside one the
 * `base.backgroundPrimary` token wins.
 */
const FALLBACK_BACKGROUND_COLOR = { dark: "#000000", light: "#ffffff" };

/** Caption shown beneath the color key when no overlay is active. */
const PLDDT_SCALE_LABEL = "pLDDT";

/** Caption used when an overlay does not name itself. */
const DEFAULT_OVERLAY_LABEL = "Value";

/** Readout slot label used when an overlay does not name one. */
const DEFAULT_READOUT_LABEL = "Value";

/** Tracks the residue under the pointer, deduplicated by index. */
interface HoveredResidue {
  index: number;
  label: string;
}

/** The part of the legend that describes the structure's coloring. */
type ScaleProps = Pick<
  StructureLegendProps,
  | "scale"
  | "scaleLabel"
  | "scaleMax"
  | "scaleMin"
  | "scaleTooltip"
  | "valueLabel"
>;

/**
 * Chooses what the legend describes, following whatever is actually coloring
 * the structure: the overlay when one is set, the pLDDT bands when scores were
 * supplied, and nothing at all otherwise - Mol* falls back to chain coloring
 * there, which no per-residue scale describes, so a key would be labelling
 * colors that are not on screen.
 */
function resolveScaleProps(
  overlay: ResidueValueOverlay | null | undefined,
  hasPlddt: boolean
): ScaleProps {
  if (overlay) {
    return {
      scale: overlay.colorScale ?? PLASMA_COLOR_SCALE,
      scaleLabel: overlay.label ?? DEFAULT_OVERLAY_LABEL,
      scaleMax: overlay.max,
      // The same floor the coloring normalizes against, so the bar's lower
      // tick reports where its colors actually start.
      scaleMin: overlay.min ?? 0,
      scaleTooltip: overlay.tooltip,
      // Always defined while an overlay is set: the legend reads the label's
      // presence as the readout's value slot being in use at all.
      valueLabel: overlay.readoutLabel ?? DEFAULT_READOUT_LABEL,
    };
  }

  if (hasPlddt) {
    return {
      scale: PLDDT_COLOR_SCALE,
      scaleLabel: PLDDT_SCALE_LABEL,
      scaleMax: null,
      scaleTooltip: undefined,
      valueLabel: undefined,
    };
  }

  return {
    scale: null,
    scaleLabel: undefined,
    scaleMax: null,
    scaleTooltip: undefined,
    valueLabel: undefined,
  };
}

/**
 * Interactive 3D protein structure viewer built on Mol*, with a sequence panel,
 * pLDDT confidence coloring, per-residue value overlays, and a stats legend.
 *
 * The viewer is controlled for selection: `selectedResidue` drives the camera
 * (clicking a residue zooms in on it, clearing the selection zooms back out),
 * while hover state is owned internally so the legend can show a live readout
 * without the consumer round-tripping every pointer move.
 */
const ProteinStructureViewer = forwardRef(
  (
    props: ProteinStructureViewerProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const {
      backgroundColor,
      onResidueClick,
      onResidueHover,
      onSelectionClear,
      pdb,
      plddt,
      residueOverlay,
      selectedResidue = null,
      sequenceViewerBackgroundColor,
      showAxes = true,
      showLegend = true,
      showSequenceViewer = true,
      stats,
      ...rest
    } = props;

    const theme = useTheme();
    const mode = getMode({ theme });
    const semanticColors = getSemanticColors({ theme });

    // Mol* owns and overwrites its mount node, so the legend cannot live inside
    // it; the mount is a separate element from the root the ref points at.
    const pluginMountRef = useRef<HTMLDivElement | null>(null);

    const [hoveredResidue, setHoveredResidue] = useState<HoveredResidue | null>(
      null
    );

    /**
     * Label for the selected residue, read back off the structure rather than
     * remembered from the click that selected it, so the readout follows the
     * prop however the selection was made.
     */
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const hasPlddt = Boolean(plddt && plddt.length > 0);

    // pLDDT scores ride into Mol* through the PDB's B-factor column, so the
    // text is rewritten rather than passed alongside.
    const processedPdb = useMemo(
      () => (hasPlddt ? injectPlddtIntoPdb(pdb, plddt as number[]) : pdb),
      [pdb, plddt, hasPlddt]
    );

    const bgColor = useMemo(
      () =>
        themeColor(
          backgroundColor ?? semanticColors?.base?.backgroundPrimary,
          FALLBACK_BACKGROUND_COLOR[mode]
        ),
      [backgroundColor, mode, semanticColors]
    );

    // Hover and selection are both drawn as an outline in this color.
    const edgeColor = useMemo(
      () =>
        themeColor(semanticColors?.base?.borderPrimary, FALLBACK_EDGE_COLOR),
      [semanticColors]
    );
    const highlightColor = useMemo(
      () =>
        themeColor(
          semanticColors?.base?.fillSelected,
          FALLBACK_HIGHLIGHT_COLOR
        ),
      [semanticColors]
    );

    const handleResidueHover = useCallback(
      (residueIndex: number | null, compId: string | null) => {
        // Mol* emits hover events continuously; skip redundant state updates
        // when the pointer stays on the same residue (or off the structure).
        setHoveredResidue((prev) => {
          if (residueIndex === null || compId === null) {
            return prev === null ? prev : null;
          }
          if (prev !== null && prev.index === residueIndex) return prev;
          return {
            index: residueIndex,
            label: `${compId} ${residueIndex + 1}`,
          };
        });
        onResidueHover?.(residueIndex, compId);
      },
      [onResidueHover]
    );

    const { isReady, pluginRef, residueValueThemeRef, setClipRatio } =
      useMolstarPlugin({
        backgroundColor: bgColor,
        containerRef: pluginMountRef,
        edgeColor,
        hasPlddt,
        highlightColor,
        mode,
        onResidueClick,
        onResidueHover: handleResidueHover,
        onSelectionClear,
        pdb: processedPdb,
        sequenceViewerBackgroundColor,
        showAxes,
        showSequenceViewer,
      });

    useResidueOverlay({
      hasPlddt,
      isReady,
      mode,
      overlay: residueOverlay,
      pluginRef,
      residueValueThemeRef,
    });

    useResidueFocus({
      isReady,
      pluginRef,
      selectedResidue,
      setClipRatio,
    });

    // The label has to come off the structure, since a selection can be made
    // without a click ever naming the residue.
    useEffect(() => {
      const plugin = pluginRef.current;
      if (!plugin || !isReady || selectedResidue === null) {
        setSelectedLabel(null);
        return;
      }

      const loci = lociForResidueIndex(plugin, selectedResidue);
      const compId = loci && residueCompId(loci);

      setSelectedLabel(compId ? `${compId} ${selectedResidue + 1}` : null);
    }, [isReady, pluginRef, selectedResidue]);

    // The legend readouts are derived here rather than asked of the consumer:
    // everything they need (the residue label, its pLDDT, its overlay value) is
    // already known to the viewer.
    const buildReadout = useCallback(
      (label: string, index: number): ResidueReadout => ({
        label,
        plddt: plddt?.[index] ?? null,
        // Null for a residue the overlay has no value for, matching the
        // neutral the structure paints it rather than claiming a zero.
        value: residueOverlay?.values.get(index) ?? null,
      }),
      [plddt, residueOverlay]
    );

    const hoveredReadout = useMemo(
      () =>
        hoveredResidue === null
          ? null
          : buildReadout(hoveredResidue.label, hoveredResidue.index),
      [hoveredResidue, buildReadout]
    );

    const selectedReadout = useMemo(
      () =>
        selectedResidue === null || selectedLabel === null
          ? null
          : buildReadout(selectedLabel, selectedResidue),
      [selectedResidue, selectedLabel, buildReadout]
    );

    const scaleProps = useMemo(
      () => resolveScaleProps(residueOverlay, hasPlddt),
      [residueOverlay, hasPlddt]
    );

    return (
      <ViewerRoot ref={ref} showSequenceViewer={showSequenceViewer} {...rest}>
        <PluginMount ref={pluginMountRef} />
        {showLegend && (
          <StructureLegend
            hoveredResidue={hoveredReadout}
            selectedResidue={selectedReadout}
            showSequenceViewer={showSequenceViewer}
            stats={stats ?? []}
            {...scaleProps}
          />
        )}
      </ViewerRoot>
    );
  }
);

export default memo(ProteinStructureViewer);
