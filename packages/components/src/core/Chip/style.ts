import { css, SerializedStyles } from "@emotion/react";
import { Chip } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  fontHeaderXs,
  getColors,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface ChipExtraProps extends CommonThemeProps {
  size?: "small" | "medium";
  status?: "success" | "error" | "warning" | "info" | "pending" | "beta";
  isRounded?: boolean;
}

const small = (props: ChipExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);

  return css`
    height: ${spaces?.l}px;
    padding: ${spaces?.xxs}px ${spaces?.xs}px;

    .MuiChip-label {
      ${fontCapsXxxxs(props)}
      padding: 0;
    }
  `;
};

const medium = (props: ChipExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const colors = getColors(props);

  return css`
    margin: 0 ${spaces?.s}px;
    height: 24px;

    background-color: ${colors?.blue[400]};

    &:hover {
      background-color: ${colors?.blue[500]};
    }

    &:active {
      background-color: ${colors?.blue[600]};
    }

    .MuiChip-label {
      ${fontHeaderXs(props)}
      color: white;
      padding-left: ${spaces?.s}px;
    }

    .MuiChip-deleteIcon {
      color: white;
      padding-right: ${spaces?.xxs}px;
      margin: 0 0 0 -${spaces?.s}px;
      height: ${spaces?.l}px;
      width: ${spaces?.l}px;

      &:hover,
      &:focus-visible {
        color: white;
      }
    }
  `;
};

const rounded = (props: ChipExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.rounded}px;
  `;
};

const square = (props: ChipExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.m}px;
  `;
};

const success = (props: ChipExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "success");
};

const error = (props: ChipExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "error");
};

const beta = (props: ChipExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "beta");
};

const pending = (props: ChipExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "pending");
};

const warning = (props: ChipExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "warning");
};

const info = (props: ChipExtraProps): SerializedStyles | undefined => {
  return createStatusCss(props, "info");
};

function createStatusCss(
  props: ChipExtraProps,
  status: NonNullable<ChipExtraProps["status"]>
): SerializedStyles | undefined {
  const colors = getColors(props);
  const semanticColors = getSemanticColors(props);

  if (!colors) return;

  const statusToColors = {
    beta: {
      dark: semanticColors?.beta?.text,
      light: semanticColors?.beta?.surfaceSecondary,
    },
    error: {
      dark: semanticColors?.negative?.text,
      light: semanticColors?.negative?.surfaceSecondary,
    },
    info: {
      dark: semanticColors?.info?.text,
      light: semanticColors?.info?.surfaceSecondary,
    },
    pending: {
      dark: semanticColors?.neutral?.text,
      light: semanticColors?.neutral?.surfaceSecondary,
    },
    success: {
      dark: semanticColors?.positive?.text,
      light: semanticColors?.positive?.surfaceSecondary,
    },
    warning: {
      dark: colors?.yellow[700],
      light: semanticColors?.notice?.surfaceSecondary,
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

  ${(props: ChipExtraProps) => {
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
