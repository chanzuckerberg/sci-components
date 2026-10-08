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
 */

interface DensityProps extends CommonThemeProps {
  density: "comfortable" | "compact";
}

interface PlotProps extends CommonThemeProps {
  interactive: boolean;
  isDragging: boolean;
  selectable: boolean;
}

interface FeatureLabelProps extends CommonThemeProps {
  selected: boolean;
}

interface RowLabelProps extends CommonThemeProps {
  /**
   * Whether to rule off the section above.
   *
   * False for the first section and for the minimap.
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
 */
export const TrackBody = styled("div")`
  position: relative;
  display: flex;
  align-items: stretch;
`;

/**
 * A section's name, on its own line above the rows it labels.
 */
export const TrackRowLabel = styled("div")`
  ${fontBodySemiboldXxxxs}

  position: absolute;
  left: 0;
  right: 0;
  display: flex;
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
      props.selectable
        ? "pointer"
        : props.interactive
          ? props.isDragging
            ? "grabbing"
            : "grab"
          : "default"
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
 */
export const TrackFeatureLabel = styled("div")`
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

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
 */
export const TrackOverlayControl = styled("div")`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  pointer-events: auto;
`;

/**
 * The copy control: an SDS minimal button whose icon takes the accent ramp on
 * interaction.
 *
 * SDS has no variant that does this, which is why there is an override here at
 * all.
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
 * A category's swatch: its color, diagonally striped on the negative strand.
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
 */
export const TrackTooltip = styled("div")`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  /*
   * Its own text's width, up to a cap, rather than shrink-to-fit: an absolute
   * box otherwise narrows as it nears the right edge, so the width the
   * placement measured would change with the placement it chose.
   */
  width: max-content;
  max-width: min(320px, 100%);
  overflow-wrap: anywhere;

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
      transform: translateY(-100%);
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
 */
export const TrackTooltipRange = styled("div")`
  ${fontCodeXs}

  white-space: nowrap;

  ${(props: CommonThemeProps) =>
    `color: ${getSemanticColors(props)?.base?.textSecondary};`}
`;

/**
 * Visually hidden container for the accessible table.
 */
export const VisuallyHidden = styled("div")`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
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
 */
export const TrackProgress = styled("div")`
  position: absolute;
  bottom: 100%;
  margin-bottom: 2px;
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
