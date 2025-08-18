import { css } from "@emotion/css";
import { CommonThemeProps, getCorners, getSpaces } from "src/core/styles";

export interface TooltipCondensedExtraProps extends CommonThemeProps {
  indicator?: boolean;
  indicatorColor?: string;
}

const indicatorCSS = (props: TooltipCondensedExtraProps): string => {
  const { indicatorColor } = props;
  const spaces = getSpaces(props);
  const corners = getCorners(props);

  return css`
    &::before {
      content: "";
      width: ${spaces?.m}px;
      height: ${spaces?.m}px;
      display: block;
      background-color: ${indicatorColor};
      border-radius: ${corners?.rounded}px;
      margin-right: ${spaces?.m}px;
    }
  `;
};

export const condensedCSS = (props: TooltipCondensedExtraProps): string => {
  const { indicator } = props;
  const spaces = getSpaces(props);

  return css`
    && {
      padding-top: ${spaces?.xxs}px;
      padding-bottom: ${spaces?.xxs}px;
      padding-left: ${spaces?.m}px;
      padding-right: ${spaces?.m}px;
      max-width: 250px;
      display: flex;
      align-items: center;

      ${indicator === true && indicatorCSS(props)}
    }
  `;
};
