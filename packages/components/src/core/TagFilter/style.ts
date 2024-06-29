import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import React from "react";
import {
  CommonThemeProps,
  fontHeaderXs,
  getIconSizes,
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

    return css`
      padding: ${spaces?.xxs}px ${spaces?.s}px;

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
