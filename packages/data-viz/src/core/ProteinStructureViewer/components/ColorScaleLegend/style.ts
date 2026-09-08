import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXxxs,
  getSemanticColors,
} from "@czi-sds/components";

/** Legend bars are a fixed width so the stats grid beside them never reflows. */
export const LEGEND_WIDTH = 142;

/** Height of the color bar itself. */
const BAR_HEIGHT = 8;

/**
 * Inset applied to the outer tick labels on a stepped scale. Labels sit on the
 * boundaries *between* bands, so the row is padded by half a band to line each
 * label up with its boundary rather than with a band's center.
 */
const STEPPED_LABEL_INSET = 5;

export const LegendWrapper = styled("div")`
  width: ${LEGEND_WIDTH}px;
`;

export const LegendLabels = styled("div")`
  ${fontBodyXxxs}

  display: flex;
  justify-content: space-between;
  width: 100%;

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    return `
      color: ${semanticColors?.base?.textTertiaryOnDark};
    `;
  }}
`;

export const SteppedLabels = styled(LegendLabels)`
  &::before,
  &::after {
    content: "";
    width: ${STEPPED_LABEL_INSET}px;
  }
`;

export const LegendBar = styled("div")`
  display: flex;
  height: ${BAR_HEIGHT}px;
  width: 100%;
`;

export const LegendBand = styled("div")<{ color: string }>`
  flex: 1;
  background-color: ${(props) => props.color};
`;

export const LegendGradient = styled("div")<{ gradient: string }>`
  height: ${BAR_HEIGHT}px;
  width: 100%;
  background: ${(props) => props.gradient};
`;
