import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import React from "react";
import { CommonThemeProps, fontHeaderXs, getSpaces } from "src/core/styles";
import Tag from "src/core/Tag";

export interface TagFilterExtraProps extends CommonThemeProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: React.EventHandler<any>;
}

export const StyledTag = styled(Tag)`
  ${(props: TagFilterExtraProps) => {
    const spaces = getSpaces(props);

    return css`
      padding: ${spaces?.xxs}px ${spaces?.s}px;

      &:after {
        display: none;
      }

      .MuiChip-label {
        ${fontHeaderXs(props)}
      }

      .MuiChip-deleteIcon,
      .MuiSvgIcon-root {
        margin-left: ${spaces?.s}px;
      }

      .MuiChip-label,
      svg {
        z-index: auto;
      }
    `;
  }}
`;
