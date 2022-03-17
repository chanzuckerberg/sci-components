import { css } from "@emotion/css";
import { CommonThemeProps, getCorners, getSpaces } from "../styles";

export interface ExtraProps extends CommonThemeProps {
  indicator?: boolean;
  indicatorColor?: string;
}

const indicatorCSS = (props: ExtraProps): string => {
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
      border-radius: ${corners?.l}px;
      margin-right: ${spaces?.m}px;
    }
  `;
};

export const condensedCSS = (props: ExtraProps): string => {
  const { indicator } = props;
  const spaces = getSpaces(props);

  return css`
    &.MuiTooltip-tooltip {
      padding-top: ${spaces?.xxs}px;
      padding-bottom: ${spaces?.xxs}px;
      padding-left: ${spaces?.m}px;
      padding-right: ${spaces?.m}px;
      max-width: 250px;
      display: flex;
      align-items: center;

      ${indicator === true && indicatorCSS(props)};
    }
  `;
};
