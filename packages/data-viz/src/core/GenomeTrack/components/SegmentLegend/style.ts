import {
  CommonThemeProps,
  fontBodyXxxxs,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "@czi-sds/components";
import styled from "@emotion/styled";

/** The segment category legend, under the segments row. */
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

/** A category's swatch, striped for the negative strand. */
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
