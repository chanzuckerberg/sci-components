import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontCapsXxxs,
  getColors,
  getCorners,
  getPalette,
  getSpaces,
} from "../styles";
import { focusVisibleA11yStyle } from "../styles/common/mixins/a11y";

const sdsPropNames = ["isAllCaps", "isRounded", "sdsStyle", "sdsType"];

const ButtonBase = styled(Button, {
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
  box-shadow: none;
  ${focusVisibleA11yStyle}
  ${(props) => {
    const { variant } = props;
    const colors = getColors(props);
    const spacings = getSpaces(props);
    const palette = getPalette(props);

    const containedPadding = `${spacings?.xs}px ${spacings?.l}px`;

    // (thuang): outline variant has border 1px, so padding needs to be smaller
    const outlinedPadding = `${(spacings?.xs || 0) - 1}px ${
      (spacings?.l || 0) - 1
    }px`;

    const padding = variant === "outlined" ? outlinedPadding : containedPadding;
    const outlineBorder =
      variant === "outlined" ? `border-color: ${colors?.primary[400]};` : "";

    return `
      ${outlineBorder}
      padding: ${padding};
      min-width: 120px;
      height: 34px;
      &:hover {
        color: white;
        background-color: ${colors?.primary[500]};
        box-shadow: none;
      }
      &:active {
        color: white;
        background-color: ${colors?.primary[600]};
        box-shadow: none;
      }
      &:disabled {
        color: ${palette?.action?.disabled};
        background-color: ${palette?.action?.disabledBackground};
        border-color: ${colors?.gray[300]};
      }
      .MuiButton-startIcon {
        margin-right: ${spacings?.m}px;
      }
      .MuiButton-endIcon {
        margin-left: ${spacings?.m}px;
      }
    `;
  }}
`;

export const RoundedButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
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
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
  ${focusVisibleA11yStyle}

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
  &:hover, &:focus-visible {
    background-color: transparent;
  }
`;

const minimal = (props: CommonThemeProps) => {
  const colors = getColors(props);
  const spaces = getSpaces(props);
  const palette = getPalette(props);

  return `
    &:hover, &:focus-visible {
      color: ${colors?.primary[500]};
    }
    &:active {
      color: ${colors?.primary[600]};
    }
    &:disabled {      
      color: ${palette?.text?.disabled};
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
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
  ${focusVisibleA11yStyle}
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
