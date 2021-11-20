import styled from "@emotion/styled";
import { getColors, getIconSizes, Props } from "../styles";
import { IconSizes } from "./map";

interface ExtraProps extends Props {
  sdsSize: IconSizes;
}

const doNotForwardProps = ["sdsSize"];
export const StyledIcon = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraProps) => {
    const { sdsSize } = props;
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);

    return `
      display: contents;
      svg {
        height: ${iconSizes?.[sdsSize]?.height}px;
        width: ${iconSizes?.[sdsSize]?.width}px;
        color: ${colors?.primary[400]};

        path {
          fill: ${colors?.primary[400]};
        }

        stroke {
          fill: ${colors?.primary[400]};
        }
      }
    `;
  }}
`;
