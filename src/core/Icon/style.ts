import { css, SerializedStyles } from "@emotion/react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { CommonThemeProps, getColors, getIconSizes } from "../styles";
import { IconNameToSizes } from "./map";

export interface IconExtraProps<IconName extends keyof IconNameToSizes>
  extends CommonThemeProps {
  className?: string;
  sdsIcon: IconName;
  sdsSize: IconNameToSizes[IconName];
  sdsType: "iconButton" | "interactive" | "static" | "button";
}

export type SdsIconColorType =
  | "beta"
  | "gray"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

interface CustomSvgIconProps
  extends SvgIconProps<"svg", { component: FC<CustomSVGProps> }> {
  iconColor?: SdsIconColorType;
}

export type StyledSvgIconProps<IconName extends keyof IconNameToSizes> =
  IconExtraProps<IconName> & CustomSVGProps & CustomSvgIconProps;

/**
 * @see https://mui.com/material-ui/icons/#svgicon
 */
function iconSize<IconName extends keyof IconNameToSizes>(
  props: IconExtraProps<IconName>
): SerializedStyles {
  const { sdsSize } = props;
  const iconSizes = getIconSizes(props);

  return css`
    height: ${iconSizes?.[sdsSize]?.height}px;
    width: ${iconSizes?.[sdsSize]?.width}px;
  `;
}

function buttonStyle(): SerializedStyles {
  return css`
    color: inherit;
  `;
}

function staticStyle<IconName extends keyof IconNameToSizes>(
  props: StyledSvgIconProps<IconName>
): SerializedStyles {
  const { iconColor } = props;
  const colors = getColors(props);

  return css`
    color: ${iconColor ? colors?.[iconColor][400] : colors?.primary[400]};
  `;
}

function interactive<IconName extends keyof IconNameToSizes>(
  props: StyledSvgIconProps<IconName>
): SerializedStyles {
  const colors = getColors(props);
  const { iconColor } = props;

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      color: ${colors?.gray[600]};
    }

    &:active {
      color: ${iconColor ? colors?.[iconColor][400] : colors?.primary[400]};
    }

    &:disabled {
      color: ${colors?.gray[300]};
    }
  `;
}

const doNotForwardProps = ["sdsIcon", "sdsSize", "sdsType", "iconColor"];

export const StyledSvgIcon = styled(SvgIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${<IconName extends keyof IconNameToSizes>(
    props: StyledSvgIconProps<IconName>
  ) => {
    const { sdsType } = props;

    return css`
      ${sdsType !== "iconButton" && iconSize(props)}
      ${sdsType === "static" && staticStyle(props)}
      ${sdsType === "interactive" && interactive(props)}
      ${sdsType === "button" && buttonStyle()}
    `;
  }}
`;

export const StyledIcon = styled("div")`
  /* display: contents causes an element's children to appear as if they were direct children of the element's parent, ignoring the element itself. This can be useful when a wrapper element should be ignored when using CSS grid or similar layout techniques. */
  display: contents;
`;
