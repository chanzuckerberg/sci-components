import { ColorScale } from "../../MolecularStructureViewer.types";
import { toCssGradient } from "../../utils/colorScales";
import {
  LegendBand,
  LegendBar,
  LegendGradient,
  LegendLabels,
  LegendWrapper,
  SteppedLabels,
} from "./style";

export interface ColorScaleLegendProps {
  scale: ColorScale;
  /**
   * Value at the top of a continuous scale, rendered as its upper tick. Ignored
   * by stepped scales, which carry their own tick labels.
   */
  max?: number | null;
}

/** Decimal places used for the upper tick on a continuous scale. */
const MAX_LABEL_PRECISION = 2;

/**
 * The color key beneath the structure viewer. A stepped scale renders as
 * discrete bands with a tick at each boundary; a continuous scale renders as a
 * gradient running from zero to `max`.
 */
export default function ColorScaleLegend({
  max = null,
  scale,
}: ColorScaleLegendProps): JSX.Element {
  if (scale.kind === "stepped") {
    // Ticks sit on the boundaries between bands, so the topmost threshold has
    // no tick of its own - it is the end of the bar.
    const boundaries = scale.stops.slice(0, -1);

    return (
      <LegendWrapper>
        <SteppedLabels>
          {boundaries.map((stop) => (
            <div key={stop.label}>{stop.label}</div>
          ))}
        </SteppedLabels>
        <LegendBar>
          {scale.stops.map((stop) => (
            <LegendBand color={stop.color} key={stop.label} />
          ))}
        </LegendBar>
      </LegendWrapper>
    );
  }

  return (
    <LegendWrapper>
      <LegendLabels>
        <div>0</div>
        <div>{max !== null ? max.toFixed(MAX_LABEL_PRECISION) : ""}</div>
      </LegendLabels>
      <LegendGradient gradient={toCssGradient(scale.stops)} />
    </LegendWrapper>
  );
}
