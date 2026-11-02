import {
  CommonThemeProps,
  fontBodySemiboldXxxxs,
  fontBodyXxxxs,
  getSemanticColors,
} from "@czi-sds/components";
import styled from "@emotion/styled";

interface FeatureLabelProps extends CommonThemeProps {
  selected: boolean;
}

/** A feature's name, above its bars inside the plot. */
export const TrackFeatureLabel = styled("div")`
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(props: FeatureLabelProps) =>
    props.selected ? fontBodySemiboldXxxxs(props) : fontBodyXxxxs(props)}

  ${(props: FeatureLabelProps) => {
    const semanticColors = getSemanticColors(props);

    return `color: ${
      props.selected
        ? semanticColors?.base?.textPrimary
        : semanticColors?.base?.textSecondary
    };`;
  }}
`;
