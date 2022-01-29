import styled from "@emotion/styled";
import { alpha, Button, ButtonProps } from "@material-ui/core";
import {
  fontCapsXxxs,
  getColors,
  getCorners,
  getSpaces,
  Props,
} from "../styles";

export interface ExtraProps {
  isAllCaps?: boolean;
  isRounded?: boolean;
  sdsStyle?: "minimal" | "rounded" | "square";
  sdsType?: "primary" | "secondary";
  /**
   * TODO(thuang): Remove custom `color` prop when we upgrade to MUIv5.
   * Currently we're extending MUIv4 Button's `color` props from "primary" and
   * "secondary" to the following ones.
   */
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
}

type V5ButtonProps = Props & ExtraProps & Omit<ButtonProps, "color">;

// Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = [
  "isAllCaps",
  "isRounded",
  "sdsStyle",
  "sdsType",
  /**
   * TODO(thuang): Exception. This is a native MUI prop.
   */
  // "color",
];

const ButtonBase = styled(Button, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(String(prop));
  },
})`
  box-shadow: none;

  ${v5ColorSupport}

  ${(props: V5ButtonProps) => {
    const { variant, color: colorProp = "primary" } = props;
    const colors = getColors(props);
    const spacings = getSpaces(props);

    const containedPadding = `${spacings?.xs}px ${spacings?.l}px`;

    // (thuang): outline variant has border 1px, so padding needs to be smaller
    const outlinedPadding = `${(spacings?.xs || 0) - 1}px ${
      (spacings?.l || 0) - 1
    }px`;

    const padding = variant === "outlined" ? outlinedPadding : containedPadding;

    const color = colors && colors[colorProp];

    return `
      padding: ${padding};
      min-width: 120px;
      height: 34px;
      &:focus {
        outline: 5px auto Highlight;
        outline: 5px auto -webkit-focus-ring-color;
      }
      &:active {
        color: white;
        background-color: ${color?.[600]};
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

interface IsAllCaps extends V5ButtonProps {
  isAllCaps?: boolean;
}

export const MinimalButton = styled(Button, {
  shouldForwardProp: (prop) => {
    return !doNotForwardProps.includes(String(prop));
  },
})`
  ${v5ColorSupport}

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

// Legacy support for backwards-compatible props
interface IsRounded extends V5ButtonProps {
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

function v5ColorSupport(props: V5ButtonProps) {
  const colors = getColors(props);
  const {
    variant = "contained",
    color: colorProp = "primary",
    sdsType,
  } = props;

  const color = colors?.[colorProp];

  const result = {
    contained: `
      color: white;
      background-color: ${color?.[400]};
      &:hover, &:focus {
        color: white;
        background-color: ${color?.[500]};
        box-shadow: none;
      }
    `,
    outlined: `
      color: ${color?.[400]};
      border: 1px solid ${alpha(color?.[400] || "#000", 0.5)};
      &:hover, &:focus {
        color: white;
        border: 1px solid ${color?.[500]};
        background-color: ${color?.[500]};
      }
    `,
    text: `
      color: ${sdsType === "primary" ? color?.[400] : "black"};
      &:hover, &:focus {
        color: ${sdsType === "primary" ? color?.[500] : "black"};
      }
      &:active {
        color: ${sdsType === "primary" ? color?.[600] : "black"};
      }
    `,
  };

  return result[variant];
}
