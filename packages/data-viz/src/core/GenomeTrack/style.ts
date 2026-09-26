import {
  Button,
  CommonThemeProps,
  fontBodyMediumXxs,
  fontBodySemiboldXxs,
  fontBodySemiboldXxxxs,
  fontBodyXxxs,
  fontBodyXxxxs,
  fontBodyXxs,
  fontCodeXs,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { withAlpha } from "./utils/palette";

/**
 * Layout scaffolding for the track.
 *
 * The plot itself is a canvas, so there is very little to style here: a
 * positioned root, the section names layered above their rows, and the DOM
 * overlay that carries text the canvas should not own. Text lives in the DOM
 * rather than on the canvas wherever it can, because canvas text is invisible
 * to find-in-page, unselectable, and does not scale with a user's font
 * settings.
 */

interface DensityProps extends CommonThemeProps {
  density: "comfortable" | "compact";
}

interface PlotProps extends CommonThemeProps {
  interactive: boolean;
  isDragging: boolean;
}

interface FeatureLabelProps extends CommonThemeProps {
  /** Whether this trace is the selected one. */
  selected: boolean;
}

interface RowLabelProps extends CommonThemeProps {
  /**
   * Whether to rule off the section above.
   *
   * False for the first section, which has nothing above it to be separated
   * from, and for the minimap, which draws on the chromosome rather than the
   * shared axis — a rule would imply it belongs to the same coordinate space
   * as whatever precedes it.
   */
  withSeparator: boolean;
}

export const TrackRoot = styled("div")`
  position: relative;
  width: 100%;
  container-type: inline-size;
`;

/**
 * Header carrying the organism and the exact coordinate range.
 *
 * Always DOM, never canvas: this is the one piece of text a user copies out of
 * the component, and the range it states is the only exact one on screen — the
 * minimap's tick labels are abbreviated and describe the window rather than the
 * visible range.
 */
export const TrackHeader = styled("div")`
  ${fontBodyXxs}

  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      margin-bottom: ${spaces?.xs}px;
    `;
  }}
`;

/**
 * Gene, organism, and the selected feature's name.
 *
 * Truncates rather than wraps. A feature name runs to forty characters, so with
 * one selected this line can outgrow the header — and wrapping would reflow the
 * coordinate readout beside it, which is the one piece of text on screen a user
 * copies out. `min-width: 0` is what lets it shrink at all inside the flex
 * header; without it the ellipsis never engages.
 */
export const TrackHeaderTitle = styled("span")`
  ${fontBodySemiboldXxs}

  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TrackHeaderRange = styled("span")`
  ${fontCodeXs}

  white-space: nowrap;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${semanticColors?.base?.textSecondary};`;
  }}
`;

/**
 * Row that holds the canvas and the controls layered over it.
 *
 * Positioned so that those controls can anchor to it. They
 * cannot live inside the plot: it carries `role="img"`, and an interactive
 * descendant of an image role is invalid — assistive technology may not expose
 * the control at all. The plot's right edge is this element's right edge, since
 * the plot is the last child and grows into it.
 */
export const TrackBody = styled("div")`
  position: relative;
  display: flex;
  align-items: stretch;
`;

/**
 * A section's name, on its own line above the rows it labels.
 *
 * Absolutely positioned against the y offset the layout pass reserved for it,
 * rather than laid out in flow: the rows it names are bands inside one canvas,
 * so there is nothing for a flowed label to sit next to. One source of truth
 * for row position, rather than two that agree until a row height changes.
 *
 * The separator above it is what makes the name read as belonging to what
 * follows rather than to what precedes it. Without a rule the labels float
 * between two sections and attach to the wrong one.
 */
export const TrackRowLabel = styled("div")`
  ${fontBodySemiboldXxxxs}

  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  /* Centred in the band, so the gap to the rule above and to the row below are
     the same. Every section's band is the same height, which is what makes
     that gap identical across sections rather than merely tidy within one. */
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(props: RowLabelProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textTertiary};
      ${
        props.withSeparator
          ? `border-top: 1px solid ${semanticColors?.base?.divider};`
          : ""
      }
    `;
  }}
`;

