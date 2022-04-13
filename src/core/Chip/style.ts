import { css, SerializedStyles } from "@emotion/react";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  fontHeaderXs,
  getColors,
  getCorners,
  getSpaces,
} from "../styles";

export interface ExtraProps extends CommonThemeProps {
  size?: "small" | "medium";
  status?: "success" | "error" | "warning" | "info" | "pending" | "beta";
  isRounded?: boolean;
}

const small = (props: ExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);

  return css`
    height: ${spacings?.l}px;
    padding: ${spacings?.xxs}px ${spacings?.xs}px;

    .MuiChip-label {
      ${fontCapsXxxxs(props)}
      padding: 0;
    }
  `;
};

const medium = (props: ExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);
  const colors = getColors(props);

  return css`
    margin: 0 ${spacings?.s}px;
    height: 24px;

    background-color: ${colors?.primary[400]};

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

      &:hover,
      &:focus-visible {
        color: white;
      }
    }
  `;
};

const rounded = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.l}px;
  `;
};

const square = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.m}px;
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

const doNotForwardProps = ["isRounded"];

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  border: none;

  ${(props: ExtraProps) => {
    const { size, status, isRounded } = props;

    return css`
      ${isRounded && rounded(props)}
      ${!isRounded && square(props)}
      ${size === "small" && small(props)}
      ${size === "medium" && medium(props)}
      ${status && statusToCss[status](props)}
    `;
  }}
`;
