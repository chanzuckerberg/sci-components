import { Paper, PaperProps } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";
import { addOpacityToHex } from "src/core/styles/common/utils/opacity";
import { DialogTitleExtraProps } from "../DialogTitle/style";

export interface StyledPaperProps extends CommonThemeProps, PaperProps {
  sdsSize: DialogTitleExtraProps["sdsSize"];
}

// (thuang): Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = ["sdsSize"];

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<StyledPaperProps>`
  & {
    ${paperDimensions}

    ${(props) => {
      const { sdsSize } = props;

      const spaces = getSpaces(props);
      const corners = getCorners(props);
      const shadows = getShadows(props);
      const semanticColors = getSemanticColors(props);

      const isSmall = sdsSize === "xs" || sdsSize === "s";

      return `
        background-color: ${semanticColors?.base?.surface};
        background-image: none;
        box-shadow: ${shadows?.l};
        max-height: calc(100vh - ${2 * (spaces?.xxl || 0)}px);
        border-radius: ${corners?.xl}px;
        padding: ${isSmall ? spaces?.xl : spaces?.xxl}px;
        outline: 1px solid ${addOpacityToHex(semanticColors?.base?.borderSecondary || "#000000", 15)};
      `;
    }}
  }
`;

function paperDimensions(props: StyledPaperProps) {
  const { sdsSize } = props;

  const sizeToDimensions = {
    l: {
      minHeight: "600px",
      width: "1200px",
    },
    m: {
      minHeight: "480px",
      width: "900px",
    },
    s: {
      minHeight: "400px",
      width: "600px",
    },
    xs: {
      minHeight: "160px",
      width: "400px",
    },
  };

  const { width, minHeight } = sizeToDimensions[sdsSize];

  return `
    width: ${width};
    min-height: ${minHeight};
    max-width: revert;
    box-sizing: border-box;
  `;
}
