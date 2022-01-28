import styled from "@emotion/styled";
import { Paper, PaperProps } from "@material-ui/core";
import { getCorners, getSpaces, Props } from "src/core/styles";
import { BoxShadows } from "../styles/common/constants/boxShadows";

export interface StyledPaperProps extends Props, PaperProps {
  sdsSize: "xs" | "s" | "m" | "l";
}

// (thuang): Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = ["sdsSize"];

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<StyledPaperProps>`
  box-shadow: ${BoxShadows.L};

  ${paperDimensions}

  ${(props) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return `
      max-height: calc(100vh - ${2 * (spaces?.xxl || 0)}px);
      border-radius: ${corners?.m || 0}px;
      padding: ${spaces?.xxl || 0}px;
    `;
  }}
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
  `;
}
