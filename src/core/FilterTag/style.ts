import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CommonThemeProps, fontHeaderXs, getSpaces } from "../styles";
import Tag from "../Tag";

export interface FilterTagExtraProps extends CommonThemeProps {
  label: string;
  onDelete: React.EventHandler<any>;
}

export const StyledTag = styled(Tag)`
  ${(props: FilterTagExtraProps) => {
    const spacings = getSpaces(props);

    return css`
      padding: ${spacings?.xxs}px ${spacings?.s}px;

      &:after {
        display: none;
      }

      .MuiChip-label {
        ${fontHeaderXs(props)}
      }

      .MuiChip-label,
      svg {
        z-index: auto;
      }
    `;
  }}
`;
