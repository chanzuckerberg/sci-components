import { styled } from "@mui/material/styles";
import { CommonThemeProps, fontHeaderS, getColors } from "../styles";

export interface RowExtraProps extends CommonThemeProps {
  rowHeight?: number;
  useDivider?: boolean;
  selected?: boolean;
  disabled?: boolean;
  hover?: boolean;
}

const doNotForwardProps = [
  "rowHeight",
  "useDivider",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "tooltipSubtitle",
  "tooltipText",
];

const disabledStyled = (props: RowExtraProps) => {
  const colors = getColors(props);

  return `
    background-color: ${colors?.gray[100]};
    color: ${colors?.gray[300]};
  `;
};

const hoverStyled = (props: RowExtraProps) => {
  const colors = getColors(props);

  return `
    &:hover {
      background-color: ${colors?.gray[200]};
    }
  `;
};

export const StyledTableRow = styled("tr", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}

  ${(props: RowExtraProps) => {
    const {
      rowHeight,
      useDivider = true,
      selected = false,
      disabled = false,
      hover = true,
    } = props;

    const colors = getColors(props);

    return `
      display: flex;
      align-items: center;
      border-bottom: ${useDivider ? `solid 1px ${colors?.gray[300]}` : "none"};

      ${rowHeight ? `max-height: ${rowHeight}px;` : ""}

      ${selected ? `background-color: ${colors?.primary[200]};` : ""}

      ${hover && hoverStyled(props)};

      ${disabled && disabledStyled(props)}
    `;
  }}
`;
