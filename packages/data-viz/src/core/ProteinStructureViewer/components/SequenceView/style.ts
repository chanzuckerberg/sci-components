import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  fontCodeXs,
  fontHeaderM,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";

/** Height of the fade that masks residues scrolling under the panel header. */
const SCROLL_FADE_HEIGHT = 8;

export const SequencePanel = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.m}px ${spaces?.m}px 0;
      border-top: 1px solid ${semanticColors?.base?.divider};
      background-color: ${semanticColors?.base?.surfacePrimary};
    `;
  }}
`;

export const EmptyState = styled("div")`
  ${fontBodyXs}

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.m}px;
      background-color: ${semanticColors?.base?.surfaceSecondary};
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
 * they scroll up under the header.
 */
export const SequenceScroller = styled("div")`
  position: relative;
  flex: 1;
  min-height: 0;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      &::before {
        content: "";
        position: absolute;
        inset-inline: 0;
        top: 0;
        z-index: 10;
        height: ${SCROLL_FADE_HEIGHT}px;
        pointer-events: none;
        background: linear-gradient(
          to bottom,
          ${semanticColors?.base?.surfacePrimary},
          transparent
        );
      }
    `;
  }}
`;

/**
 * Residue spans are written to directly by `updateMarker` rather than
 * re-rendered, so their hover and selection colors are set inline. Everything
 * here is the static styling underneath that: the monospace grid, the pointer
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
