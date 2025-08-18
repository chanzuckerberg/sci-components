import { DialogContent } from "@mui/material";
import styled from "@emotion/styled";
import { fontBodyS } from "src/core/styles";

const doNotForwardProps = ["sdsSize"];

export const StyledDialogContent = styled(DialogContent, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}
  padding: 0;
`;
