import { styled } from "@mui/material";
import { X_AXIS_WIDTH, Y_AXIS_WIDTH } from "../utils";

const doNotForwardProps = ["camera"];

export const StyledContainer = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  padding-top: ${X_AXIS_WIDTH}px;
  position: relative;
`;

export const StyledHeatmapWrapper = styled("div")`
  position: relative;
  margin-left: ${Y_AXIS_WIDTH}px;
`;
