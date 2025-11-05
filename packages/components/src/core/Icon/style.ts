import { css } from "@emotion/react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import styled from "@emotion/styled";
import { FC } from "react";
import {
  CommonThemeProps,
  getColors,
  getIconSizes,
  getMode,
} from "src/core/styles";
import { IconNameToSizes } from "./map";

export interface IconExtraProps<IconName extends keyof IconNameToSizes>
  extends CommonThemeProps {
  className?: string;
  sdsIcon: IconName;
  sdsSize: IconNameToSizes[IconName];
}

export type SdsIconColorType =
  | "blue"
  | "gray"
  | "green"
  | "purple"
  | "indigo"
  | "red"
  | "yellow";

interface SdsIconWithColor {
  iconColor?: SdsIconColorType;
  shade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
}

export type StyledSvgIconProps<IconName extends keyof IconNameToSizes> =
  IconExtraProps<IconName> &
    CustomSVGProps &
    SvgIconProps<"svg", { component: FC<CustomSVGProps> }> &
    SdsIconWithColor;

const doNotForwardProps = ["sdsIcon", "sdsSize", "iconColor"];

/**
 * @see https://mui.com/material-ui/icons/#svgicon
 */

export const StyledSvgIcon = styled(SvgIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${<IconName extends keyof IconNameToSizes>(
    props: StyledSvgIconProps<IconName>
  ) => {
    const mode = getMode(props);

    const {
      iconColor = "indigo",
      shade = mode === "dark" ? 600 : 500,
      sdsSize,
    } = props;

    const iconSizes = getIconSizes(props);
    const colors = getColors(props);

    return css`
      color: ${colors?.[iconColor]?.[shade]};
      height: ${iconSizes?.[sdsSize]?.height}px;
      width: ${iconSizes?.[sdsSize]?.width}px;
    `;
  }}
`;

export const StyledIcon = styled("div")`
  /* display: contents causes an element's children to appear as if they were direct children of the element's parent, ignoring the element itself. This can be useful when a wrapper element should be ignored when using CSS grid or similar layout techniques. */
  display: contents;
`;
