import { styled } from "@mui/material/styles";
import ButtonIcon from "src/core/ButtonIcon";
import {
  ButtonIconExtraProps,
  ButtonIconSizeToTypes,
} from "src/core/ButtonIcon/style";
import {
  CommonThemeProps,
  fontBodyS,
  getColors,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export interface BannerExtraProps<
  ButtonIconSize extends keyof ButtonIconSizeToTypes,
> extends CommonThemeProps {
  sdsType: ButtonIconSizeToTypes[ButtonIconSize];
}

export const Centered = styled("div")`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled("div")`
  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconExtraProps<ButtonIconSize>
  ) => {
    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);

    return `
      height: ${iconSizes?.l.height}px;
      margin-right: ${spaces?.m}px;
    `;
  }}
`;

type ButtonIconType<ButtonIconSize extends keyof ButtonIconSizeToTypes> =
  ButtonIconExtraProps<ButtonIconSize> & { bannerType: string };
const doNotForwardPropsButtonIcon = ["bannerType", "textChild"];

export const StyledButtonIcon = styled(ButtonIcon, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardPropsButtonIcon.includes(prop),
})`
  flex: 0 0 auto;

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconType<ButtonIconSize>
  ) => {
    const { bannerType } = props;

    const colors = getColors(props);

    if (bannerType !== "primary") return "";

    return `
      svg:hover {
        fill: ${colors?.blue[300]};
      }
    `;
  }}
`;

export const Text = styled("div")`
  ${fontBodyS}
`;

const primary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: BannerExtraProps<ButtonIconSize>
) => {
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    background-color: ${semanticComponentColors?.accent?.fill};
    color: ${semanticTextColors?.base?.onFill};
    svg {
      fill: ${semanticComponentColors?.accent?.fillOnFill};
    }
  `;
};

const secondary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: BannerExtraProps<ButtonIconSize>
) => {
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    background-color: ${semanticComponentColors?.accent?.surface};
    color: ${semanticTextColors?.base?.primary};
  `;
};

const doNotForwardProps = ["sdsType", "textChild"];

export const StyledBanner = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyS}

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: BannerExtraProps<ButtonIconSize>
  ) => {
    const { sdsType } = props;

    const spaces = getSpaces(props);

    return `
      display: flex;
      align-items: center;
      padding: ${spaces?.s}px ${spaces?.l}px;
  
      ${sdsType === "primary" ? primary(props) : ""}
      ${sdsType === "secondary" ? secondary(props) : ""}
    `;
  }}
`;
