import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "@czi-sds/components";

/**
 * Pinned to the lower-left of the viewport, clear of the sequence panel below
 * and the axes widget in the corner.
 */
export const ResetCameraSlot = styled("div")`
  position: absolute;
  bottom: 48px;
  z-index: 10;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      left: ${spaces?.m}px;
    `;
  }}
`;
