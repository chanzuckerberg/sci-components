import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import {
  ButtonIconExtraProps,
  ButtonIconSizeToTypes,
} from "../ButtonIcon/style";
import {
  CommonThemeProps,
  fontBodyS,
  getColors,
  getIconSizes,
  getSpaces,
  getTypography,
} from "../styles";

export interface BannerExtraProps<
  ButtonIconSize extends keyof ButtonIconSizeToTypes
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
const doNotForwardPropsButtonIcon = ["bannerType"];

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
      margin: ${spaces?.l}px;
    `;
  }}

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconType<ButtonIconSize>
  ) => {
    const { bannerType } = props;
    const colors = getColors(props);

    if (bannerType !== "primary") return "";

    return `
      svg:hover {
        fill: ${colors?.primary[300]};
      }
    `;
  }}
`;

export const Text = styled("div")`
  ${fontBodyS}
  ${(props) => {
    const typography = getTypography(props);

    return `
      font-family: ${typography?.fontFamily};
    `;
  }}
`;

const primary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: BannerExtraProps<ButtonIconSize>
) => {
  const colors = getColors(props);

  return `
    background-color: ${colors?.info[400]};
    color: white;
    svg {
      fill: white;
    }
  `;
};

const secondary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: BannerExtraProps<ButtonIconSize>
) => {
  const colors = getColors(props);

  return `
    background-color: ${colors?.info[100]};
    color: black;
  `;
};

const doNotForwardProps = ["sdsType"];

export const StyledBanner = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;

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
