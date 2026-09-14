import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXxxs,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";

/** Opacity applied to a hidden chain's row, so it reads as off but reachable. */
const HIDDEN_OPACITY = 0.4;

/** Side of the color swatch. */
const SWATCH_SIZE = 8;

/**
 * `isHidden` rather than `hidden`: Emotion forwards any prop the DOM accepts,
 * and `hidden` is one - it would take the row out of the document rather than
 * dim it, which is the opposite of showing that a chain can be brought back.
 */
interface HiddenProps extends CommonThemeProps {
  isHidden: boolean;
}

interface ChainLabelProps extends HiddenProps {
  /** Marks the chain the selection currently covers whole. */
  isSelected?: boolean;
}

/**
 * The rows, stacked and right-aligned against the color key beside them.
 *
 * Pointer events are switched back on here: the legend overlay turns them off
 * so drags meant for the structure are not intercepted, and this is one of the
 * two places in it that has to be clickable.
 */
export const ChainRowList = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: auto;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

export const ChainRow = styled("div")`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

interface SwatchProps extends HiddenProps {
  /** Not `color`, which the DOM would take as the deprecated attribute. */
  swatchColor: string;
}

export const ChainSwatch = styled("div")<SwatchProps>`
  flex: none;
  width: ${SWATCH_SIZE}px;
  height: ${SWATCH_SIZE}px;
  border-radius: 1px;

  ${(props: SwatchProps) => `
    background-color: ${props.swatchColor};
    opacity: ${props.isHidden ? HIDDEN_OPACITY : 1};
  `}
`;

/**
 * Selects the whole chain, or clears it when it is already the selection. A
 * button so it is reachable from the keyboard.
 */
export const ChainLabel = styled("button")<ChainLabelProps>`
  ${fontBodyXxxs}

  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  ${(props: ChainLabelProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      font-weight: ${props.isSelected ? 600 : "inherit"};
      opacity: ${props.isHidden ? HIDDEN_OPACITY : 1};

      &:hover {
        font-weight: 600;
      }
    `;
  }}
`;

export const VisibilityToggle = styled("button")`
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
