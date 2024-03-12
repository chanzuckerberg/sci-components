import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxs,
  fontCapsXxxxs,
  fontTabularXs,
  getBorders,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

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
  const { disabled } = props;

  const semanticTextColors = getSemanticTextColors(props);

  if (!disabled) return "";

  return `
    color: ${semanticTextColors?.base?.disabled};
  `;
};

interface SectionProps extends CommonThemeProps {
  disabled?: boolean;
  label?: string;
}

export const Section = styled("div")`
  ${disabledStyle}

  ${(props: SectionProps) => {
    const spaces = getSpaces(props);
    const borders = getBorders(props);

    return `
      &:not(:last-child) {
        padding-bottom: ${spaces?.m}px;
        border-bottom: ${borders?.base?.divider};
      }

      &:not(:first-of-type) {
        padding-top: ${spaces?.m}px;
      }
    `;
  }}
`;

export const SectionLabel = styled("div")`
  ${fontCapsXxxxs}
  ${disabledStyle}

  ${(props: SectionProps) => {
    const spaces = getSpaces(props);
    const semanticTextColors = getSemanticTextColors(props);

    if (!props.label) return "";

    return `
      margin-bottom: ${spaces?.s}px;      
      color: ${semanticTextColors?.base?.secondary};
    `;
  }}
`;

export const RowLabel = styled(TableCell, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${fontBodyXs}
  ${disabledStyle}
  ${(props: SectionProps) => {
    const spaces = getSpaces(props);
    return `
      padding: 0 0 ${spaces?.xxs}px 0;
      width: 50%;
      border-bottom: none;
      font-weight: 600;
    `;
  }}
`;

export const RowValue = styled(TableCell, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${fontTabularXs}
  ${disabledStyle}

  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0 !important;
  border-bottom: none;
`;

export const Alert = styled("div")`
  ${fontBodyXxs}
`;