/**
 * Canvas wrapper.
 *
 * `touch-action: none` is required, not cosmetic: without it a touch drag
 * scrolls the page instead of panning the track, and the pointer events never
 * reach the handler.
 */
export const TrackPlot = styled("div")`
  position: relative;
  flex: 1 1 auto;
  min-width: 0;

  ${(props: PlotProps) => `
    cursor: ${
      props.interactive ? (props.isDragging ? "grabbing" : "grab") : "default"
    };
    touch-action: ${props.interactive ? "none" : "auto"};
  `}

  canvas {
    display: block;
    width: 100%;
  }

  &:focus-visible {
    outline: 2px solid
      ${(props: PlotProps) => getSemanticColors(props)?.accent?.border};
    outline-offset: 2px;
  }
`;

/**
 * A feature's name, sitting above its bars inside the plot area.
 *
 * The one label that does not sit on a section's header line, because there is
 * one per trace and only one header. It is
 * `aria-hidden` and pointer-transparent — the accessible table already names
 * every feature it draws, and a label that swallowed pointer events would
 * punch a hole in the row's hover.
 */
export const TrackFeatureLabel = styled("div")`
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* Semibold and primary when the trace is the selected one, which is what
     marks the row whose activation the minimap is drawing. The rows are
     otherwise identical, so without this nothing on the stack says which was
     clicked — the header names it, but not where it is. */
  ${(props: FeatureLabelProps) =>
    props.selected ? fontBodySemiboldXxxxs(props) : fontBodyXxxxs(props)}

  ${(props: FeatureLabelProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${
      props.selected
        ? semanticColors?.base?.textPrimary
        : semanticColors?.base?.textSecondary
    };`;
  }}
`;

/**
 * Holds an interactive control against the right edge of a section's header
 * line — the sequence row's copy button, the features section's ranking
 * dropdown.
 *
 * One container for both, because the placement argument is identical: the
 * control is interactive, so it cannot live inside the plot's `role="img"`, and
 * it is positioned against `TrackBody` at the y the layout reserved for that
 * section's header line. Both callers pass `style={{ height, top }}`.
 */
export const TrackOverlayControl = styled("div")`
  position: absolute;
  right: 0;
  display: flex;
  /* Centred in the band, like the name beside it, so the two sit on the same
     line and both clear the rule above and the letters below. */
  align-items: center;
  pointer-events: auto;
`;

/**
 * The copy control: an SDS minimal button whose icon takes the accent ramp on
 * interaction.
 *
 * SDS has no variant that does this, which is why there is an override here at
 * all. `secondary` rests on `base.ornamentSecondary` — the grey a minimal
 * button is meant to sit at — but its hover and press go to
 * `base.ornamentPrimary`, grey 900. `primary` has the indigo ramp but wears it
 * at rest too, so the control reads as an accent action when idle.
 *
 * So the rest state is SDS's, untouched, and only the three interaction states
 * are re-pointed — to `accent.foreground*`, which is the same ramp
 * `primary` uses, rather than to a colour chosen here. Everything else stays
 * SDS's: the hover wash, the press wash, the focus ring, the sizing.
 *
 * `&&` doubles the class to out-specify SDS's own `&:hover svg` rather than
 * relying on stylesheet insertion order, which composition does not guarantee.
 */
export const TrackSequenceCopyButton = styled(Button)`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      &&:hover svg {
        color: ${semanticColors?.accent?.foregroundInteraction};
      }

      &&:focus-visible svg {
        color: ${semanticColors?.accent?.foreground};
      }

      &&:active svg {
        color: ${semanticColors?.accent?.foregroundPressed};
      }
    `;
  }}
`;

