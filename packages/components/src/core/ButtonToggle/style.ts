import styled from "@emotion/styled";
import ButtonIcon from "../ButtonIcon";
import { CommonThemeProps, getSemanticColors } from "../styles";
import { ButtonToggleProps } from ".";

/**
 * (masoudmanson): Since StyledButtonToggle is built on top of ButtonIcon,
 * we only need to exclude the `sdsStage` prop from being forwarded,
 * as it is not a valid prop for ButtonIcon.
 * All other props should be passed down to ButtonIcon; otherwise,
 * the component won’t function as expected.
 */
const doNotForwardProps = ["sdsStage"];

interface ButtonToggleExtraProps extends CommonThemeProps {
  sdsStage?: ButtonToggleProps["sdsStage"];
}

export const StyledButtonToggle = styled(ButtonIcon, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ButtonToggleExtraProps) => {
    const { sdsStage } = props;
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${sdsStage === "on" ? semanticColors?.base?.fillOpen : "transparent"};
    `;
  }}
`;
