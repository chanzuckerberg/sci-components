import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxs,
  fontCapsXxxxs,
  fontHeaderXs,
  getColors,
  getSpaces,
} from "../styles";

export interface TooltipTableExtraProps extends CommonThemeProps {
  data?: Array<{
    label?: string;
    dataRows: {
      label: string;
      value: string | number;
    }[];
    disabled?: boolean;
  }>;
  contentAlert?: string | JSX.Element;
  itemAlign?: "left" | "right";
}

const sdsPropNames = ["contentAlert", "itemAlign"];

export const disabledStyle = (props: SectionProps): string => {
  const colors = getColors(props);
  const { disabled } = props;

  if (!disabled) return "";

  return `
    color: ${colors?.gray["300"]};
  `;
};

interface SectionProps extends CommonThemeProps {
  disabled?: boolean;
  label?: string;
}

export const Section = styled("div")`
  ${disabledStyle}

  ${(props: SectionProps) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      &:not(:last-child) {
        padding-bottom: ${spacings?.l}px;
        border-bottom: 1px solid ${colors?.gray["200"]};
      }

      &:not(:first-of-type) {
        padding-top: ${spacings?.l}px;
      }
    `;
  }}
`;

export const SectionLabel = styled("div")`
  ${fontCapsXxxxs}
  ${disabledStyle}

  ${(props: SectionProps) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    if (!props.label) return "";

    return `
      margin-bottom: ${spacings?.m}px;
      color: ${colors?.gray["500"]};
    `;
  }}
`;

export const RowLabel = styled(TableCell, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${fontHeaderXs}
  ${disabledStyle}
  ${(props: SectionProps) => {
    const spacings = getSpaces(props);
    return `
      padding: 0 0 ${spacings?.xxs}px 0;
      width: 50%;
      border-bottom: none;
    `;
  }}
`;

export const RowValue = styled(TableCell, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${fontBodyXs}
  ${disabledStyle}

  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0 !important;
  border-bottom: none;
`;

export const Alert = styled("div")`
  ${fontBodyXxs}
`;
