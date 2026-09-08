import { ColorScale, toCssGradient } from "../../../../common/colorScales";
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
  /**
   * Value at the bottom of a continuous scale. Coloring normalizes values into
   * `min`-`max` before sampling, so the bar runs from here rather than from
   * zero, and its lower tick has to say so.
   * @default 0
   */
  min?: number;
}

/** Decimal places used for the ticks on a continuous scale. */
const TICK_PRECISION = 2;

/**
 * The color key beneath the structure viewer. A stepped scale renders as
 * discrete bands with a tick at each boundary; a continuous scale renders as a
 * gradient running from `min` to `max`, the range its values are normalized
 * into before they are sampled.
 */
export default function ColorScaleLegend({
  max = null,
  min = 0,
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

  // Both ends are formatted alike, so the bar reads as one axis rather than a
  // bare zero opposite a decimal.
  return (
    <LegendWrapper>
      <LegendLabels>
        <div>{min.toFixed(TICK_PRECISION)}</div>
        <div>{max !== null ? max.toFixed(TICK_PRECISION) : ""}</div>
      </LegendLabels>
      <LegendGradient gradient={toCssGradient(scale.stops)} />
    </LegendWrapper>
  );
}
