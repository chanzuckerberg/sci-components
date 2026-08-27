import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXxxs,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";

/**
 * Name of the size container declared by the viewer root. The legend flips from
 * a bottom bar to a right-edge stack when the viewer gets narrow.
 */
export const LEGEND_CONTAINER_NAME = "sds-structure-viewer";

/** Width below which the legend switches to its stacked layout. */
const NARROW_BREAKPOINT = 480;

/** Fixed stat column width, so labels swapping on hover never shift the grid. */
const STAT_COLUMN_WIDTH = "4.5rem";

/** Viewport width above which the sequence panel grows, pushing the legend up. */
const WIDE_VIEWPORT = 880;

/**
 * Legend offsets track the sequence panel height (see the root style) so the
 * legend sits just above it. With no sequence panel it drops to the bottom
 * edge, where its own padding provides the gap.
 */
const LEGEND_BOTTOM = "max(104px, 30%)";
const LEGEND_BOTTOM_WIDE = "max(134px, 32%)";

interface LegendOverlayProps extends CommonThemeProps {
  showSequenceViewer: boolean;
}

/**
 * Overlaid along the bottom of the viewer, above the sequence panel. Pointer
 * events are off so the legend never intercepts drags meant for the structure;
 * the help tooltip re-enables them on itself.
 */
export const LegendOverlay = styled("div")<LegendOverlayProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
  pointer-events: none;

  ${(props: LegendOverlayProps) => {
    const spaces = getSpaces(props);
    const { showSequenceViewer } = props;

    return `
      right: ${spaces?.m}px;
      gap: ${spaces?.xs}px;
      padding-bottom: ${spaces?.m}px;
      bottom: ${showSequenceViewer ? LEGEND_BOTTOM : "0"};

      /* Track the sequence panel as it grows on wider viewports. */
      @media (min-width: ${WIDE_VIEWPORT}px) {
        bottom: ${showSequenceViewer ? LEGEND_BOTTOM_WIDE : "0"};
      }

      /* Spacer balancing the axes widget pinned in the opposite corner. */
      &::before {
        content: "";
        display: block;
        width: ${spaces?.xxl}px;
      }

      @container ${LEGEND_CONTAINER_NAME} (max-width: ${NARROW_BREAKPOINT}px) {
        width: auto;
        flex-direction: column;
        align-items: flex-end;
        gap: ${spaces?.l}px;

        /* The horizontal spacer only makes sense in the bottom-bar layout. */
        &::before {
          display: none;
        }
      }
    `;
  }}
`;

/**
 * Fills the space between the axes widget on the left and the color legend on
 * the right. Three fixed-width columns distributed with space-evenly, so the
 * side padding equals the inter-column gap and both flex with the viewer width.
 */
export const StatsGrid = styled("div")`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(3, ${STAT_COLUMN_WIDTH});
  align-items: end;
  justify-content: space-evenly;
  white-space: nowrap;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      @container ${LEGEND_CONTAINER_NAME} (max-width: ${NARROW_BREAKPOINT}px) {
        flex: none;
        grid-template-columns: minmax(0, 1fr);
        justify-items: end;
        text-align: right;
        row-gap: ${spaces?.l}px;
      }
    `;
  }}
`;

export const StatColumnWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled("span")`
  ${fontBodyXxxs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const StatLabel = styled("span")`
  ${fontBodyXxxs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textTertiaryOnDark};
    `;
  }}
`;

export const ScaleColumn = styled("div")`
  display: flex;
  flex-direction: column;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

export const ScaleCaption = styled("span")`
  ${fontBodyXxxs}

  text-align: left;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textTertiaryOnDark};
    `;
  }}
`;

/** Re-enables pointer events for the one interactive element in the overlay. */
export const TooltipAnchor = styled("span")`
  pointer-events: auto;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding-left: ${spaces?.xxs}px;
      color: ${semanticColors?.base?.ornamentSecondary};
    `;
  }}
`;
