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
export const ViewportButtonStack = styled("div")<
  CommonThemeProps & { showAxes: boolean }
>`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;

  ${(props: CommonThemeProps & { showAxes: boolean }) => {
    const { showAxes, ...rest } = props;
    const spaces = getSpaces(rest);
    return `
      bottom: ${showAxes ? 48 : spaces?.m}px;
      left: ${spaces?.m}px;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;
