import { Tooltip, TooltipProps } from "@czi-sds/components";
import { ColorScale } from "../../../../common/colorScales";
import {
  ChainRef,
  ResidueReadout,
  StructureStat,
} from "../../ProteinStructureViewer.types";
import ChainLegend from "../ChainLegend";
import ColorScaleLegend from "../ColorScaleLegend";
import {
  LegendOverlay,
  ScaleCaption,
  ScaleColumn,
  StatColumnWrapper,
  StatLabel,
  StatValue,
  StatsGrid,
  TooltipAnchor,
} from "./style";
import { QuestionIcon } from "@phosphor-icons/react";

export interface StructureLegendProps {
  /** Whole-structure stats shown when no residue is hovered or selected. */
  stats: (StructureStat | null)[];
  /**
   * Scale describing the current structure coloring. Null when the coloring is
   * not a per-residue scale - chain coloring, say - in which case no key is
   * drawn rather than one describing colors the structure does not carry.
   */
  scale?: ColorScale | null;
  /** Caption beneath the scale, e.g. "pLDDT". */
  scaleLabel?: string;
  /** Title of the help tooltip on the caption. */
  scaleTooltip?: string;
  /**
   * Props forwarded to the SDS Tooltip on the caption. The trigger is the
   * help icon, so `children` is omitted. `scaleTooltip` still sets the title
   * and overrides `title` here when both are set.
   */
  scaleTooltipProps?: Partial<Omit<TooltipProps, "children">>;
  /** Value at the top of a continuous scale. */
  scaleMax?: number | null;
  /**
   * Value at the bottom of a continuous scale, which the coloring normalizes
   * against and the lower tick therefore reports.
   * @default 0
   */
  scaleMin?: number;
  /**
   * Label for the overlay value slot in a residue readout. Undefined when no
   * overlay is active, which is what keeps the slot on its whole-structure
   * stat instead of reporting a value nothing is painting.
   */
  valueLabel?: string;
  /** Whether the sequence panel is taking up the bottom of the viewer. */
  showSequenceViewer: boolean;
  hoveredResidue?: ResidueReadout | null;
  selectedResidue?: ResidueReadout | null;
  /** Chains to list beside the color key. Empty to list none. */
  chains?: ChainRef[];
  /** Color per chain, or undefined when chain coloring is not what is shown. */
  chainColors?: Map<string, string>;
  /** Chains currently hidden from the 3D view. */
  hiddenChains?: Set<string>;
  /** Chains the current selection covers whole. */
  selectedChains?: Set<string>;
  onChainToggle?: (chainId: string) => void;
  onChainSelect?: (chainId: string) => void;
}

/** Number of stat columns, fixed so the grid tracks never move. */
const SLOT_COUNT = 3;

/** Decimal places for stat and readout values. */
const VALUE_PRECISION = 3;

/** Shown in place of a number the residue has none of. */
const MISSING_VALUE = "\u2013";

function StatColumn({ label, value }: StructureStat): JSX.Element {
  return (
    <StatColumnWrapper>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatColumnWrapper>
  );
}

/**
 * Builds one readout slot.
 *
 * A readout covering several residues reports a mean, and the label says so:
 * calling it "pLDDT" while it averages ninety of them would read as a single
 * residue's score.
 */
function readoutSlot(
  label: string,
  value: number | null,
  residueCount: number
): StructureStat {
  return {
    // Prefixed rather than recased, since the label can be an acronym the
    // consumer chose the casing of - "pLDDT" must not become "Plddt".
    label: residueCount > 1 ? `Mean ${label}` : label,
    value: value !== null ? value.toFixed(VALUE_PRECISION) : MISSING_VALUE,
  };
}

/**
 * Stats and color key overlaid on the structure viewer.
 *
 * When a residue is selected or hovered, the whole-structure stats are replaced
 * in place by that residue's readout: slot 0 becomes the residue label, slot 1
 * the overlay value (only when an overlay is active, otherwise the stat stays),
 * and slot 2 the residue pLDDT. A selection pins the readout; hovering another
 * residue takes priority so the user can inspect others without losing their
 * selection.
 */
export default function StructureLegend({
  chainColors,
  chains = [],
  hiddenChains,
  hoveredResidue = null,
  onChainSelect,
  onChainToggle,
  scale,
  scaleLabel,
  scaleMax = null,
  scaleMin = 0,
  scaleTooltip,
  scaleTooltipProps,
  selectedChains,
  selectedResidue = null,
  showSequenceViewer,
  stats,
  valueLabel,
}: StructureLegendProps): JSX.Element {
  const activeResidue = hoveredResidue ?? selectedResidue;
  const showResidue = activeResidue !== null;
  // The slot belongs to the overlay whenever one is set, so a residue it holds
  // no value for reads as a dash rather than falling back to the stat, which
  // would look like a value the overlay had reported.
  const showValue = showResidue && valueLabel !== undefined;
  const residueCount = activeResidue?.residueCount ?? 1;

  // Three fixed slots so the grid tracks never move as values and labels swap
  // between the default stats and the per-residue readout. A slot is null when
  // there is nothing to show; its track stays reserved.
  const slots: (StructureStat | null)[] = [
    showResidue
      ? {
          // A multi-residue selection already names itself by what it covers,
          // so labelling it "Residue" would contradict its own value.
          label: residueCount > 1 ? "Selection" : "Residue",
          value: activeResidue.label,
        }
      : (stats[0] ?? null),
    showValue
      ? readoutSlot(valueLabel, activeResidue.value, residueCount)
      : (stats[1] ?? null),
    showResidue
      ? readoutSlot("pLDDT", activeResidue.plddt, residueCount)
      : (stats[2] ?? null),
  ];

  return (
    <LegendOverlay showSequenceViewer={showSequenceViewer}>
      <StatsGrid>
        {Array.from({ length: SLOT_COUNT }, (_, i) => {
          const slot = slots[i] ?? null;
          return slot ? (
            <StatColumn key={i} label={slot.label} value={slot.value} />
          ) : (
            <div key={i} />
          );
        })}
      </StatsGrid>
      {onChainToggle && onChainSelect && (
        <ChainLegend
          chainColors={chainColors}
          chains={chains}
          hiddenChains={hiddenChains ?? new Set()}
          onChainSelect={onChainSelect}
          onChainToggle={onChainToggle}
          selectedChains={selectedChains}
        />
      )}
      {scale && (
        <ScaleColumn>
          <ColorScaleLegend max={scaleMax} min={scaleMin} scale={scale} />
          <ScaleCaption>
            {scaleLabel}
            {(scaleTooltip !== undefined ||
              scaleTooltipProps !== undefined) && (
              <Tooltip
                arrow
                placement="bottom"
                {...scaleTooltipProps}
                title={scaleTooltip ?? scaleTooltipProps?.title}
              >
                <TooltipAnchor>
                  <QuestionIcon size={10} weight="bold" />
                </TooltipAnchor>
              </Tooltip>
            )}
          </ScaleCaption>
        </ScaleColumn>
      )}
    </LegendOverlay>
  );
}
