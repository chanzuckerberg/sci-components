import styled from "@emotion/styled";
import { SvgIcon } from "@material-ui/core";
import { getColors, getIconSizes, Props } from "../styles";
import { IconSizes } from "./map";

interface ExtraProps extends Props {
  sdsSize: IconSizes;
}

const doNotForwardProps = ["sdsSize"];

export const StyledSvgIcon = styled(SvgIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraProps) => {
    const { sdsSize } = props;
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);

    return `
      height: ${iconSizes?.[sdsSize]?.height}px;
      width: ${iconSizes?.[sdsSize]?.width}px;

      color: ${colors?.primary[400]};

      &:hover {
        background: ${colors?.gray[300]};
      }

      &:active {
        color: ${colors?.primary[600]};
      }
    `;
  }}
`;

export const StyledIcon = styled.div`
  display: contents;
`;
