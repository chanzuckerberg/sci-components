import styled from "@emotion/styled";
import { Button } from "@material-ui/core";
import {
  fontCapsXxxs,
  getColors,
  getCorners,
  getSpaces,
  Props,
} from "../styles";

const sdsPropNames = ["isAllCaps", "isRounded", "sdsStyle", "sdsType"];

const ButtonBase = styled(Button, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  box-shadow: none;
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      padding: ${spacings?.xs}px ${spacings?.l}px;
      padding: 50px;
      min-width: 120px;
      height: 34px;
      &:hover, &:focus {
        color: white;
        background-color: ${colors?.primary[500]};
        border: none;
        box-shadow: none;
      }
      &:focus {
        outline: 5px auto Highlight;
        outline: 5px auto -webkit-focus-ring-color;
      }
      &:active {
        color: white;
        background-color: ${colors?.primary[600]};
        border: none;
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
    return !sdsPropNames.includes(prop.toString());
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
