import {
  CommonThemeProps,
  fontBodySemiboldXxxxs,
  getSemanticColors,
} from "@czi-sds/components";
import styled from "@emotion/styled";

interface RowLabelProps extends CommonThemeProps {
  /** Whether to draw a divider above the section. */
  withSeparator: boolean;
}

/** A section's name, on its own line above its rows. */
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
