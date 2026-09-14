import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  fontCodeXs,
  fontHeaderM,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import { SEQUENCE_GROUP_SIZE } from "./constants";

/** Height of the fade that masks residues scrolling under the panel header. */
const SCROLL_FADE_HEIGHT = 8;

/**
 * The panel's surfaces accept an override so a consumer can sit the sequence
 * on a color of their own rather than the theme's. Emotion does not forward
 * `backgroundColor` to the DOM, since it is not an HTML attribute.
 */
interface SurfaceProps extends CommonThemeProps {
  backgroundColor?: string;
}

export const SequencePanel = styled("div")<SurfaceProps>`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${(props: SurfaceProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.m}px ${spaces?.m}px 0;
      border-top: 1px solid ${semanticColors?.base?.divider};
      background-color: ${
        props.backgroundColor ?? semanticColors?.base?.surfacePrimary
      };
    `;
  }}
`;

export const EmptyState = styled("div")<SurfaceProps>`
  ${fontBodyXs}

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${(props: SurfaceProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.m}px;
      background-color: ${
        props.backgroundColor ?? semanticColors?.base?.surfaceSecondary
      };
      color: ${semanticColors?.base?.textTertiaryOnDark};
    `;
  }}
`;

export const PanelHeader = styled("div")`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      gap: ${spaces?.xs}px;
    `;
  }}
`;

export const PanelTitle = styled("span")`
  ${fontHeaderM}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const CopyButton = styled("button")`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: default;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.ornamentSecondary};

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
      }
    `;
  }}
`;

export const ResidueCount = styled("div")`
  display: flex;
  align-items: center;
  margin-left: auto;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

export const ResidueCountLabel = styled("span")`
  ${fontBodyXs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textTertiary};
    `;
  }}
`;

export const ResidueCountValue = styled("span")`
  ${fontBodyXs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

/**
 * Scroll region for the residue grid. The `::before` fade masks residues as
 * they scroll up under the header, so it has to start from whatever the panel
 * is painted with or it leaves a mismatched strip.
 */
export const SequenceScroller = styled("div")<SurfaceProps>`
  position: relative;
  flex: 1;
  min-height: 0;

  ${(props: SurfaceProps) => {
    const semanticColors = getSemanticColors(props);
    const surface =
      props.backgroundColor ?? semanticColors?.base?.surfacePrimary;

    return `
      &::before {
        content: "";
        position: absolute;
        inset-inline: 0;
        top: 0;
        z-index: 10;
        height: ${SCROLL_FADE_HEIGHT}px;
        pointer-events: none;
        background: linear-gradient(to bottom, ${surface}, transparent);
      }
    `;
  }}
`;

/**
 * Residue spans are written to directly by `useResidueMarkers` rather than
 * re-rendered, so their hover and selection colors are set inline. Everything
 * here is the static styling underneath that: the monospace type, the pointer
 * affordance, and the superscript sequence numbers (which need their own color
 * rule, since they are nested inside residue spans and would otherwise inherit
 * the inline color).
 */
export const SequenceScrollArea = styled("div")`
  height: 100%;
  overflow-y: auto;

  .msp-sequence-wrapper {
    ${fontCodeXs};
    font-size: 11px;
    line-height: 1.2;
  }

  .msp-sequence-present {
    cursor: pointer;
  }

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      .msp-sequence-number {
        font-size: 8px;
        color: ${semanticColors?.base?.textTertiaryOnDark};
      }
    `;
  }}
`;

/**
 * Layout for one chain's residues.
 *
 * Residues are grouped into fixed-size sections, each one grid cell. The
 * equal-width auto-fill tracks and uniform gap keep the spacing between
 * sections identical on every row - including a partial last row, which keeps
 * the same column width (rather than stretching) and stacks from the leading
 * edge.
 */
export const ResidueGrid = styled("div")`
  user-select: none;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${SEQUENCE_GROUP_SIZE}ch, 1fr)
  );
  gap: 8px;
  justify-items: start;
  padding-top: 6px;

  /* Section wrappers, so a section's letters never split across lines. */
  & > span {
    white-space: nowrap;
  }

  .msp-sequence-present {
    position: relative;
    display: inline-block;
    width: 1ch;
    /*
     * Reserves room above the letter for its superscript sequence number.
     * content-box clipping keeps the active fill off that gutter, so a
     * highlighted residue does not tint the number.
     */
    padding-top: 8px;
    background-clip: content-box;
    text-align: center;
  }

  .msp-sequence-number {
    position: absolute;
    top: 0;
    line-height: 1.2;
    white-space: nowrap;
    pointer-events: none;
  }
`;

/**
 * `isHidden` rather than `hidden`, which the DOM would take as the attribute
 * and remove the caption instead of dimming it.
 */
interface ChainLabelProps extends CommonThemeProps {
  isHidden?: boolean;
  /** Marks the chain the selection currently covers whole. */
  isSelected?: boolean;
}

/**
 * The row above each chain's grid: a visibility toggle and the chain's name.
 *
 * A structure with more than one chain renders one grid per chain, and without
 * a caption between them the grids read as a single continuous protein. The
 * controls sit here rather than only in the legend because this is where a
 * reader is already looking at one chain at a time.
 */
export const ChainHeaderRow = styled("div")`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xxs}px;
      margin-top: ${spaces?.xs}px;
      margin-bottom: ${spaces?.xxxs}px;
    `;
  }}
`;

/**
 * Shows or hides the chain's cartoon in the 3D view. Full strength even while
 * the chain is hidden, since it is the way back.
 */
export const ChainVisibilityToggle = styled("button")`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textTertiaryOnDark};

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
      }

      svg {
        display: block;
      }
    `;
  }}
`;

/**
 * The chain's name, and a button because it also selects the chain: the caption
 * is already the one thing on screen that stands for a whole chain, so clicking
 * it is where a reader looks to select one. Clicking it again clears it.
 */
export const ChainLabel = styled("button")<ChainLabelProps>`
  ${fontBodyXs}

  padding: 0;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;

  ${(props: ChainLabelProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${
        props.isSelected
          ? semanticColors?.base?.textPrimary
          : semanticColors?.base?.textSecondary
      };
      font-weight: ${props.isSelected ? 600 : "inherit"};
      opacity: ${props.isHidden ? 0.4 : 1};

      &:hover {
        color: ${semanticColors?.base?.textPrimary};
      }
    `;
  }}
`;

/**
 * Wraps a chain whose 3D cartoon is hidden. The grid stays in place and stays
 * interactive - the sequence is still the sequence - but is dimmed to match the
 * chain being absent from the structure beside it. Dimmed rather than removed
 * so the panel does not reflow every time a chain is toggled.
 */
export const HiddenChainGroup = styled("div")`
  opacity: 0.4;
`;
