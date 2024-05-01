import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "src/core/Button";
import {
  CommonThemeProps,
  fontBodyS,
  getColors,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export interface BannerExtraProps extends CommonThemeProps {
  sdsType: "primary" | "secondary" | "tertiary";
}

type ButtonType = ButtonProps & { bannerType: string } & BannerExtraProps;

export const Centered = styled("div")`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);

    return `
      height: ${iconSizes?.l.height}px;
      margin-right: ${spaces?.m}px;
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

const primary = (props: BannerExtraProps) => {
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

const secondary = (props: BannerExtraProps) => {
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
