import {
  CommonThemeProps,
  fontBodyMediumXxs,
  fontBodyXxxs,
  fontCodeXs,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { withAlpha } from "../../utils/palette";

/** Tooltip for the hovered block or bin. */
export const TrackTooltip = styled("div")`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  /* Fixed to its content width so it doesn't shrink near the right edge. */
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

/** Coordinate row. */
export const TrackTooltipRange = styled("div")`
  ${fontCodeXs}

  white-space: nowrap;

  ${(props: CommonThemeProps) =>
    `color: ${getSemanticColors(props)?.base?.textSecondary};`}
`;