/**
 * The segment category key, in the band the layout reserved under that row.
 *
 * Absolutely positioned inside the plot, like the row names, which is what puts
 * it directly beneath the colours it explains rather than at the foot of the
 * track. That is only possible because it is *not* interactive: the plot is
 * `role="img"`, which cannot contain a control, and a key that could be hovered
 * or clicked would have to sit outside and lose its place in the stack.
 *
 * `aria-hidden` for the same reason the row names are — the accessible table
 * names every segment and its category, so a reader has the mapping in text.
 */
export const TrackLegend = styled("div")`
  ${fontBodyXxxxs}

  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  pointer-events: none;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      color: ${getSemanticColors(props)?.base?.textSecondary};
      gap: ${spaces?.xxs}px ${spaces?.m}px;
      padding-top: ${spaces?.xs}px;
    `;
  }}
`;

/** One key entry: its swatch and the category's name. */
export const TrackLegendItem = styled("span")`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  ${(props: CommonThemeProps) => `gap: ${getSpaces(props)?.xxs}px;`}
`;

interface SwatchProps extends CommonThemeProps {
  swatchColor: string;
  striped: boolean;
}

/**
 * A category's swatch: its colour, diagonally striped on the negative strand.
 *
 * The stripes mirror what the canvas draws, in CSS rather than a pattern — a
 * `repeating-linear-gradient` at 45° with the same period as the canvas tile,
 * so the key and the blocks read as the same texture. Getting these out of step
 * would make the key wrong about the thing it exists to explain.
 */
export const TrackLegendSwatch = styled("span")`
  width: 10px;
  height: 10px;
  flex: 0 0 auto;

  ${(props: SwatchProps) => {
    const corners = getCorners(props);
    const stripe = "rgba(255, 255, 255, 0.55)";

    return `
      border-radius: ${corners?.s}px;
      background-color: ${props.swatchColor};
      ${
        props.striped
          ? `background-image: repeating-linear-gradient(
               45deg,
               ${stripe} 0 2px,
               transparent 2px 6px
             );`
          : ""
      }
    `;
  }}
`;

/**
 * Tooltip for the hovered block or bin.
 *
 * Positioned by the component rather than by a popper library: the anchor is a
 * point inside a canvas, not an element, so there is nothing for a popper to
 * attach to. Everything else — surface, type scale, radius, shadow, hairline
 * outline — matches the SDS `Tooltip` component, so the two read as the same
 * object even though this one cannot reuse it.
 *
 * **It deliberately does not use the `*Inverse` tokens.** The obvious pairing
 * for a floating dark chip is `surfaceInverse` + `textPrimaryInverse`, and it
 * is correct in light mode and broken in dark: the dark theme resolves
 * `surfaceInverse` to gray 100 (#333333) and `textPrimaryInverse` to gray 50
 * (#000000), which is black on dark grey at roughly 1.5:1. `surfacePrimary` +
 * `textPrimary` is the pair SDS `Tooltip` itself uses and the one that inverts
 * correctly in both modes; the outline and shadow below are what separate the
 * tooltip from a plot drawn on that same surface.
 */
export const TrackTooltip = styled("div")`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  ${(props: CommonThemeProps) => {
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);
    const shadows = getShadows(props);
    const spaces = getSpaces(props);

    return `
      background-color: ${semanticColors?.base?.surfacePrimary};
      color: ${semanticColors?.base?.textPrimary};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      outline: 1px solid ${withAlpha(
        semanticColors?.base?.borderSecondary ?? "#000000",
        0.15
      )};
      padding: ${spaces?.xxs}px ${spaces?.s}px;
      transform: translate(-50%, -100%);
    `;
  }}
`;

/** Headline row: the block's name, or the feature and its binned value. */
export const TrackTooltipTitle = styled("div")`
  ${fontBodyMediumXxs}

  ${(props: CommonThemeProps) =>
    `color: ${getSemanticColors(props)?.base?.textPrimary};`}
