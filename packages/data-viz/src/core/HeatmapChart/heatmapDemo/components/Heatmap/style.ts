import { styled } from "@mui/material";
import { X_AXIS_WIDTH, Y_AXIS_WIDTH } from "../utils";

interface StylesProps {
  camera?: boolean;
}

const doNotForwardProps = ["camera"];

export const StyledContainer = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StylesProps) => {
    const { camera } = props;

    return `
      margin-bottom: ${camera ? 0 : 30}px;
      margin-right: ${camera ? 0 : 20}px;
      padding-top: ${X_AXIS_WIDTH}px;
      position: relative;
    `;
  }}
`;

export const StyledHeatmapWrapper = styled("div")`
  position: relative;
  margin-left: ${Y_AXIS_WIDTH}px;
`;
