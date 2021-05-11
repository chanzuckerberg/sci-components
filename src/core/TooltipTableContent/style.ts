import styled from "@emotion/styled";
import { TableCell } from "@material-ui/core";
import {
  fontBodyXs,
  fontBodyXxs,
  fontCapsXxxxs,
  fontHeaderXs,
  getColors,
  getSpacings,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  data?: Array<{
    label: string;
    dataRows: {
      label: string;
      value: string | number;
    }[];
    disabled?: boolean;
  }>;
  alert?: string | Element;
}

export const disabledStyle = (props: SectionProps): string => {
  const colors = getColors(props);
  const { disabled } = props;

  if (!disabled) return "";

  return `
    color: ${colors?.gray["300"]};
  `;
};

interface SectionProps extends Props {
  disabled?: boolean;
}

export const Section = styled.div`
  ${disabledStyle}

  ${(props: SectionProps) => {
    const colors = getColors(props);
    const spacings = getSpacings(props);

    return `
      &:not(:last-child) {
        padding-bottom: ${spacings?.l}px;
        border-bottom: 1px solid ${colors?.gray["200"]};
      }

      &:not(:first-child) {
        padding-top: ${spacings?.l}px;
      }
    `;
  }}
`;

export const SectionLabel = styled.div`
  ${fontCapsXxxxs}
  ${disabledStyle}

  ${(props: SectionProps) => {
    const colors = getColors(props);
    const spacings = getSpacings(props);

    return `
      margin-bottom: ${spacings?.m}px;
      color: ${colors?.gray["500"]};
    `;
  }}
`;

export const RowLabel = styled(TableCell)`
  ${fontHeaderXs}
  ${disabledStyle}

  padding: 0;
  width: 50%;
`;

export const RowValue = styled(TableCell)`
  ${fontBodyXs}
  ${disabledStyle}

  padding-top: 0;
  padding-bottom: 0;
`;

export const Alert = styled.div`
  ${fontBodyXxs}
`;
