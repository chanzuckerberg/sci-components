import styled from "@emotion/styled";
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
        fill: ${bannerType === "primary" ? semanticColors?.base?.ornamentOnFill : semanticColors?.info?.ornament};
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

    if (bannerType === "primary")
      return `
        svg {
          fill: ${semanticColors?.base?.ornamentOnFill};
          opacity: .65;
        }

        svg:hover {
          opacity: 1;
        }
      `;

    return `
      svg {
        fill: ${semanticColors?.base?.ornamentPrimary};
        opacity: .55;
      }

      svg:hover {
        opacity: 1;
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
    background-color: ${semanticColors?.info?.surfacePrimary};
    color: ${semanticColors?.base?.textOnFill};
  `;
};

const secondary = (props: BannerExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    background-color: ${semanticColors?.info?.surfaceSecondary};
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
