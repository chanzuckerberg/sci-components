import styled from "@emotion/styled";
import ButtonV2, { ButtonV2Props } from "src/core/ButtonV2";
import {
  CommonThemeProps,
  fontBodyS,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { BannerIntentType } from "./index";

export interface BannerExtraProps extends CommonThemeProps {
  sdsType: "primary" | "secondary";
  intent?: BannerIntentType;
}

type ButtonType = ButtonV2Props & {
  bannerType: string;
} & CommonThemeProps;
type IconWrapperType = CommonThemeProps & {
  bannerType: string;
  intent?: BannerIntentType;
};

export const Centered = styled("div")`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const doNotForwardPropsIconWrapper = ["bannerType", "intent"];

export const IconWrapper = styled("div", {
  shouldForwardProp: (prop: string) =>
    !doNotForwardPropsIconWrapper.includes(prop),
})`
  ${(props: IconWrapperType) => {
    const { bannerType, intent = "info" } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const iconColor =
      bannerType === "primary"
        ? semanticColors?.base?.ornamentOnFill
        : semanticColors?.[intent]?.ornament;

    return `
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${spaces?.m}px;
      svg {
        fill: ${iconColor};
      }
    `;
  }}
`;

const doNotForwardPropsButtonIcon = ["bannerType", "textChild", "intent"];

export const StyledButton = styled(
  ButtonV2 as React.ComponentType<ButtonType>,
  {
    shouldForwardProp: (prop: string) =>
      !doNotForwardPropsButtonIcon.includes(prop),
  }
)`
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
  const { intent = "info" } = props;
  const semanticColors = getSemanticColors(props);

  return `
    background-color: ${semanticColors?.[intent]?.surfacePrimary};
    color: ${semanticColors?.base?.textOnFill};
  `;
};

const secondary = (props: BannerExtraProps) => {
  const { intent = "info" } = props;
  const semanticColors = getSemanticColors(props);

  return `
    background-color: ${semanticColors?.[intent]?.surfaceSecondary};
    color: ${semanticColors?.base?.textPrimary};
  `;
};

const doNotForwardProps = ["sdsType", "textChild", "intent"];

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
      padding: ${spaces?.xs}px ${spaces?.m}px;
  
      ${sdsType === "primary" ? primary(props) : ""}
      ${sdsType === "secondary" ? secondary(props) : ""}
    `;
  }}
`;
