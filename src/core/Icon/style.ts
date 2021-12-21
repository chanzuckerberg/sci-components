import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { SvgIcon } from "@material-ui/core";
import { getColors, getIconSizes, Props } from "../styles";
import { IconSizes } from "./map";

interface ExtraProps extends Props {
  active: boolean;
  sdsSize: IconSizes;
  sdsType: "interactive" | "static";
}

const icon = (props: ExtraProps): SerializedStyles => {
  const { sdsSize } = props;
  const iconSizes = getIconSizes(props);

  return css`
    height: ${iconSizes?.[sdsSize]?.height}px;
    width: ${iconSizes?.[sdsSize]?.width}px;
  `;
};

const staticStyle = (props: ExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.primary[400]};
  `;
};

const interactive = (props: ExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      color: ${colors?.gray[600]};
    }

    &:active {
      color: ${colors?.primary[400]};
    }

    &:disabled {
      color: ${colors?.gray[300]};
    }
  `;
};

const doNotForwardProps = ["sdsSize", "sdsType"];

export const StyledSvgIcon = styled(SvgIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraProps) => {
    const { sdsType } = props;

    return css`
      ${icon(props)}
      ${sdsType === "static" && staticStyle(props)}
      ${sdsType === "interactive" && interactive(props)}
    `;
  }}
`;

export const StyledIcon = styled.div`
  display: contents;
`;
