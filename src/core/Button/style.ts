import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontCapsXxxs,
  getColors,
  getCorners,
  getSpaces,
} from "../styles";

const sdsPropNames = ["isAllCaps", "isRounded", "sdsStyle", "sdsType"];

const ButtonBase = styled(Button, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  box-shadow: none;
  ${(props) => {
    const { variant } = props;
    const colors = getColors(props);
    const spacings = getSpaces(props);

    const containedPadding = `${spacings?.xs}px ${spacings?.l}px`;

    // (thuang): outline variant has border 1px, so padding needs to be smaller
    const outlinedPadding = `${(spacings?.xs || 0) - 1}px ${
      (spacings?.l || 0) - 1
    }px`;

    const padding = variant === "outlined" ? outlinedPadding : containedPadding;

    return `
      padding: ${padding};
      min-width: 120px;
      height: 34px;
      &:hover, &:focus {
        color: white;
        background-color: ${colors?.primary[500]};
        box-shadow: none;
      }
      &:focus {
        outline: 5px auto Highlight;
        outline: 5px auto -webkit-focus-ring-color;
      }
      &:active {
        color: white;
        background-color: ${colors?.primary[600]};
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

interface IsAllCaps extends CommonThemeProps {
  isAllCaps?: boolean;
}

const MinimalButton = styled(Button, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
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

const minimal = (props: CommonThemeProps) => {
  const colors = getColors(props);
  const spaces = getSpaces(props);

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

    .MuiButton-startIcon {
      margin-right: ${spaces?.xxs}px;
    }
  `;
};

export const PrimaryMinimalButton = styled(MinimalButton)`
  ${minimal}
`;

export const SecondaryMinimalButton = styled(MinimalButton)`
  ${minimal}
  color: #000;
`;

// Legacy support for backwards-compatible props
interface IsRounded extends CommonThemeProps {
  isRounded?: boolean;
}
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  &:focus-visible {
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
