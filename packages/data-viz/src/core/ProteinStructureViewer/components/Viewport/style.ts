import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "@czi-sds/components";

/**
 * Pinned to the lower-left of the viewport, clear of the sequence panel below
 * and the axes widget in the corner.
 *
 * Anchored by its bottom edge, so the buttons stack upwards: the last one
 * stays put where a reader last saw it, and an earlier one appearing or going
 * does not move the rest. Reset comes first in the markup and so sits above
 * capture.
 */
export const ViewportButtonStack = styled("div")`
  position: absolute;
  bottom: 48px;
  z-index: 10;
  display: flex;
  flex-direction: column;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    return `
      left: ${spaces?.m}px;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;
