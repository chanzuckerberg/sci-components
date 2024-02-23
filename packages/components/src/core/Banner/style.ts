import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import {
  ButtonIconExtraProps,
  ButtonIconSizeToTypes,
} from "../ButtonIcon/style";
import {
  CommonThemeProps,
  fontBodyS,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "../styles";

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
  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconType<ButtonIconSize>
  ) => {
    const spaces = getSpaces(props);

    return `
      flex: 0 0 auto;
      margin: ${spaces?.m}px ${spaces?.l}px;
    `;
  }}

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconType<ButtonIconSize>
  ) => {
    const { bannerType } = props;
    const semanticComponentColors = getSemanticComponentColors(props);

    if (bannerType !== "primary") return "";

    return `
      svg:hover {
        fill: ${semanticComponentColors?.accent?.fillOnFill};
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
  display: flex;
  align-items: center;
  width: 100%;

  ${fontBodyS}

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: BannerExtraProps<ButtonIconSize>
  ) => {
    const { sdsType } = props;

    return `
      ${sdsType === "primary" ? primary(props) : ""}
      ${sdsType === "secondary" ? secondary(props) : ""}
    `;
  }}
`;
