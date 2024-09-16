import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import {
  CommonThemeProps,
  fontHeaderXs,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import Tag from "src/core/Tag";

export interface TagFilterExtraProps extends CommonThemeProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: React.EventHandler<any>;
}

export const StyledTag = styled(Tag)`
  ${(props: TagFilterExtraProps) => {
    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);

    return css`
      padding: ${spaces?.xxs}px ${spaces?.s}px;
      background-color: ${semanticColors?.accent?.fillPrimary};

      &:hover,
      &:focus {
        background-color: ${semanticColors?.accent?.fillHover};
      }

      &:active {
        background-color: ${semanticColors?.accent?.fillPressed};
      }

      &:after {
        display: none;
      }

      .MuiChip-label {
        ${fontHeaderXs(props)}
      }

      .MuiChip-deleteIcon {
        margin: 0 0 0 ${spaces?.s}px;
        width: ${iconSizes?.xs?.width}px !important;
        height: ${iconSizes?.xs?.height}px !important;
      }

      .MuiSvgIcon-root {
        margin: 0;
        width: ${iconSizes?.xs?.width}px !important;
        height: ${iconSizes?.xs?.height}px !important;
      }

      .MuiChip-label,
      svg {
        z-index: auto;
      }
    `;
  }}
`;
