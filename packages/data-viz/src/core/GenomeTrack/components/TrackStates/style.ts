import {
  CommonThemeProps,
  fontBodySemiboldXxs,
  fontBodyXxs,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import styled from "@emotion/styled";

interface DensityProps extends CommonThemeProps {
  density: "comfortable" | "compact";
}

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
