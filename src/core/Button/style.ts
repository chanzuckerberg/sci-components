import styled from "@emotion/styled";
import { Button } from "@material-ui/core";
import { getColors, getCorners, getSpacings, Props } from "../styles";

const ButtonBase = styled(Button)`
  box-shadow: none;
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpacings(props);

    return `
      padding: ${spacings?.xs}px ${spacings?.l}px;
      min-width: 120px;
      height: 34px;
      &:hover {
        color: white;
        background-color: ${colors?.primary[500]};
        border: none;
        box-shadow: none;
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

export const SquareButton = styled(ButtonBase)``;

const MinimalButton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
  ${(props) => {
    const spacings = getSpacings(props);

    return `
      padding-top: ${spacings?.xxs}
      padding-bottom: ${spacings?.xxs}
    `;
  }}
`;

export const PrimaryMinimalButton = styled(MinimalButton)`
  ${(props) => {
    const colors = getColors(props);

    return `
      &:hover {
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
      &:hover {
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
export interface IsRounded extends Props {
  isRounded?: boolean;
}
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isRounded",
})`
  ${(props: IsRounded) => {
    if (!props.isRounded) return ``;

    const corners = getCorners(props);
    const spacings = getSpacings(props);

    return `
      border-radius: ${corners?.l}px;
      padding: ${spacings?.xs}px ${spacings?.l}px;
      min-width: 120px;
      height: 34px;
    `;
  }}
`;
