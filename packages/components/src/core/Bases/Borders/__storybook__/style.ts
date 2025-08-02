import styled from "@emotion/styled";
import { CommonThemeProps, getCorners } from "src/core/styles";

const BORDER_BOX_BORDER_WIDTH_PX = 1,
  BORDER_BOX_BOX_SIZE_PX = 60;

export const StyledBordersWrapper = styled("div")`
  max-width: 100%;
`;

interface IStyledCornerBoxProps extends CommonThemeProps {
  border: string;
}

export const StyledBorderBox = styled("div")`
  ${(props: IStyledCornerBoxProps) => {
    const { border } = props;

    const corners = getCorners(props);

    return `
      position: relative;
      margin-left: 10px;
      width: ${BORDER_BOX_BOX_SIZE_PX}px;
      height: ${BORDER_BOX_BOX_SIZE_PX}px;
      background-color: transparent;
      border-radius: ${BORDER_BOX_BORDER_WIDTH_PX}px;
      border: ${border};
      border-radius: ${corners?.rounded}px;

      &:hover {
        animation: pulse 3s infinite;
      }

      @keyframes pulse {
        50% {
          border-radius: 0;
        }
      }
    `;
  }}
`;
