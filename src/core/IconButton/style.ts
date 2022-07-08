import { css, SerializedStyles } from "@emotion/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  getColors,
  getIconSizes,
  getSpaces,
} from "../styles";

export interface IconButtonExtraProps extends CommonThemeProps {
  active?: boolean;
  disabled?: boolean;
  sdsSize?: "small" | "medium" | "large";
  sdsType?: "primary" | "secondary" | "tertiary";
}

const isActive = (props: IconButtonExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const colors = getColors(props);

  return css`
    ${sdsType !== "tertiary" &&
    `
      color: ${
        sdsType === "primary" ? colors?.primary[600] : colors?.primary[400]
      };

      &:hover {
        color: ${colors?.primary[600]};
      }
    `}
  `;
};

const isDisabled = (props: IconButtonExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[300]};
  `;
};

const primary = (props: IconButtonExtraProps): SerializedStyles => {
  const colors = getColors(props);
  const { sdsSize } = props;

  return css`
    color: ${colors?.primary[400]};

    &:hover {
      background: ${colors?.gray[200]};
      color: ${sdsSize === "small" ? colors?.gray[600] : colors?.primary[400]};
    }

    &:active {
      color: ${colors?.primary[600]};
    }
  `;
};

const secondary = (props: IconButtonExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      background: none;
      color: ${colors?.primary[400]};
    }
  `;
};

const tertiary = (props: IconButtonExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      background: none;
      color: black;
    }

    &:active {
      color: black;
    }
  `;
};

const small = (props: IconButtonExtraProps): SerializedStyles => {
  const iconSizes = getIconSizes(props);

  return css`
    &:hover {
      background: none;
    }

    .MuiSvgIcon-root {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }
  `;
};

const medium = (props: IconButtonExtraProps): SerializedStyles => {
  const iconSizes = getIconSizes(props);

  return css`
    .MuiSvgIcon-root {
      height: ${iconSizes?.l.height}px;
      width: ${iconSizes?.l.width}px;
    }
  `;
};

const large = (props: IconButtonExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const spacings = getSpaces(props);
  const iconSizes = getIconSizes(props);

  return css`
    padding: ${sdsType === "primary" ? spacings?.xxs : 0}px;

    .MuiSvgIcon-root {
      height: ${iconSizes?.xl.height}px;
      width: ${iconSizes?.xl.height}px;
    }
  `;
};

const doNotForwardProps = ["active", "sdsSize", "sdsType"];

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  padding: 0;

  ${(props: IconButtonExtraProps) => {
    const { active, disabled, sdsSize, sdsType } = props;

    return css`
      ${sdsType === "primary" && primary(props)}
      ${sdsType === "secondary" && secondary(props)}
      ${sdsType === "tertiary" && tertiary(props)}
      ${active && isActive(props)}
      ${disabled && isDisabled(props)}
      ${sdsSize === "small" && small(props)}
      ${sdsSize === "medium" && medium(props)}
      ${sdsSize === "large" && large(props)}
    `;
  }}
`;