`;

/** Supporting row: a product, or a predicted label and its support. */
export const TrackTooltipDetail = styled("div")`
  ${fontBodyXxxs}

  ${(props: CommonThemeProps) =>
    `color: ${getSemanticColors(props)?.base?.textSecondary};`}
`;

/**
 * Coordinate row.
 *
 * Tabular figures, so digits line up between the tooltip and the header rather
 * than jittering as the pointer moves across a trace.
 */
export const TrackTooltipRange = styled("div")`
  ${fontCodeXs}

  ${(props: CommonThemeProps) =>
    `color: ${getSemanticColors(props)?.base?.textSecondary};`}
`;

/**
 * Visually hidden container for the accessible table.
 *
 * Canvas is opaque to assistive tech, so the same rows are rendered as a real
 * table off-screen. Clip rather than `display: none`, which would remove it
 * from the accessibility tree along with the layout.
 */
export const VisuallyHidden = styled("div")`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  /* inset(50%) collapses the box to its centre, replacing the deprecated
     clip: rect(0, 0, 0, 0). No backticks in here: this is a tagged template
     literal, and one would end it. */
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

/** Shared shell for the loading, empty, and error states. */
export const TrackMessage = styled("div")`
  ${fontBodyXxs}

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${(props: DensityProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      /*
       * Primary rather than secondary text, for contrast. Secondary is gray
       * 600, and on this surface — gray 300 at 20%, which composites to about
       * #f3f3f3 — that is 4.09:1, under the 4.5:1 WCAG AA needs at 12px. The
       * story a11y checks fail on it. Tertiary is lighter still, so primary is
       * the only compliant token here; the title above stays distinguishable
       * by its 600 weight rather than by colour.
       */
      color: ${semanticColors?.base?.textPrimary};
      background-color: ${semanticColors?.base?.surfaceSecondary};
      border-radius: 4px;
      padding: ${spaces?.l}px ${spaces?.m}px;
      min-height: ${props.density === "compact" ? 48 : 96}px;
    `;
  }}
`;

export const TrackMessageTitle = styled("div")`
  ${fontBodySemiboldXxs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${semanticColors?.base?.textPrimary};`;
  }}
`;

/**
 * Indeterminate bar across the top of the plot while a re-fetch is in flight.
 *
 * The counterpart to the skeleton, for the case the skeleton is wrong for. A
 * shell that re-fetches a finer stride on zoom does so on every wheel notch, so
 * replacing the plot would make it flicker; this leaves the last good data on
 * screen and says a better version is coming.
 *
 * Indeterminate rather than a percentage because nothing here knows how far
 * along the fetch is, and a bar that invents progress is worse than one that
 * only says "working". It collapses to a static bar under
 * `prefers-reduced-motion`, which still carries the meaning.
 */
export const TrackProgress = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  overflow: hidden;
  pointer-events: none;

  ${(props: CommonThemeProps) => `
    background-color: ${getSemanticColors(props)?.base?.fillSecondary};
  `}

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40%;

    ${(props: CommonThemeProps) => `
      background-color: ${getSemanticColors(props)?.accent?.fillPrimary};
    `}

    @media (prefers-reduced-motion: no-preference) {
      animation: sds-genome-track-slide 1.1s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      width: 100%;
      opacity: 0.6;
    }
  }

  @keyframes sds-genome-track-slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(250%);
    }
  }
`;

/** Skeleton bar used by the loading state, one per requested row. */
export const TrackSkeletonRow = styled("div")`
  border-radius: 4px;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      background-color: ${semanticColors?.base?.fillSecondary};
      margin-bottom: ${spaces?.xs}px;
    `;
  }}

  @media (prefers-reduced-motion: no-preference) {
    animation: sds-genome-track-pulse 1.4s ease-in-out infinite;
  }

  @keyframes sds-genome-track-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
  }
`;
