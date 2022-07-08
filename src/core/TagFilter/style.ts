import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import React from "react";
import { CommonThemeProps, fontHeaderXs, getSpaces } from "../styles";
import Tag from "../Tag";

export interface TagFilterExtraProps extends CommonThemeProps {
  label: string;
  onDelete: React.EventHandler<any>;
}

export const StyledTag = styled(Tag)`
  ${(props: TagFilterExtraProps) => {
    const spacings = getSpaces(props);

    return css`
      padding: ${spacings?.xxs}px ${spacings?.s}px;

      &:after {
        display: none;
      }

      .MuiChip-label {
        ${fontHeaderXs(props)}
      }

      .MuiChip-deleteIcon,
      .MuiSvgIcon-root {
        margin-left: ${spacings?.s}px;
      }

      .MuiChip-label,
      svg {
        z-index: auto;
      }
    `;
  }}
`;
