import styled from "@emotion/styled";
import { Button, ButtonProps } from "@material-ui/core";
import {
  fontCapsXxxs,
  getBorders,
  getColors,
  getCorners,
  getSpaces,
  Props,
} from "../styles";

export interface ExtraProps {
  color?: "primary" | "error";
  isAllCaps?: boolean;
  isRounded?: boolean;
  sdsStyle?: "minimal" | "rounded" | "square";
  sdsType?: "primary" | "secondary";
}

// Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = [
  "isAllCaps",
  "isRounded",
  "sdsStyle",
  "sdsType",
  "color",
];

const ButtonBase = styled(Button, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(String(prop));
  },
})`
  box-shadow: none;
  ${(props: Props & ExtraProps & Omit<ButtonProps, "color">) => {
    const { variant, color: colorProp = "primary" } = props;
    const borders = getBorders(props);
    const colors = getColors(props);
    const spacings = getSpaces(props);

    const containedPadding = `${spacings?.xs}px ${spacings?.l}px`;

    // (thuang): outline variant has border 1px, so padding needs to be smaller
    const outlinedPadding = `${(spacings?.xs || 0) - 1}px ${
      (spacings?.l || 0) - 1
    }px`;

    const padding = variant === "outlined" ? outlinedPadding : containedPadding;

    const border = borders && borders[colorProp];
    const color = colors && colors[colorProp];

    if (!border) {
      throw new Error(`Button border not found: ${colorProp}`);
    }
    if (!color) {
      throw new Error(`Button color not found: ${colorProp}`);
    }

    return `
      background-color: ${color[400]};
      border: ${border[400]};
      color: white;
      padding: ${padding};
      min-width: 120px;
      height: 34px;
      &:hover, &:focus {
        color: white;
        background-color: ${color[600]};
        box-shadow: none;
      }
      &:focus {
        outline: 5px auto Highlight;
        outline: 5px auto -webkit-focus-ring-color;
      }
      &:active {
        color: white;
        background-color: ${color[600]};
        border: ${border[600]};
        box-shadow: none;
      }
      &:disabled {
        color: ${colors?.gray[400]};
        background-color: ${colors?.gray[300]};
        border-color: ${colors?.gray[300]};
      }
    `;
  }}
`;

export const RoundedButton = styled(ButtonBase)`
  ${(props) => {
    const corners = getCorners(props);

    return `
      border-radius: ${corners?.l}px;
    `;
  }}
`;

export const SquareButton = ButtonBase;

interface IsAllCaps extends Props {
  isAllCaps?: boolean;
}

const MinimalButton = styled(Button, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(String(prop));
  },
})`
  ${(props: IsAllCaps) => {
    const spacings = getSpaces(props);

    return `
      padding: ${spacings?.xxs}px 0;
    `;
  }}

  ${(props: IsAllCaps) => {
    if (props?.isAllCaps) {
      return fontCapsXxxs;
    }
    return ``;
  }}
  &:hover, &:focus {
    background-color: transparent;
  }
  &:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

export const PrimaryMinimalButton = styled(MinimalButton)`
  ${(props) => {
    const colors = getColors(props);

    return `
      &:hover, &:focus {
        color: ${colors?.primary[500]};
      }
      &:active {
        color: ${colors?.primary[600]};
      }
      &:disabled {
        color: ${colors?.gray[400]};
      }
    `;
  }}
`;

export const SecondaryMinimalButton = styled(MinimalButton)`
  ${(props) => {
    const colors = getColors(props);

    return `
      &:hover, &:focus {
        color: ${colors?.gray[500]};
      }

      &:active {
        color: ${colors?.gray[600]};
      }
      &:disabled {
        color: ${colors?.gray[300]};
      }
    `;
  }}
`;

// Legacy support for backwards-compatible props
interface IsRounded extends Props {
  isRounded?: boolean;
}
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(String(prop));
  },
})`
  &:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }
  ${(props: IsRounded) => {
    if (!props.isRounded) return ``;

    const corners = getCorners(props);
    const spacings = getSpaces(props);

    return `
      border-radius: ${corners?.l}px;
      padding: ${spacings?.xs}px ${spacings?.l}px;
      min-width: 120px;
      height: 34px;
    `;
  }}
`;
