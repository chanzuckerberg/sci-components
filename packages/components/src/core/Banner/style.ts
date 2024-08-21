import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "src/core/Button";
import {
  CommonThemeProps,
  fontBodyS,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface BannerExtraProps extends CommonThemeProps {
  sdsType: "primary" | "secondary";
}

type ButtonType = ButtonProps & { bannerType: string } & CommonThemeProps;
type IconWrapperType = CommonThemeProps & { bannerType: string };

export const Centered = styled("div")`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const doNotForwardPropsIconWrapper = ["bannerType"];

export const IconWrapper = styled("div", {
  shouldForwardProp: (prop: string) =>
    !doNotForwardPropsIconWrapper.includes(prop),
})`
  ${(props: IconWrapperType) => {
    const { bannerType } = props;

    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      height: ${iconSizes?.l.height}px;
      margin-right: ${spaces?.m}px;
      svg {
        fill: ${bannerType === "primary" ? semanticColors?.base?.iconPrimaryInverse : semanticColors?.info?.ornament};
      }
    `;
  }}
`;

const doNotForwardPropsButtonIcon = ["bannerType", "textChild"];

export const StyledButton = styled(Button as React.ComponentType<ButtonType>, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardPropsButtonIcon.includes(prop),
})`
  flex: 0 0 auto;

  ${(props: ButtonType) => {
    const { bannerType } = props;

    const semanticColors = getSemanticColors(props);

    if (bannerType !== "primary") return "";

    return `
      svg {
        fill: ${semanticColors?.base?.iconPrimaryInverse};
      }

      svg:hover {
        fill: ${semanticColors?.base?.iconPrimaryInverseHover};
      }
    `;
  }}
`;

export const Text = styled("div")`
  ${fontBodyS}
`;

const primary = (props: BannerExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    background-color: ${semanticColors?.info?.surfaceSecondary};
    color: ${semanticColors?.base?.textPrimaryInverse};
  `;
};

const secondary = (props: BannerExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    background-color: ${semanticColors?.info?.surfacePrimary};
    color: ${semanticColors?.base?.textPrimary};
  `;
};

const doNotForwardProps = ["sdsType", "textChild"];

export const StyledBanner = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyS}

  ${(props: BannerExtraProps) => {
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
