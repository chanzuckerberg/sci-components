import { Icon, Tooltip } from "@czi-sds/components";
import {
  ColorScale,
  ResidueReadout,
  StructureStat,
} from "../../MolecularStructureViewer.types";
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

export interface StructureLegendProps {
  /** Whole-structure stats shown when no residue is hovered or selected. */
  stats: (StructureStat | null)[];
  /** Scale describing the current structure coloring. */
  scale: ColorScale;
  /** Caption beneath the scale, e.g. "pLDDT". */
  scaleLabel: string;
  /** Optional help tooltip on the caption. */
  scaleTooltip?: string;
  /** Value at the top of a continuous scale. */
  scaleMax?: number | null;
  /** Label for the overlay value slot in a residue readout. */
  valueLabel?: string;
  /** Whether the sequence panel is taking up the bottom of the viewer. */
  showSequenceViewer: boolean;
  hoveredResidue?: ResidueReadout | null;
  selectedResidue?: ResidueReadout | null;
}

/** Number of stat columns, fixed so the grid tracks never move. */
const SLOT_COUNT = 3;

/** Decimal places for stat and readout values. */
const VALUE_PRECISION = 3;

/** Shown in the pLDDT slot when a residue has no confidence score. */
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
  hoveredResidue = null,
  scale,
  scaleLabel,
  scaleMax = null,
  scaleTooltip,
  selectedResidue = null,
  showSequenceViewer,
  stats,
  valueLabel = "Value",
}: StructureLegendProps): JSX.Element {
  const activeResidue = hoveredResidue ?? selectedResidue;
  const showResidue = activeResidue !== null;
  const showValue = showResidue && activeResidue.value !== null;

  // Three fixed slots so the grid tracks never move as values and labels swap
  // between the default stats and the per-residue readout. A slot is null when
  // there is nothing to show; its track stays reserved.
  const slots: (StructureStat | null)[] = [
    showResidue
      ? { label: "Residue", value: activeResidue.label }
      : (stats[0] ?? null),
    showValue
      ? {
          label: valueLabel,
          value: (activeResidue.value as number).toFixed(VALUE_PRECISION),
        }
      : (stats[1] ?? null),
    showResidue
      ? {
          label: "pLDDT",
          value:
            activeResidue.plddt !== null
              ? activeResidue.plddt.toFixed(VALUE_PRECISION)
              : MISSING_VALUE,
        }
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
      <ScaleColumn>
        <ColorScaleLegend max={scaleMax} scale={scale} />
        <ScaleCaption>
          {scaleLabel}
          {scaleTooltip !== undefined && (
            <Tooltip arrow placement="bottom" title={scaleTooltip}>
              <TooltipAnchor>
                <Icon sdsIcon="QuestionMarkCircle" sdsSize="xs" />
              </TooltipAnchor>
            </Tooltip>
          )}
        </ScaleCaption>
      </ScaleColumn>
    </LegendOverlay>
  );
}
