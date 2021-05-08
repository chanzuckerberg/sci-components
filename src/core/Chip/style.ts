import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { Chip, ChipProps } from "@material-ui/core";
import {
  fontCapsXxxxs,
  getColors,
  getCorners,
  getSpacings,
  Props,
} from "../styles";

export interface ExtraProps extends Props, ChipProps {
  status?: "success" | "error" | "warning" | "info" | "pending" | "beta";
}

const small = (props: ExtraProps): SerializedStyles => {
  const spacings = getSpacings(props);

  return css`
    height: ${spacings?.l}px;
    padding: ${spacings?.xxs}px ${spacings?.xs}px;

    .MuiChip-label {
      ${fontCapsXxxxs(props)}
      padding: 0;
    }
  `;
};

const success = (props: ExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "success");
};

const error = (props: ExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "error");
};

const beta = (props: ExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "beta");
};

const pending = (props: ExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "pending");
};

const warning = (props: ExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "warning");
};

const info = (props: ExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "info");
};

function createStatusCss(
  props: ExtraProps,
  status: NonNullable<ExtraProps["status"]>
): SerializedStyles | undefined {
  const colors = getColors(props);

  if (!colors) return;

  const statusToColors = {
    beta: {
      dark: colors.beta[600],
      light: colors.beta[200],
    },
    error: {
      dark: colors.error[600],
      light: colors.error[200],
    },
    info: {
      dark: colors.info[600],
      light: colors.info[200],
    },
    pending: {
      dark: colors.gray[600],
      light: colors.gray[200],
    },
    success: {
      dark: colors.success[600],
      light: colors.success[200],
    },
    warning: {
      dark: colors.warning[600],
      light: colors.warning[200],
    },
  };

  const statusColors = statusToColors[status];

  return css`
    background-color: ${statusColors.light};

    .MuiChip-label {
      color: ${statusColors.dark};
    }
  `;
}

const statusToCss = {
  beta,
  error,
  info,
  pending,
  success,
  warning,
};

export const StyledChip = styled(Chip)`
  color: white;

  ${(props: ExtraProps) => {
    const { size, status } = props;

    const corners = getCorners(props);

    return css`
      border-radius: ${corners?.l}px;

      ${size === "small" && small(props)}
      ${status && statusToCss[status](props)}
    `;
  }}
`;
