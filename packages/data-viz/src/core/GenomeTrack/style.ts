import {
  CommonThemeProps,
  fontBodySemiboldXxs,
  fontBodyXxs,
  fontCodeXs,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import styled from "@emotion/styled";

interface PlotProps extends CommonThemeProps {
  interactive: boolean;
  isDragging: boolean;
  selectable: boolean;
}

export const TrackRoot = styled("div")`
  position: relative;
  width: 100%;
  container-type: inline-size;
`;

/** Header with the organism and the coordinate range. */
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

/** Gene, organism, and the selected feature's name. */
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

/** Holds the canvas and the controls layered over it. */
export const TrackBody = styled("div")`
  position: relative;
  display: flex;
  align-items: stretch;
`;

/** Canvas wrapper. `touch-action: none` makes touch drags pan, not scroll. */
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

/** Holds a control at the right edge of a section's header line. */
export const TrackOverlayControl = styled("div")`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  pointer-events: auto;
`;

/** Visually hidden container for the accessible table. */
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

/** Indeterminate bar above the plot while a re-fetch is in flight. */
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
