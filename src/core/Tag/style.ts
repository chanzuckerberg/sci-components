import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Chip } from "@material-ui/core";
import {
  fontHeaderXs,
  getColors,
  getCorners,
  getSpacings,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  dismissable?: boolean;
  size?: "small" | "large";
  variant?: "square" | "rounded";
}

export const StyledChip = styled(Chip)`
  ${(props: ExtraProps) => {
    const corners = getCorners(props);
    const spacings = getSpacings(props);
    const colors = getColors(props);

    return css`
      margin: 0 ${spacings?.s}px;
      border-radius: ${corners?.m}px;
      background-color: ${colors?.primary[400]};
      height: 24px;

      &:hover {
        background-color: ${colors?.primary[500]};
      }

      &:active {
        background-color: ${colors?.primary[600]};
      }

      .MuiChip-label {
        ${fontHeaderXs(props)}
        color: white;
        padding-left: ${spacings?.s}px;
      }

      .MuiChip-deleteIcon {
        color: white;
        padding-right: ${spacings?.xxs}px;
        margin: 0 0 0 -${spacings?.s}px;
        height: ${spacings?.l}px;
        width: ${spacings?.l}px;
      }
    `;
  }}
`;
