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
import { useChains } from "./hooks/useChains";
import { useMolstarPlugin } from "./hooks/useMolstarPlugin";
import { useSelectionFocus } from "./hooks/useSelectionFocus";
import {
  useResidueHoverState,
  useSelectionReadout,
} from "./hooks/useSelectionReadout";
import { useStructureColoring } from "./hooks/useStructureColoring";
import {
  ChainRef,
  ProteinStructureViewerProps,
  ResidueValueOverlay,
} from "./ProteinStructureViewer.types";
import { PluginMount, ViewerRoot } from "./style";
import { themeColor } from "./utils/color";
import { PLDDT_COLOR_SCALE, injectPlddtIntoPdb } from "./utils/plddt";

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

/** The part of the legend that describes the structure's coloring. */
type ScaleProps = Pick<
  StructureLegendProps,
  | "scale"
  | "scaleLabel"
  | "scaleMax"
  | "scaleMin"
  | "scaleTooltip"
  | "scaleTooltipProps"
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
      scaleTooltipProps: overlay.tooltipProps,
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
      scaleTooltipProps: undefined,
      valueLabel: undefined,
    };
  }

  return {
    scale: null,
    scaleLabel: undefined,
    scaleMax: null,
    scaleTooltip: undefined,
    scaleTooltipProps: undefined,
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
      chainColors: chainColorOverrides,
      hiddenChains: hiddenChainsProp,
      onChainVisibilityChange,
      onChainsChange,
      molstarSpec,
      onResidueClick,
      onResidueHover,
      onSelectionChange,
      pdb,
      plddt,
      residueOverlay,
      selection = null,
      sequenceViewerBackgroundColor,
      showAxes = true,
      showChainLegend = true,
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

    const { handleResidueHover, hoveredResidue } =
      useResidueHoverState(onResidueHover);

    // A click on empty space clears the selection; anything landing on the
    // structure is reported through the residue callback instead.
    const handleSelectionClear = useCallback(() => {
      onSelectionChange?.(null);
    }, [onSelectionChange]);

    /**
     * Chains the selection covers whole, which is what makes a chain caption a
     * toggle rather than a one-way switch. Keyed on its contents because the
     * set is pushed into the views Mol* renders, where a fresh object every
     * render would be a fresh push every render.
     */
    const selectedChainsKey = [...(selection?.chains ?? [])].sort().join("\0");
    const selectedChains = useMemo(
      () =>
        new Set(selectedChainsKey === "" ? [] : selectedChainsKey.split("\0")),
      [selectedChainsKey]
    );

    /**
     * Clicking a chain selects it; clicking the selected chain again clears it.
     *
     * A whole chain is reported as the chain it is, not as the hundreds of
     * residue indices it stands for, so echoing it back costs nothing. Only a
     * selection that is exactly this one chain toggles off - with a residue or
     * another chain also selected, the click is narrowing to this chain rather
     * than undoing itself.
     */
    const handleChainSelect = useCallback(
      (chainId: string) => {
        const isOnlyThisChain =
          selection?.chains?.length === 1 &&
          selection.chains[0] === chainId &&
          !selection.residues?.length;

        onSelectionChange?.(isOnlyThisChain ? null : { chains: [chainId] });
      },
      [onSelectionChange, selection]
    );

    // Chains arrive from the plugin once a structure is loaded, and the
    // visibility and coloring they carry are fed back into it below. The cycle
    // settles in one extra render: the first load reports the chains, and the
    // colors assigned to them are pushed in on the pass that follows.
    const [chains, setChains] = useState<ChainRef[]>([]);

    const {
      colors: chainColors,
      hidden: hiddenChains,
      toggleChain,
    } = useChains({
      chainColors: chainColorOverrides,
      chains,
      hiddenChains: hiddenChainsProp,
      onChainVisibilityChange,
    });

    const {
      chainColorThemeRef,
      chains: loadedChains,
      isReady,
      pluginRef,
      residuesByChainRef,
      residueValueThemeRef,
      setClipRatio,
    } = useMolstarPlugin({
      backgroundColor: bgColor,
      chainColors,
      containerRef: pluginMountRef,
      edgeColor,
      hasPlddt,
      hiddenChains,
      highlightColor,
      mode,
      molstarSpec,
      onChainSelect: handleChainSelect,
      onChainToggle: toggleChain,
      onResidueClick,
      onResidueHover: handleResidueHover,
      onSelectionChange,
      onSelectionClear: handleSelectionClear,
      pdb: processedPdb,
      selectedChains,
      sequenceViewerBackgroundColor,
      showAxes,
      showSequenceViewer,
    });

    // The plugin owns chain discovery, but the chain-keyed props have to be
    // resolved before it is called, so the list is mirrored into state here
    // rather than read straight out of the hook's return.
    useEffect(() => {
      setChains(loadedChains);
    }, [loadedChains]);

    const onChainsChangeRef = useRef(onChainsChange);
    onChainsChangeRef.current = onChainsChange;

    useEffect(() => {
      onChainsChangeRef.current?.(loadedChains);
    }, [loadedChains]);

    useStructureColoring({
      chainColorThemeRef,
      chainColors,
      hasPlddt,
      isReady,
      mode,
      overlay: residueOverlay,
      pluginRef,
      residueValueThemeRef,
    });

    useSelectionFocus({
      hiddenChains,
      isReady,
      pluginRef,
      selection,
      setClipRatio,
    });

    const { hoveredReadout, selectedReadout } = useSelectionReadout({
      hoveredResidue,
      isReady,
      plddt,
      pluginRef,
      residueOverlay,
      residuesByChainRef,
      selection,
    });

    const scaleProps = useMemo(
      () => resolveScaleProps(residueOverlay, hasPlddt),
      [residueOverlay, hasPlddt]
    );

    // Swatches describe the structure only while chain coloring is what is
    // painting it. Under pLDDT or an overlay the rows keep their labels and
    // toggles but drop the colors, which by then belong to a different scale.
    const chainColoringActive = !residueOverlay && !hasPlddt;

    return (
      <ViewerRoot ref={ref} showSequenceViewer={showSequenceViewer} {...rest}>
        <PluginMount ref={pluginMountRef} />
        {showLegend && (
          <StructureLegend
            chainColors={chainColoringActive ? chainColors : undefined}
            chains={showChainLegend ? chains : []}
            hiddenChains={hiddenChains}
            hoveredResidue={hoveredReadout}
            onChainSelect={handleChainSelect}
            onChainToggle={toggleChain}
            selectedChains={selectedChains}
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
