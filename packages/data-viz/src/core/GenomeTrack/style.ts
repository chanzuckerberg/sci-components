import {
  CommonThemeProps,
  fontBodyMediumXxs,
  fontBodyXxxs,
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
 * positioned root, a gutter for row labels, and the DOM overlay that carries
 * text the canvas should not own. Text lives in the DOM rather than on the
 * canvas wherever it can, because canvas text is invisible to find-in-page,
 * unselectable, and does not scale with a user's font settings.
 */

interface DensityProps extends CommonThemeProps {
  density: "comfortable" | "compact";
}

interface GutterProps extends DensityProps {
  labelWidth: number;
}

interface PlotProps extends CommonThemeProps {
  interactive: boolean;
  isDragging: boolean;
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
 * the component, and the range it states is the authoritative one — the ruler's
 * tick labels are abbreviated and cannot be.
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

export const TrackHeaderTitle = styled("span")`
  font-weight: 600;
`;

export const TrackHeaderRange = styled("span")`
  ${fontCodeXs}

  white-space: nowrap;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${semanticColors?.base?.textSecondary};`;
  }}
`;

/** Row that holds the label gutter beside the canvas. */
export const TrackBody = styled("div")`
  display: flex;
  align-items: stretch;
`;

/**
 * Row labels down the left edge.
 *
 * Absolutely positioned inside a fixed-width column rather than laid out as a
 * flex column, so the labels line up with canvas rows whose y offsets the
 * layout pass computed — one source of truth for row position, rather than two
 * that agree until a row height changes.
 */
export const TrackGutter = styled("div")`
  position: relative;
  flex: 0 0 auto;

  ${(props: GutterProps) => `width: ${props.labelWidth}px;`}
`;

export const TrackGutterLabel = styled("div")`
  ${fontBodyXxxs}

  position: absolute;
  left: 0;
  right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${semanticColors?.base?.textTertiary};`;
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
  clip: rect(0, 0, 0, 0);
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
      color: ${semanticColors?.base?.textSecondary};
      background-color: ${semanticColors?.base?.surfaceSecondary};
      border-radius: 4px;
      padding: ${spaces?.l}px ${spaces?.m}px;
      min-height: ${props.density === "compact" ? 48 : 96}px;
    `;
  }}
`;

export const TrackMessageTitle = styled("div")`
  ${fontBodyXxs}

  font-weight: 600;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${semanticColors?.base?.textPrimary};`;
  }}
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
