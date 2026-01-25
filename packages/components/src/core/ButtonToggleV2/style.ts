import styled from "@emotion/styled";
import { CommonThemeProps, getSemanticColors } from "../styles";
import { ButtonToggleV2Props } from ".";
import ButtonV2 from "../ButtonV2";
import { css, SerializedStyles } from "@emotion/react";

/**
 * (masoudmanson): Since StyledButtonToggleV2 is built on top of ButtonV2,
 * we only need to exclude the `sdsStage` prop from being forwarded,
 * as it is not a valid prop for ButtonV2.
 * All other props should be passed down to ButtonV2; otherwise,
 * the component won’t function as expected.
 */
const doNotForwardProps = ["sdsStage"];

interface ButtonToggleExtraProps
  extends ButtonToggleV2Props,
    CommonThemeProps {}

const StageOnStyles = (props: ButtonToggleExtraProps): SerializedStyles => {
  const { sdsType, sdsStyle, backgroundOnHover } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    sdsType === "primary"
      ? semanticColors?.accent?.foreground
      : semanticColors?.base?.textPrimary;

  const backgroundColor =
    sdsStyle === "outline" && sdsType === "primary"
      ? semanticColors?.accent?.surfaceSecondary
      : semanticColors?.base?.fillPrimaryInteraction;

  const ornamentColor =
    sdsStyle === "outline"
      ? sdsType === "primary"
        ? semanticColors?.accent?.foreground
        : semanticColors?.base?.ornamentPrimary
      : sdsType === "primary"
        ? semanticColors?.accent?.foreground
        : semanticColors?.base?.ornamentSecondaryInteraction;

  return css`
    background-color: ${sdsStyle === "minimal" && !backgroundOnHover
      ? "transparent"
      : backgroundColor};
    color: ${contentColor};
    svg {
      color: ${ornamentColor};
    }
  `;
};

export const StyledButtonToggleV2 = styled(ButtonV2, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ButtonToggleExtraProps) => {
    const { sdsStage } = props;

    if (sdsStage === "on") {
      return StageOnStyles(props);
    }

    return null;
  }}
`;
